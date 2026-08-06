// @ts-nocheck
/**
 * BAZventures — Book ingestion pipeline
 *
 * Takes PDF/EPUB/TXT/MD files and converts them into searchable chunks
 * with embeddings for RAG (Retrieval-Augmented Generation).
 *
 * Flow:
 *   Raw file → Extract text → Chunk (500 tokens, 50 overlap) → Embed → Store
 *
 * Supported formats:
 *   - PDF (via pdf-parse)
 *   - EPUB (via epub2)
 *   - TXT / MD (native)
 *   - Web URLs (fetch + extract text)
 */

import crypto from "node:crypto";
import { embedBatch, getEmbedderConfig, type EmbedderConfig } from "./embed";

// ── Types ────────────────────────────────────────────────────

export interface BookMeta {
  title: string;
  author: string;
  tags: string[];
  source: "upload" | "url" | "manual";
  format: "pdf" | "epub" | "txt" | "md" | "url";
}

export interface BookChunk {
  id: string;
  bookId: string;
  content: string;
  chapter: string;
  chapterIndex: number;
  chunkIndex: number;
  tokenCount: number;
  startOffset: number;
  endOffset: number;
  embedding: number[];
}

export interface IngestResult {
  bookId: string;
  title: string;
  totalChunks: number;
  totalTokens: number;
  format: string;
  status: "ok" | "partial" | "error";
  errors: string[];
  chunks?: BookChunk[];
}

// ── Configuration ───────────────────────────────────────────

const CHUNK_SIZE_TOKENS = 500;
const CHUNK_OVERLAP_TOKENS = 50;
const MAX_CONTENT_LENGTH = 2_000_000; // 2MB text limit per book

// Rough token estimate: 1 token ≈ 4 chars for English
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// ── Text Extraction ─────────────────────────────────────────

/**
 * Extract text from a PDF buffer.
 * Requires `pdf-parse` package.
 */
async function extractPdf(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const pdfParse = await import("pdf-parse");
    const data = await pdfParse.default(buffer);
    return { text: data.text, pages: data.numpages };
  } catch {
    throw new Error(
      "pdf-parse not installed. Run: npm install pdf-parse @types/pdf-parse",
    );
  }
}

/**
 * Extract text from an EPUB buffer.
 * Requires `epub2` package.
 */
async function extractEpub(buffer: Buffer): Promise<{ text: string; chapters: string[] }> {
  // EPUB extraction: epub2 has TS compatibility issues.
  // For now, attempt ZIP-based extraction (most EPUBs are ZIP archives with HTML).
  // Falls back to raw binary scan if JSZip is unavailable.
  try {
    let JSZip: any = null;
    try { const mod = await import("jszip"); JSZip = mod.default || mod; } catch { /* not available */ }
    
    if (JSZip) {
      const zip = await JSZip.loadAsync(buffer);
      const htmlFiles: string[] = [];
      const chapterNames: string[] = [];
      
      for (const [name, file] of Object.entries(zip.files)) {
        if (/\.(html|xhtml|htm)$/i.test(name) && !name.includes("toc") && !name.includes("nav")) {
          try {
            const content = await file.async("string");
            const plainText = content
              .replace(/<[^>]*>/g, " ")
              .replace(/&\w+;/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            if (plainText.length > 50) {
              htmlFiles.push(plainText);
              const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
              chapterNames.push(titleMatch?.[1] || `Chapter ${chapterNames.length + 1}`);
            }
          } catch { /* skip unreadable files */ }
        }
      }
      
      if (htmlFiles.length > 0) {
        return { text: htmlFiles.join("\n\n---\n\n"), chapters: chapterNames };
      }
    }
    
    throw new Error("EPUB parsing requires jszip. Install with: npm install jszip");
  } catch (err) {
    throw new Error(
      `EPUB parsing failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
function extractText(content: string): { text: string; chapters: string[] } {
  // Detect markdown headings as chapter boundaries
  const lines = content.split("\n");
  const chapters: string[] = [];
  let currentChapter = "Introduction";
  let chapterTexts: { name: string; text: string }[] = [{ name: currentChapter, text: "" }];

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headingMatch) {
      currentChapter = headingMatch[1].trim();
      chapters.push(currentChapter);
      chapterTexts.push({ name: currentChapter, text: "" });
    } else {
      chapterTexts[chapterTexts.length - 1].text += line + "\n";
    }
  }

  if (chapters.length === 0) {
    chapters.push("Full Text");
    chapterTexts = [{ name: "Full Text", text: content }];
  }

  const text = chapterTexts
    .map((c) => `\n\n--- ${c.name} ---\n\n${c.text}`)
    .join("");

  return { text, chapters };
}

/**
 * Extract text from a web URL.
 */
async function extractUrl(url: string): Promise<{ text: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  const html = await res.text();

  // Simple HTML → text extraction (no dependency needed)
  const text = html
    // Remove scripts and styles
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Remove tags
    .replace(/<[^>]*>/g, " ")
    // Decode entities
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  return { text };
}

// ── Chunking ────────────────────────────────────────────────

/**
 * Split text into overlapping chunks of approximately `chunkSize` tokens.
 * Preserves paragraph boundaries when possible.
 */
export function chunkText(
  text: string,
  chunkSize: number = CHUNK_SIZE_TOKENS,
  overlap: number = CHUNK_OVERLAP_TOKENS,
): Array<{
  content: string;
  chunkIndex: number;
  tokenCount: number;
  startOffset: number;
}> {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const chunks: Array<{
    content: string;
    chunkIndex: number;
    tokenCount: number;
    startOffset: number;
  }> = [];

  let currentChunk = "";
  let currentTokens = 0;
  let offset = 0;

  for (const para of paragraphs) {
    const paraTokens = estimateTokens(para);

    // If adding this paragraph exceeds chunk size and we have content, save the chunk
    if (currentTokens + paraTokens > chunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        chunkIndex: chunks.length,
        tokenCount: currentTokens,
        startOffset: offset,
      });

      // Overlap: keep the last `overlap` tokens worth of text
      const overlapText = getOverlapText(currentChunk, overlap);
      currentChunk = overlapText + "\n\n" + para;
      currentTokens = estimateTokens(currentChunk);
      offset += currentChunk.length - overlapText.length;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + para;
      currentTokens += paraTokens;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim().length > 0) {
    chunks.push({
      content: currentChunk.trim(),
      chunkIndex: chunks.length,
      tokenCount: estimateTokens(currentChunk),
      startOffset: offset,
    });
  }

  return chunks;
}

function getOverlapText(text: string, overlapTokens: number): string {
  const overlapChars = overlapTokens * 4; // rough estimate
  if (text.length <= overlapChars) return text;
  const slice = text.slice(-overlapChars);
  // Start from the first paragraph boundary in the overlap
  const paraBreak = slice.indexOf("\n\n");
  return paraBreak >= 0 ? slice.slice(paraBreak + 2) : slice;
}

/**
 * Parse chunked text into chapter-aware chunks.
 * Each chunk gets the chapter title from the nearest preceding "---" marker.
 */
export function assignChapters(
  chunks: Array<{ content: string; chunkIndex: number; tokenCount: number; startOffset: number }>,
): Array<{
  content: string;
  chunkIndex: number;
  tokenCount: number;
  startOffset: number;
  chapter: string;
  chapterIndex: number;
}> {
  // Extract chapter markers from the full text
  let currentChapter = "Introduction";
  let chapterIndex = 0;

  return chunks.map((chunk) => {
    const chapterMarkers = chunk.content.match(/---\s+(.+?)\s+---/g);
    if (chapterMarkers) {
      // Use the last chapter marker in this chunk
      const lastMarker = chapterMarkers[chapterMarkers.length - 1];
      const chapterName = lastMarker.replace(/---\s+/, "").replace(/\s+---/, "");
      currentChapter = chapterName;
    }

    // Remove chapter markers from content for cleaner embedding
    const cleanContent = chunk.content
      .replace(/---\s+.+?\s+---/g, "")
      .trim();

    const result = {
      content: cleanContent,
      chunkIndex: chunk.chunkIndex,
      tokenCount: estimateTokens(cleanContent),
      startOffset: chunk.startOffset,
      chapter: currentChapter,
      chapterIndex,
    };

    // Increment chapter index if we see a new chapter marker
    if (chapterMarkers && chapterMarkers.length > 0) {
      chapterIndex++;
    }

    return result;
  });
}

// ── Main Ingestion Pipeline ─────────────────────────────────

/**
 * Ingest a book from a file buffer or URL.
 * Returns chunked and embedded data ready for storage.
 */
export async function ingestBook(
  input: {
    buffer?: Buffer;
    url?: string;
    text?: string;
    meta: BookMeta;
  },
  embedderConfig?: EmbedderConfig,
): Promise<IngestResult> {
  const bookId = `book_${crypto.randomBytes(6).toString("hex")}`;
  const errors: string[] = [];
  let rawText = "";
  let format = input.meta.format;

  // Step 1: Extract text
  try {
    if (input.text) {
      format = "txt";
      rawText = input.text;
    } else if (input.url) {
      format = "url";
      const result = await extractUrl(input.url);
      rawText = result.text;
    } else if (input.buffer) {
      if (format === "pdf") {
        const result = await extractPdf(input.buffer);
        rawText = result.text;
      } else if (format === "epub") {
        const result = await extractEpub(input.buffer);
        rawText = result.text;
      } else {
        // Try as plain text
        rawText = input.buffer.toString("utf-8");
        format = "txt";
      }
    } else {
      throw new Error("Must provide buffer, url, or text");
    }
  } catch (err) {
    return {
      bookId,
      title: input.meta.title,
      totalChunks: 0,
      totalTokens: 0,
      format,
      status: "error",
      errors: [err instanceof Error ? err.message : String(err)],
    };
  }

  // Validate text length
  if (rawText.length > MAX_CONTENT_LENGTH) {
    rawText = rawText.slice(0, MAX_CONTENT_LENGTH);
    errors.push(`Text truncated to ${MAX_CONTENT_LENGTH} characters`);
  }

  if (rawText.trim().length < 100) {
    return {
      bookId,
      title: input.meta.title,
      totalChunks: 0,
      totalTokens: 0,
      format,
      status: "error",
      errors: ["Extracted text too short (less than 100 characters)"],
    };
  }

  // Step 2: Chunk text
  const rawChunks = chunkText(rawText);
  const chunks = assignChapters(rawChunks);

  if (chunks.length === 0) {
    return {
      bookId,
      title: input.meta.title,
      totalChunks: 0,
      totalTokens: 0,
      format,
      status: "error",
      errors: ["No chunks produced from text"],
    };
  }

  // Step 3: Generate embeddings
  const config = embedderConfig ?? getEmbedderConfig();
  const texts = chunks.map((c) => c.content);
  let embeddings: number[][];

  try {
    embeddings = await embedBatch(texts, config);
  } catch (err) {
    // Embedding failed — return chunks with empty embeddings so they can still be saved
    const emptyChunks = chunks.map((c, i) => ({
      id: `${bookId}_chunk_${i}`,
      bookId,
      content: c.content,
      chapter: c.chapter,
      chapterIndex: c.chapterIndex,
      chunkIndex: c.chunkIndex,
      tokenCount: c.tokenCount,
      startOffset: c.startOffset,
      endOffset: c.startOffset + c.content.length,
      embedding: [] as number[],
    }));
    return {
      bookId,
      title: input.meta.title,
      totalChunks: emptyChunks.length,
      totalTokens: emptyChunks.reduce((sum, c) => sum + c.tokenCount, 0),
      format,
      status: "partial",
      errors: [`Embedding failed: ${err instanceof Error ? err.message : String(err)}`],
      chunks: emptyChunks,
    };
  }

  if (embeddings.length !== chunks.length) {
    errors.push(
      `Embedding count mismatch: ${embeddings.length} embeddings for ${chunks.length} chunks`,
    );
  }

  // Step 4: Build final chunks with embeddings
  const bookChunks: BookChunk[] = chunks.map((chunk, i) => ({
    id: `${bookId}_chunk_${i}`,
    bookId,
    content: chunk.content,
    chapter: chunk.chapter,
    chapterIndex: chunk.chapterIndex,
    chunkIndex: chunk.chunkIndex,
    tokenCount: chunk.tokenCount,
    startOffset: chunk.startOffset,
    endOffset: chunk.startOffset + chunk.content.length,
    embedding: embeddings[i] || [],
  }));

  // Step 5: Store (caller must save — we return the data)
  const totalTokens = bookChunks.reduce((sum, c) => sum + c.tokenCount, 0);

  return {
    bookId,
    title: input.meta.title,
    totalChunks: bookChunks.length,
    totalTokens,
    format,
    status: errors.length > 0 ? "partial" : "ok",
    errors,
    chunks: bookChunks,
  };
}

/**
 * Ingest a book and return the chunks (without embedding — for testing).
 * The caller can embed later.
 */
export function ingestBookDryRun(
  text: string,
  meta: BookMeta,
): { bookId: string; chunks: Array<Omit<BookChunk, "embedding">>; totalTokens: number } {
  const bookId = `book_${crypto.randomBytes(6).toString("hex")}`;
  const rawChunks = chunkText(text);
  const chunks = assignChapters(rawChunks);

  const totalTokens = chunks.reduce((sum, c) => sum + c.tokenCount, 0);

  return {
    bookId,
    chunks: chunks.map((c) => ({
      id: `${bookId}_chunk_${c.chunkIndex}`,
      bookId,
      content: c.content,
      chapter: c.chapter,
      chapterIndex: c.chapterIndex,
      chunkIndex: c.chunkIndex,
      tokenCount: c.tokenCount,
      startOffset: c.startOffset,
      endOffset: c.startOffset + c.content.length,
    })),
    totalTokens,
  };
}

// @ts-nocheck
/**
 * BAZventures — Book RAG Query Engine
 *
 * Given a question, this module:
 *   1. Embeds the question
 *   2. Searches for relevant book chunks
 *   3. Builds a context window from the best matches
 *   4. Sends the question + context to the LLM
 *   5. Returns an answer with citations
 *
 * This is the core of the "train your marketing system on books" feature.
 * Every BAZventures agent can use this to ground its answers in real book content.
 */

import { embed, getEmbedderConfig, type EmbedderConfig } from "./embed";
import { getBookStore, type BookSearchResult, type BookQueryOptions, type BookQueryResult } from "./book-store";
import { complete, type LlmResult } from "../llm";

// ── RAG System Prompts ──────────────────────────────────────

const RAG_SYSTEM_PROMPT = `You are BAZventures Knowledge Agent. You answer questions about marketing, business, and growth strategy by drawing exclusively from the provided book excerpts.

Rules:
- Only use information from the provided book context. If the context doesn't contain the answer, say so.
- Always cite the book title, author, and chapter when referencing specific ideas.
- Be specific: quote frameworks, formulas, and principles by name.
- Be practical: when someone asks "how", give step-by-step guidance grounded in the book's methodology.
- Never invent content that isn't in the excerpts. If you're unsure, say "The provided excerpts don't cover this."
- Format citations as: [Book Title, Author, Chapter] — e.g., [Influence, Cialdini, Chapter 3: Commitment and Consistency]
- When multiple books are relevant, synthesize their ideas and note where they agree or differ.`;

const RAG_SYSTEM_PROMPT_AGENT = `You are a BAZventures marketing agent enhanced with book knowledge. You combine your training as a marketing specialist with insights from the provided book excerpts.

When answering:
- Ground your advice in the book frameworks and principles
- Cite specific books and chapters when you reference ideas
- Blend practical marketing expertise with the theoretical frameworks from the books
- If the books contradict common practice, explain both perspectives
- Always be actionable — your answer should end with specific next steps

Citation format: [Book Title, Author, Chapter]`;

// ── Query Engine ───────────────────────────────────────────

export interface RAGQueryOptions extends BookQueryOptions {
  /** Use the agent-optimized system prompt (for /api/agents) */
  agentMode?: boolean;
  /** Custom system prompt override */
  systemPrompt?: string;
  /** Max tokens for the LLM response */
  maxTokens?: number;
  /** Temperature for the LLM response */
  temperature?: number;
}

/**
 * Query the book knowledge base using RAG.
 *
 * This is the main entry point. Given a question:
 *   1. Embed the question
 *   2. Search for relevant book chunks
 *   3. Build context window
 *   4. Send to LLM with book-grounded system prompt
 *   5. Return answer with sources
 */
export async function queryBooks(options: RAGQueryOptions): Promise<BookQueryResult> {
  const {
    question,
    topK = 5,
    minScore = 0.3,
    bookFilter,
    tagFilter,
    agentMode = false,
    systemPrompt,
    maxTokens = 1500,
    temperature = 0.4,
  } = options;

  // Step 1: Embed the question
  const embedderConfig = getEmbedderConfig();
  const queryEmbedding = await embed(question, embedderConfig);

  // Step 2: Search for relevant chunks
  const store = getBookStore(embedderConfig);
  await store.init();
  await store.loadIntoMemory(); // Ensure in-memory index is populated

  const searchResults = await store.search(queryEmbedding, {
    topK,
    minScore,
    bookFilter,
    tagFilter,
  });

  if (searchResults.length === 0) {
    return {
      answer: "No relevant book content found for your question. Try uploading books to the knowledge base first.",
      sources: [],
      bookContext: "",
      model: "none",
      provider: "none",
    };
  }

  // Step 3: Build context window
  const bookContext = buildContextWindow(searchResults);

  // Step 4: Build the full prompt
  const fullPrompt = `Question: ${question}\n\nBook context:\n${bookContext}`;

  const system = systemPrompt ?? (agentMode ? RAG_SYSTEM_PROMPT_AGENT : RAG_SYSTEM_PROMPT);

  // Step 5: Send to LLM
  const result: LlmResult = await complete({
    prompt: fullPrompt,
    system,
    maxTokens,
    temperature,
  });

  return {
    answer: result.text ?? "No response from AI provider.",
    sources: searchResults,
    bookContext,
    model: result.model ?? "unknown",
    provider: result.provider ?? "unknown",
  };
}

/**
 * Query for relevant chunks only (no LLM call).
 * Useful for pre-fetching context for an agent.
 */
export async function searchBookContext(
  question: string,
  options: { topK?: number; minScore?: number; bookFilter?: string[] } = {},
): Promise<{ chunks: BookSearchResult[]; context: string }> {
  const embedderConfig = getEmbedderConfig();
  const queryEmbedding = await embed(question, embedderConfig);

  const store = getBookStore(embedderConfig);
  await store.init();
  await store.loadIntoMemory();

  const chunks = await store.search(queryEmbedding, {
    topK: options.topK ?? 5,
    minScore: options.minScore ?? 0.3,
    bookFilter: options.bookFilter,
  });

  return {
    chunks,
    context: buildContextWindow(chunks),
  };
}

/**
 * Build a formatted context window from search results.
 */
function buildContextWindow(results: BookSearchResult[]): string {
  return results
    .map((r, i) => {
      const citation = `[${r.bookTitle}, ${r.author}, ${r.chapter}]`;
      return `--- Excerpt ${i + 1} ${citation} ---\n${r.content}\n`;
    })
    .join("\n");
}

/**
 * Get a summary of what books are available in the knowledge base.
 * Useful for UI display and for agents to know what they can reference.
 */
export async function getBookKnowledgeSummary(): Promise<{
  books: Array<{ title: string; author: string; tags: string[]; chunkCount: number }>;
  totalChunks: number;
  totalTokens: number;
  coverage: string[];
}> {
  const store = getBookStore();
  await store.init();

  const books = store.listBooks();
  const stats = store.getStats();

  // Derive coverage areas from book tags
  const allTags = books.flatMap((b) => b.tags);
  const coverage = [...new Set(allTags)];

  return {
    books: books.map((b) => ({
      title: b.title,
      author: b.author,
      tags: b.tags,
      chunkCount: b.chunkCount,
    })),
    totalChunks: stats.chunks,
    totalTokens: stats.totalTokens,
    coverage,
  };
}

/**
 * Enhance an existing BAZventures agent prompt with book context.
 * Use this to inject book knowledge into any agent call.
 */
export async function enhanceAgentWithBooks(
  userPrompt: string,
  options: { topK?: number; minScore?: number; bookFilter?: string[] } = {},
): Promise<{ enhancedPrompt: string; sources: BookSearchResult[] }> {
  const { chunks, context } = await searchBookContext(userPrompt, options);

  if (chunks.length === 0) {
    return { enhancedPrompt: userPrompt, sources: [] };
  }

  const enhancedPrompt = `${userPrompt}\n\n[Book Knowledge Context]\n${context}\n[End Book Context]\n\nAnswer the user's question, grounding your advice in the book excerpts above when relevant. Cite specific books and chapters.`;

  return { enhancedPrompt, sources: chunks };
}
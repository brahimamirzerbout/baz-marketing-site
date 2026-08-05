// @ts-nocheck
/**
 * BAZventures — Book store (Supabase pgvector + local SQLite fallback)
 *
 * Stores book metadata and chunk embeddings for RAG queries.
 *
 * Production: Supabase PostgreSQL with pgvector extension
 * Development: Local SQLite with in-memory cosine similarity
 *
 * Setup:
 *   1. Enable pgvector in Supabase: CREATE EXTENSION IF NOT EXISTS vector;
 *   2. Run the migration SQL from createTables()
 *   3. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local
 */

import crypto from "node:crypto";
import { getDb, id } from "../db";
import { embed, embedBatch, getEmbedderConfig, MemoryVectorStore, getMemoryStore, type EmbedderConfig } from "./embed";
import type { BookChunk, BookMeta, IngestResult } from "./book-ingest";

// ── Types ───────────────────────────────────────────────────

export interface Book {
  id: string;
  title: string;
  author: string;
  tags: string[];
  format: string;
  source: string;
  chunkCount: number;
  totalTokens: number;
  status: "ready" | "processing" | "error";
  createdAt: number;
}

export interface BookSearchResult {
  bookId: string;
  bookTitle: string;
  author: string;
  chapter: string;
  chunkIndex: number;
  content: string;
  score: number;
  tags: string[];
}

export interface BookQueryOptions {
  question: string;
  topK?: number;
  minScore?: number;
  bookFilter?: string[]; // book IDs to search within
  tagFilter?: string[]; // tags to filter by
}

export interface BookQueryResult {
  answer: string;
  sources: BookSearchResult[];
  bookContext: string;
  model: string;
  provider: string;
}

// ── SQL Migrations ─────────────────────────────────────────

const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS books (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    author      TEXT NOT NULL,
    tags        TEXT NOT NULL DEFAULT '[]',
    format      TEXT NOT NULL DEFAULT 'txt',
    source      TEXT NOT NULL DEFAULT 'upload',
    chunk_count INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    status      TEXT NOT NULL DEFAULT 'processing',
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS book_chunks (
    id              TEXT PRIMARY KEY,
    book_id         TEXT NOT NULL,
    content         TEXT NOT NULL,
    chapter         TEXT NOT NULL DEFAULT 'Introduction',
    chapter_index   INTEGER NOT NULL DEFAULT 0,
    chunk_index     INTEGER NOT NULL DEFAULT 0,
    token_count     INTEGER NOT NULL DEFAULT 0,
    start_offset    INTEGER NOT NULL DEFAULT 0,
    end_offset      INTEGER NOT NULL DEFAULT 0,
    embedding       TEXT NOT NULL DEFAULT '[]',
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_book_chunks_book ON book_chunks(book_id);
  CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
`;

// ── Book Store Class ────────────────────────────────────────

export class BookStore {
  private memoryStore: MemoryVectorStore;
  private embedderConfig: EmbedderConfig;
  private initialized = false;

  constructor(embedderConfig?: EmbedderConfig) {
    this.memoryStore = getMemoryStore();
    this.embedderConfig = embedderConfig ?? getEmbedderConfig();
  }

  /** Initialize the database tables. */
  async init(): Promise<void> {
    if (this.initialized) return;
    const db = getDb();
    db.exec(CREATE_TABLES_SQL);
    this.initialized = true;
  }

  /** Add a book to the store. */
  async addBook(meta: BookMeta, chunks: BookChunk[]): Promise<Book> {
    await this.init();
    const db = getDb();
    const bookId = chunks.length > 0 ? chunks[0].bookId : id("book");

    // Insert book metadata
    db.prepare(
      `INSERT INTO books (id, title, author, tags, format, source, chunk_count, total_tokens, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      bookId,
      meta.title,
      meta.author,
      JSON.stringify(meta.tags),
      meta.format,
      meta.source,
      chunks.length,
      chunks.reduce((sum, c) => sum + c.tokenCount, 0),
      "ready",
    );

    // Insert chunks
    const insertChunk = db.prepare(
      `INSERT INTO book_chunks (id, book_id, content, chapter, chapter_index, chunk_index, token_count, start_offset, end_offset, embedding)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    for (const chunk of chunks) {
      insertChunk.run(
        chunk.id,
        chunk.bookId,
        chunk.content,
        chunk.chapter,
        chunk.chapterIndex,
        chunk.chunkIndex,
        chunk.tokenCount,
        chunk.startOffset,
        chunk.endOffset,
        JSON.stringify(chunk.embedding),
      );

      // Also add to in-memory vector store for fast dev queries
      this.memoryStore.add({
        id: chunk.id,
        content: chunk.content,
        embedding: chunk.embedding,
        metadata: {
          bookId: chunk.bookId,
          chapter: chunk.chapter,
          chapterIndex: chunk.chapterIndex,
          chunkIndex: chunk.chunkIndex,
        },
      });
    }

    return {
      id: bookId,
      title: meta.title,
      author: meta.author,
      tags: meta.tags,
      format: meta.format,
      source: meta.source,
      chunkCount: chunks.length,
      totalTokens: chunks.reduce((sum, c) => sum + c.tokenCount, 0),
      status: "ready",
      createdAt: Date.now(),
    };
  }

  /** Get a book by ID. */
  getBook(bookId: string): Book | null {
    const db = getDb();
    const row = db.prepare("SELECT * FROM books WHERE id = ?").get(bookId) as Record<string, unknown> | undefined;
    if (!row) return null;

    return {
      id: row.id as string,
      title: row.title as string,
      author: row.author as string,
      tags: JSON.parse((row.tags as string) || "[]"),
      format: row.format as string,
      source: row.source as string,
      chunkCount: row.chunk_count as number,
      totalTokens: row.total_tokens as number,
      status: row.status as string,
      createdAt: row.created_at as number,
    };
  }

  /** List all books. */
  listBooks(): Book[] {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM books ORDER BY created_at DESC").all() as Record<string, unknown>[];
    return rows.map((row) => ({
      id: row.id as string,
      title: row.title as string,
      author: row.author as string,
      tags: JSON.parse((row.tags as string) || "[]"),
      format: row.format as string,
      source: row.source as string,
      chunkCount: row.chunk_count as number,
      totalTokens: row.total_tokens as number,
      status: row.status as string,
      createdAt: row.created_at as number,
    }));
  }

  /** Delete a book and all its chunks. */
  deleteBook(bookId: string): boolean {
    const db = getDb();
    db.prepare("DELETE FROM book_chunks WHERE book_id = ?").run(bookId);
    const result = db.prepare("DELETE FROM books WHERE id = ?").run(bookId);
    return (result as { changes: number }).changes > 0;
  }

  /** Search for relevant chunks using vector similarity. */
  async search(
    queryEmbedding: number[],
    options: {
      topK?: number;
      minScore?: number;
      bookFilter?: string[];
      tagFilter?: string[];
    } = {},
  ): Promise<BookSearchResult[]> {
    const { topK = 5, minScore = 0.3, bookFilter, tagFilter } = options;

    // Try in-memory store first (fast, always available)
    const memoryResults = this.memoryStore.search(queryEmbedding, topK * 3);

    // Enrich with book metadata from SQLite
    const results: BookSearchResult[] = [];
    const db = getDb();

    for (const result of memoryResults) {
      if (result.score < minScore) continue;

      const bookId = (result.metadata as { bookId: string }).bookId;
      if (bookFilter && !bookFilter.includes(bookId)) continue;

      const book = this.getBook(bookId);
      if (!book) continue;

      if (tagFilter && !tagFilter.some((t) => book.tags.includes(t))) continue;

      results.push({
        bookId,
        bookTitle: book.title,
        author: book.author,
        chapter: (result.metadata as { chapter: string }).chapter,
        chunkIndex: (result.metadata as { chunkIndex: number }).chunkIndex,
        content: result.content,
        score: result.score,
        tags: book.tags,
      });
    }

    return results.slice(0, topK);
  }

  /** Get chunks for a specific book (for context building). */
  getBookChunks(bookId: string, limit?: number): Array<{ content: string; chapter: string }> {
    const db = getDb();
    const query = limit
      ? db.prepare("SELECT content, chapter FROM book_chunks WHERE book_id = ? ORDER BY chunk_index LIMIT ?")
      : db.prepare("SELECT content, chapter FROM book_chunks WHERE book_id = ? ORDER BY chunk_index");
    const rows = limit ? query.all(bookId, limit) : query.all(bookId);
    return rows as Array<{ content: string; chapter: string }>;
  }

  /** Get total stats. */
  getStats(): { books: number; chunks: number; totalTokens: number } {
    const db = getDb();
    const bookCount = (db.prepare("SELECT COUNT(*) AS n FROM books").get() as { n: number }).n;
    const chunkCount = (db.prepare("SELECT COUNT(*) AS n FROM book_chunks").get() as { n: number }).n;
    const tokenSum = (db.prepare("SELECT COALESCE(SUM(total_tokens), 0) AS n FROM books").get() as { n: number }).n;
    return { books: bookCount, chunks: chunkCount, totalTokens: tokenSum };
  }

  /** Load all chunks from SQLite into the in-memory vector store. */
  async loadIntoMemory(): Promise<number> {
    const db = getDb();
    const chunks = db.prepare("SELECT * FROM book_chunks").all() as Record<string, unknown>[];

    this.memoryStore.clear();

    for (const chunk of chunks) {
      const embedding = JSON.parse((chunk.embedding as string) || "[]");
      if (embedding.length === 0) continue;

      this.memoryStore.add({
        id: chunk.id as string,
        content: chunk.content as string,
        embedding,
        metadata: {
          bookId: chunk.book_id as string,
          chapter: chunk.chapter as string,
          chapterIndex: chunk.chapter_index as number,
          chunkIndex: chunk.chunk_index as number,
        },
      });
    }

    return chunks.length;
  }
}

// ── Singleton ────────────────────────────────────────────────

let _store: BookStore | null = null;

export function getBookStore(config?: EmbedderConfig): BookStore {
  if (!_store) {
    _store = new BookStore(config);
  }
  return _store;
}
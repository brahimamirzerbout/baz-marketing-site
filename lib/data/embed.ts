// @ts-nocheck
/**
 * BAZventures — Embedding provider abstraction
 *
 * Supports:
 *   - Gemini gemini-embedding-001 (free tier, 1500 req/min)
 *   - OpenAI text-embedding-3-small ($0.02/1M tokens)
 *   - Ollama nomic-embed-text (local, free)
 *
 * Usage:
 *   const embedder = getEmbedder(); // auto-detect from env
 *   const vectors = await embedder.embed(["chunk 1", "chunk 2"]);
 *   // vectors[0] → number[] (768-dim for Gemini, 1536 for OpenAI, 768 for nomic)
 */

export type EmbeddingProvider = "gemini" | "openai" | "ollama";

export interface EmbedderConfig {
  provider: EmbeddingProvider;
  model: string;
  dimensions: number;
  apiKey?: string;
  baseUrl?: string;
}

export interface EmbedResult {
  embedding: number[];
  tokenCount: number;
}

const GEMINI_CONFIG: EmbedderConfig = {
  provider: "gemini",
  model: "gemini-embedding-001",
  dimensions: 3072,
};

const OPENAI_CONFIG: EmbedderConfig = {
  provider: "openai",
  model: "text-embedding-3-small",
  dimensions: 1536,
};

const OLLAMA_CONFIG: EmbedderConfig = {
  provider: "ollama",
  model: "nomic-embed-text",
  dimensions: 3072,
};

/**
 * Auto-detect which embedding provider to use based on env vars.
 * Priority: GEMINI_API_KEY > OPENAI_API_KEY > OLLAMA_HOST
 */
export function getEmbedderConfig(): EmbedderConfig {
  if (process.env.GEMINI_API_KEY) {
    return { ...GEMINI_CONFIG, apiKey: process.env.GEMINI_API_KEY };
  }
  if (process.env.OPENAI_API_KEY) {
    return { ...OPENAI_CONFIG, apiKey: process.env.OPENAI_API_KEY };
  }
  if (process.env.OLLAMA_HOST) {
    return { ...OLLAMA_CONFIG, baseUrl: process.env.OLLAMA_HOST };
  }
  // Fallback: Gemini without key (will fail but gives clear error)
  return GEMINI_CONFIG;
}

/**
 * Embed a single text string.
 */
export async function embed(text: string, config?: EmbedderConfig): Promise<number[]> {
  const results = await embedBatch([text], config);
  return results[0];
}

/**
 * Embed multiple texts in a batch. Returns array of embedding vectors.
 * Handles batching for provider limits (Gemini: 100/batch, OpenAI: 2048/batch).
 */
export async function embedBatch(
  texts: string[],
  config?: EmbedderConfig,
): Promise<number[][]> {
  const cfg = config ?? getEmbedderConfig();
  const batchSize = cfg.provider === "gemini" ? 100 : cfg.provider === "openai" ? 2048 : 50;

  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const embeddings = await callProvider(batch, cfg);
    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}

async function callProvider(texts: string[], cfg: EmbedderConfig): Promise<number[][]> {
  switch (cfg.provider) {
    case "gemini":
      return callGemini(texts, cfg);
    case "openai":
      return callOpenAI(texts, cfg);
    case "ollama":
      return callOllama(texts, cfg);
    default:
      throw new Error(`Unknown embedding provider: ${cfg.provider}`);
  }
}

async function callGemini(texts: string[], cfg: EmbedderConfig): Promise<number[][]> {
  // Use single embedContent calls instead of batch (more compatible with auth)
  const embeddings: number[][] = [];
  
  for (const text of texts) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cfg.model}:embedContent?key=${cfg.apiKey}`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${cfg.model}`,
        content: { parts: [{ text }] },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Gemini embedding failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = await res.json();
    if (data.embedding?.values) {
      embeddings.push(data.embedding.values);
    } else {
      throw new Error(`Gemini embedding returned unexpected format: ${JSON.stringify(data).slice(0, 200)}`);
    }
  }

  return embeddings;
}

async function callOpenAI(texts: string[], cfg: EmbedderConfig): Promise<number[][]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      input: texts,
      dimensions: cfg.dimensions,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI embedding failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  // Sort by index to maintain order
  const sorted = data.data.sort((a: { index: number }, b: { index: number }) => a.index - b.index);
  return sorted.map((d: { embedding: number[] }) => d.embedding);
}

async function callOllama(texts: string[], cfg: EmbedderConfig): Promise<number[][]> {
  const baseUrl = cfg.baseUrl || "http://localhost:11434";
  const embeddings: number[][] = [];

  // Ollama doesn't have a batch API, embed one at a time
  for (const text of texts) {
    const res = await fetch(`${baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: cfg.model, prompt: text }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Ollama embedding failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = await res.json();
    embeddings.push(data.embedding);
  }

  return embeddings;
}

/**
 * Compute cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error("Vectors must have same length");
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * In-memory vector store for development (no Supabase needed).
 * For production, use the Supabase pgvector store in book-store.ts.
 */
export interface MemoryVector {
  id: string;
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
}

export class MemoryVectorStore {
  private vectors: MemoryVector[] = [];

  add(items: MemoryVector | MemoryVector[]): void {
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item.embedding && item.embedding.length > 0) {
          this.vectors.push(item);
        }
      }
    } else if (items.embedding && items.embedding.length > 0) {
      this.vectors.push(items);
    }
  }

  search(queryEmbedding: number[], topK: number = 5): (MemoryVector & { score: number })[] {
    const scored = this.vectors.map((v) => ({
      ...v,
      score: cosineSimilarity(queryEmbedding, v.embedding),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  clear(): void {
    this.vectors = [];
  }

  get size(): number {
    return this.vectors.length;
  }
}

// Singleton for dev use
let _memoryStore: MemoryVectorStore | null = null;
export function getMemoryStore(): MemoryVectorStore {
  if (!_memoryStore) _memoryStore = new MemoryVectorStore();
  return _memoryStore;
}
/**
 * BAZ — Rate-limit store abstraction.
 *
 * The default implementation is an in-memory Map, which is fine for dev
 * and single-instance deployments. On Vercel serverless, replace this
 * with a Vercel KV / Upstash implementation to make limits global.
 *
 * See `lib/rate-limit.ts` for the consumer API.
 */

const memory = new Map<string, { count: number; resetAt: number }>();

export interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitStore {
  get(key: string): Bucket | undefined;
  set(key: string, value: Bucket): void;
  delete(key: string): void;
  prune(olderThan: number): void;
}

export class MemoryRateLimitStore implements RateLimitStore {
  get(key: string) {
    return memory.get(key);
  }
  set(key: string, value: Bucket) {
    memory.set(key, value);
  }
  delete(key: string) {
    memory.delete(key);
  }
  prune(olderThan: number) {
    for (const [k, v] of memory) {
      if (v.resetAt < olderThan) memory.delete(k);
    }
  }
}

let store: RateLimitStore = new MemoryRateLimitStore();

export function getRateLimitStore(): RateLimitStore {
  return store;
}

export function setRateLimitStore(next: RateLimitStore) {
  store = next;
}

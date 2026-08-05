/**
 * BAZ — Rate-limit store abstraction.
 *
 * Default: in-memory Map (dev / single-instance). On Vercel serverless set
 * UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN to auto-switch to a shared
 * Upstash Redis REST store — global limits across instances, fail-open on
 * outage (a store error degrades to "allow", same effective behaviour as the
 * per-instance memory store on Vercel).
 *
 * Store methods are async (network stores need to be). `rateLimit()` is async
 * to match; callers must `await` it. See `lib/rate-limit.ts`.
 */

const memory = new Map<string, Bucket>();

export interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitStore {
  get(key: string): Promise<Bucket | undefined>;
  set(key: string, value: Bucket): Promise<void>;
  delete(key: string): Promise<void>;
  prune(olderThan: number): Promise<void>;
}

export class MemoryRateLimitStore implements RateLimitStore {
  async get(key: string) {
    return memory.get(key);
  }
  async set(key: string, value: Bucket) {
    memory.set(key, value);
  }
  async delete(key: string) {
    memory.delete(key);
  }
  async prune(olderThan: number) {
    for (const [k, v] of memory) {
      if (v.resetAt < olderThan) memory.delete(k);
    }
  }
}

/**
 * Upstash Redis REST store (no extra dependency — uses the fetch API).
 * Auto-activates when UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set.
 *
 * Buckets are stored as JSON and auto-expire via `SET ... EX <ttl>` so prune is
 * a no-op (TTL handles eviction). Fail-open: any network/parse error returns
 * "no bucket" (get) or silently drops (set/delete), so the limiter degrades to
 * allow rather than 429'ing legitimate traffic when Upstash is unreachable.
 */
export class UpstashRateLimitStore implements RateLimitStore {
  private readonly base: string;
  private readonly token: string;

  constructor(base: string, token: string) {
    this.base = base.replace(/\/+$/, "");
    this.token = token;
  }

  /** Bounded request signal; falls back to no-timeout on runtimes without it. */
  private signal(ms: number): AbortSignal | undefined {
    const ctor = AbortSignal as unknown as { timeout?: (ms: number) => AbortSignal };
    return typeof ctor.timeout === "function" ? ctor.timeout(ms) : undefined;
  }

  private async cmd(args: Array<string | number>): Promise<unknown> {
    const res = await fetch(this.base, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      signal: this.signal(2000),
    });
    if (!res.ok) throw new Error(`upstash http ${res.status}`);
    const json = (await res.json()) as { result: unknown };
    return json.result;
  }

  async get(key: string): Promise<Bucket | undefined> {
    try {
      const result = await this.cmd(["GET", key]);
      if (result === null || result === undefined) return undefined;
      return JSON.parse(String(result)) as Bucket;
    } catch {
      return undefined; // fail-open
    }
  }

  async set(key: string, value: Bucket): Promise<void> {
    try {
      const ttl = Math.max(1, Math.ceil((value.resetAt - Date.now()) / 1000));
      await this.cmd(["SET", key, JSON.stringify(value), "EX", ttl]);
    } catch {
      /* fail-open: drop silently */
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cmd(["DEL", key]);
    } catch {
      /* noop */
    }
  }

  async prune(_olderThan: number): Promise<void> {
    /* no-op: keys auto-expire via SET ... EX */
  }
}

let store: RateLimitStore | null = null;
let override: RateLimitStore | null = null;

function resolveStore(): RateLimitStore {
  if (override) return override;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return new UpstashRateLimitStore(url, token);
  return new MemoryRateLimitStore();
}

export function getRateLimitStore(): RateLimitStore {
  if (!store) store = resolveStore();
  return store;
}

export function setRateLimitStore(next: RateLimitStore): void {
  override = next;
  store = next;
}
/**
 * BAZ — Rate limiter (pluggable, async store).
 *
 * Defaults to an in-memory store (single-process, per-instance on Vercel).
 * Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN to auto-switch to a
 * shared Upstash Redis store (global limits across instances, fail-open on
 * outage). `rateLimit()` is async — callers must `await` it.
 *
 * Consumer API (`rateLimit`, `rateLimitHeaders`, `rateLimitedResponse`)
 * is otherwise unchanged.
 */

import { NextResponse } from "next/server";
import { getRateLimitStore, MemoryRateLimitStore, type Bucket } from "./rate-limit-store";

interface RateLimitOpts {
  key: string;
  limit: number;
  windowMs: number;
  userId?: string;
}

export async function rateLimit(
  req: Request,
  opts: RateLimitOpts,
): Promise<{ ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number }> {
  if (process.env.NODE_ENV === "production") {
    const store = getRateLimitStore();
    if (store instanceof MemoryRateLimitStore) {
      // Surface the per-instance warning once per cold start on Vercel.
      if (!(globalThis as any).__baz_rate_limit_warned) {
        (globalThis as any).__baz_rate_limit_warned = true;
        console.error(
          "[baz:rate-limit] in-memory store is per-instance only. Set Vercel KV / Upstash Redis before public launch.",
        );
      }
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const k = `${opts.key}:${opts.userId ?? ip}`;
  const now = Date.now();
  const store = getRateLimitStore();
  let existing = await store.get(k);

  if (!existing || existing.resetAt < now) {
    const next: Bucket = { count: 1, resetAt: now + opts.windowMs };
    await store.set(k, next);
    await store.prune(now);
    return { ok: true, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }

  if (existing.count >= opts.limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  const next: Bucket = { ...existing, count: existing.count + 1 };
  await store.set(k, next);
  return { ok: true, remaining: opts.limit - next.count, resetAt: next.resetAt };
}

export function rateLimitHeaders(
  result: { ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number },
): HeadersInit {
  const headers: Record<string, string> = {};
  if (result.ok) {
    headers["X-RateLimit-Remaining"] = String(result.remaining);
    headers["X-RateLimit-Reset"] = String(Math.ceil(result.resetAt / 1000));
  } else {
    headers["Retry-After"] = String(result.retryAfter);
  }
  return headers;
}

export function rateLimitedResponse(result: { retryAfter: number }): NextResponse {
  return NextResponse.json(
    { ok: false, error: "rate_limited" },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
        "X-RateLimit-Reset": String(Math.ceil((Date.now() + result.retryAfter * 1000) / 1000)),
      },
    },
  );
}

export const DEFAULT_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "contact-form": { limit: 5, windowMs: 60_000 },
  "agent-run": { limit: 20, windowMs: 60_000 },
  "auth-login": { limit: 10, windowMs: 60_000 },
  "auth-register": { limit: 3, windowMs: 60_000 },
  "api-leads": { limit: 30, windowMs: 60_000 },
  "search": { limit: 60, windowMs: 60_000 },
  "feedback": { limit: 10, windowMs: 60_000 },
};

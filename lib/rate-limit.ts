import { NextResponse } from "next/server";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const PRUNE_INTERVAL = 5 * 60_000;
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
  }, PRUNE_INTERVAL).unref?.();
}

export interface RateLimitOpts {
  key: string;
  limit: number;
  windowMs: number;
}

export function rateLimit(
  req: Request,
  opts: RateLimitOpts,
): { ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const k = `${opts.key}:${ip}`;
  const now = Date.now();
  const existing = buckets.get(k);

  if (!existing || existing.resetAt < now) {
    buckets.set(k, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }

  if (existing.count >= opts.limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, remaining: opts.limit - existing.count, resetAt: existing.resetAt };
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

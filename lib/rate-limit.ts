/**
 * BAZ — Rate limiter (in-memory, single-process).
 *
 * ⚠️ STOPGAP ONLY. On Vercel serverless, each invocation may run on a
 * fresh instance with its own empty bucket map. Limits are therefore
 * per-instance, not global. An attacker can fan out requests across
 * many instances to bypass them.
 *
 * Migration plan: replace the `buckets` Map with Vercel KV / Upstash
 * Redis (a single shared store, ~1ms latency). Tracked in
 * docs/audits/2026-07-09-baz-site.md §2.1.
 *
 * Until then:
 *   - Keep limits generous enough that a per-instance bucket is still
 *     a real defense (e.g. 5/contact-form, 3/auth-register per minute).
 *   - Pass `userId` for authenticated routes so the bucket follows the
 *     user, not the IP (which is trivially spoofable behind Vercel's
 *     proxy).
 *   - The cold-start error log below is the only signal that this
 *     limiter is doing partial work. Watch for it in the prod logs.
 */
import { NextResponse } from "next/server";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Cold-start de-dupe for the rate-limit warning. We want one loud
// log per process, not one per request.
let warnedAboutInMemory = false;

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
  /**
   * Stable identifier for the caller. When provided, the bucket is keyed
   * on `(key, userId)` instead of `(key, IP)`. Use the authenticated
   * `user.id` for any route that has a session; leave undefined for
   * pre-auth routes (login, register, contact form) where the IP is
   * the best signal we have.
   */
  userId?: string;
}

export function rateLimit(
  req: Request,
  opts: RateLimitOpts,
): { ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number } {
  if (process.env.NODE_ENV === "production" && !warnedAboutInMemory) {
    warnedAboutInMemory = true;
    // console.error so Vercel surfaces it; logged once per cold start.
    console.error(
      "[baz:rate-limit] in-memory store is per-Vercel-instance only. Migrate to Vercel KV / Upstash before public launch. See docs/audits/2026-07-09-baz-site.md §2.1.",
    );
  }
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const k = `${opts.key}:${opts.userId ?? ip}`;
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

/**
 * POST /api/data/sync — Trigger data pipeline sync
 * GET  /api/data/sync — Get pipeline status
 */

import { NextRequest, NextResponse } from "next/server";
import { runDataPipeline, getSourceStatus, type DataSource } from "@/lib/data/pipeline";
import { readSessionFromCookies } from "@/lib/auth";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/data/sync — Get source status */
export async function GET() {
  const status = getSourceStatus();
  return NextResponse.json({ ok: true, sources: status });
}

/** POST /api/data/sync — Trigger sync for specified sources */
export async function POST(req: NextRequest) {
  // Auth check
  const { user } = await readSessionFromCookies();
  if (!user || (user.role !== "owner" && user.role !== "admin")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const guard = await rateLimit(req, { key: "data-sync", limit: 10, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  let body: { sources?: DataSource[] } = {};
  try {
    body = await req.json();
  } catch {
    // Empty body = sync all configured sources
  }

  const sources = body.sources ?? ["google", "resend", "stripe"];
  const results = await runDataPipeline(sources);

  return NextResponse.json({
    ok: true,
    results,
    timestamp: new Date().toISOString(),
  });
}
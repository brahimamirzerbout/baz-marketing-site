/**
 * GET /api/data/metrics — Get aggregated metrics
 *
 * Query params: ?metric=sessions&source=google&from=2024-01-01&to=2024-12-31
 */

import { NextRequest, NextResponse } from "next/server";
import { getMetrics } from "@/lib/data/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const metric = url.searchParams.get("metric") || undefined;
  const source = url.searchParams.get("source") || undefined;
  const from = url.searchParams.get("from") || undefined;
  const to = url.searchParams.get("to") || undefined;

  try {
    const metrics = getMetrics({ metric, source, from, to });
    return NextResponse.json({ ok: true, metrics, count: metrics.length });
  } catch (err) {
    console.error("[data:metrics]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
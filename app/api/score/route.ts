import { NextRequest, NextResponse } from "next/server";
import { scoreLead, buildRoutingPlan, type ScoreInput } from "@/lib/scoring";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/score — score a lead in real-time without persisting.
 * Used by the LiveAgentDemo to show the user their score as they fill the form.
 *
 * Body: ScoreInput
 * Returns: { score, intent, reasons, recommendedAction, plan }
 */
export async function POST(req: NextRequest) {
  const guard = rateLimit(req, { key: "score-preview", limit: 60, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  let body: ScoreInput = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const result = scoreLead(body);
  const plan = buildRoutingPlan(result);
  return NextResponse.json({ ok: true, ...result, plan });
}

/**
 * GET /api/score — status check.
 * The inspector and uptime probes use GET to verify the route exists.
 * Scoring itself is POST-only to avoid accidental cache hits.
 */
export async function GET() {
  return NextResponse.json({ ok: true, method: "POST" });
}

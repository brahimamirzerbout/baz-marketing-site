import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { createBattleCardLead, generateBattleCardHtml, sendBattleCard } from "@/lib/battle-cards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/battle-cards
 * Body: { email, competitor, name, company }
 *
 * 1. Rate limits
 * 2. Validates input
 * 3. Stores lead with source="battle_card"
 * 4. Generates HTML battle card
 * 5. Sends (logs in dev, Resend in prod)
 * 6. Returns { ok: true }
 */
export async function POST(req: NextRequest) {
  const guard = rateLimit(req, {
    key: "battle-card-request",
    limit: 5,
    windowMs: 60_000,
  });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ ok: false, error: "empty_body" }, { status: 400 });

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim().toLowerCase();
  const company = (body.company || "").toString().trim();
  const competitor = (body.competitor || "").toString().trim();

  if (!name) return NextResponse.json({ ok: false, error: "missing_name" }, { status: 400 });
  if (!email) return NextResponse.json({ ok: false, error: "missing_email" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (!competitor) return NextResponse.json({ ok: false, error: "missing_competitor" }, { status: 400 });

  try {
    const leadId = await createBattleCardLead({ email, competitor, name, company });

    const html = await generateBattleCardHtml(competitor, name);
    const htmlBuffer = Buffer.from(html, "utf-8");

    await sendBattleCard(email, competitor, htmlBuffer);

    return NextResponse.json({ ok: true, message: "Battle card sent", leadId });
  } catch (err) {
    console.error("[battle-cards] Error processing request:", err);
    return NextResponse.json(
      { ok: false, error: "generation_failed" },
      { status: 500 },
    );
  }
}

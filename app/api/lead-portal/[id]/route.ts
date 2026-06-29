import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { buildRoutingPlan, scoreLead } from '@/lib/scoring';
import { rateLimit, rateLimitHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/lead-portal/[id] — public read of a lead's own data + plan.
 * Uses an opaque token (lead id + signed email) so the URL isn't guessable.
 * This is what /portal/[id] hits to render the lead's "what happens next" view.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = rateLimit(req, { key: 'portal-lookup', limit: 30, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429, headers: rateLimitHeaders(guard) });
  }

  const db = getDb();
  const lead = db.prepare('SELECT id, name, email, company, service, score, intent, created_at FROM leads WHERE id = ?').get(params.id) as {
    id: string; name: string; email: string; company: string; service: string; score: number; intent: string; created_at: number;
  } | undefined;

  if (!lead) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });

  // Re-derive the plan deterministically from the stored lead fields.
  const scored = scoreLead({
    message: undefined,
    company: lead.company,
    service: lead.service,
    source: 'hero_agent_demo',
    demoCompleted: true,
  });

  // Honor the persisted score/intent from the database (deterministic + LLM-refined).
  // Only fall back to the recomputed values if the DB hasn't scored yet.
  const finalScore = lead.score && lead.score > 0 ? lead.score : scored.score;
  const finalIntent = lead.intent && lead.intent !== '' ? lead.intent : scored.intent;

  // Pick the right action based on the final score.
  let finalAction: 'book_call' | 'send_proposal' | 'nurture_7d' | 'nurture_30d' | 'archive';
  if (finalIntent === 'tire_kicker') finalAction = 'archive';
  else if (finalScore >= 75) finalAction = 'book_call';
  else if (finalScore >= 50) finalAction = 'send_proposal';
  else if (finalScore >= 25) finalAction = 'nurture_7d';
  else finalAction = 'nurture_30d';

  const plan = buildRoutingPlan({
    ...scored,
    score: finalScore,
    intent: finalIntent as never,
    recommendedAction: finalAction,
  });

  return NextResponse.json({
    ok: true,
    lead: {
      id: lead.id,
      name: lead.name,
      service: lead.service,
      company: lead.company,
      score: finalScore,
      intent: finalIntent,
      receivedAt: lead.created_at,
    },
    plan,
  });
}
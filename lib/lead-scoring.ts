/**
 * BAZ Lead Scoring Model
 *
 * This is the PUBLIC version of our lead scoring formula.
 * The actual implementation lives in the Marketing Hub at:
 *   src/lib/triangle.ts → scoreContact()
 *
 * Score = clamp(
 *   30 * recency_decay          // 0..30  (decays over 30 days)
 * +  5  * unique_channels        // 0..20  (paid + organic + email + sales + referral)
 * +  2  * total_touches          // 0..20
 * + 10 * sales_touches          // 0..20
 * + engagement_pts              // 0..10  (opens + clicks + replies)
 * , 0, 100)
 *
 * Scoring thresholds:
 *   0–30  → Cold    → nurture sequence, no sales call
 *   31–60 → Warm    → 30-minute audit call, weekly nurture
 *   61–85 → Hot     → immediate senior partner outreach
 *   86–100 → Urgent  → same-day call, priority routing
 *
 * Intent signals by action:
 *   +3  → visited pricing page
 *   +5  → submitted contact form
 *   +8  → booked a call
 *   +10 → ran the AI agent demo
 *   +2  → opened nurture email
 *   +4  → clicked nurture email CTA
 *   +7  → replied to nurture email
 *   +15 → visited /vs-others page
 *   +5  → visited /methodology page
 *   +3  → visited case studies
 *
 * Source: src/lib/triangle.ts
 */

export type LeadTier = "cold" | "warm" | "hot" | "urgent";

export interface LeadScore {
  score: number;
  tier: LeadTier;
  action: string;
  routing: string;
  reason: string;
}

export function classifyLead(score: number): LeadScore {
  if (score >= 86) {
    return {
      score,
      tier: "urgent",
      action: "same_day_call",
      routing: "senior_partner_direct",
      reason: "High-intent signals detected. Book same-day call with senior partner.",
    };
  }
  if (score >= 61) {
    return {
      score,
      tier: "hot",
      action: "immediate_outreach",
      routing: "senior_partner",
      reason: "Strong intent. Reach out within 4 business hours.",
    };
  }
  if (score >= 31) {
    return {
      score,
      tier: "warm",
      action: "audit_call",
      routing: "nurture_then_call",
      reason: "Moderate intent. Book a 30-minute audit call. Weekly nurture.",
    };
  }
  return {
    score,
    tier: "cold",
    action: "nurture_only",
    routing: "nurture_sequence",
    reason: "Low intent. Add to 21-day nurture sequence. No outbound call yet.",
  };
}

export const intentSignals: Record<string, number> = {
  "/pricing": 3,
  "/contact": 5,
  "/book": 8,
  "/marketing-hub": 5,
  "/vs-others": 15,
  "/methodology": 5,
  "/case-studies": 3,
  "/services/*": 4,
  "email_opened": 2,
  "email_clicked": 4,
  "email_replied": 7,
  "agent_demo_run": 10,
};

/**
 * Calculate intent score from page visits + email engagement.
 * This is a simplified client-side version. The full model
 * runs server-side in the Marketing Hub with recency decay.
 */
export function calculateIntentScore(actions: Array<{ action: string; timestamp: number }>): number {
  const now = Date.now();
  let score = 0;

  for (const { action, timestamp } of actions) {
    const daysAgo = (now - timestamp) / (1000 * 60 * 60 * 24);
    const recencyDecay = Math.max(0, 1 - daysAgo / 30); // Decays over 30 days
    const signalWeight = intentSignals[action] || 1;
    score += signalWeight * recencyDecay;
  }

  return Math.min(100, Math.round(score));
}
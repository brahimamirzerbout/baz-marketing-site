/**
 * BAZ Conversion Tracking Events
 *
 * Every significant user action on the marketing site should fire
 * a tracked event. These events feed into:
 *   1. The Marketing Hub lead scoring model (src/lib/lead-scoring.ts)
 *   2. GA4 / Google Ads conversion tracking
 *   3. Meta CAPI / TikTok Events API
 *   4. The nurture sequence trigger (content/campaigns/nurture-sequence.ts)
 *
 * PRIORITY TIERS:
 *   🔴 Critical (must track): form_submit, book_call, agent_demo_run
 *   🟡 Important (should track): page_view_pricing, page_view_vs_others, page_view_methodology
 *   🟢 Nice-to-have: scroll_75_pct, time_on_page_60s, email_open, email_click
 *
 * IMPLEMENTATION:
 *   - Client-side: call track() from @/lib/analytics
 *   - Server-side: POST to /api/triangle/score with the action
 *   - Both: fire gtag('event', ...) and fbq('track', ...) if pixels are loaded
 *
 * REFERENCE: src/lib/analytics.ts (existing track() function)
 */

export interface ConversionEvent {
  name: string;
  category: "conversion" | "engagement" | "navigation";
  priority: "critical" | "important" | "nice";
  description: string;
  parameters: Record<string, string>;
  triggers_nurture: boolean;
  intent_score_delta: number;
}

export const conversionEvents: ConversionEvent[] = [
  // ─── CRITICAL CONVERSIONS ───
  {
    name: "form_submit",
    category: "conversion",
    priority: "critical",
    description: "Contact form submitted. Lead created.",
    parameters: { source: "", service: "", budget_range: "" },
    triggers_nurture: true,
    intent_score_delta: 5,
  },
  {
    name: "book_call",
    category: "conversion",
    priority: "critical",
    description: "Growth call booked via Cal.com or email.",
    parameters: { source: "", utm_source: "" },
    triggers_nurture: true,
    intent_score_delta: 8,
  },
  {
    name: "agent_demo_run",
    category: "conversion",
    priority: "critical",
    description: "Live agent demo executed on homepage.",
    parameters: { agent: "", prompt_length: "", result_ms: "" },
    triggers_nurture: true,
    intent_score_delta: 10,
  },
  {
    name: "email_capture",
    category: "conversion",
    priority: "critical",
    description: "Newsletter signup or email captured.",
    parameters: { source: "" },
    triggers_nurture: true,
    intent_score_delta: 2,
  },

  // ─── IMPORTANT ENGAGEMENTS ───
  {
    name: "page_view_pricing",
    category: "engagement",
    priority: "important",
    description: "Visitor viewed the pricing page.",
    parameters: { time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 3,
  },
  {
    name: "page_view_vs_others",
    category: "engagement",
    priority: "important",
    description: "Visitor viewed the vs-others comparison page.",
    parameters: { time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 15,
  },
  {
    name: "page_view_methodology",
    category: "engagement",
    priority: "important",
    description: "Visitor viewed the methodology page.",
    parameters: { time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 5,
  },
  {
    name: "page_view_case_study",
    category: "engagement",
    priority: "important",
    description: "Visitor viewed a case study detail page.",
    parameters: { slug: "", time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 3,
  },
  {
    name: "page_view_service",
    category: "engagement",
    priority: "important",
    description: "Visitor viewed a service detail page.",
    parameters: { slug: "", time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 4,
  },

  // ─── NICE-TO-HAVE ───
  {
    name: "scroll_75_pct",
    category: "engagement",
    priority: "nice",
    description: "Visitor scrolled past 75% of a page.",
    parameters: { page: "" },
    triggers_nurture: false,
    intent_score_delta: 1,
  },
  {
    name: "time_on_page_60s",
    category: "engagement",
    priority: "nice",
    description: "Visitor spent 60+ seconds on a page.",
    parameters: { page: "", time_spent_seconds: "" },
    triggers_nurture: false,
    intent_score_delta: 1,
  },
  {
    name: "email_open",
    category: "engagement",
    priority: "nice",
    description: "Nurture email opened.",
    parameters: { email_day: "" },
    triggers_nurture: false,
    intent_score_delta: 2,
  },
  {
    name: "email_click",
    category: "engagement",
    priority: "nice",
    description: "Nurture email CTA clicked.",
    parameters: { email_day: "", cta: "" },
    triggers_nurture: false,
    intent_score_delta: 4,
  },
  {
    name: "email_reply",
    category: "engagement",
    priority: "nice",
    description: "Lead replied to a nurture email.",
    parameters: { email_day: "" },
    triggers_nurture: false,
    intent_score_delta: 7,
  },
];

/**
 * Get the intent score delta for a given event name.
 */
export function getIntentDelta(eventName: string): number {
  const event = conversionEvents.find(e => e.name === eventName);
  return event?.intent_score_delta ?? 0;
}

/**
 * Check if an event should trigger the nurture sequence.
 */
export function shouldTriggerNurture(eventName: string): boolean {
  const event = conversionEvents.find(e => e.name === eventName);
  return event?.triggers_nurture ?? false;
}
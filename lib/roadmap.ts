/**
 * $100M Scaling Roadmap generator — the BAZ answer to Acquisition.com/roadmap.
 *
 * Takes a founder's answers (industry, stage, revenue, bottleneck, goal) and
 * produces a personalized 90-day scaling roadmap. AI-first via `lib/llm`
 * (multi-provider), with a deterministic offline fallback built on the
 * Hormozi scaling framework so it works with no API key — the same framework
 * the hub's hormoziAudit lens uses.
 *
 * Doctrine: revenue, not vanity. 90-day plans with named owners, budgets,
 * and exit criteria. Diagnose the bottleneck first — you grow at the speed
 * of your bottleneck, not the speed of your best channel.
 */

import { complete } from "@/lib/llm";

export type Bottleneck =
  | "lead_flow"
  | "conversion"
  | "aov"
  | "retention"
  | "offer"
  | "tracking"
  | "not_sure";

export type Stage = "pre_launch" | "early" | "growth" | "scale";

export type Industry =
  | "b2b_saas"
  | "dtc_ecommerce"
  | "fintech"
  | "hospitality"
  | "ai_devtools"
  | "professional_services"
  | "other";

export interface RoadmapAnswers {
  name: string;
  email: string;
  company?: string;
  website?: string;
  industry: Industry;
  stage: Stage;
  monthlyRevenue?: string;
  bottleneck: Bottleneck;
  goal: string;
}

export interface DayPhase {
  window: string;
  focus: string;
  owner: string;
  budget: string;
  exitCriteria: string;
}

export interface ScalingRoadmap {
  diagnosis: string;
  primaryLever: string;
  offerMove: string;
  channels: string[];
  ninetyDayPlan: DayPhase[];
  kpis: { metric: string; target: string }[];
  recommendedTier: "Project" | "Core" | "Growth";
  nextAction: string;
  source: "ai" | "offline";
}

const SYSTEM = `You are a senior growth partner at a boutique marketing agency, applying the Hormozi scaling framework.
You diagnose the single bottleneck capping a business's growth, then prescribe a 90-day plan.
You grow at the speed of your bottleneck, not the speed of your best channel.
Every plan has named owners, a budget, and a revenue exit criterion — never vanity KPIs.
Return ONLY valid JSON matching the given schema. No prose outside the JSON.`;

export async function generateRoadmap(answers: RoadmapAnswers): Promise<ScalingRoadmap> {
  const offline = offlineRoadmap(answers);
  const res = await complete({
    system: SYSTEM,
    prompt: buildPrompt(answers),
    maxTokens: 900,
    temperature: 0.4,
  });
  if (!res.ok || !res.text) return { ...offline, source: "offline" };
  const parsed = parseRoadmap(res.text, offline);
  return { ...parsed, source: "ai" };
}

function buildPrompt(a: RoadmapAnswers): string {
  return `Produce a personalized 90-day scaling roadmap for this founder. Return ONLY JSON with this exact shape:
{
  "diagnosis": "string — the one bottleneck capping growth, why",
  "primaryLever": "string — which of: get more customers | charge more | sell more often | keep them longer",
  "offerMove": "string — the single highest-leverage offer adjustment",
  "channels": ["string", "string", "string"],
  "ninetyDayPlan": [
    {"window":"Days 1–30","focus":"string","owner":"string","budget":"string","exitCriteria":"string"},
    {"window":"Days 31–60","focus":"string","owner":"string","budget":"string","exitCriteria":"string"},
    {"window":"Days 61–90","focus":"string","owner":"string","budget":"string","exitCriteria":"string"}
  ],
  "kpis": [{"metric":"string","target":"string"},{"metric":"string","target":"string"},{"metric":"string","target":"string"}],
  "recommendedTier": "Project" | "Core" | "Growth",
  "nextAction": "string"
}

Founder answers:
- Industry: ${a.industry}
- Stage: ${a.stage}
- Monthly revenue: ${a.monthlyRevenue ?? "unstated"}
- Self-identified bottleneck: ${a.bottleneck}
- Goal: ${a.goal}
- Company: ${a.company ?? "unstated"} (${a.website ?? "no website"})

Tiers: Project $12–80k fixed (4–14 weeks); Core $6.5–9.5k/mo (one channel, 90-day min); Growth $18–28k/mo (full integrated stack).`;
}

// ── Deterministic offline fallback (Hormozi framework) ──

const LEVER_BY_BOTTLENECK: Record<Bottleneck, string> = {
  lead_flow: "Get more customers",
  conversion: "Get more customers",
  aov: "Charge more",
  retention: "Keep them longer",
  offer: "Charge more",
  tracking: "Get more customers",
  not_sure: "Get more customers",
};

const TIER_BY_STAGE: Record<Stage, "Project" | "Core" | "Growth"> = {
  pre_launch: "Project",
  early: "Project",
  growth: "Core",
  scale: "Growth",
};

function diagnosisText(a: RoadmapAnswers): string {
  const ind = a.industry.replace(/_/g, " ");
  switch (a.bottleneck) {
    case "lead_flow":
      return `Your growth is capped at the top of the funnel — ${ind} demand exists, but not enough qualified prospects enter the pipeline. Fixing conversion or retention first would only optimise a slow trickle. The bottleneck is lead flow.`;
    case "conversion":
      return `Leads arrive but don't close. You're paying for traffic that never converts — every channel looks worse than it is. The bottleneck is conversion rate, not lead volume.`;
    case "aov":
      return `You convert, but each sale is too small to fund acquisition. Raising AOV is the cheapest growth you have — it lifts every channel's economics at once.`;
    case "retention":
      return `You acquire faster than you retain — a leaky bucket. Until retention is fixed, scaling acquisition just scales the bleed. The bottleneck is LTV/retention.`;
    case "offer":
      return `The offer isn't irresistible relative to the price. No amount of traffic fixes a weak offer; strengthening it lifts every metric downstream.`;
    case "tracking":
      return `You can't see what's working. Decisions are guesses, budget allocation is faith-based. Instrumenting attribution is the prerequisite to every other lever.`;
    case "not_sure":
    default:
      return `Before scaling any channel, the bottleneck must be named. Most ${ind} businesses at your stage are capped by either lead flow or conversion — a 20-minute diagnostic pins it. Until then, spend is a bet, not a system.`;
  }
}

function offerMove(a: RoadmapAnswers): string {
  switch (a.bottleneck) {
    case "aov":
      return "Build a value ladder: keep the entry offer, add a higher-tier bundle and a done-with-you tier so the same buyer can spend 2–3× more.";
    case "retention":
      return "Add a risk-reversed onboarding + 30-day outcome checkpoint; shift the offer from 'service' to 'guaranteed outcome with a money-back milestone.'";
    case "offer":
      return "Reframe the offer around a single measurable outcome the buyer wants, add a guarantee, and remove the risk of saying yes.";
    case "conversion":
      return "Tighten the sales page to one promise, one mechanism, one proof stack, one CTA — and add a low-friction 'next yes' before the big ask.";
    default:
      return "Sharpen the offer to one audience, one outcome, one timeframe — then make the pricing structure (project vs retainer) match the buyer's stage.";
  }
}

function channelsFor(a: RoadmapAnswers): string[] {
  const base: Record<Industry, string[]> = {
    b2b_saas: ["Outbound + LinkedIn (senior-led)", "Programmatic SEO (long-tail + comparison)", "Partner/co-marketing"],
    dtc_ecommerce: ["Paid social (creative-led)", "Email/SMS lifecycle", "Influencer/UGC"],
    fintech: ["Compliance-safe paid + content", "Programmatic SEO (trust queries)", "Partnership distribution"],
    hospitality: ["Paid (metasearch + social)", "Direct-channel SEO + OTA defence", "Email lifecycle"],
    ai_devtools: ["Developer-content SEO + docs", "Community (GitHub/Discord)", "Paid on dev platforms"],
    professional_services: ["Local + vertical SEO", "Referral systemisation", "Thought-leadership content"],
    other: ["Programmatic SEO", "Outbound (senior-led)", "Email lifecycle"],
  };
  return base[a.industry] ?? base.other;
}

export function offlineRoadmap(a: RoadmapAnswers): ScalingRoadmap {
  const lever = LEVER_BY_BOTTLENECK[a.bottleneck];
  const tier = TIER_BY_STAGE[a.stage];
  const ch = channelsFor(a);
  const primaryChannel = ch[0] ?? "Outbound (senior-led)";
  const secondChannel = ch[1] ?? "Email lifecycle";
  return {
    diagnosis: diagnosisText(a),
    primaryLever: lever,
    offerMove: offerMove(a),
    channels: channelsFor(a),
    ninetyDayPlan: [
      {
        window: "Days 1–30",
        focus: `Diagnose + instrument: name the bottleneck (${a.bottleneck}), set server-side tracking (GTM/GA4/CAPI), baseline the ${lever.toLowerCase()} metric.`,
        owner: "BAZ senior partner (strategy)",
        budget: tier === "Growth" ? "$4–6k" : tier === "Core" ? "$2–3k" : "$2–4k",
        exitCriteria: `Baseline + bottleneck confirmed; tracking live; ${lever} target set for day 90.`,
      },
      {
        window: "Days 31–60",
        focus: `Ship the offer move (${(offerMove(a).split(".")[0] ?? "the offer move").toLowerCase()}) and launch the primary channel (${primaryChannel}).`,
        owner: "BAZ senior partner (acquisition) + client point-person",
        budget: tier === "Growth" ? "$8–12k" : tier === "Core" ? "$3–5k" : "$4–8k",
        exitCriteria: `Primary channel live with spend; offer v2 in market; first qualified pipeline attributable to the new motion.`,
      },
      {
        window: "Days 61–90",
        focus: `Scale what worked, cut what didn't. Layer the second channel (${secondChannel}) and lock the 90-day readout.`,
        owner: "BAZ senior partner (growth) + client exec",
        budget: tier === "Growth" ? "$10–15k" : tier === "Core" ? "$4–6k" : "$5–10k",
        exitCriteria: `${lever} up vs day-30 baseline; CAC and payback published; next-quarter plan with named owners and budget.`,
      },
    ],
    kpis: kpisFor(a),
    recommendedTier: tier,
    nextAction: "Book a 20-minute growth call — a senior partner will pressure-test the bottleneck and confirm whether BAZ is the right fit. If not, we say so in the first 10 minutes.",
    source: "offline",
  };
}

function kpisFor(a: RoadmapAnswers): { metric: string; target: string }[] {
  switch (a.bottleneck) {
    case "lead_flow":
      return [
        { metric: "Qualified pipeline/mo", target: "+40–60% vs baseline" },
        { metric: "Cost per qualified lead", target: "−25%" },
        { metric: "Marketing-sourced ARR", target: "+30%" },
      ];
    case "conversion":
      return [
        { metric: "Lead→close rate", target: "+30–50%" },
        { metric: "Sales-cycle days", target: "−20%" },
        { metric: "Win rate on qualified demos", target: "+15pts" },
      ];
    case "aov":
      return [
        { metric: "Average order value", target: "+30–60%" },
        { metric: "% revenue from top tier", target: "+15pts" },
        { metric: "Blended CAC payback", target: "−1 mo" },
      ];
    case "retention":
      return [
        { metric: "90-day retention / LTV", target: "+25%" },
        { metric: "Net revenue retention", target: ">110%" },
        { metric: "Churn", target: "−30%" },
      ];
    case "offer":
      return [
        { metric: "Offer conversion rate", target: "+25%" },
        { metric: "Refund/chargeback rate", target: "−40%" },
        { metric: "Reply/booked-call rate", target: "+20%" },
      ];
    case "tracking":
      return [
        { metric: "Attributed revenue share", target: ">85%" },
        { metric: "Decisions backed by data", target: "100% post-baseline" },
        { metric: "MMM vs last-click variance", target: "<15%" },
      ];
    default:
      return [
        { metric: "Named bottleneck", target: "confirmed by day 30" },
        { metric: "Primary growth lever", target: "agreed + baselined" },
        { metric: "90-day revenue move", target: "targeted vs baseline" },
      ];
  }
}

// ── JSON parsing (tolerant) ──

function parseRoadmap(raw: string, fallback: ScalingRoadmap): ScalingRoadmap {
  const cleaned = raw.replace(/```json|```/gi, "").trim();
  let obj: Record<string, unknown> | null = null;
  try {
    obj = JSON.parse(cleaned);
  } catch {
    const s = cleaned.indexOf("{");
    const e = cleaned.lastIndexOf("}");
    if (s !== -1 && e > s) {
      try {
        obj = JSON.parse(cleaned.slice(s, e + 1));
      } catch {
        obj = null;
      }
    }
  }
  if (!obj) return fallback;
  const str = (k: string): string | undefined => (typeof obj![k] === "string" ? obj![k] as string : undefined);
  const arr = (k: string): unknown[] | undefined => (Array.isArray(obj![k]) ? obj![k] as unknown[] : undefined);
  const tier = str("recommendedTier");
  const validTiers = ["Project", "Core", "Growth"];

  return {
    diagnosis: str("diagnosis") ?? fallback.diagnosis,
    primaryLever: str("primaryLever") ?? fallback.primaryLever,
    offerMove: str("offerMove") ?? fallback.offerMove,
    channels: arr("channels")?.filter((x): x is string => typeof x === "string") ?? fallback.channels,
    ninetyDayPlan: parsePhases(arr("ninetyDayPlan"), fallback.ninetyDayPlan),
    kpis: parseKpis(arr("kpis"), fallback.kpis),
    recommendedTier: tier && validTiers.includes(tier) ? (tier as ScalingRoadmap["recommendedTier"]) : fallback.recommendedTier,
    nextAction: str("nextAction") ?? fallback.nextAction,
    source: "ai",
  };
}

function parsePhases(raw: unknown[] | undefined, fallback: DayPhase[]): DayPhase[] {
  if (!raw || raw.length === 0) return fallback;
  const phases = raw.map((p, i): DayPhase => {
    const o = (p && typeof p === "object" ? p : {}) as Record<string, unknown>;
    const fb = fallback[i];
    return {
      window: typeof o.window === "string" ? o.window : fb?.window ?? `Phase ${i + 1}`,
      focus: typeof o.focus === "string" ? o.focus : fb?.focus ?? "",
      owner: typeof o.owner === "string" ? o.owner : fb?.owner ?? "BAZ senior partner",
      budget: typeof o.budget === "string" ? o.budget : fb?.budget ?? "",
      exitCriteria: typeof o.exitCriteria === "string" ? o.exitCriteria : fb?.exitCriteria ?? "",
    };
  });
  return phases.length === 3 ? phases : fallback;
}

function parseKpis(raw: unknown[] | undefined, fallback: { metric: string; target: string }[]): { metric: string; target: string }[] {
  if (!raw || raw.length === 0) return fallback;
  const kpis = raw
    .filter((x): x is Record<string, unknown> => Boolean(x) && typeof x === "object")
    .map((o) => ({ metric: String(o.metric ?? ""), target: String(o.target ?? "") }));
  return kpis.length > 0 ? kpis : fallback;
}
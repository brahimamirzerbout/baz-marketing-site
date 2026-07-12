import type { Service } from "@/types";
import { services } from "./services";

export type Competitor = {
  slug: string;
  name: string;
  category: "agency" | "platform" | "in-house";
  tagline: string;
  description: string;
  pricing: { model: string; range: string; note: string };
  bestFor: string[];
  limits: string[];
  comparison: {
    service: Service;
    whyBAZWins: string;
    keyDifferentiator: string;
  }[];
};

export const competitors: Competitor[] = [
  {
    slug: "traditional-agencies",
    name: "Traditional agencies",
    category: "agency",
    tagline: "Headcount as a moat.",
    description:
      "Scale by hiring juniors, multiplying hand-offs, and re-briefing until the original intent dissolves. The people who pitch you are rarely the people shipping your work.",
    pricing: {
      model: "Retainer + overages",
      range: "$5K–$50K / mo",
      note: "Often requires minimum 6-month commitment with setup fees.",
    },
    bestFor: [
      "Brand awareness campaigns",
      "High-volume execution",
      "Multi-market localisation",
    ],
    limits: [
      "Senior attention is diluted across 20+ accounts",
      "Account-manager layer slows decisions",
      "Quality varies by who is staffed that week",
    ],
    comparison: services.slice(0, 6).map((service) => ({
      service,
      whyBAZWins:
        `For ${service.name}, the partner who scopes is the partner who ships. No junior learning curve, no re-brief cycles.`,
      keyDifferentiator:
        "Senior-only team with no translation layer between strategy and execution.",
    })),
  },
  {
    slug: "in-house-team",
    name: "In-house growth team",
    category: "in-house",
    tagline: "Context without repetition.",
    description:
      "Maximum ownership, maximum cost. A full growth function costs $600K+ annually before a single campaign runs, and the team sees only one funnel — yours.",
    pricing: {
      model: "Salary + benefits + tools",
      range: "$600K–$1.2M / yr",
      note: "Recruiting, onboarding, and management overhead not included.",
    },
    bestFor: [
      "Late-stage companies with stable funnel math",
      "Highly regulated industries needing tight control",
      "Teams with enough volume to keep every specialist busy",
    ],
    limits: [
      "Expensive before the model is proven",
      "Narrow pattern library — only sees one brand",
      "Hard to fire without cultural damage",
    ],
    comparison: services.slice(0, 6).map((service) => ({
      service,
      whyBAZWins:
        `An in-house team rarely has the reps to optimise ${service.name} across industries. We bring 60+ brand patterns to every engagement.`,
      keyDifferentiator:
        "Cross-industry pattern recognition that only a senior agency accumulates.",
    })),
  },
  {
    slug: "hubspot-only",
    name: "HubSpot-only stack",
    category: "platform",
    tagline: "A database pretending to be strategy.",
    description:
      "HubSpot is competent infrastructure. The mistake is treating the subscription as the strategy. A clean CRM with no interpreter is an expensive contact list.",
    pricing: {
      model: "Subscription tier + implementation",
      range: "$1K–$5K / mo",
      note: "Professional / Enterprise tiers; implementation partners charge separately.",
    },
    bestFor: [
      "Companies with mature funnel and clear MQL definition",
      "Teams wanting standardised reporting",
      "SaaS businesses with PLG motion",
    ],
    limits: [
      "Software reports; it does not decide",
      "Workflow complexity grows without strategy",
      "Attribution still requires human judgment",
    ],
    comparison: services.slice(0, 6).map((service) => ({
      service,
      whyBAZWins:
        `${service.name} requires interpretation, not configuration. We use the Hub as plumbing and senior judgment as the OS.`,
      keyDifferentiator:
        "Revenue outcomes first, platform second. No tool-only engagements.",
    })),
  },
  {
    slug: "freelancer-networks",
    name: "Freelancer networks",
    category: "agency",
    tagline: "Unpredictable talent, zero accountability.",
    description:
      "Cheap on paper, expensive in rework. Freelancers leave, disappear, or lack the context to make strategic calls. You become the project manager.",
    pricing: {
      model: "Hourly or per-project",
      range: "$25–$150 / hr",
      note: "Rates hide project management overhead and vendor churn.",
    },
    bestFor: [
      "One-off tactical work",
      "Very small budgets with high tolerance for variability",
    ],
    limits: [
      "No continuity between projects",
      "Strategic ownership sits with you",
      "Quality depends on the individual freelancer's week",
    ],
    comparison: services.slice(0, 6).map((service) => ({
      service,
      whyBAZWins:
        `${service.name} needs continuity, not a revolving door. A senior partner stays with you from audit through delivery.`,
      keyDifferentiator:
        "Dedicated senior team, not a marketplace of varying quality.",
    })),
  },
];

export const getCompetitor = (slug: string) => competitors.find((c) => c.slug === slug);

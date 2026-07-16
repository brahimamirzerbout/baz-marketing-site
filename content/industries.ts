import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "dtc-ecommerce",
    name: "DTC & E-commerce",
    blurb: "Brands scaling paid + retention together, not in silos.",
    challenges: [
      "Rising CAC across Meta and TikTok",
      "iOS attribution loss and creative fatigue",
      "Flat LTV despite growing list size",
    ],
    outcomes: [
      "Clean server-side tracking that survives iOS",
      "Creative matrix with weekly iteration",
      "Lifecycle flows that compound LTV",
    ],
    howWeExcel: [
      "Server-side attribution that survives iOS — backed by Meta CAPI, TikTok Events API, and a single source of truth so paid signal doesn't evaporate after cookie loss (canonical methodology: 'Paid attribution after iOS').",
      "A creative matrix with weekly iteration, not quarterly re-shoots — the rhythm that keeps ROAS up as platforms fatigue.",
      "Lifecycle flows that compound LTV — onboarding, winback, and replenishment engineered as an asset that appreciates, not a one-off blast.",
      "Senior-only delivery: the operator who audits your unit economics ships the fix — no junior learning on your CAC.",
      "90-day sprints with named owners and exit criteria, so blended CAC actually drops instead of drifting.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model that's driven 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "Clean server-side attribution that survives iOS",
        "Creative matrix shipping weekly iterations",
        "Lifecycle that compounds LTV quarter over quarter",
      ],
    },
  },
  {
    slug: "b2b-saas",
    name: "B2B SaaS",
    blurb: "Companies that need pipeline they can forecast.",
    challenges: [
      "Long, opaque sales cycles",
      "Leaky MQL → SQL hand-off",
      "Content that ranks but doesn't convert",
    ],
    outcomes: [
      "PQL scoring and routing into lifecycle",
      "Comparison and alternatives pages at scale",
      "Dashboards that show pipeline by channel",
    ],
    howWeExcel: [
      "Comparison and alternatives pages at scale — the pages B2B buyers read before a first call, built as an editorial engine rather than a checklist (methodology: 'our content engine').",
      "PQL scoring and routing into lifecycle — product-qualified signals wired to the right nurture so MQL→SQL hand-off stops leaking.",
      "Dashboards that show pipeline by channel, reconciled weekly against a single revenue source of truth — the only numbers execs actually open (methodology: 'server-side attribution').",
      "Topical-authority SEO that compounds — 200 pages on one cluster outrank 2,000 scattered ones (methodology: 'compounding SEO').",
      "Senior-only delivery: the partner who models your LTV/CAC is the partner who ships the play, no translation layer.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model behind 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "PQL scoring routed into lifecycle nurture",
        "Comparison pages ranking for high-intent queries",
        "Pipeline dashboards reconciled by channel weekly",
      ],
    },
  },
  {
    slug: "fintech",
    name: "FinTech",
    blurb: "Trust-first growth for regulated, technical products.",
    challenges: [
      "Category-defining SERPs dominated by incumbents",
      "Trust and compliance in every piece of content",
      "High-intent traffic that doesn't convert",
    ],
    outcomes: [
      "Authoritative content that earns citations",
      "CRO on regulated flows without breaking UX",
      "Attribution that survives cookie loss",
    ],
    howWeExcel: [
      "Compliance-first measurement — server-side attribution and a single source of truth that satisfies audit and survives cookie loss without breaking regulated flows.",
      "Entity and authority strategy for regulated SERPs — getting your entity on Wikidata, in schema, and into citation sources so incumbents' dominance erodes (methodology: 'winning the AI Overview').",
      "CRO on regulated flows without breaking UX — hypothesis-driven tests to 95% confidence, not button-color tweaks (methodology: 'CRO without the slop').",
      "Trust-led content that earns citations from credible sources — specificity over fluff, the only durable moat in a trust-first category.",
      "Senior-only delivery: the operator who reads the compliance constraint also ships the growth plan.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model behind 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "Compliance-first server-side attribution",
        "Entity authority on regulated SERPs",
        "CRO on regulated flows to 95% confidence",
      ],
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality & Travel",
    blurb: "Multi-location brands that need to own the direct channel.",
    challenges: [
      "OTA dependency and high commission",
      "Fragmented GBP and citations across properties",
      "Slow, brochure-style sites",
    ],
    outcomes: [
      "Edge-rendered sites with sub-1.5s LCP",
      "GBP and review strategy at portfolio scale",
      "Direct booking engine that outperforms OTAs",
    ],
    howWeExcel: [
      "Edge-rendered, performance-web builds with sub-1.5s LCP — speed treated as a feature, not a retrofit (methodology: 'speed as a feature').",
      "GBP and review strategy at portfolio scale — consistent local knowledge graph and citations across every property, not one hero location.",
      "A direct booking engine that outperforms OTAs — owning the direct channel to cut commission dependency.",
      "Compounding local SEO — original data and review velocity that earn citations in crowded travel SERPs (methodology: 'original data is the only SEO moat').",
      "Senior-only delivery: one operator owns the property graph, the site, and the booking funnel end to end.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model behind 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "Edge-rendered sites at sub-1.5s LCP",
        "GBP + review strategy at portfolio scale",
        "Direct bookings that cut OTA commission",
      ],
    },
  },
  {
    slug: "ai-devtools",
    name: "AI & Dev Tools",
    blurb: "Technical buyers, technical content, new SERPs to win.",
    challenges: [
      "Zero presence in AI Overviews and LLM answers",
      "Technical buyers who see through fluff",
      "Product-led growth without lifecycle to match",
    ],
    outcomes: [
      "Entity and citation strategy for the new SERP",
      "Documentation and developer content that ranks",
      "Lifecycle that turns PQLs into pipeline",
    ],
    howWeExcel: [
      "Entity and citation strategy for the new SERP — getting cited in AI Overviews and LLM answers, not just ranked, via schema, Wikidata, and quotable structure (methodology: 'winning the AI Overview').",
      "Documentation and developer content that ranks — technical buyers who see through fluff get real depth, engineered for crawlability and internal link graphs.",
      "Lifecycle that turns PQLs into pipeline — product-led signals wired into a nurture that respects how technical buyers actually evaluate.",
      "Original data as a moat — benchmarks, public dashboards, and tooling that earn developer links (methodology: 'original data is the only SEO moat').",
      "Senior-only delivery: a technical operator who reads your docs also ships the growth engine.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model behind 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "Entity authority in AI Overviews + LLM answers",
        "Documentation that ranks for developer queries",
        "Lifecycle converting PQLs into pipeline",
      ],
    },
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    blurb: "Consultancies, agencies, and B2B services firms scaling past referral-only.",
    challenges: [
      "Inconsistent pipeline from referrals alone",
      "Generic content that doesn't move decision-makers",
      "No attribution from first touch to closed-won",
    ],
    outcomes: [
      "Thought-leadership content that ranks for category terms",
      "Lead scoring and nurture flows into CRM",
      "Attribution and dashboards your partners will open",
    ],
    howWeExcel: [
      "Thought-leadership content that ranks for category terms — editorial built as a publishing discipline, not a service line (methodology: 'editorial as a moat').",
      "Lead scoring and nurture flows into CRM — the Hub as plumbing, senior judgment on which stage is leaking and what resets the curve (methodology: 'BAZventures vs a HubSpot-only stack').",
      "Attribution and dashboards your partners will open — reconciled weekly against a single source of truth, not a dusty contact list.",
      "Compounding authority for decision-makers — comparison and methodology content that does the selling before a first call (methodology: 'compounding SEO').",
      "Senior-only delivery: the partner who diagnoses the funnel ships the system and hands over the dashboard.",
    ],
    estimatedOutcomes: {
      successRate:
        "Forecast-backed 90-day plans with named owners — the model behind 60+ brand engagements (brandsScaled: 60+).",
      roi: "Built for <6mo median payback on acquisition spend (paybackMedian: <6mo, canonical brief).",
      improvements: [
        "Category thought-leadership that ranks",
        "Lead scoring + nurture into CRM",
        "Attribution dashboards partners actually open",
      ],
    },
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

import type { Post } from "@/types";

/**
 * CAC Benchmarks by Channel — H1 2026
 * ───────────────────────────────────────────────────────────────────────────
 * ILLUSTRATIVE DATA PRODUCT. Composite, anonymized benchmarks synthesized across
 * 60 brands in the BAZventures client + network panel. No individual brand is
 * named and no single client's numbers are exposed. Ranges are interquartile
 * (25th–75th percentile) of blended new-customer CAC by channel, unless noted.
 *
 * This file is the single source of truth for:
 *   - app/insights/cac-benchmarks/page.tsx  (the gated study page)
 *   - app/feed.xml/route.ts                  (RSS entry)
 * The page reads `cacStudy`; the feed reads `cacPost`.
 */

export const studyMeta = {
  slug: "cac-benchmarks",
  title: "CAC benchmarks by channel, H1 2026",
  category: "analytics" as const,
  author: "Brahim ZERBOUT",
  publishedAt: "2026-07-08",
  readingMin: 9,
  brandCount: 60,
  window: "H1 2026 (Jan–Jun)",
  excerpt:
    "Anonymized, composite CAC benchmarks across 60 brands by acquisition channel, industry, and region — with the three findings every growth leader should be ready to defend in Q3.",
};

export type ChannelRow = {
  channel: string;
  cacLow: number;
  cacHigh: number;
  /** blended LTV:CAC multiple implied by the panel at this channel */
  ltvCac: string;
  note: string;
};

export type IndustryRow = {
  industry: string;
  /** anonymized segment label, never a named brand */
  segment: string;
  blendedCacLow: number;
  blendedCacHigh: number;
  cheapestChannel: string;
  note: string;
};

export type RegionRow = {
  region: string;
  /** index vs North America baseline = 100 */
  paidSocialIndex: number;
  bestChannel: string;
  note: string;
};

export const cacStudy = {
  meta: studyMeta,

  keyFindings: [
    {
      title: "Owned channels still win by 3–8x",
      stat: "$8–$45",
      body:
        "Blended organic (SEO + content) and lifecycle email remain the lowest-CAC acquisition paths in the panel — roughly 3–8x cheaper than paid social and 10–30x cheaper than LinkedIn in B2B segments. The brands with the healthiest unit economics treat paid as a scaler on top of an owned base, not the foundation.",
    },
    {
      title: "B2B CAC is structurally higher — and LinkedIn is the outlier",
      stat: "4–9x",
      body:
        "Within SaaS and B2B services, LinkedIn CAC runs 4–9x the equivalent Paid Search CAC for the same segment. Blended B2B CAC is ~2.4x blended DTC CAC. Teams that survive the math lean on founder-led + community + webinars to pull the blended number down before they scale paid.",
    },
    {
      title: "Region shifts the curve more than channel choice",
      stat: "15–30%",
      body:
        "Paid-social CAC in MENA runs 15–30% below North American equivalents; Western EU sits ~5% below NA; APAC is most efficient on influencer/UGC. The cheapest channel in one region is frequently mid-pack in another — so benchmarks must be read by region, not by channel alone.",
    },
  ],

  /** Blended new-customer CAC by channel (IQR, USD). */
  byChannel: [
    {
      channel: "SEO / Content (organic)",
      cacLow: 8,
      cacHigh: 45,
      ltvCac: "5.2–9.1x",
      note: "Lowest CAC in the panel; slowest to ramp, most durable.",
    },
    {
      channel: "Email / Lifecycle",
      cacLow: 3,
      cacHigh: 18,
      ltvCac: "8.0–14x",
      note: "Cheapest marginal CAC; capped by list size, not by spend.",
    },
    {
      channel: "Referral / Word-of-mouth",
      cacLow: 10,
      cacHigh: 40,
      ltvCac: "6.0–11x",
      note: "Highest retention cohort; hardest to forecast at scale.",
    },
    {
      channel: "Influencer / UGC",
      cacLow: 15,
      cacHigh: 70,
      ltvCac: "2.8–5.5x",
      note: "Widest spread in the panel; creator quality dominates.",
    },
    {
      channel: "TikTok",
      cacLow: 12,
      cacHigh: 48,
      ltvCac: "2.5–4.8x",
      note: "Most efficient paid channel for DTC under $10M ARR.",
    },
    {
      channel: "Affiliate",
      cacLow: 20,
      cacHigh: 60,
      ltvCac: "3.0–5.0x",
      note: "Performance-based; CAC tracks payout discipline tightly.",
    },
    {
      channel: "Meta Paid Social",
      cacLow: 18,
      cacHigh: 95,
      ltvCac: "1.8–3.6x",
      note: "Default scaler; efficiency collapses above ~$80K/mo spend.",
    },
    {
      channel: "Paid Search",
      cacLow: 40,
      cacHigh: 220,
      ltvCac: "1.6–3.2x",
      note: "High intent, high cost; CAC tracks category competitiveness.",
    },
    {
      channel: "Programmatic / Display",
      cacLow: 25,
      cacHigh: 85,
      ltvCac: "1.4–2.6x",
      note: "Best for retargeting + reach, weakest for net-new CAC.",
    },
    {
      channel: "LinkedIn (B2B)",
      cacLow: 90,
      cacHigh: 410,
      ltvCac: "1.1–2.2x",
      note: "Outlier cost in B2B; reserve for enterprise + ABM.",
    },
  ] as ChannelRow[],

  /** Blended new-customer CAC by industry segment (IQR, USD). */
  byIndustry: [
    {
      industry: "SaaS",
      segment: "$2M–$10M ARR",
      blendedCacLow: 110,
      blendedCacHigh: 340,
      cheapestChannel: "SEO / Content + founder-led",
      note: "Blended CAC ~2.4x DTC; PLG lowers the floor materially.",
    },
    {
      industry: "DTC / E-commerce",
      segment: "$1M–$20M revenue",
      blendedCacLow: 22,
      blendedCacHigh: 78,
      cheapestChannel: "TikTok + lifecycle email",
      note: "Most channel-diverse panel; paid social still the scaler.",
    },
    {
      industry: "Fintech",
      segment: "consumer + SMB",
      blendedCacLow: 65,
      blendedCacHigh: 210,
      cheapestChannel: "Referral + content",
      note: "Compliance + trust friction lifts CAC vs DTC peers.",
    },
    {
      industry: "B2B Services",
      segment: "$1M–$15M revenue",
      blendedCacLow: 140,
      blendedCacHigh: 420,
      cheapestChannel: "LinkedIn ABM + webinars",
      note: "Longest sales cycle; CAC must be read against sales cycle.",
    },
    {
      industry: "Marketplaces",
      segment: "two-sided, pre-scale",
      blendedCacLow: 30,
      blendedCacHigh: 120,
      cheapestChannel: "Referral loops",
      note: "Supply-side CAC often 2–3x demand-side in early stage.",
    },
    {
      industry: "Health & Wellness",
      segment: "DTC subscription",
      blendedCacLow: 28,
      blendedCacHigh: 95,
      cheapestChannel: "Influencer / UGC",
      note: "Subscription LTV supports higher paid CAC than one-off DTC.",
    },
  ] as IndustryRow[],

  /** Paid-social CAC index by region (North America = 100). */
  byRegion: [
    {
      region: "North America",
      paidSocialIndex: 100,
      bestChannel: "TikTok + lifecycle email",
      note: "Baseline. Highest absolute CACs but deepest paid scale.",
    },
    {
      region: "Western Europe",
      paidSocialIndex: 95,
      bestChannel: "Meta + SEO",
      note: "~5% below NA; GDPR raises tracking cost, not media cost.",
    },
    {
      region: "MENA",
      paidSocialIndex: 74,
      bestChannel: "Snapchat + TikTok",
      note: "15–30% below NA on paid social; mobile-first, lower CPMs.",
    },
    {
      region: "APAC",
      paidSocialIndex: 68,
      bestChannel: "Influencer / UGC",
      note: "Most efficient influencer CAC; fragmented paid platforms.",
    },
  ] as RegionRow[],

  methodology: [
    "Composite of anonymized, blended new-customer CAC across 60 brands in the BAZventures client + network panel, H1 2026.",
    "Ranges report the interquartile band (25th–75th percentile) unless stated otherwise. Medians and outliers are excluded by design to avoid skewing on a few heavily-funded outliers.",
    "CAC = fully-loaded new-customer acquisition cost: media + creative + tooling + attributed labor, net of returns, divided by net-new customers in the window.",
    "Attribution is server-side reconciled against a single source of truth (warehouse) weekly; platform-reported CAC was adjusted down 5–20% where it exceeded reconciled figures.",
    "No individual brand is named and no single client's data is exposed. Segment labels (e.g. “SaaS brands $2M–$10M ARR”) are the only granularity published.",
  ],
};

/**
 * Post-compatible entry so the gated study also appears in RSS (app/feed.xml).
 * The full body is the public summary; the complete PDF dataset is gated.
 */
export const cacPost: Post = {
  slug: studyMeta.slug,
  title: studyMeta.title,
  excerpt: studyMeta.excerpt,
  category: studyMeta.category,
  author: studyMeta.author,
  publishedAt: studyMeta.publishedAt,
  readingMin: studyMeta.readingMin,
  body: `CAC is the number every board asks about and almost nobody benchmarks honestly. This H1 2026 study fixes that — at least internally.

We synthesized anonymized, composite CAC benchmarks across 60 brands in our client + network panel, blended by acquisition channel, industry segment, and region. No brand is named. Ranges are interquartile, so they reflect the typical operator rather than the funded outlier.

Three findings hold regardless of segment:

1. Owned channels still win by 3–8x. Blended organic (SEO + content) and lifecycle email remain the cheapest acquisition paths in the panel — and the most durable.

2. B2B CAC is structurally higher, and LinkedIn is the outlier. Within SaaS and B2B services, LinkedIn CAC runs 4–9x the equivalent Paid Search CAC. Blended B2B CAC is ~2.4x blended DTC CAC.

3. Region shifts the curve more than channel choice. Paid-social CAC in MENA runs 15–30% below North American equivalents; Western EU sits ~5% below NA; APAC is most efficient on influencer/UGC.

The full dataset — 10 channels, 6 industry segments, 4 regions, with LTV:CAC multiples and methodology — is available as a downloadable PDF. We gate it behind a simple email capture so we can send updates when the H2 2026 wave closes.

If your blended CAC doesn't survive a region-and-channel read, the fix is usually measurement before media. That's the work.`,
};

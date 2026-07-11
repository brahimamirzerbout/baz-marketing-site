import type { City } from "@/types";

/**
 * Curated city set for the Phase 3 location matrix.
 *
 * These are qualitative market observations only — no fabricated client stats.
 * `launch: true` marks the gated rollout subset (Dubai / London / New York);
 * the rest stay `noindex` until copy quality is confirmed (see lib/matrix.ts).
 */
export const cities: City[] = [
  // ──────────────────────────── MENA ────────────────────────────
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "MENA",
    locale: "en_AE",
    marketBlurb:
      "Dubai's multilingual, mobile-first market rewards brands that localize fast across Arabic and English SERPs.",
    localProof: [
      "Multilingual SEO across Arabic + English is table stakes for Dubai SERPs.",
      "High-intent B2B buyer traffic concentrates around DIFC and free-zone clusters.",
      "Summer travel lulls make Q3 the window to build organic before peak season.",
    ],
    launch: true,
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    region: "MENA",
    locale: "ar_SA",
    marketBlurb:
      "Riyadh's Vision 2030 spin-up means new domestic champions are funding growth before incumbents notice.",
    localProof: [
      "Arabic-first content + structured data wins the local Knowledge Graph.",
      "Government and giga-project buyers run long, relationship-led sales cycles.",
    ],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    country: "UAE",
    region: "MENA",
    locale: "en_AE",
    marketBlurb:
      "Abu Dhabi's sovereign-backed ecosystem favors trust-first, compliance-grade growth over growth-at-all-costs.",
    localProof: [
      "Enterprise + sovereign buyers weight credibility signals heavily in vendor selection.",
      "English-led but bilingual creative outperforms monolingual on owned channels.",
    ],
  },
  {
    slug: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "MENA",
    locale: "ar_EG",
    marketBlurb:
      "Cairo is a high-volume, price-sensitive market where CAC discipline separates winners from burnouts.",
    localProof: [
      "Mobile-dominant audience means Core Web Vitals directly move conversion.",
      "Arabic creative + lightweight pages beat heavy, image-rich builds.",
    ],
  },
  {
    slug: "casablanca",
    name: "Casablanca",
    country: "Morocco",
    region: "MENA",
    locale: "fr_MA",
    marketBlurb:
      "Casablanca's francophone + arabophone mix makes it a low-cost, high-talent test bed for MENA launches.",
    localProof: [
      "French + Arabic + English trilingual SERPs reward structured, locale-aware content.",
      "Lower CAC than Gulf peers makes it ideal for compounding organic plays.",
    ],
  },
  // ──────────────────────────── EU ────────────────────────────
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    region: "EU",
    locale: "en_GB",
    marketBlurb:
      "London's crowded, sophisticated SERPs punish thin content — entity authority and original data win.",
    localProof: [
      "Original-data studies consistently earn UK trade-press links and citations.",
      "B2B SaaS buyers here research heavily before a first sales call.",
    ],
    launch: true,
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "EU",
    locale: "fr_FR",
    marketBlurb:
      "Paris values brand and craft; French-language thought leadership outranks translated English.",
    localProof: [
      "Native French content + local entities beat machine-translated pages.",
      "Premium positioning resonates more than discount-led messaging.",
    ],
  },
  {
    slug: "berlin",
    name: "Berlin",
    country: "Germany",
    region: "EU",
    locale: "de_DE",
    marketBlurb:
      "Berlin's technical, privacy-conscious buyers reward depth, documentation, and GDPR-clean tracking.",
    localProof: [
      "Developer-led buying means docs and technical content rank and convert.",
      "Privacy-first measurement (server-side) is a trust signal, not a nice-to-have.",
    ],
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    region: "EU",
    locale: "nl_NL",
    marketBlurb:
      "Amsterdam's direct, English-fluent market favors clear value and minimal-friction funnels.",
    localProof: [
      "Bilingual (NL + EN) search behavior rewards both locale pages.",
      "Short, direct funnels outperform long nurture sequences here.",
    ],
  },
  // ──────────────────────────── NA ────────────────────────────
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    region: "US",
    locale: "en_US",
    marketBlurb:
      "New York's noisy, competitive SERPs reward speed, original data, and category-defining POVs.",
    localProof: [
      "Original benchmarking data earns NYC press + aggregator pickup.",
      "Sub-1.5s LCP is the price of entry for paid + organic rotation.",
    ],
    launch: true,
  },
  {
    slug: "austin",
    name: "Austin",
    country: "United States",
    region: "US",
    locale: "en_US",
    marketBlurb:
      "Austin's startup-dense, founder-led market buys on momentum and concrete funnel math.",
    localProof: [
      "Founder-led buying rewards direct, senior-led outreach.",
      "High paid CPCs make compounding SEO the cheaper long-run channel.",
    ],
  },
  {
    slug: "toronto",
    name: "Toronto",
    country: "Canada",
    region: "US",
    locale: "en_CA",
    marketBlurb:
      "Toronto's bilingual-adjacent, trust-led market rewards credibility and clean measurement.",
    localProof: [
      "Enterprise buyers weight case studies + references heavily.",
      "Clean, server-side attribution is expected, not exceptional.",
    ],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);

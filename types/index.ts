export type Service = {
  slug: string;
  name: string;
  tagline: string;
  pillar: 'owned' | 'earned' | 'paid' | 'data' | 'platform';
  description: string;
  hero: { eyebrow: string; headline: string; sub: string };
  who: string[];
  deliverables: string[];
  kpis: { label: string; value: string }[];
  process: { step: number; title: string; desc: string }[];
  proof: { client: string; metric: string; detail: string }[];
  faqs: { q: string; a: string }[];
  cta: { primary: string; secondary?: string };
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  cover: string;       // hex / token name
  problem: string;
  strategy: string;
  result: string;
  metrics: { label: string; value: string }[];
  duration: string;
  testimonial?: { quote: string; author: string; role: string };
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;        // markdown-lite (paragraphs separated by blank lines)
  category: 'strategy' | 'seo' | 'paid' | 'analytics' | 'content' | 'ai';
  author: string;
  publishedAt: string; // ISO date
  readingMin: number;
};

export type EstimatedOutcomes = {
  // Methodology-based estimates of what the engagement model is built to
  // deliver. NOT guaranteed past-client results — framed as forecasts.
  successRate: string;
  roi: string;
  improvements: string[];
};

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  challenges: string[];
  outcomes: string[];
  // Catalogue of how BAZ specifically excels with this business type.
  // Truthful, drawn from the real service offerings / founder methodology.
  howWeExcel: string[];
  // Methodology-based estimates — what the engagement model is built to
  // deliver, never fabricated past-client metrics.
  estimatedOutcomes: EstimatedOutcomes;
};

export type City = {
  slug: string;
  name: string;
  country: string;
  region: "MENA" | "EU" | "US";
  locale: string;       // BCP-47, e.g. "en_AE"
  marketBlurb: string; // qualitative local-market context (no fabricated stats)
  localProof: string[]; // >=2 unique, non-boilerplate local observations
  launch?: boolean;     // included in the gated launch subset
};

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  monthly: { min: number; max: number; label: string };
  cadence: string;
  bestFor: string[];
  includes: string[];
  deliverables: string;
  cta: 'contact' | 'external';
  externalUrl?: string;
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
};

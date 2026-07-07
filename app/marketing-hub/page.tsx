import { Section, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { StickyCta } from "@/components/sections/StickyCta";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import type { CSSProperties } from "react";

// The Hub product is live at roi-marketing-alpha (the recreated deploy).
const HUB_URL = "https://marketing-hub-roan.vercel.app";

export const metadata = buildMetadata({
  title: "Marketing Hub",
  description:
    "the Hub — an autonomous command center for marketing, sales, and finance. Lead scoring, sales sequences, attribution, the daily Marketing Dive brief, and a triangle loop that runs itself.",
  path: "/marketing-hub",
});

const features = [
  {
    tag: "01",
    title: "Autonomous lead loop",
    body: 'Every contact is scored from touchpoints, routed into the right cadence, stepped through, and re-scored — every 60 seconds. No "did the SDR see this?" Slack messages.',
    href: "/triangle",
  },
  {
    tag: "02",
    title: "Marketing Dive, ingested daily",
    body: "Daily journalism from the marketing industry, cached into the Hub, tagged by topic and format, ready for the Triangle to cite when it scores.",
    href: "/dive",
  },
  {
    tag: "03",
    title: "Multi-touch attribution",
    body: "Every touchpoint — paid, organic, email, sales, referral — recorded with weights so the cockpit can show which channel actually closed the deal.",
    href: "/attribution",
  },
  {
    tag: "04",
    title: "Sales sequences that learn",
    body: "Multi-step cadences with reply/booking probabilities tuned per segment. Pause on reply, escalate on open, stop on conversion.",
    href: "/sequences",
  },
  {
    tag: "05",
    title: "Nova reasoning layer",
    body: "A deterministic reasoning engine that classifies questions, pulls the right tables, and answers with sources, confidence, and next actions.",
    href: "/nova",
  },
  {
    tag: "06",
    title: "The Cockpit",
    body: "Pipeline velocity, weekly wins, forecast confidence, momentum score — one screen a CMO can open on Monday morning.",
    href: "/cockpit",
  },
];

const stats = [
  { k: "60s", v: "Loop tick — score → route → step → close" },
  { k: "127", v: "Industry articles ingested from Marketing Dive" },
  { k: "$507k", v: "Pipeline value under management" },
  { k: "4.0", v: "Pipeline coverage ratio (target ≥ 3×)" },
];

const screenshots = [
  { label: "Cockpit", href: "/cockpit", desc: "One screen, exec-level" },
  { label: "Triangle Loop", href: "/triangle", desc: "Live autonomous state" },
  { label: "Marketing Dive", href: "/dive", desc: "Industry intelligence" },
  { label: "Sequences", href: "/sequences", desc: "Cadences + replies" },
];

// Æther section-label + bar-reveal — the Hub's mono command-center eyebrow.
function HubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-8 bg-foreground/50" aria-hidden />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

// Æther card-base — dark, square, mono-tagged.
function HubCard({
  tag,
  title,
  body,
  href,
}: {
  tag: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <div className="group bg-card border border-border p-6 flex flex-col h-full transition-colors hover:border-foreground/30">
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70 mb-4">
        {tag}
      </span>
      <h3 className="font-sans text-lg font-medium tracking-[-0.01em] mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{body}</p>
      <div className="mt-5 pt-4 border-t border-border">
        <Link
          href={href}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors"
        >
          See it in the Hub →
        </Link>
      </div>
    </div>
  );
}

export default function MarketingHubPage() {
  return (
    // Scope this page to the Hub's monochrome theme: override --seed-sat to 0%
  // so every Æther seed-derived token (brand/accent/primary) resolves to greyscale
  // within this page — matching the Hub product's command-center aesthetic.
  <div style={{ "--seed-sat": "0%" } as CSSProperties}>
    {/* Hero */}
    <Section tone="default" size="lg">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Marketing Hub" }]} />
      <div className="max-w-4xl">
        <HubLabel>Product · the Hub</HubLabel>
        <h1 className="font-sans text-display-2xl font-medium tracking-[-0.04em] mt-6">
          Marketing, sales, and finance — one closed loop.
        </h1>
        <SectionLede>
          The Hub is the operating system under everything I ship for clients. Lead scoring,
          sales cadences, attribution, the daily industry brief, and a triangle loop that scores,
          routes, sequences, and closes — every 60 seconds, without a human in the chain.
        </SectionLede>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={HUB_URL} external variant="primary" size="lg" trackAs="hub_open">
            Open the Hub →
          </Button>
          <Button href="/contact?topic=marketing-hub" variant="outline" size="lg" trackAs="hub_demo">
            Book a 30-min demo
          </Button>
        </div>
      </div>
    </Section>

    {/* Stat band — Æther stat-grid (mono numerals) */}
    <Section tone="default" size="md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-border py-2">
        {stats.map((s) => (
          <div key={s.k} className="py-4">
            <div className="font-mono text-3xl md:text-4xl font-medium tracking-[-0.03em] text-foreground tabular-nums">
              {s.k}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground mt-2">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* What it does */}
    <Section tone="default" size="lg">
      <HubLabel>What's inside</HubLabel>
      <SectionHeading>Built for operators, not for show.</SectionHeading>
      <SectionLede>
        Six systems, one triangle. Each one ships a real outcome — pipeline, deals, intelligence —
        and they feed each other so the next run is smarter than the last.
      </SectionLede>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <HubCard key={f.title} {...f} />
        ))}
      </div>
    </Section>

    {/* The Triangle — diagram + prose */}
    <Section tone="default" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <HubLabel>The triangle</HubLabel>
          <SectionHeading>Marketing ↔ Sales ↔ Nova</SectionHeading>
          <SectionLede>
            Three systems, one loop. Marketing scores leads. Sales sequences them. Nova reasons
            about both — and the whole triangle ticks on its own.
          </SectionLede>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* SVG triangle diagram — monochrome (text-brand resolves to greyscale in this scope) */}
            <svg viewBox="0 0 400 400" className="w-full h-full text-foreground" aria-hidden>
              <polygon
                points="200,40 360,320 40,320"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="200" cy="40" r="44" fill="#09090b" stroke="currentColor" strokeWidth="2" />
              <circle cx="360" cy="320" r="44" fill="#09090b" stroke="currentColor" strokeWidth="2" />
              <circle cx="40" cy="320" r="44" fill="#09090b" stroke="currentColor" strokeWidth="2" />
              <text x="200" y="46" textAnchor="middle" fill="#fafafa" fontSize="15" fontFamily="Inter, sans-serif" fontWeight="500">
                Marketing
              </text>
              <text x="360" y="326" textAnchor="middle" fill="#fafafa" fontSize="15" fontFamily="Inter, sans-serif" fontWeight="500">
                Sales
              </text>
              <text x="40" y="326" textAnchor="middle" fill="#fafafa" fontSize="15" fontFamily="Inter, sans-serif" fontWeight="500">
                Nova
              </text>
              <path d="M 175 75  C 230 150, 320 220, 345 285" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <path d="M 55  285 C 80  220, 170 150, 225 75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <path d="M 200 90  C 200 200, 200 200, 200 270" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <text x="280" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.7">
                score → route
              </text>
              <text x="118" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.7">
                reason → act
              </text>
              <text x="210" y="200" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.7">
                step
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          { t: "1. Score", d: "Touchpoint weight + recency + channel mix + email engagement → 0–100 lead score." },
          { t: "2. Route", d: "Score ≥ 50 → enroll into the least-loaded active sequence. Balances the queue." },
          { t: "3. Step", d: "Each enrollment advances daily. Reply pauses. Booking promotes the deal to qualified." },
          { t: "4. Close", d: "Negotiation deals with prob ≥ 80 auto-close as won. Stale deals auto-lost at 45d." },
          { t: "5. Learn", d: "Wins feed back into Nova. Tomorrow's scoring is smarter than today's." },
          { t: "6. Report", d: "Pipeline value, velocity, wins/day, loop health — one cockpit, no spreadsheets." },
        ].map((s) => (
          <div key={s.t} className="border-l border-foreground/25 pl-4">
            <h4 className="font-sans text-base font-medium tracking-[-0.01em] text-foreground">{s.t}</h4>
            <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* Screenshots / live links — Æther card-base grid */}
    <Section tone="default" size="lg">
      <HubLabel>Live, in your browser</HubLabel>
      <SectionHeading>Open any screen directly.</SectionHeading>
      <SectionLede>
        The Hub is a real product running on real data. Click any of these to open the live page in
        a new tab.
      </SectionLede>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {screenshots.map((s) => (
          <a
            key={s.label}
            href={`${HUB_URL}${s.href}`}
            target="_blank"
            rel="noreferrer"
            className="group block bg-card border border-border p-4 transition-colors hover:border-foreground/30"
          >
            <div className="font-sans text-base font-medium tracking-[-0.01em] text-foreground">
              {s.label}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
            <div className="mt-3 font-mono text-[10px] text-muted-foreground/60 truncate">
              {HUB_URL}
              {s.href}
            </div>
          </a>
        ))}
      </div>
    </Section>

    {/* CTA */}
    <CtaBanner serviceSlug="marketing-hub" serviceName="Marketing Hub" />
    <StickyCta />
  </div>
  );
}
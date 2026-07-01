import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Button } from "@/components/ui/Button";
import { LiveAgentDemo } from "@/components/marketing/LiveAgentDemo";
import { buildMetadata, jsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The BAZ Loop",
  description:
    "How BAZ turns a homepage visit into a routed, scored, sequenced lead — without a human in the loop until it matters.",
  path: "/loop",
});

const stages = [
  {
    n: "01",
    title: "Capture",
    body: "A visitor runs the agent demo on the homepage. The system captures intent signals: prompt, time-on-page, scroll depth, repeat visits.",
    artifacts: ["/api/leads", "/api/score"],
  },
  {
    n: "02",
    title: "Score",
    body: "A deterministic scorer (no LLM required) returns 0-100 from budget, intent, company, source, and engagement. An optional LLM pass refines ±20.",
    artifacts: ["lib/scoring.ts", "/api/score"],
  },
  {
    n: "03",
    title: "Route",
    body: "Score buckets map to one of five actions: book_call, send_proposal, nurture_7d, nurture_30d, archive. Tire-kickers go straight to archive.",
    artifacts: ["lib/scoring.ts:buildRoutingPlan"],
  },
  {
    n: "04",
    title: "Sequence",
    body: "Each action ships with a concrete multi-step plan: D0 email, D3 follow-up, D7 case study, D14 retarget. The lead sees the plan at /portal/[id].",
    artifacts: ["/portal/[id]", "/api/lead-portal/[id]"],
  },
  {
    n: "05",
    title: "Hand off",
    body: "Hot leads (≥75) jump to a calendar. The operator dashboard shows the full funnel with drilldown by source, score band, and stage.",
    artifacts: ["/admin", "/dashboard"],
  },
];

export default function LoopPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "The BAZ Loop" }]} />
        <div className="max-w-4xl">
          <Eyebrow>The system · how BAZ turns a click into a closed deal</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] leading-[0.95]">
            No human in the loop <em className="not-italic text-gradient">until it matters.</em>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Every visitor gets scored in real time, routed by intent, and sequenced by signal. We
            spend human time only on the leads that earn it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#demo" variant="primary" size="lg">
              See it run →
            </Button>
            <Button href="/dashboard" variant="outline" size="lg">
              Open the dashboard
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>The five stages</Eyebrow>
            <SectionHeading>From click to closed — every step wired.</SectionHeading>
            <SectionLede>
              No Zaps. No human stitching. The system runs itself until a senior needs to talk to a
              human.
            </SectionLede>
          </div>
        </div>

        <ol className="space-y-px bg-muted rounded-2xl overflow-hidden border border-border">
          {stages.map((s) => (
            <li
              key={s.n}
              className="bg-background p-6 md:p-8 grid md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {s.n}
                </p>
              </div>
              <div className="md:col-span-6">
                <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
              <div className="md:col-span-4">
                <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground mb-2">
                  Where it lives
                </p>
                <ul className="space-y-1.5 text-sm text-foreground font-mono">
                  {s.artifacts.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Run it yourself</Eyebrow>
            <SectionHeading className="text-foreground">
              Score 0-100, decide in 200ms.
            </SectionHeading>
            <SectionLede className="text-muted-foreground">
              Pick an agent. Run it. See your score and routing plan on the next page.
            </SectionLede>
          </div>
        </div>
        <div id="demo">
          <LiveAgentDemo />
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How BAZ turns a homepage click into a routed lead",
          step: stages.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.body,
          })),
        })}
      />
    </>
  );
}

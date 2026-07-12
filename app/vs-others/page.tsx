import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PostsList } from "@/components/marketing/PostsList";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { BattleCardForm } from "@/components/marketing/BattleCardForm";
import { buildMetadata, jsonLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { competitors } from "@/content/competitors";

export const revalidate = 86400;

const COMPARISON_SLUGS = [
  "bazventures-vs-traditional-agencies",
  "bazventures-vs-in-house-team",
  "bazventures-vs-hubspot-only",
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "BAZventures vs the alternatives",
    description:
      "How a senior-only growth partner compares to traditional agencies, in-house teams, and a HubSpot-only stack.",
    path: "/vs-others",
  });
}

export default function VsOthersPage() {
  const faqs = [
    {
      q: "When is a traditional agency the right choice?",
      a: "When you need broad brand reach at scale and have the budget for headcount. If your goal is a specific revenue forecast with a senior partner, BAZvetures is usually the tighter fit.",
    },
    {
      q: "Should we build an in-house team or rent agency judgment?",
      a: "Hire in-house once your funnel math is proven and stable. Rent senior judgment first to find the model — hiring before the model exists just scales the confusion.",
    },
    {
      q: "Can BAZvetures work with our existing HubSpot stack?",
      a: "Yes. We use the Hub as plumbing and put senior judgment on top. The platform reports; we decide what the numbers mean and what to ship Monday.",
    },
    {
      q: "What does a BAZvetures engagement cost?",
      a: "Engagements are scoped per client. Most senior-led programs sit in the $10K–$50K monthly range with a 90-day minimum. Exact pricing follows a 30-minute partner review.",
    },
  ];

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <div className="max-w-4xl">
          <Eyebrow>BAZvetures vs the alternatives</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            The honest comparison.
          </h1>
          <SectionLede>
            Most &ldquo;vs&rdquo; pages are sales copy. These are the real trade-offs —
            when we&apos;re the right call, and when you should hire the other guy instead.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Read the breakdowns</Eyebrow>
            <SectionHeading>Pick your comparison.</SectionHeading>
            <div className="mt-8">
              <PostsList slugs={COMPARISON_SLUGS} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <BattleCardForm />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <Eyebrow>Competitive landscape</Eyebrow>
        <SectionHeading>How we compare, by category.</SectionHeading>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {competitors.map((c) => (
            <div
              key={c.slug}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
                    {c.category}
                  </p>
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 border border-border rounded-full px-2 py-1">
                  {c.pricing.range}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-success mb-2">
                    Best for
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {c.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 mb-2">
                    Limits
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {c.limits.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-3">
                  Where BAZvetures wins
                </p>
                <ul className="space-y-3">
                  {c.comparison.slice(0, 3).map((item) => (
                    <li key={item.service.slug} className="text-sm text-foreground/90">
                      <Link
                        href={`/services/${item.service.slug}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {item.service.name}
                      </Link>
                      <span className="text-muted-foreground"> — {item.whyBAZWins.slice(0, 120)}…</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <SectionHeading>What buyers ask.</SectionHeading>
          <div className="mt-10 space-y-8">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([{ name: "Home", url: "/" }, { name: "Compare", url: "/vs-others" }]),
          faqLd(faqs),
        ])}
      />
    </>
  );
}

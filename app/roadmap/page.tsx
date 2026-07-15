import type { Metadata } from "next";
import { Section, Eyebrow, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { buildMetadata, jsonLd, professionalServiceLd, matrixArticleLd } from "@/lib/seo";
import { RoadmapQuiz } from "@/components/marketing/RoadmapQuiz";

const DATE_MODIFIED = "2026-07-15";

export const metadata: Metadata = buildMetadata({
  title: "Your Free 90-Day Scaling Roadmap",
  description:
    "Get a personalized 90-day scaling roadmap in under 30 seconds. Diagnose your growth bottleneck, the lever that moves it, and the plan — built by senior partners. No credit card.",
  path: "/roadmap",
});

export default function RoadmapPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Scaling Roadmap" }]} />
        <div className="max-w-3xl">
          <Eyebrow>Free · 30 seconds</Eyebrow>
          <h1 className="font-display text-display-xl font-medium tracking-[-0.04em]">
            Your free 90-day scaling roadmap.
          </h1>
          <SectionLede>
            Tell us where you are and what's blocking you. A senior partner's diagnosis, the single lever that moves
            revenue, and a 90-day plan with owners, budget, and exit criteria — generated in under 30 seconds.
          </SectionLede>
          {/* Answer-first extractable passage (GEO: AI engines lift direct answers near the top) */}
          <p className="mt-8 max-w-2xl rounded-lg border border-border bg-surface px-5 py-4 text-[15px] leading-relaxed text-foreground">
            <strong className="font-semibold text-accent">TL;DR</strong> — The free scaling roadmap diagnoses the one
            bottleneck capping your growth, names the single revenue lever that moves it, and ships a 90-day plan with
            owners, budget, and exit criteria. No credit card, no call required to see it.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="max-w-2xl mb-10">
          <blockquote className="border-l-2 border-accent pl-5 italic text-foreground/80">
            “You grow at the speed of your bottleneck, not the speed of your best channel.”
          </blockquote>
          <p className="mt-2 text-xs muted">
            — Alex Hormozi, $100M Offers. The roadmap is built on this principle: diagnose the bottleneck before you
            scale a channel.
          </p>
        </div>
        <RoadmapQuiz />
        <p className="mx-auto max-w-3xl mt-12 text-center text-[13px] text-foreground/40">
          Last reviewed {new Date(DATE_MODIFIED).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.
          Reviewed against BAZ GEO/AEO research, July 2026.
        </p>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          professionalServiceLd(),
          matrixArticleLd({
            title: "Your Free 90-Day Scaling Roadmap",
            description:
              "Diagnose your growth bottleneck and get a 90-day scaling plan with owners, budget, and exit criteria — free, in 30 seconds.",
            path: "/roadmap",
            dateModified: DATE_MODIFIED,
          }),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Is the roadmap really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. It's a senior-partner diagnosis, generated for your business in under 30 seconds. No credit card, no call required to see it." } },
              { "@type": "Question", name: "What's the catch?", acceptedAnswer: { "@type": "Answer", text: "There isn't one. The roadmap is useful whether or not you ever hire us. If it's a fit, we'll offer a 20-minute call. If not, we say so." } },
              { "@type": "Question", name: "Who generates it?", acceptedAnswer: { "@type": "Answer", text: "A senior partner framework, applied to your answers. Not a junior pod, not a template — a real diagnosis of your bottleneck and the lever that moves it." } },
            ],
          },
        ])}
      />
    </>
  );
}
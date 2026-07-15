import type { Metadata } from "next";
import { Section, Eyebrow, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { buildMetadata, jsonLd, professionalServiceLd } from "@/lib/seo";
import { RoadmapQuiz } from "@/components/marketing/RoadmapQuiz";

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
        </div>
      </Section>

      <Section tone="white" size="lg">
        <RoadmapQuiz />
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          professionalServiceLd(),
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
import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PostsList } from "@/components/marketing/PostsList";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { buildMetadata, jsonLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 86400;

const METHODOLOGY_SLUGS = [
  "the-90-day-growth-sprint",
  "our-content-engine",
  "server-side-attribution-start-to-finish",
  "senior-only-delivery",
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "How we work — BAZventures methodology",
    description:
      "The senior-led operating rhythm behind every BAZventures engagement: sprints, content engine, attribution, and delivery.",
    path: "/methodology",
  });
}

export default function MethodologyPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Methodology" }]} />
        <div className="max-w-4xl">
          <Eyebrow>How we work</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            The methodology.
          </h1>
          <SectionLede>
            No black boxes. The exact operating rhythm we run on every engagement — from the 90-day
            sprint to the content engine that compounds.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <Eyebrow>Read the playbooks</Eyebrow>
        <SectionHeading>How we actually ship.</SectionHeading>
        <div className="mt-10">
          <PostsList slugs={METHODOLOGY_SLUGS} />
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([{ name: "Home", url: "/" }, { name: "Methodology", url: "/methodology" }]),
        ])}
      />
    </>
  );
}

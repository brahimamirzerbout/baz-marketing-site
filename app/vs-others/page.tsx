import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PostsList } from "@/components/marketing/PostsList";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { buildMetadata, jsonLd, breadcrumbLd } from "@/lib/seo";

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
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <div className="max-w-4xl">
          <Eyebrow>BAZventures vs the alternatives</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            The honest comparison.
          </h1>
          <SectionLede>
            Most "vs" pages are sales copy. These are the real trade-offs — when we&apos;re the
            right call, and when you should hire the other guy instead.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <Eyebrow>Read the breakdowns</Eyebrow>
        <SectionHeading>Pick your comparison.</SectionHeading>
        <div className="mt-10">
          <PostsList slugs={COMPARISON_SLUGS} />
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([{ name: "Home", url: "/" }, { name: "Compare", url: "/vs-others" }]),
        ])}
      />
    </>
  );
}

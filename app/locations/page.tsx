import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { cityPages } from "@/lib/matrix";
import { buildMetadata, jsonLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Locations we grow brands in",
    description:
      "Senior-led growth marketing across MENA, EU, and the US — Dubai, London, New York and more.",
    path: "/locations",
  });
}

export default function LocationsIndex() {
  const pages = cityPages();
  const regions = Array.from(new Set(pages.map((p) => p.city.region)));

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
        <div className="max-w-4xl">
          <Eyebrow>Where we work</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Growth marketing by location.
          </h1>
          <SectionLede>
            Senior-led acquisition and lifecycle for teams across MENA, EU, and the US — localized
            to how each market actually buys.
          </SectionLede>
        </div>
      </Section>

      {regions.map((region) => (
        <Section key={region} tone="white" size="lg">
          <Eyebrow>{region}</Eyebrow>
          <SectionHeading>{region} growth marketing.</SectionHeading>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pages
              .filter((p) => p.city.region === region)
              .map((p) => (
                <li key={p.city.slug}>
                  <a
                    href={`/locations/${p.city.slug}`}
                    className="block rounded-2xl border border-border bg-card px-5 py-4 hover:border-accent transition-colors"
                  >
                    <span className="font-display text-lg text-foreground">{p.city.name}</span>
                    <span className="block text-sm text-muted-foreground">{p.city.country}</span>
                  </a>
                </li>
              ))}
          </ul>
        </Section>
      ))}

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([{ name: "Home", url: "/" }, { name: "Locations", url: "/locations" }]),
        ])}
      />
    </>
  );
}

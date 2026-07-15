import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { services } from "@/content/services";
import { cityPages, getCityPage } from "@/lib/matrix";
import { buildMetadata, jsonLd, breadcrumbLd, localBusinessLd, matrixArticleLd, faqLd } from "@/lib/seo";

type Params = { city: string };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return cityPages()
    .filter((p) => p.publishable)
    .map((p) => ({ city: p.city.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const page = getCityPage(params.city);
  if (!page)
    return buildMetadata({ title: "Not found", path: `/locations/${params.city}`, noindex: true });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${params.city}`,
  });
}

export default function CityPage({ params }: { params: Params }) {
  const page = getCityPage(params.city);
  if (!page) notFound();
  const path = `/locations/${params.city}`;
  const { city } = page;

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: city.name }]} />
        <div className="max-w-4xl">
          <Eyebrow>
            {city.name} · {city.region}
          </Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">{page.h1}</h1>
          <SectionLede>{page.intro}</SectionLede>
          {/* Answer-first extractable passage (GEO) */}
          <p className="mt-8 max-w-3xl rounded-lg border border-border bg-surface px-5 py-4 text-[15px] leading-relaxed text-foreground">
            <strong className="font-semibold text-accent">TL;DR</strong> — {page.tldr}
          </p>
          <div className="mt-10 max-w-3xl space-y-6 text-[15px] leading-relaxed text-foreground/90">
            {page.body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <Eyebrow>Local market context</Eyebrow>
        <SectionHeading>Why {city.name}.</SectionHeading>
        <ul className="mt-8 space-y-3">
          {page.localProof.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] text-foreground">
              <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" size="lg">
        <div className="max-w-3xl">
          <Eyebrow>Key data</Eyebrow>
          <SectionHeading>What the research says.</SectionHeading>
          <ul className="mt-8 space-y-4">
            {page.citations.map((c) => (
              <li key={c.stat} className="flex items-start gap-3 text-[15px] text-foreground">
                <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>
                  {c.stat}.{" "}
                  <span className="text-foreground/60">Source: {c.source}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <SectionHeading>{city.name} teams ask us.</SectionHeading>
          <div className="mt-8 space-y-8">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <h2 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">{f.q}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>Common services</Eyebrow>
            <SectionHeading>What we ship for {city.name} teams.</SectionHeading>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner />

      <p className="mx-auto max-w-3xl px-6 pb-10 text-center text-[13px] text-foreground/40">
        Last reviewed {new Date(page.dateModified).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}. Reviewed against BAZ GEO/AEO research, July 2026.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          localBusinessLd({
            name: page.title,
            description: page.description,
            url: path,
            areaServed: [city.name, city.region],
          }),
          matrixArticleLd({
            title: page.title,
            description: page.description,
            path,
            dateModified: page.dateModified,
          }),
          faqLd(page.faqs),
          breadcrumbLd([{ name: "Home", url: "/" }, { name: "Locations", url: "/locations" }, { name: city.name, url: path }]),
        ])}
      />
    </>
  );
}

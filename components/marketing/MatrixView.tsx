import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { services } from "@/content/services";
import { jsonLd, breadcrumbLd, localBusinessLd } from "@/lib/seo";
import type { MatrixPage } from "@/lib/matrix";

type Crumb = { label: string; href?: string };

/**
 * Shared renderer for programmatic matrix pages (industry×service,
 * city×industry, city×industry×service). Composes the same senior-led layout
 * regardless of which dimensions are present, and emits LocalBusiness +
 * Breadcrumb JSON-LD. `path` is the page's own route for canonical/schema URL.
 */
export function MatrixView({
  page,
  path,
  breadcrumb,
  areaServed,
}: {
  page: MatrixPage;
  path: string;
  breadcrumb: Crumb[];
  areaServed?: string[];
}) {
  const { industry, service, city, h1, intro, body, challenges, outcomes, process, localProof } = page;

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            ...breadcrumb.map((b) => ({ label: b.label, href: b.href })),
          ]}
        />
        <div className="max-w-4xl">
          <Eyebrow>{city ? `${city.name} · ${industry.name}` : industry.name}</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">{h1}</h1>
          <SectionLede>{intro}</SectionLede>
        </div>
      </Section>

      {body && (
        <Section tone="white" size="lg">
          <div className="max-w-3xl space-y-6 text-[15px] leading-relaxed text-foreground/90">
            {body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      )}

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>Typical challenges</Eyebrow>
            <SectionHeading>What we hear first.</SectionHeading>
            <ul className="mt-8 space-y-3">
              {challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-foreground">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Typical outcomes</Eyebrow>
            <SectionHeading>What the engagement unlocks.</SectionHeading>
            <ul className="mt-8 space-y-3">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15px] text-foreground">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-success" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {service && process.length > 0 && (
        <Section tone="paper" size="lg">
          <Eyebrow>Process</Eyebrow>
          <SectionHeading>How we ship {service.name}.</SectionHeading>
          <div className="mt-10">
            <ProcessTimeline process={process} />
          </div>
        </Section>
      )}

      {localProof.length > 0 && (
        <Section tone="white" size="lg">
          <Eyebrow>Local market context</Eyebrow>
          <SectionHeading>Why {city?.name}.</SectionHeading>
          <ul className="mt-8 space-y-3">
            {localProof.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-foreground">
                <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>Common services</Eyebrow>
            <SectionHeading>What we typically ship.</SectionHeading>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          localBusinessLd({
            name: page.title,
            description: page.description,
            url: path,
            areaServed,
          }),
          breadcrumbLd([
            { name: "Home", url: "/" },
            ...breadcrumb.map((b) => ({ name: b.label, url: b.href ?? "/" })),
          ]),
        ])}
      />
    </>
  );
}

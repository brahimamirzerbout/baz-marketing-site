// @ts-nocheck
import { Suspense } from "react";
import {
  Hero,
  PillarGrid,
  PerformanceFeature,
  HowWeWork,
  KpiBand,
  Framework,
  CaseStudies,
  LogoMarquee,
  Testimonials,
  InsightsPreview,
  FinalCta,
  MarketingHubBanner,
  ProofNumbers,
  ReadNext,
  PipelineTicker,
  StickyCta,
  RefocusManifesto,
} from "@/components/sections";
import { ServiceIntentCta } from "@/components/marketing/ServiceIntentCta";
import Link from "next/link";
import { buildMetadata, jsonLd, professionalServiceLd } from "@/lib/seo";
import { resolveHeroVariant } from "@/lib/hero-variant";
import { SelectedFew } from "@/components/sections/SelectedFew";

// `/` is rendered fully static (○) for edge caching + sub-1.5s LCP. The `?icp=`
// hero-personalization feature (lib/hero-variant.tsx) is intentionally NOT read
// here: reading searchParams opts the route into dynamic rendering (cache-control:
// no-store, TTFB ~1.3s cold). Default variant is what every visitor sees today (no
// traffic uses ?icp=). To re-enable ICP hero variants, swap to a client-side
// override (useSearchParams() in a client Hero wrapper) so `/` stays static.
export function generateMetadata() {
  const title = "Your marketing system, live in 45 days.";
  const subtitle = "Senior-only. One channel. Or pay nothing for month four";
  const ogQuery = `?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;
  return buildMetadata({
    title,
    description:
      "BAZventures is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels — on the Hub. Strategy, execution, and reporting in one tightly integrated system. Or pay nothing for month four.",
    path: "/",
    image: `/og${ogQuery}`,
  });
}

export default function HomePage() {
  const heroVariant = resolveHeroVariant(undefined);

  return (
    <>
      <Hero variant={heroVariant} />
      <RefocusManifesto />
      <MarketingHubBanner />
      <ProofNumbers />
      <LogoMarquee />
      <PerformanceFeature />
      <PillarGrid />
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-mono uppercase tracking-[0.16em] text-[11px] mb-4 text-muted-foreground">
            One offer, not a menu
          </p>
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
            We do fourteen things. You need one.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            The full service catalog exists — strategy, CRM, paid, content, analytics. It
            stays behind a single door. Start with the 45-day system; we expand once it
            compounds.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-12 px-6 mt-8 rounded-full border border-border hover:border-foreground font-medium text-foreground"
          >
            See the full service catalog
          </Link>
        </div>
      </section>
      <Suspense fallback={null}>
        <ServiceIntentCta />
      </Suspense>
      <HowWeWork />
      <KpiBand />
      <Framework />
      <CaseStudies />
      <Testimonials />
      <InsightsPreview />
      <ReadNext />
      <SelectedFew />
      <FinalCta />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(professionalServiceLd())}
      />
    </>
  );
}

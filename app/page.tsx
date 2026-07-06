// @ts-nocheck
import {
  Hero,
  PillarGrid,
  PerformanceFeature,
  ServicesOverview,
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
} from "@/components/sections";
import { buildMetadata, jsonLd, professionalServiceLd } from "@/lib/seo";
import { resolveHeroVariant } from "@/lib/hero-variant";

// `/` is rendered fully static (○) for edge caching + sub-1.5s LCP. The `?icp=`
// hero-personalization feature (lib/hero-variant.tsx) is intentionally NOT read
// here: reading searchParams opts the route into dynamic rendering (cache-control:
// no-store, TTFB ~1.3s cold). Default variant is what every visitor sees today (no
// traffic uses ?icp=). To re-enable ICP hero variants, swap to a client-side
// override (useSearchParams() in a client Hero wrapper) so `/` stays static.
export function generateMetadata() {
  const title = "Add $200K+ to pipeline in 90 days";
  const subtitle = "Or pay nothing for month four · the Hub";
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
      <MarketingHubBanner />
      <ProofNumbers />
      <LogoMarquee />
      <PerformanceFeature />
      <PillarGrid />
      <ServicesOverview />
      <HowWeWork />
      <KpiBand />
      <Framework />
      <CaseStudies />
      <Testimonials />
      <InsightsPreview />
      <ReadNext />
      <FinalCta />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(professionalServiceLd())}
      />
    </>
  );
}

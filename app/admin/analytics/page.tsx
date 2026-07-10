import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-guard";
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { AnalyticsTools } from "@/components/analytics/AnalyticsTools";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Analytics",
  description:
    "Attribution, AdStock, RFM, and budget optimization tools — pure browser-side math, no Python runtime.",
  path: "/admin/analytics",
  noindex: true,
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AnalyticsPage() {
  // Admin / owner only. members and clients are bounced to /.
  await requireAdmin({ nextPath: "/admin/analytics" });

  return (
    <Section tone="paper" size="lg">
      <header className="mb-10">
        <Eyebrow>Admin · Analytics</Eyebrow>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">
          Marketing analytics, in the browser.
        </h1>
        <SectionHeading>
          Four tools BAZ uses to audit a client. Pure TypeScript math, no Python runtime, no upload
          to third-party services.
        </SectionHeading>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          Methodology ported from classical attribution modeling, AdStock carryover, RFM
          segmentation, and Hill-saturation budget allocation. Edit inputs on the left, see results
          update live.
        </p>
      </header>
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading tools…</div>}>
        <AnalyticsTools />
      </Suspense>
    </Section>
  );
}

import { Suspense } from 'react';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { AnalyticsTools } from '@/components/analytics/AnalyticsTools';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Analytics',
  description: 'Attribution, AdStock, RFM, and budget optimization tools — pure browser-side math, no Python runtime.',
  path: '/admin/analytics',
  noindex: true,
});

export default function AnalyticsPage() {
  return (
    <Section tone="paper" size="lg">
      <header className="mb-10">
        <Eyebrow>Admin · Analytics</Eyebrow>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">
          Marketing analytics, in the browser.
        </h1>
        <SectionHeading>
          Four tools BAZ uses to audit a client. Pure TypeScript math, no Python runtime, no upload to third-party services.
        </SectionHeading>
        <p className="mt-4 text-sm text-ink-500 max-w-2xl">
          Methodology ported from classical attribution modeling, AdStock carryover, RFM segmentation,
          and Hill-saturation budget allocation. Edit inputs on the left, see results update live.
        </p>
      </header>
      <Suspense fallback={<div className="text-sm text-ink-500">Loading tools…</div>}>
        <AnalyticsTools />
      </Suspense>
    </Section>
  );
}

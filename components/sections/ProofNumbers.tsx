/**
 * Compact proof strip: 3 case-study outcomes side-by-side.
 * Used on the BAZ homepage right after the Marketing Hub banner so visitors
 * see "real product + real outcomes" within the first scroll.
 */
import { caseStudies } from "@/content/case-studies";

export function ProofNumbers() {
  const top = caseStudies.slice(0, 3);
  return (
    <section className="bg-paper">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-100 dark:bg-paper-200 rounded-2xl overflow-hidden border border-ink-100 dark:border-paper-200 dark:border-paper-200 dark:border-paper-200">
          {top.map((cs) => {
            const headline = cs.metrics[0]; // most-quantified metric
            return (
              <div key={cs.slug} className="bg-paper p-6 md:p-8 flex flex-col">
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500 mb-3">
                  {cs.client} · {cs.industry}
                </p>
                <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em] text-ink-900">
                  {headline?.value}
                </p>
                <p className="mt-1 text-sm text-ink-600">{headline?.label}</p>
                <p className="mt-4 text-xs text-ink-500 line-clamp-2">{cs.result}</p>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs">
                  <span className="text-ink-500">{cs.duration}</span>
                  <a href={`/case-studies/${cs.slug}`} className="text-accent font-medium hover:underline">
                    Read the case →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
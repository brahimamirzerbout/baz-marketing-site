import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="container mx-auto px-6 py-24 md:py-40">
        <div className="max-w-4xl">
          <p className="eyebrow-neutral mb-8">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--foreground)] rounded-full mr-1 animate-pulse-dot" />
            Booking Q3 · 2 senior partner slots open
          </p>

          {/* The closing argument — one sentence */}
          <h2 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0]">
            Ready to make growth <span className="text-[var(--foreground)]">predictable?</span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Book a 30-minute call. We&apos;ll review your funnel, channels, and unit economics — and
            tell you honestly whether BAZ is the right fit.
          </p>

          {/* CTAs — one gold, one ghost */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button
              href={site.bookOrMailto}
              external
              variant="secondary"
              size="lg"
              trackAs="final_book_call"
            >
              Book a growth call →
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              trackAs="final_contact"
              className="border-white/15 text-[var(--foreground)]/80 hover:border-[var(--foreground)] hover:bg-transparent hover:text-[var(--foreground)]"
            >
              Request an audit
            </Button>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="royal-seal"
              style={{ width: "32px", height: "32px", fontSize: "13px" }}
            >
              B
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
              Senior team · No juniors · Algiers
            </span>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-white/30 hover:text-[var(--foreground)] transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}

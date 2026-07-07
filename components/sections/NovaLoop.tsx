import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * NovaLoop — homepage section presenting Nova (the Hub's reasoning engine)
 * as the revenue loop that runs the system.
 *
 * Built from the S-tier marketing protocol — its ARCHITECTURE (one money loop,
 * control-plane-above-models, mechanism-over-features, the receipt, tiered
 * access) — voiced in BAZ senior-partner register. The protocol's hustler
 * register ("empire / geniuses / violent loop / aura / killers") is stripped:
 * it breaks the doctrine ("no hype, no growth-hacking") and the buyer this
 * site serves (technical founders, not hustler-bro).
 *
 * Proof = the mechanism, not fabricated outcomes. No invented metrics: the
 * "60s tick" and "multi-thread" claims map to the live Hub console (the hero
 * tick log shows "nova reasoning 6 threads" on a 60s tick).
 */
const loop = [
  {
    n: "01",
    t: "Map",
    d: "Nova takes your goal and decomposes it into one revenue play — with owners and an exit criterion. Not a brainstorm. A plan you can run.",
  },
  {
    n: "02",
    t: "Research",
    d: "Nova’s agents pull the data, draft the assets, and orchestrate the actions. Multi-thread, on a 60-second tick.",
  },
  {
    n: "03",
    t: "Route",
    d: "Your offer wraps your inventory and routes to the channels that move it. No dead tiles — what doesn’t move gets archived.",
  },
  {
    n: "04",
    t: "Track",
    d: "The dashboard shows what Nova did, what converted, and the money and time it produced. The work and the outcome, in one view.",
  },
  {
    n: "05",
    t: "Reinforce",
    d: "What converted gets reinvested. What didn’t gets cut. The loop compounds — weekly, not quarterly.",
  },
];

const why = [
  {
    t: "Control plane, not a chat window",
    d: "Models come and go. Nova governs them — your play survives any model swap.",
  },
  {
    t: "Mechanism over features",
    d: "You don’t need 20 features. You need one loop that makes money and is easy to understand.",
  },
  {
    t: "The receipt",
    d: "Every action Nova takes is logged. You see the work and the outcome, not a black box.",
  },
];

export function NovaLoop() {
  return (
    <Section tone="ink" size="lg" id="nova">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow tone="light">The Hub&rsquo;s reasoning engine</Eyebrow>
          <SectionHeading className="text-foreground">
            One money loop. Nova runs it.
          </SectionHeading>
          <SectionLede className="text-muted-foreground">
            Models come and go. Nova is the control plane above them &mdash; it reads your CRM,
            campaigns, and channels, maps your goal to one revenue play, and runs it on a 60-second
            tick. Not a chatbot. A system that ships.
          </SectionLede>
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <p className="text-sm text-muted-foreground max-w-xs">
            Nova runs inside the Hub. Access by tier &mdash; depth and permissions scale with your
            engagement. An instrument, not a toy.
          </p>
        </div>
      </div>

      {/* The loop — 5 steps */}
      <ol className="grid md:grid-cols-5 gap-4 mb-16">
        {loop.map((s, i) => (
          <li
            key={s.n}
            className="reveal relative bg-background rounded-2xl p-6 border border-border dark:border-border overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              aria-hidden
              className="absolute -top-3 -right-1 font-display text-[72px] md:text-[96px] font-bold leading-none text-muted-foreground/[0.06] select-none"
            >
              {s.n}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              [{s.n}]
            </span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-foreground">
              {s.t}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>

      {/* Why it wins — 3-up */}
      <div className="grid md:grid-cols-3 gap-px bg-background/10 rounded-2xl overflow-hidden border border-border/50 mb-14">
        {why.map((p, i) => (
          <div key={p.t} className="bg-primary/90 p-6 md:p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-4">
              [{String(i + 1).padStart(2, "0")}]
            </div>
            <h3 className="font-display text-xl md:text-2xl font-medium tracking-[-0.02em] text-foreground">
              {p.t}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center gap-4">
        <Button href="/marketing-hub" variant="primary" size="lg" trackAs="nova_see_hub">
          See the Hub live &rarr;
        </Button>
        <Button
          href={site.bookOrMailto}
          external
          variant="outline"
          size="lg"
          trackAs="nova_book_call"
        >
          Book the growth audit &rarr;
        </Button>
      </div>
    </Section>
  );
}
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "The Selected Few — BAZventures",
  description:
    "We don't take everyone. We take the selected few. A capped intake of founders — the revenue system + entry to the inner circle. By selection, not purchase.",
  path: "/selected",
});

const criteria = [
  { n: "01", t: "$2M+ ARR", d: "You're past DIY. The stakes are real; the systems matter." },
  { n: "02", t: "Technical founder", d: "You respect systems over slogans. You want engineering, not a deck." },
  { n: "03", t: "Past agency churn", d: "You've been burned. You know exactly what doesn't work — and why." },
  { n: "04", t: "Referred by a selected", d: "The few vouch for the few. A current member opens the door." },
  { n: "05", t: "Held to revenue", d: "You measure marketing in pipeline, not impressions. Vanity need not apply." },
];

const innerCircle = [
  { t: "The revenue system", d: "The 18-service engine, the Hub, the senior partners. Strategy, execution, reporting — one system, tied to revenue." },
  { t: "The inner circle", d: "The Selected Few — the curated founders + operators. Peer access, the deals, the intel that only circulates inside." },
  { t: "The playbooks", d: "60+ brands distilled into the systems inside. The exact loops, sequences, and attribution models — not theory." },
  { t: "Direct Brahim access", d: "The operator behind 60+ brands. Not a junior. Not an account manager. The senior partner who ships." },
];

export default function SelectedPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <span className="watermark">00</span>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
          <div className="chip mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-1000" />
            The Selected Few · intake
          </div>
          <h1 className="display-xl text-[clamp(2.5rem,8vw,8rem)] text-ink-1000 max-w-4xl">
            <span className="block">We don&apos;t take everyone.</span>
            <span className="block bg-gradient-to-b from-ink-1000 via-ink-800 to-ink-500 bg-clip-text text-transparent">
              We take the selected few.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-700 lg:text-xl">
            BAZventures serves a capped number of founders. The rest apply. A few are chosen. The
            chosen get the revenue system — and entry to the inner circle. This isn&apos;t a checkout.
            It&apos;s a selection.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.bookOrMailto}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px"
            >
              Apply for selection →
            </a>
            <a
              href="#criteria"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-100"
            >
              See the criteria
            </a>
          </div>
        </div>
      </section>

      {/* Scarcity band — the capped slots */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
          {[
            { k: "7", l: "Client slots, total" },
            { k: "4", l: "Filled" },
            { k: "3", l: "Open" },
            { k: "0", l: "Junior pods" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`relative px-6 py-10 lg:px-10 lg:py-14 ${
                i > 0 ? "border-l border-border" : ""
              } ${i < 2 ? "border-b border-border lg:border-b-0" : ""}`}
            >
              <div className="mono-label mb-4">0{i + 1} / intake</div>
              <div className="display-xl text-4xl text-ink-1000 lg:text-6xl">{s.k}</div>
              <div className="mt-4 max-w-[24ch] text-sm text-ink-700">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Criteria */}
      <section id="criteria" className="relative border-b border-border">
        <span className="watermark">01</span>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mono-label mb-4">01 — The selection</div>
          <h2 className="display-xl text-4xl text-ink-1000 lg:text-7xl max-w-3xl">Who gets in.</h2>
          <p className="mt-6 max-w-2xl text-ink-700">
            Five criteria. No exceptions. If you meet them, you apply. If you&apos;re selected, you&apos;re
            in. If not, the door stays closed.
          </p>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((c) => (
              <div key={c.n} className="relative bg-ink-50 p-8">
                <div className="absolute right-6 top-6 font-mono text-xs text-ink-500">{c.n}</div>
                <div className="mono-label mb-6">Criterion</div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink-1000">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the selected get */}
      <section className="relative border-b border-border">
        <span className="watermark">02</span>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mono-label mb-4">02 — The inner circle</div>
          <h2 className="display-xl text-4xl text-ink-1000 lg:text-7xl max-w-3xl">What the selected get.</h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {innerCircle.map((c) => (
              <div key={c.t} className="glass p-8">
                <h3 className="text-xl font-semibold tracking-tight text-ink-1000">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The flywheel */}
      <section className="relative border-b border-border">
        <span className="watermark">03</span>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mono-label mb-4">03 — The flywheel</div>
          <h2 className="display-xl text-4xl text-ink-1000 lg:text-7xl max-w-3xl">The few refer the few.</h2>
          <p className="mt-6 max-w-2xl text-ink-700">
            The selected clients earn entry to the inner circle. The inner circle refers the next
            selected. The network compounds. Other agencies can copy a service — they can&apos;t copy a
            curated circle of operators who vouch for each other. That&apos;s the moat.
          </p>
        </div>
      </section>

      {/* CTA — the selection gate */}
      <section id="apply" className="relative border-b border-border">
        <span className="watermark">04</span>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="glass grid gap-10 p-8 lg:grid-cols-[1.3fr_1fr] lg:p-14">
            <div>
              <div className="chip mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-1000 animate-pulse" />
                3 slots open · selection closes when filled
              </div>
              <h2 className="display-xl text-4xl text-ink-1000 lg:text-6xl">Apply for selection.</h2>
              <p className="mt-6 max-w-xl text-ink-700">
                This isn&apos;t a sales call. It&apos;s a selection. 30 minutes with a senior partner. We
                review your funnel, your channels, your unit economics — and tell you honestly whether
                you&apos;re one of the few. If you are, you&apos;re in. If not, the door stays closed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={site.bookOrMailto}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                >
                  Apply for selection <span aria-hidden>→</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink-900 hover:bg-ink-100"
                >
                  {site.email}
                </a>
              </div>
            </div>
            <ul className="flex flex-col gap-4 lg:border-l lg:border-border lg:pl-10">
              {[
                "Reply within 24 hours",
                "Selection, not a pitch",
                "Confidential — NDA on request",
                "3 slots — closes when filled",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-800">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-border">
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-ink-1000" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
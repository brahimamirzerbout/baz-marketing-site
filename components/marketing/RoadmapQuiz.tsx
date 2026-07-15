"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { site } from "@/lib/site";
import type { ScalingRoadmap, DayPhase } from "@/lib/roadmap";

type Step = "form" | "generating" | "result";

const INDUSTRIES = [
  { v: "b2b_saas", l: "B2B SaaS" },
  { v: "dtc_ecommerce", l: "DTC / E-commerce" },
  { v: "fintech", l: "FinTech" },
  { v: "hospitality", l: "Hospitality / Travel" },
  { v: "ai_devtools", l: "AI / Dev Tools" },
  { v: "professional_services", l: "Professional Services" },
  { v: "other", l: "Other" },
];
const STAGES = [
  { v: "pre_launch", l: "Pre-launch" },
  { v: "early", l: "Early (<$10k/mo)" },
  { v: "growth", l: "Growth ($10k–100k/mo)" },
  { v: "scale", l: "Scale ($100k+/mo)" },
];
const BOTTLENECKS = [
  { v: "lead_flow", l: "Not enough leads" },
  { v: "conversion", l: "Leads don't convert" },
  { v: "aov", l: "Sales are too small (AOV)" },
  { v: "retention", l: "Customers churn" },
  { v: "offer", l: "Offer / messaging is weak" },
  { v: "tracking", l: "Can't see what works" },
  { v: "not_sure", l: "Not sure" },
];
const GOALS = [
  "More pipeline",
  "Higher close rate",
  "Better retention / LTV",
  "Scale a working channel",
  "Enter a new market",
];

export function RoadmapQuiz() {
  const [step, setStep] = useState<Step>("form");
  const [roadmap, setRoadmap] = useState<ScalingRoadmap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    industry: "b2b_saas",
    stage: "growth",
    monthlyRevenue: "",
    bottleneck: "lead_flow",
    goal: GOALS[0],
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Add your name and a valid email to get the roadmap.");
      return;
    }
    setError(null);
    setStep("generating");

    // 1. Capture the lead through the scored pipeline (fire-and-forget, but awaited lightly).
    const leadBody = {
      name: form.name,
      email: form.email,
      company: form.company,
      website: form.website,
      message: `Scaling roadmap request — industry: ${form.industry}, stage: ${form.stage}, revenue: ${form.monthlyRevenue || "unstated"}, bottleneck: ${form.bottleneck}, goal: ${form.goal}`,
      source: "roadmap",
      service: "scaling-roadmap",
    };
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadBody),
      });
    } catch {
      /* lead capture is best-effort; still show the roadmap */
    }

    // 2. Generate the personalized roadmap.
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "generation failed");
      setRoadmap(data.roadmap as ScalingRoadmap);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't generate the roadmap.");
      setStep("form");
    }
  }

  if (step === "result" && roadmap) return <RoadmapResult roadmap={roadmap} email={form.email} />;

  return (
    <div className="max-w-2xl">
      {step === "generating" ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-pulse text-accent text-sm font-mono uppercase tracking-widest">
            Diagnosing your bottleneck…
          </div>
          <p className="mt-4 muted text-sm">A senior partner is reading your answers and writing your 90-day plan.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Your name" required>
              <input className="w-full input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Sam Rivera" />
            </Field>
            <Field label="Work email" required>
              <input className="w-full input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="sam@company.com" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company">
              <input className="w-full input" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Co" />
            </Field>
            <Field label="Website">
              <input className="w-full input" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="acme.com" />
            </Field>
          </div>
          <Field label="Industry">
            <select className="w-full input" value={form.industry} onChange={(e) => update("industry", e.target.value)}>
              {INDUSTRIES.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Stage">
              <select className="w-full input" value={form.stage} onChange={(e) => update("stage", e.target.value)}>
                {STAGES.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </Field>
            <Field label="Monthly revenue (optional)">
              <input className="w-full input" value={form.monthlyRevenue} onChange={(e) => update("monthlyRevenue", e.target.value)} placeholder="$25k" />
            </Field>
          </div>
          <Field label="What's blocking your growth right now?">
            <select className="w-full input" value={form.bottleneck} onChange={(e) => update("bottleneck", e.target.value)}>
              {BOTTLENECKS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </Field>
          <Field label="Your goal">
            <select className="w-full input" value={form.goal} onChange={(e) => update("goal", e.target.value)}>
              {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="primary" className="w-full">
            Generate my 90-day roadmap →
          </Button>
          <p className="text-xs muted text-center">
            Free. No credit card. Your roadmap appears instantly. We'll email you once — a senior partner, not a bot.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider muted mb-1.5">
        {label}{required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function RoadmapResult({ roadmap, email }: { roadmap: ScalingRoadmap; email: string }) {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Eyebrow>Your roadmap is ready</Eyebrow>
        <h2 className="font-display text-display-lg font-medium tracking-[-0.04em] mt-2">Your 90-day scaling plan</h2>
        <p className="mt-2 text-sm muted">Sent to {email}. {roadmap.source === "ai" ? "Generated live by a senior-partner model." : "Generated from the senior-partner framework."}</p>
      </div>

      <div className="card card-pad space-y-4 border-l-2 border-accent">
        <div>
          <h3 className="font-semibold">The diagnosis</h3>
          <p className="text-sm mt-1">{roadmap.diagnosis}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider muted">Primary lever</h4>
            <p className="text-sm mt-1">{roadmap.primaryLever}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider muted">Recommended engagement</h4>
            <p className="text-sm mt-1">{roadmap.recommendedTier} tier</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">The offer move</h3>
        <p className="text-sm">{roadmap.offerMove}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Channels</h3>
        <ul className="space-y-1.5">
          {roadmap.channels.map((c, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <span className="text-accent font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">The 90-day plan</h3>
        <div className="space-y-4">
          {roadmap.ninetyDayPlan.map((p: DayPhase, i) => (
            <div key={i} className="card card-pad border-l-2" style={{ borderLeftColor: "var(--accent)" }}>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{p.window}</h4>
                <span className="text-xs font-mono muted">{p.budget}</span>
              </div>
              <p className="text-sm mt-2">{p.focus}</p>
              <div className="mt-2 text-xs muted">
                <span className="font-semibold">Owner:</span> {p.owner} · <span className="font-semibold">Exit:</span> {p.exitCriteria}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">KPIs we hold the line on</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {roadmap.kpis.map((k, i) => (
            <div key={i} className="card card-pad text-center">
              <div className="text-xs muted">{k.metric}</div>
              <div className="font-display text-lg font-medium mt-1" style={{ color: "var(--success)" }}>{k.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-pad card-lift text-center space-y-3 border-l-2 border-accent">
        <p className="font-semibold">{roadmap.nextAction}</p>
        <Button href={site.bookOrMailto} variant="primary">Book the 20-minute growth call →</Button>
        <p className="text-xs muted">A senior partner reads your answers before the call. If we're not the right fit, we tell you in the first 10 minutes.</p>
      </div>
    </div>
  );
}
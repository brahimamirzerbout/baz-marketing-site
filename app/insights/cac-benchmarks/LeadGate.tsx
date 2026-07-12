"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function LeadGate({
  source = "cac_benchmarks",
  service = "analytics-attribution",
  reportLabel = "CAC Benchmarks — H1 2026 (full PDF)",
}: {
  source?: string;
  service?: string;
  reportLabel?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string)?.trim() || "Subscriber";
    const email = (fd.get("email") as string)?.trim();
    const company = (fd.get("company") as string)?.trim();
    const payload = {
      name,
      email,
      company,
      message: `Requested the full PDF report: ${reportLabel}.`,
      source,
      service,
    };
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!j.ok) {
        setError(j.error === "invalid_email" ? "Enter a valid work email." : "Something went wrong — try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-success/10 border border-success/30 p-8 text-center">
        <p className="font-display text-2xl text-foreground mb-2">Report on its way.</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ve queued the full PDF for your inbox. You&apos;ll also get the H2 2026 wave when it closes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Name
          </span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className="mt-1 w-full h-11 px-3 bg-background border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Work email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className="mt-1 w-full h-11 px-3 bg-background border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Company (optional)
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company / fund"
          className="mt-1 w-full h-11 px-3 bg-background border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>
      {error && (
        <p className="text-sm text-[hsl(var(--warning-hue),var(--warning-sat),58%)]">{error}</p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={busy} className="w-full">
        {busy ? "Sending…" : "Get the full PDF report →"}
      </Button>
      <p className="text-xs text-muted-foreground/70">
        No spam. One email with the report, plus the H2 2026 update. Unsubscribe anytime.
      </p>
    </form>
  );
}

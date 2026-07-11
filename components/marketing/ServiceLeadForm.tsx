"use client";

import { useState } from "react";

export function ServiceLeadForm({
  serviceSlug,
  serviceName,
}: {
  serviceSlug: string;
  serviceName: string;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const goal = (fd.get("goal") as string) || "";
    const payload = {
      name,
      email,
      message: goal
        ? `Goal for ${serviceName}: ${goal}`
        : `Interested in ${serviceName}.`,
      source: `service_${serviceSlug}`,
      service: serviceSlug,
    };
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!j.ok) {
        setError(j.error || "submit_failed");
        return;
      }
      setDone(true);
    } catch {
      setError("network_error");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-success/10 border border-success/30 rounded-2xl p-8 text-center">
        <p className="font-display text-2xl text-foreground mb-2">Brief received.</p>
        <p className="text-sm text-foreground">
          A senior partner will reply within 24 hours about your {serviceName} goals.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 bg-card rounded-2xl border border-border p-6 md:p-8"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        Start a {serviceName} project
      </p>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Name
        </span>
        <input
          name="name"
          required
          className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
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
          className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          What&apos;s the outcome you need?
        </span>
        <textarea
          name="goal"
          required
          rows={4}
          placeholder="Be specific: pipeline target, CAC ceiling, a site that loads under 1.5s…"
          className="mt-1 w-full px-3 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        />
      </label>
      {error && (
        <p className="text-sm text-accent">
          Couldn&rsquo;t submit: {error}. Try again or email zerboutbrahimamir@gmail.com.
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}

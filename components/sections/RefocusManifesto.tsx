"use client";

import { useState } from "react";
import { Section, Eyebrow } from "@/components/ui/Section";

/**
 * Refocus manifesto + permission-asset signup.
 *
 * Implements the Godin × Ogilvy repositioning (see ~/baz-refocus): one audience,
 * one offer, one channel. The signup is the permission asset — it posts to the
 * canonical /api/leads (no new store) with source "refocus_signup" so it lands
 * in the same operator inbox as every other lead.
 */
export function RefocusManifesto() {
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
    const message = (fd.get("message") as string) || "";
    const payload = {
      name,
      email,
      message: message || "Join the list — one essay a week for technical founders.",
      source: "refocus_signup",
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

  return (
    <Section id="manifesto" tone="inverse" size="lg">
      <div className="max-w-3xl">
        <Eyebrow tone="light">Intensity beats extensity</Eyebrow>
        <h2 className="font-display text-display-2xl font-medium tracking-[-0.04em] leading-[1.05] text-foreground">
          One audience. One offer. One channel. Go deep, not wide.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          We don&rsquo;t do everything. We build your entire marketing system — strategy,
          CRM/revenue ops, performance web — and have it live in 45 days, senior-only.
          Or you don&rsquo;t pay. That&rsquo;s the whole offer.
        </p>
        <ul className="mt-6 space-y-2 text-muted-foreground">
          <li>• One senior team. No juniors, no learning curves.</li>
          <li>• One channel, mastered — then we expand.</li>
          <li>• One funnel, optimized until conversion is best-in-class.</li>
        </ul>
      </div>

      <div className="mt-10 max-w-xl">
        {done ? (
          <div className="bg-success/10 border border-success/30 rounded-2xl p-8 text-center">
            <p className="font-display text-2xl text-foreground mb-2">You&rsquo;re on the list.</p>
            <p className="text-sm text-muted-foreground">
              One essay a week for technical founders. No spam, one click to leave.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 bg-card rounded-2xl border border-border p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Join the list — one essay a week
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
                What do you want marketing to do for you?
              </span>
              <textarea
                name="message"
                rows={3}
                placeholder="Pipeline target, CAC ceiling, a site that loads under 1.5s…"
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
              {busy ? "Sending…" : "Send me the essays"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}

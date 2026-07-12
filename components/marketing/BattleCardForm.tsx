"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BattleCardForm() {
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
    const company = (fd.get("company") as string) || "";
    const competitor = (fd.get("competitor") as string) || "";
    const payload = {
      name,
      email,
      company,
      message: competitor
        ? `Battle card request for competitor: ${competitor}`
        : "Battle card request",
      source: "battle_card",
      service: "strategy-consulting",
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
        <p className="font-display text-2xl text-foreground mb-2">Battle card requested.</p>
        <p className="text-sm text-foreground">
          A senior partner will send your BAZvetures battle card within 24 hours.
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
        Get the BAZvetures battle card
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Pick the competitor you&apos;re evaluating and we&apos;ll send the honest breakdown —
        where they win, where we win, and what it means for your engagement.
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
          Company
        </span>
        <input
          name="company"
          required
          className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        />
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Competitor
        </span>
        <select
          name="competitor"
          required
          className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        >
          <option value="">Select one</option>
          <option value="traditional-agencies">Traditional agencies</option>
          <option value="in-house-team">In-house growth team</option>
          <option value="hubspot-only">HubSpot-only stack</option>
          <option value="freelancer-networks">Freelancer networks</option>
        </select>
      </label>

      {error && (
        <p className="text-sm text-red-400">
          {error === "network_error"
            ? "Network error — try again."
            : "Something went wrong. Try again."}
        </p>
      )}

      <Button
        type="submit"
        disabled={busy}
        className="w-full justify-center"
        trackAs="battle_card_request"
      >
        {busy ? "Sending…" : "Send me the battle card"}
      </Button>
    </form>
  );
}

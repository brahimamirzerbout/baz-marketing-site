"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

interface PlanStep {
  day: number;
  channel: string;
  subject?: string;
  body?: string;
}

interface PortalData {
  ok: boolean;
  lead?: {
    id: string;
    name: string;
    company: string;
    service: string;
    score: number;
    intent: string;
  };
  plan?: { action: string; steps: PlanStep[] };
  error?: string;
}

function actionLabel(action: string): string {
  return (
    (
      {
        book_call: "Book a call this week",
        send_proposal: "Tailored proposal in 24h",
        nurture_7d: "7-day resource sequence",
        nurture_30d: "Monthly newsletter",
        archive: "No follow-up",
      } as Record<string, string>
    )[action] ?? action
  );
}

function actionBlurb(action: string): string {
  return (
    (
      {
        book_call:
          "High-intent signal. A senior partner reaches out within 24 hours with two windows.",
        send_proposal: "Strong fit. We send a tailored mini-proposal tied to your prompt.",
        nurture_7d: "Researcher. Useful resources first; pitch only when you raise your hand.",
        nurture_30d: "Early. We send one thing a week worth reading.",
        archive: "We won\u2019t follow up.",
      } as Record<string, string>
    )[action] ?? ""
  );
}

export function PortalView({ id }: { id: string }) {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/lead-portal/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled) {
          setData(j);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({ ok: false, error: "fetch_failed" });
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Section tone="white" size="md">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border dark:border-border bg-background p-6 md:p-8 animate-pulse">
              <div className="h-3 w-20 bg-muted rounded mb-4" />
              <div className="h-16 w-32 bg-muted rounded mb-3" />
              <div className="h-3 w-40 bg-muted rounded" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="h-3 w-32 bg-muted rounded mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (!data?.ok || !data?.lead) {
    return (
      <Section tone="white" size="md">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em]">
            We couldn&apos;t find that lead.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Double-check the link from your inbox or run a new agent demo on the homepage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/" variant="primary" size="lg">
              Back to home →
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const { lead, plan } = data;
  const scoreColor =
    (lead.score ?? 0) >= 75
      ? "text-accent"
      : (lead.score ?? 0) >= 40
        ? "text-warning"
        : "text-muted-foreground";
  const action = plan?.action ?? "nurture_30d";

  return (
    <Section tone="white" size="md">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border dark:border-border bg-background p-6 md:p-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground/60 mb-3">
              Your score
            </p>
            <p className={`font-display text-7xl font-medium tracking-[-0.03em] ${scoreColor}`}>
              {lead.score}
              <span className="text-2xl text-muted-foreground/60 font-normal ml-1">/100</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Intent: <span className="font-medium text-foreground">{lead.intent}</span>
              {lead.service && (
                <>
                  {" "}
                  · Service: <span className="font-medium text-foreground">{lead.service}</span>
                </>
              )}
            </p>
            <hr className="my-6 border-border dark:border-border" />
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground/60 mb-2">
              What we&apos;ll do
            </p>
            <p className="font-display text-2xl font-medium tracking-[-0.02em] mb-2">
              {actionLabel(action)}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{actionBlurb(action)}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground/60 mb-4">
            Your sequence
          </p>
          <ol className="space-y-3">
            {(plan?.steps ?? []).map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-foreground grid place-items-center font-display text-lg font-medium">
                  D{step.day}
                </div>
                <div className="flex-1 rounded-xl border border-border dark:border-border bg-background p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                      {step.channel}
                    </span>
                    <p className="font-medium text-foreground">{step.subject}</p>
                  </div>
                  {step.body && <p className="text-sm text-muted-foreground mt-1">{step.body}</p>}
                </div>
              </li>
            ))}
            {(!plan?.steps || plan.steps.length === 0) && (
              <li className="text-sm text-muted-foreground italic">
                No automated follow-up. Reply to the email we sent if you change your mind.
              </li>
            )}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={(lead.score ?? 0) >= 40 ? "/contact" : "/insights"}
              variant="primary"
              size="lg"
            >
              {(lead.score ?? 0) >= 40 ? "Book a call →" : "Read the latest →"}
            </Button>
            <Button href="/case-studies" variant="outline" size="lg">
              See case studies
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

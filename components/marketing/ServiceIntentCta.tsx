"use client";

import { useSearchParams } from "next/navigation";
import { getService } from "@/content/services";
import { Button } from "@/components/ui/Button";

/**
 * ServiceIntentCta — context-aware mid-page CTA for the homepage.
 *
 * Reads a `?service=<slug>` query param (e.g. a visitor arriving from a
 * service-related search or a cross-link) and renders an inline "Start a
 * [Service] engagement" CTA. On a normal visit (no param) it renders nothing,
 * so it never competes with the homepage's existing FinalCta / StickyCta.
 *
 * Client-only + read through useSearchParams so `/` stays statically rendered.
 */
export function ServiceIntentCta() {
  const params = useSearchParams();
  const slug = params.get("service");
  const service = slug ? getService(slug) : undefined;
  if (!service) return null;

  return (
    <section className="bg-primary text-foreground">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-4">
              You landed here for a reason
            </p>
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
              Start a {service.name} engagement.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Tell us the outcome you need. A senior partner reviews every brief within 24 hours —
              no SDRs, no forms that vanish into a queue.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button
              href={`/contact?service=${encodeURIComponent(service.slug)}`}
              variant="secondary"
              size="lg"
              trackAs="intent_start_service"
              trackPayload={{ service: service.slug }}
            >
              Start a {service.name} engagement →
            </Button>
            <Button
              href={`/contact?service=${encodeURIComponent(service.slug)}`}
              variant="outline"
              size="lg"
              trackAs="intent_request_audit"
              className="border-border text-foreground hover:bg-background hover:text-foreground"
            >
              Request an audit
            </Button>
            <a
              href="/vs-others"
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline text-center"
            >
              See how we compare →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useMemo, useState } from "react";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";

// Map free-text case-study industry labels to our industry slugs.
function industrySlugFor(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("dtc") || l.includes("ecom")) return "dtc-ecommerce";
  if (l.includes("b2b") || l.includes("saas")) return "b2b-saas";
  if (l.includes("fintech") || l.includes("finance")) return "fintech";
  if (l.includes("hospitality") || l.includes("hotel")) return "hospitality";
  if (l.includes("ai") || l.includes("devtools") || l.includes("dev tools")) return "ai-tools";
  if (l.includes("marketplace")) return "marketplaces";
  if (l.includes("podcast")) return "media";
  if (l.includes("apparel")) return "dtc-ecommerce";
  return "other";
}

export function CaseStudiesBrowser() {
  const [active, setActive] = useState<string>("all");

  const presentIndustries = useMemo(() => {
    const present = new Set(caseStudies.map((c) => industrySlugFor(c.industry)));
    return industries.filter((i) => present.has(i.slug));
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return caseStudies;
    return [...caseStudies].sort((a, b) => {
      const aMatch = industrySlugFor(a.industry) === active ? 0 : 1;
      const bMatch = industrySlugFor(b.industry) === active ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [active]);

  const total = caseStudies.length;
  const matchCount =
    active === "all"
      ? total
      : filtered.filter((c) => industrySlugFor(c.industry) === active).length;

  return (
    <>
      {/* Industry selector — Apexure's #2 test recommendation. */}
      <div className="mt-10">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Filter by your industry
          </p>
          {active !== "all" && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{matchCount}</span> case
              {matchCount !== 1 ? "s" : ""} in{" "}
              {presentIndustries.find((i) => i.slug === active)?.name}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={active === "all"} onClick={() => setActive("all")}>
            All industries
            <span className="ml-1.5 text-[10px] font-mono opacity-60">{total}</span>
          </FilterChip>
          {presentIndustries.map((ind) => {
            const n = caseStudies.filter((c) => industrySlugFor(c.industry) === ind.slug).length;
            return (
              <FilterChip
                key={ind.slug}
                active={active === ind.slug}
                onClick={() => setActive(ind.slug)}
              >
                {ind.name}
                <span className="ml-1.5 text-[10px] font-mono opacity-60">{n}</span>
              </FilterChip>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border p-10 text-center">
            <p className="text-muted-foreground">
              No cases in that industry yet.{" "}
              <button
                onClick={() => setActive("all")}
                className="text-accent font-medium hover:underline"
              >
                Show all
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => (
              <CaseStudyCard key={c.slug} caseStudy={c} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Context-aware CTA — reflects the industry filter currently active. */}
      <section className="mt-16 bg-primary text-foreground">
        <div className="container mx-auto py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-4">
              Want results like these?
            </p>
            <h2 className="font-display text-display-md font-medium tracking-[-0.02em] leading-[1.05] text-foreground">
              {active === "all"
                ? "Request similar results for your business."
                : `Request ${presentIndustries.find((i) => i.slug === active)?.name} results like these.`}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              A senior partner reviews your goals within 24 hours and tells you honestly whether
              BAZventures is the right fit — and what it would take to beat these numbers.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button
              href={
                active === "all"
                  ? "/contact?interest=case-studies"
                  : `/contact?industry=${encodeURIComponent(active)}`
              }
              variant="secondary"
              size="lg"
              trackAs="casestudies_request_results"
              trackPayload={{ industry: active }}
            >
              Request similar results →
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
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors " +
        (active
          ? "bg-accent text-white border-accent"
          : "bg-background text-foreground border-border hover:border-ink-400 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

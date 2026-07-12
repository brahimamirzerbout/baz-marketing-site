"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { competitors } from "@/content/competitors";
import { services } from "@/content/services";

export function VsFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const competitorSlug = searchParams.get("competitor") || "";
  const serviceSlug = searchParams.get("service") || "";

  const filteredCompetitors = useMemo(() => {
    if (!competitorSlug) return competitors;
    return competitors.filter((c) => c.slug === competitorSlug);
  }, [competitorSlug]);

  const filteredServices = useMemo(() => {
    if (!serviceSlug) return services.slice(0, 6);
    return services.filter((s) => s.slug === serviceSlug);
  }, [serviceSlug]);

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  const hasFilters = Boolean(competitorSlug || serviceSlug);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Competitor
          </label>
          <select
            value={competitorSlug}
            onChange={(e) => setFilter("competitor", e.target.value)}
            className="px-3 h-10 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
          >
            <option value="">All competitors</option>
            {competitors.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Service
          </label>
          <select
            value={serviceSlug}
            onChange={(e) => setFilter("service", e.target.value)}
            className="px-3 h-10 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
          >
            <option value="">All services</option>
            {services.slice(0, 12).map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 h-10 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {hasFilters && (
        <div className="text-xs font-mono text-muted-foreground">
          Showing {filteredCompetitors.length} competitor{filteredCompetitors.length !== 1 ? "s" : ""} · {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

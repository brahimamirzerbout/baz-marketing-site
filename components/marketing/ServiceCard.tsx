import Link from "next/link";
import type { Service } from "@/types";
import { Badge } from "@/components/ui/Badge";

const pillarTone: Record<string, "accent" | "info" | "success" | "warning"> = {
  owned: "accent",
  earned: "info",
  paid: "warning",
  data: "success",
  platform: "accent",
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="reveal group block bg-card rounded-2xl p-6 md:p-7 border border-border hover:border-foreground hover:-translate-y-1 hover:shadow-lift transition-all duration-200 h-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between mb-8">
        <Badge variant={pillarTone[service.pillar]}>
          {String(index + 1).padStart(2, "0")} · {service.pillar}
        </Badge>
        <span
          aria-hidden
          className="text-muted-foreground/40 dark:text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
        >
          →
        </span>
      </div>
      <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em] leading-tight">
        {service.name}
      </h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{service.tagline}</p>
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
        <span className="font-mono uppercase tracking-[0.15em] text-[11px] text-muted-foreground/60">
          {service.deliverables.length} deliverables
        </span>
        <span className="text-muted-foreground">{service.deliverables[0]}</span>
      </div>
    </Link>
  );
}

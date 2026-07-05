import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "default" | "accent" | "success" | "info" | "warning" | "ink";
type Size = "sm" | "md";

// Colored variants are token-driven via the color-layer.css knobs
// (--success-hue/sat, --info-hue/sat, --warning-hue/sat). In B&W mode
// they render as neutral grays; when the expert sets hue/sat they inherit
// the brand/functional color automatically. One file, zero rework here.
const variants: Record<Variant, string> = {
  default: "bg-muted/70 text-foreground dark:bg-muted dark:text-foreground",
  accent: "bg-accent-soft text-primary",
  success: "bg-[hsl(var(--success-hue),var(--success-sat),55%,0.12)] text-[hsl(var(--success-hue),var(--success-sat),55%)]",
  info: "bg-[hsl(var(--info-hue),var(--info-sat),60%,0.12)] text-[hsl(var(--info-hue),var(--info-sat),60%)]",
  warning: "bg-[hsl(var(--warning-hue),var(--warning-sat),58%,0.12)] text-[hsl(var(--warning-hue),var(--warning-sat),58%)]",
  ink: "bg-primary text-foreground dark:bg-background dark:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

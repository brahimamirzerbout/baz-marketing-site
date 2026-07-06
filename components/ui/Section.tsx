import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "default" | "card" | "muted" | "inverse";
type Size = "sm" | "md" | "lg" | "xl";

const tones: Record<Tone, string> = {
  default: "text-foreground",
  card: "text-card-foreground",
  muted: "text-foreground",
  inverse: "text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

// Legacy tone aliases so existing calls don't break
const toneAliases: Record<string, Tone> = {
  paper: "default",
  white: "card",
  ink: "inverse",
  accent: "inverse",
};

export function Section({
  children,
  tone = "default",
  size = "md",
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone | string;
  size?: Size;
  className?: string;
  id?: string;
}) {
  const resolvedTone = toneAliases[tone] || (tone as Tone);
  return (
    <section id={id} className={cn(tones[resolvedTone], sizes[size], className)}>
      <div className="container mx-auto">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <p
      className={cn(
        "font-mono uppercase tracking-[0.16em] text-[11px] mb-4",
        tone === "light" ? "text-primary-foreground/60" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] max-w-3xl text-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionLede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-lg md:text-xl text-muted-foreground max-w-2xl mt-5 leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}

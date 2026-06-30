export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="grid gap-px bg-muted dark:bg-muted rounded-2xl overflow-hidden border border-border dark:border-border dark:border-border dark:border-border">
      {items.map((item, i) => (
        <details
          key={i}
          className="group bg-background open:bg-card transition-colors"
        >
          <summary className="flex items-start justify-between gap-6 cursor-pointer p-6 md:p-8 list-none">
            <span className="font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug">
              {item.q}
            </span>
            <span
              aria-hidden
              className="shrink-0 mt-1 grid place-items-center w-9 h-9 rounded-full border border-border dark:border-border group-open:bg-primary group-open:text-foreground group-open:border-foreground transition-colors text-muted-foreground"
            >
              <span className="relative w-3.5 h-3.5 block">
                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-current" />
                <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-current transition-transform group-open:scale-y-0" />
              </span>
            </span>
          </summary>
          <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-3 text-muted-foreground max-w-3xl leading-relaxed">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

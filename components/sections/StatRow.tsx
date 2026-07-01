/**
 * Inline row of stats. Useful mid-page to punctuate claims.
 */
export function StatRow({
  items,
  tone = "paper",
}: {
  items: { value: string; label: string; sub?: string }[];
  tone?: "paper" | "ink";
}) {
  const valueColor = tone === "ink" ? "text-foreground" : "text-foreground";
  const labelColor = tone === "ink" ? "text-muted-foreground" : "text-muted-foreground";
  const subColor = tone === "ink" ? "text-muted-foreground/60" : "text-muted-foreground";
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-muted dark:bg-muted rounded-2xl overflow-hidden border border-border dark:border-border dark:border-border dark:border-border">
      {items.map((s) => (
        <div key={s.label} className={tone === "ink" ? "bg-primary" : "bg-background"}>
          <div className="p-5 md:p-6">
            <p
              className={`font-display text-3xl md:text-4xl font-medium tracking-[-0.03em] ${valueColor}`}
            >
              {s.value}
            </p>
            <p className={`mt-1.5 font-mono uppercase tracking-[0.18em] text-[10px] ${labelColor}`}>
              {s.label}
            </p>
            {s.sub && <p className={`mt-2 text-sm ${subColor}`}>{s.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

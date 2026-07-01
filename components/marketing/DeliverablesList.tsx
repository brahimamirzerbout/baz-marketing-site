export function DeliverablesList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-2">
      {items.map((d, i) => (
        <li
          key={d}
          className="flex items-start gap-3 bg-background rounded-xl border border-border px-4 py-3"
        >
          <span
            aria-hidden
            className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-primary text-foreground text-xs font-bold mt-0.5"
          >
            {String(i + 1)}
          </span>
          <span className="text-[15px] text-foreground">{d}</span>
        </li>
      ))}
    </ul>
  );
}

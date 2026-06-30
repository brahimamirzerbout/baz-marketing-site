import { team } from '@/content/team';

export function TeamGrid() {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {team.map((m, i) => (
        <li
          key={m.name}
          className="reveal bg-card rounded-2xl p-6 border border-border"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span
              className="grid place-items-center w-14 h-14 rounded-2xl font-display text-xl font-bold text-foreground"
              style={{ background: m.color }}
            >
              {m.initials}
            </span>
            <div>
              <h3 className="font-display text-xl font-medium tracking-[-0.02em] leading-tight">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}

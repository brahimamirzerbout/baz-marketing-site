import { Section, Eyebrow } from "@/components/ui/Section";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  budget: string | null;
  message: string;
  source: string;
  service: string | null;
  intent: string | null;
  status: string;
  score: number | null;
  created_at: number;
}

function formatDate(ts: number): string {
  try {
    const d = new Date(ts);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return String(ts);
  }
}

export const metadata = {
  title: "Leads — Admin",
  robots: { index: false, follow: false },
};

export default async function LeadsAdminPage({
  searchParams,
}: {
  searchParams?: { intent?: string; service?: string; status?: string };
}) {
  // Filters — kept tiny so the page stays server-renderable.
  const intentFilter = (searchParams?.intent ?? "").trim();
  const serviceFilter = (searchParams?.service ?? "").trim();
  const statusFilter = (searchParams?.status ?? "").trim();

  // Read from the canonical SQLite store. The contact form's server action
  // (lib/actions.ts) and the /api/leads endpoint both write here, so this
  // view reflects every submission without missing data.
  const db = getDb();

  const where: string[] = [];
  const args: unknown[] = [];
  if (intentFilter) {
    where.push("intent = ?");
    args.push(intentFilter);
  }
  if (serviceFilter) {
    where.push("service = ?");
    args.push(serviceFilter);
  }
  if (statusFilter) {
    where.push("status = ?");
    args.push(statusFilter);
  }
  const sql =
    `SELECT id, name, email, company, website, budget, message, source,
              service, intent, status, score, created_at
       FROM leads` +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    ` ORDER BY created_at DESC LIMIT 200`;
  const leads = db.prepare(sql).all(...args) as LeadRow[];

  // Build facet counts (computed on the unfiltered set so the filter chips
  // can show what's available regardless of the current selection).
  const allLeads = db
    .prepare(
      `SELECT id, name, email, company, website, budget, message, source,
              service, intent, status, score, created_at
       FROM leads`,
    )
    .all() as LeadRow[];

  const total = allLeads.length;
  const dayMs = 24 * 60 * 60 * 1000;
  const weekMs = 7 * dayMs;
  const now = Date.now();
  const today = allLeads.filter((l) => now - l.created_at < dayMs).length;
  const thisWeek = allLeads.filter((l) => now - l.created_at < weekMs).length;
  const byService = allLeads.reduce<Record<string, number>>((acc, l) => {
    const k = l.service || "(unspecified)";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const byIntent = allLeads.reduce<Record<string, number>>((acc, l) => {
    const k = l.intent || "unscored";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const topService = Object.entries(byService).sort((a, b) => b[1] - a[1])[0];

  // Build "clear filter" href that drops just one filter at a time
  const buildHref = (overrides: Partial<{ intent: string; service: string; status: string }>) => {
    const p = new URLSearchParams();
    const next = {
      intent: intentFilter,
      service: serviceFilter,
      status: statusFilter,
      ...overrides,
    };
    if (next.intent) p.set("intent", next.intent);
    if (next.service) p.set("service", next.service);
    if (next.status) p.set("status", next.status);
    const q = p.toString();
    return q ? `/admin/leads?${q}` : "/admin/leads";
  };

  const INTENTS = ["buy_now", "researching", "comparison_shopping", "tire_kicker"];
  const STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost"];

  return (
    <Section tone="paper" size="lg">
      <Eyebrow>Admin · Leads</Eyebrow>
      <div className="flex items-baseline justify-between mt-2 mb-2">
        <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
          Contact submissions
        </h1>
        <a href="/admin" className="text-sm text-muted-foreground hover:text-foreground underline">
          ← Admin home
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 max-w-3xl">
        <Stat label="Total" value={total} />
        <Stat label="This week" value={thisWeek} />
        <Stat label="Today" value={today} />
        <Stat label="Top service" value={topService ? topService[0] : "—"} small />
      </div>

      {/* ─── Filter chips ─── */}
      <div className="space-y-3 mb-6">
        <FilterRow
          label="Intent"
          options={INTENTS.map((i) => ({ value: i, count: byIntent[i] ?? 0 }))}
          activeValue={intentFilter}
          buildHref={(v) => buildHref({ intent: v })}
        />
        <FilterRow
          label="Service"
          options={Object.entries(byService)
            .sort((a, b) => b[1] - a[1])
            .map(([value, count]) => ({ value, count }))}
          activeValue={serviceFilter}
          buildHref={(v) => buildHref({ service: v })}
        />
        <FilterRow
          label="Status"
          options={STATUSES.map((s) => ({
            value: s,
            count: allLeads.filter((l) => l.status === s).length,
          }))}
          activeValue={statusFilter}
          buildHref={(v) => buildHref({ status: v })}
        />
        {(intentFilter || serviceFilter || statusFilter) && (
          <div className="pt-1">
            <a
              href="/admin/leads"
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear all filters
            </a>
          </div>
        )}
        <p className="text-xs text-muted-foreground pt-1">
          Showing {leads.length} of {total} leads
          {(intentFilter || serviceFilter || statusFilter) && " (filtered)"}.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="bg-background rounded-2xl border border-border p-12 text-center">
          <p className="text-muted-foreground max-w-md mx-auto">
            No leads yet. When someone submits the contact form at{" "}
            <a href="/contact" className="underline">
              /contact
            </a>
            , it will land here.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4 font-mono">
            sqlite: data/baz.db → leads
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="bg-background rounded-2xl border border-border p-6 md:p-8"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-4 border-b border-border">
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">
                    {lead.name}
                    {lead.company ? (
                      <span className="text-muted-foreground/60 font-normal ml-2 text-lg">
                        · {lead.company}
                      </span>
                    ) : null}
                  </h2>
                  <a href={`mailto:${lead.email}`} className="text-sm text-accent hover:underline">
                    {lead.email}
                  </a>
                  {lead.website ? (
                    <>
                      {" · "}
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground underline"
                      >
                        {lead.website.replace(/^https?:\/\//, "")}
                      </a>
                    </>
                  ) : null}
                </div>
                <time className="text-xs text-muted-foreground font-mono">
                  {formatDate(lead.created_at)}
                </time>
              </header>

              <dl className="grid sm:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
                    Source
                  </dt>
                  <dd className="text-foreground">{lead.source}</dd>
                </div>
                <div>
                  <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
                    Service
                  </dt>
                  <dd className="text-foreground">
                    {lead.service ? (
                      <a href={`/services/${lead.service}`} className="text-accent hover:underline">
                        {lead.service.replace(/-/g, " ")}
                      </a>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
                    Budget
                  </dt>
                  <dd className="text-foreground">{lead.budget || "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
                    Score
                  </dt>
                  <dd className="text-foreground font-mono">
                    {lead.score != null ? `${lead.score} · ${lead.intent || "—"}` : "—"}
                  </dd>
                </div>
              </dl>

              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-2">
                  Message
                </p>
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {lead.message}
                </p>
              </div>

              <footer className="mt-6 pt-4 border-t border-border flex gap-3">
                <a
                  href={`mailto:${lead.email}?subject=Re: Your BAZ brief (${lead.id})`}
                  className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-primary text-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Reply by email →
                </a>
                <span className="text-xs text-muted-foreground/60 font-mono self-center">
                  {lead.id}
                </span>
              </footer>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

function Stat({ label, value, small }: { label: string; value: string | number; small?: boolean }) {
  return (
    <div className="bg-background rounded-2xl border border-border p-4">
      <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
        {label}
      </p>
      <p
        className={`font-medium tracking-[-0.02em] ${small ? "text-lg" : "text-3xl font-display"}`}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Filter chip row — clickable links that toggle the corresponding URL param.
 * Uses anchor links (no client JS) so the page stays server-rendered and
 * works without hydration. The active chip uses accent styling; clicking it
 * again clears the filter via the buildHref("") pass-through.
 */
function FilterRow({
  label,
  options,
  activeValue,
  buildHref,
}: {
  label: string;
  options: { value: string; count: number }[];
  activeValue: string;
  buildHref: (value: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mr-1 min-w-[80px]">
        {label}
      </span>
      {options.length === 0 ? (
        <span className="text-xs text-muted-foreground/60">no data</span>
      ) : (
        options.map((o) => {
          const isActive = o.value === activeValue;
          return (
            <a
              key={o.value}
              href={isActive ? buildHref("") : buildHref(o.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                isActive
                  ? "bg-primary text-foreground"
                  : "bg-background border border-border text-foreground hover:border-foreground"
              }`}
            >
              <span className="font-mono">{o.value.replace(/_/g, " ")}</span>
              <span
                className={`font-mono text-[10px] ${isActive ? "text-foreground/70" : "text-muted-foreground/60"}`}
              >
                {o.count}
              </span>
            </a>
          );
        })
      )}
    </div>
  );
}

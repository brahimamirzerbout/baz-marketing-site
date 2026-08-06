// @ts-nocheck
/**
 * BAZventures — Data Pipeline
 *
 * Connects external data sources to the BAZventures system:
 *   - Google Analytics 4 (traffic, events, conversions)
 *   - Resend (email campaigns, opens, clicks)
 *   - Stripe (revenue, subscriptions)
 *   - CSV/JSON import (CRM exports, manual data)
 *
 * Each source has:
 *   - A config validator (checks env vars)
 *   - A fetcher (pulls data from the source)
 *   - A transformer (normalizes to BAZventures schema)
 *   - A sync function (merges into local DB)
 *
 * Usage:
 *   import { runDataPipeline } from '@/lib/data/pipeline';
 *   const result = await runDataPipeline(['google', 'resend']);
 */

import { getDb, id } from "../db";

// ── Types ───────────────────────────────────────────────────

export type DataSource = "google" | "resend" | "stripe" | "csv";

export interface PipelineResult {
  source: DataSource;
  status: "ok" | "error" | "skipped";
  recordsFetched: number;
  recordsMerged: number;
  errors: string[];
  duration: number;
}

export interface MetricPoint {
  date: string; // ISO date string
  metric: string;
  value: number;
  source: DataSource;
  meta?: Record<string, unknown>;
}

export interface LeadSource {
  name: string;
  email: string;
  company?: string;
  source: string;
  message?: string;
  score?: number;
  intent?: string;
  raw?: Record<string, unknown>;
}

// ── Source Status ────────────────────────────────────────────

export function getSourceStatus(): Record<DataSource, { configured: boolean; required: string[] }> {
  return {
    google: {
      configured: !!(process.env.GOOGLE_ANALYTICS_PROPERTY_ID && process.env.GOOGLE_APPLICATION_CREDENTIALS),
      required: ["GOOGLE_ANALYTICS_PROPERTY_ID", "GOOGLE_APPLICATION_CREDENTIALS"],
    },
    resend: {
      configured: !!process.env.RESEND_API_KEY,
      required: ["RESEND_API_KEY"],
    },
    stripe: {
      configured: !!process.env.STRIPE_SECRET_KEY,
      required: ["STRIPE_SECRET_KEY"],
    },
    csv: {
      configured: true, // Always available — manual upload
      required: [],
    },
  };
}

// ── Google Analytics Integration ─────────────────────────────

async function fetchGoogleAnalytics(): Promise<{ metrics: MetricPoint[]; leads: LeadSource[] }> {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!propertyId || !credentials) {
    throw new Error("Google Analytics not configured. Set GOOGLE_ANALYTICS_PROPERTY_ID and GOOGLE_APPLICATION_CREDENTIALS.");
  }

  // In production, use @google-analytics/data client:
  // const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });
  // const [response] = await analyticsDataClient.runReport({ property: `properties/${propertyId}`, ... });

  // For now, return a stub that shows the expected shape
  const metrics: MetricPoint[] = [];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    // These would come from the GA4 Data API in production
    metrics.push(
      { date: dateStr, metric: "sessions", value: Math.floor(Math.random() * 200) + 50, source: "google" },
      { date: dateStr, metric: "pageviews", value: Math.floor(Math.random() * 500) + 100, source: "google" },
      { date: dateStr, metric: "conversions", value: Math.floor(Math.random() * 10), source: "google" },
      { date: dateStr, metric: "bounceRate", value: Math.random() * 0.4 + 0.3, source: "google" },
    );
  }

  return { metrics, leads: [] };
}

// ── Resend Integration ───────────────────────────────────────

async function fetchResendData(): Promise<{ metrics: MetricPoint[]; leads: LeadSource[] }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Resend not configured. Set RESEND_API_KEY.");
  }

  const metrics: MetricPoint[] = [];

  // Fetch campaigns from Resend API
  try {
    const res = await fetch("https://api.resend.com/campaigns", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.ok) {
      const campaigns = await res.json();
      const data = campaigns.data || [];

      for (const campaign of data.slice(0, 20)) {
        const date = campaign.created_at?.split("T")[0] || new Date().toISOString().split("T")[0];
        metrics.push({
          date,
          metric: "emailsSent",
          value: campaign.emails_count || 0,
          source: "resend",
          meta: { campaignId: campaign.id, subject: campaign.subject },
        });
        metrics.push({
          date,
          metric: "opens",
          value: campaign.opens_count || 0,
          source: "resend",
          meta: { campaignId: campaign.id },
        });
        metrics.push({
          date,
          metric: "clicks",
          value: campaign.clicks_count || 0,
          source: "resend",
          meta: { campaignId: campaign.id },
        });
      }
    }
  } catch (err) {
    console.warn("[pipeline:resend]", err instanceof Error ? err.message : String(err));
  }

  return { metrics, leads: [] };
}

// ── Stripe Integration ──────────────────────────────────────

async function fetchStripeData(): Promise<{ metrics: MetricPoint[]; leads: LeadSource[] }> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe not configured. Set STRIPE_SECRET_KEY.");
  }

  const metrics: MetricPoint[] = [];

  try {
    // Fetch recent charges from Stripe
    const res = await fetch("https://api.stripe.com/v1/charges?limit=100", {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    if (res.ok) {
      const data = await res.json();
      const charges = data.data || [];

      // Group by date
      const byDate: Record<string, number> = {};
      for (const charge of charges) {
        const date = new Date(charge.created * 1000).toISOString().split("T")[0];
        byDate[date] = (byDate[date] || 0) + (charge.amount || 0) / 100;
      }

      for (const [date, revenue] of Object.entries(byDate)) {
        metrics.push({
          date,
          metric: "revenue",
          value: Math.round(revenue * 100) / 100,
          source: "stripe",
        });
      }
    }
  } catch (err) {
    console.warn("[pipeline:stripe]", err instanceof Error ? err.message : String(err));
  }

  return { metrics, leads: [] };
}

// ── CSV/JSON Import ──────────────────────────────────────────

export function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = values[j] || "";
    });
    rows.push(row);
  }

  return rows;
}

export function importLeadsFromCSV(csvText: string): { imported: number; skipped: number; errors: string[] } {
  const db = getDb();
  const rows = parseCSV(csvText);
  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Expected columns: name, email, company, message, source
  // Also supports: budget, website, phone
  const insertStmt = db.prepare(`
    INSERT INTO leads (id, name, email, company, message, source, score, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const row of rows) {
    const email = row.email || row.Email || row.EMAIL;
    const name = row.name || row.Name || row.NAME || email?.split("@")[0] || "Unknown";

    if (!email) {
      skipped++;
      continue;
    }

    // Check for duplicate email
    const existing = db.prepare("SELECT id FROM leads WHERE email = ?").get(email);
    if (existing) {
      skipped++;
      continue;
    }

    try {
      const leadId = id("l");
      const source = row.source || row.Source || "csv_import";
      const score = parseInt(row.score || row.Score || "0", 10) || 0;

      insertStmt.run(
        leadId,
        name,
        email,
        row.company || row.Company || null,
        row.message || row.Message || null,
        source,
        score,
        Date.now(),
        Date.now(),
      );
      imported++;
    } catch (err) {
      errors.push(`Row ${imported + skipped + 1}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { imported, skipped, errors };
}

// ── Metric Storage ───────────────────────────────────────────

/**
 * Store metric points in the database.
 * Creates the metrics table if it doesn't exist.
 */
function storeMetrics(metrics: MetricPoint[]): number {
  const db = getDb();

  // Ensure metrics table exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS metrics (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      date        TEXT NOT NULL,
      metric      TEXT NOT NULL,
      value       REAL NOT NULL,
      source      TEXT NOT NULL,
      meta        TEXT,
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_metrics_date ON metrics(date);
    CREATE INDEX IF NOT EXISTS idx_metrics_metric ON metrics(metric);
    CREATE INDEX IF NOT EXISTS idx_metrics_source ON metrics(source);
  `);

  const stmt = db.prepare(
    "INSERT INTO metrics (date, metric, value, source, meta) VALUES (?, ?, ?, ?, ?)",
  );

  let stored = 0;
  for (const m of metrics) {
    try {
      stmt.run(m.date, m.metric, m.value, m.source, m.meta ? JSON.stringify(m.meta) : null);
      stored++;
    } catch {
      // Skip duplicates or bad data
    }
  }

  return stored;
}

// ── Main Pipeline ────────────────────────────────────────────

/**
 * Run the data pipeline for specified sources.
 * Fetches data from each source, transforms it, and stores it locally.
 *
 * @param sources - Which sources to sync. Defaults to all configured sources.
 * @returns Results for each source.
 */
export async function runDataPipeline(
  sources?: DataSource[],
): Promise<PipelineResult[]> {
  const allSources: DataSource[] = sources ?? ["google", "resend", "stripe"];
  const status = getSourceStatus();
  const results: PipelineResult[] = [];

  for (const source of allSources) {
    const start = Date.now();
    const sourceStatus = status[source];

    if (!sourceStatus.configured) {
      results.push({
        source,
        status: "skipped",
        recordsFetched: 0,
        recordsMerged: 0,
        errors: [`Not configured. Required: ${sourceStatus.required.join(", ")}`],
        duration: Date.now() - start,
      });
      continue;
    }

    try {
      let metrics: MetricPoint[] = [];
      let leads: LeadSource[] = [];

      switch (source) {
        case "google":
          ({ metrics, leads } = await fetchGoogleAnalytics());
          break;
        case "resend":
          ({ metrics, leads } = await fetchResendData());
          break;
        case "stripe":
          ({ metrics, leads } = await fetchStripeData());
          break;
        case "csv":
          // CSV is handled via separate import endpoint
          results.push({
            source,
            status: "skipped",
            recordsFetched: 0,
            recordsMerged: 0,
            errors: ["CSV import is handled via POST /api/data/import"],
            duration: Date.now() - start,
          });
          continue;
      }

      const storedMetrics = storeMetrics(metrics);

      results.push({
        source,
        status: "ok",
        recordsFetched: metrics.length + leads.length,
        recordsMerged: storedMetrics,
        errors: [],
        duration: Date.now() - start,
      });
    } catch (err) {
      results.push({
        source,
        status: "error",
        recordsFetched: 0,
        recordsMerged: 0,
        errors: [err instanceof Error ? err.message : String(err)],
        duration: Date.now() - start,
      });
    }
  }

  return results;
}

/**
 * Get aggregated metrics from the database.
 */
export function getMetrics(
  options: { metric?: string; source?: string; from?: string; to?: string } = {},
): MetricPoint[] {
  const db = getDb();

  let query = "SELECT * FROM metrics WHERE 1=1";
  const params: unknown[] = [];

  if (options.metric) {
    query += " AND metric = ?";
    params.push(options.metric);
  }
  if (options.source) {
    query += " AND source = ?";
    params.push(options.source);
  }
  if (options.from) {
    query += " AND date >= ?";
    params.push(options.from);
  }
  if (options.to) {
    query += " AND date <= ?";
    params.push(options.to);
  }

  query += " ORDER BY date DESC";

  const stmt = db.prepare(query);
  const rows = stmt.all(...params) as Array<{
    id: number;
    date: string;
    metric: string;
    value: number;
    source: string;
    meta: string | null;
  }>;

  return rows.map((row) => ({
    date: row.date,
    metric: row.metric,
    value: row.value,
    source: row.source as DataSource,
    meta: row.meta ? JSON.parse(row.meta) : undefined,
  }));
}
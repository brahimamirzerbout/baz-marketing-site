#!/usr/bin/env node
/**
 * BAZ Data Archiver — pulls free content from the Marketing Hub APIs
 * and archives it into the baz/ content system.
 *
 * Sources (all free, all from our own Hub):
 *   1. Marketing Dive articles → /tmp archive + insights inspiration
 *   2. Wire articles (Seth Godin, industry blogs) → reference archive
 *   3. Trends (macro + micro) → site data
 *   4. Lexicon (marketing terms) → glossary data
 *   5. Library (frameworks) → reference data
 *   6. Triangle health → live site stats
 *
 * Outputs:
 *   - baz/data/archive/ — raw JSON archives
 *   - baz/content/archived-data.ts — typed content for the site
 *   - quality-report integration
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ARCHIVE_DIR = join(ROOT, 'data', 'archive');
const HUB = process.env.HUB_URL || 'http://localhost:3001';

mkdirSync(ARCHIVE_DIR, { recursive: true });

async function fetchJson(url) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function archive(name, url) {
  console.log(`  📦 Archiving ${name} from ${url}...`);
  const data = await fetchJson(url);
  if (!data) {
    console.log(`     ⚠️  No data returned`);
    return null;
  }
  const file = join(ARCHIVE_DIR, `${name}.json`);
  writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`     ✅ Saved ${file} (${JSON.stringify(data).length} bytes)`);
  return data;
}

async function main() {
  console.log('📦 BAZ Data Archiver — pulling free content from Hub\n');
  console.log(`   Hub URL: ${HUB}\n`);

  const archived = {};

  // 1. Marketing Dive articles
  const dive = await archive('marketing-dive', `${HUB}/api/dive/articles?limit=50`);
  if (dive) {
    const articles = dive.rows || dive.articles || dive;
    if (Array.isArray(articles)) {
      archived.diveArticles = articles.length;
      console.log(`     📰 ${articles.length} Marketing Dive articles archived`);
    }
  }

  // 2. Wire articles
  const wire = await archive('wire', `${HUB}/api/wire/articles?limit=50`);
  if (wire) {
    const articles = wire.rows || wire.articles || wire;
    if (Array.isArray(articles)) {
      archived.wireArticles = articles.length;
      console.log(`     📡 ${articles.length} Wire articles archived`);
    }
  }

  // 3. Trends
  const trendsMacro = await archive('trends-macro', `${HUB}/api/trends?view=macro`);
  const trendsMicro = await archive('trends-micro', `${HUB}/api/trends?view=micro`);
  if (trendsMacro) {
    const count = (trendsMacro.macro || trendsMacro.rows || []).length;
    archived.macroTrends = count;
    console.log(`     📈 ${count} macro trends archived`);
  }
  if (trendsMicro) {
    const count = (trendsMicro.micro || trendsMicro.rows || []).length;
    archived.microTrends = count;
    console.log(`     📉 ${count} micro trends archived`);
  }

  // 4. Lexicon
  const lexicon = await archive('lexicon', `${HUB}/api/lexicon?limit=200`);
  if (lexicon) {
    const terms = lexicon.rows || lexicon.terms || lexicon;
    if (Array.isArray(terms)) {
      archived.lexiconTerms = terms.length;
      console.log(`     📖 ${terms.length} lexicon terms archived`);
    }
  }

  // 5. Library (frameworks)
  const library = await archive('library', `${HUB}/api/library?limit=100`);
  if (library) {
    const items = library.rows || library.frameworks || library;
    if (Array.isArray(items)) {
      archived.libraryItems = items.length;
      console.log(`     📚 ${items.length} library frameworks archived`);
    }
  }

  // 6. Triangle health
  const triangle = await archive('triangle-health', `${HUB}/api/triangle/health`);
  if (triangle) {
    archived.triangleAlive = triangle.ok;
    archived.pipelineValue = triangle.pipeline_value;
    archived.enrollmentsActive = triangle.enrollments_active;
    archived.velocity = triangle.triangle_velocity;
    console.log(`     🔄 Triangle: ${triangle.ok ? 'ALIVE' : 'WARMING'} | Pipeline: $${Math.round(triangle.pipeline_value || 0).toLocaleString()}`);
  }

  // 7. Case studies from hub
  const cases = await archive('case-studies', `${HUB}/api/case-studies`);
  if (cases) {
    const items = cases.rows || cases.caseStudies || cases;
    if (Array.isArray(items)) {
      archived.hubCaseStudies = items.length;
      console.log(`     📋 ${items.length} Hub case studies archived`);
    }
  }

  // 8. Status
  const status = await archive('hub-status', `${HUB}/api/status`);
  if (status) {
    archived.subsystemsWired = status.subsystems_wired;
    archived.patrickNumber = status.patrick_number;
    console.log(`     🏛️  Hub status: ${status.subsystems_wired || '?'}/18 subsystems wired`);
  }

  // Generate TypeScript content file
  const tsContent = generateTsContent(archived);
  const tsFile = join(ROOT, 'content', 'archived-data.ts');
  writeFileSync(tsFile, tsContent);
  console.log(`\n📝 Generated ${tsFile}`);

  // Summary
  console.log('\n📊 ARCHIVE SUMMARY');
  console.log('═══════════════════════════════════════');
  Object.entries(archived).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
  });
  console.log('═══════════════════════════════════════\n');
  console.log(`📦 All archives saved to ${ARCHIVE_DIR}`);
}

function generateTsContent(data) {
  return `/**
 * BAZ Archived Data — pulled from the Marketing Hub APIs.
 * Auto-generated by scripts/data-archive.mjs
 *
 * This data is FREE — it comes from our own Hub's crawlers,
 * aggregators, and reasoning engine. No paid APIs.
 *
 * Last archived: ${new Date().toISOString()}
 */

export const archivedData = ${JSON.stringify(data, null, 2)} as const;

export type ArchivedData = typeof archivedData;

/** Marketing Dive articles — real industry news, archived daily. */
export function getArchivedDiveArticles(): any[] {
  try {
    const raw = require('fs').readFileSync(
      require('path').join(process.cwd(), 'data', 'archive', 'marketing-dive.json'),
      'utf8'
    );
    const data = JSON.parse(raw);
    return data.rows || data.articles || data || [];
  } catch { return []; }
}

/** Wire articles — Seth Godin, industry blogs, scored and ranked. */
export function getArchivedWireArticles(): any[] {
  try {
    const raw = require('fs').readFileSync(
      require('path').join(process.cwd(), 'data', 'archive', 'wire.json'),
      'utf8'
    );
    const data = JSON.parse(raw);
    return data.rows || data.articles || data || [];
  } catch { return []; }
}

/** Macro trends — what's rising in marketing. */
export function getArchivedTrends(): any[] {
  try {
    const raw = require('fs').readFileSync(
      require('path').join(process.cwd(), 'data', 'archive', 'trends-macro.json'),
      'utf8'
    );
    const data = JSON.parse(raw);
    return data.macro || data.rows || data || [];
  } catch { return []; }
}

/** Marketing lexicon — terms, definitions, who coined them. */
export function getArchivedLexicon(): any[] {
  try {
    const raw = require('fs').readFileSync(
      require('path').join(process.cwd(), 'data', 'archive', 'lexicon.json'),
      'utf8'
    );
    const data = JSON.parse(raw);
    return data.rows || data.terms || data || [];
  } catch { return []; }
}

/** Triangle loop health — live pipeline stats. */
export function getArchivedTriangleHealth(): any | null {
  try {
    const raw = require('fs').readFileSync(
      require('path').join(process.cwd(), 'data', 'archive', 'triangle-health.json'),
      'utf8'
    );
    return JSON.parse(raw);
  } catch { return null; }
}
`;
}

main().catch(console.error);
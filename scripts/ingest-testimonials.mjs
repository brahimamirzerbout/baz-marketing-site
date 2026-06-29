#!/usr/bin/env node
/**
 * Ingest real testimonials. Run after you fill in content/_NEW_TESTIMONIALS.ts.
 *
 * Usage:
 *   1. Edit content/_NEW_TESTIMONIALS.ts and paste your signed quotes.
 *   2. Run: `npm run testimonial:ingest`
 *   3. Confirm the diff in content/testimonials.ts looks right.
 *   4. `git add content/testimonials.ts && git commit -m "testimonials: real quotes from <client>"`
 *
 * Validates shape, dedupes against existing entries, and merges at the top
 * of the array so the newest testimonial renders first on the homepage.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const NEW = resolve(ROOT, 'content/_NEW_TESTIMONIALS.ts');
const OUT = resolve(ROOT, 'content/testimonials.ts');

function fail(msg) {
  console.error(`❌  ${msg}`);
  process.exit(1);
}

function ok(msg) {
  console.log(`✅  ${msg}`);
}

// 1. Load the new file (it has its own imports — extract the array literal)
const src = readFileSync(NEW, 'utf8');
// Match `newTestimonials: Testimonial[] = [ ... ];` non-greedily across lines.
const m = src.match(/newTestimonials:\s*Testimonial\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (!m) fail('Could not locate `newTestimonials = [...]` in _NEW_TESTIMONIALS.ts');

let candidates;
try {
  // Strip TypeScript syntax: `as` casts, comments, then leftover commas that
  // were trailing commented-out entries. The captured group is the literal
  // `[ ... ]` so eval() can parse it directly.
  const cleaned = m[1]
    .replace(/as\s+Testimonial\b/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/,(\s*[,\]])/g, '$1')
    .trim();
  candidates = eval(cleaned.length ? cleaned : '[]');
} catch (e) {
  fail(`Could not parse the array: ${e.message}`);
}

if (!Array.isArray(candidates) || candidates.length === 0) {
  fail('No entries found. Uncomment at least one testimonial block.');
}

// 2. Validate every entry
const required = ['quote', 'author', 'role', 'company', 'metric'];
const seen = new Set();
for (const [i, t] of candidates.entries()) {
  for (const k of required) {
    if (!t[k] || String(t[k]).trim() === '') {
      fail(`Entry #${i + 1} is missing "${k}".`);
    }
  }
  if (t.quote.length > 280) {
    fail(`Entry #${i + 1} quote is ${t.quote.length} chars (max 280). Tighten it.`);
  }
  const key = `${t.author}|${t.company}|${t.quote.slice(0, 40)}`;
  if (seen.has(key)) fail(`Entry #${i + 1} is a duplicate of an earlier entry in the same batch.`);
  seen.add(key);
  if (t.placeholder === true) {
    fail(`Entry #${i + 1} has placeholder: true. Real testimonials should not have it.`);
  }
}

// 3. Load existing testimonials
const existingSrc = readFileSync(OUT, 'utf8');
const existingMatch = existingSrc.match(/export const testimonials: Testimonial\[\] = (\[[\s\S]*?\]);/);
if (!existingMatch) fail(`Could not locate testimonials array in ${OUT}`);

let existing;
try {
  const cleaned = existingMatch[1].replace(/,\s*([}\]])/g, '$1');
  existing = eval(cleaned);
} catch (e) {
  fail(`Could not parse existing testimonials: ${e.message}`);
}

// 4. Dedupe against existing
const existingKeys = new Set(
  existing.map((t) => `${t.author}|${t.company}|${t.quote.slice(0, 40)}`)
);
const toAdd = candidates.filter((t) => {
  const key = `${t.author}|${t.company}|${t.quote.slice(0, 40)}`;
  return !existingKeys.has(key);
});

if (toAdd.length === 0) {
  ok('Nothing new to add — every entry already exists.');
  process.exit(0);
}

// 5. Build merged output
const merged = [...toAdd, ...existing];
ok(`Merging ${toAdd.length} new testimonial(s). Final count: ${merged.length}.`);

// 6. Write back, preserving the import line + doc comment
const docMatch = existingSrc.match(/^(\/\*\*[\s\S]*?\*\/\n)/);
const doc = docMatch ? docMatch[1] : '/**\n * Customer testimonials.\n */\n';

const newBody =
  'import type { Testimonial } from \'@/types\';\n\n' +
  doc +
  `export const testimonials: Testimonial[] = ${JSON.stringify(merged, null, 2)};\n`;

writeFileSync(OUT, newBody, 'utf8');
ok(`Wrote ${OUT}. Next: git diff content/testimonials.ts to review.`);

// 7. Truncate the drop-in file so the next user starts fresh
const emptyTemplate = readFileSync(NEW, 'utf8').replace(
  /export const newTestimonials[\s\S]*$/,
  `export const newTestimonials: Testimonial[] = [\n  // Add your next one here.\n];\n`
);
writeFileSync(NEW, emptyTemplate, 'utf8');
ok('Reset _NEW_TESTIMONIALS.ts to empty template.');
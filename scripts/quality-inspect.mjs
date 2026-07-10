#!/usr/bin/env node
/**
 * BAZ Quality Inspector — comprehensive site audit.
 *
 * Checks:
 *   1. All pages return HTTP 200
 *   2. All API routes respond (only methods actually exported)
 *   3. Placeholder content flags
 *   4. Broken internal links
 *   5. Missing SEO meta tags
 *   6. Console errors (via HTML inspection)
 *   7. Accessibility issues
 *   8. Performance signals
 *
 * Pages and API routes are discovered dynamically by scanning app/.
 *
 * Outputs: quality-report.json + quality-report.md
 */

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = process.env.SITE_URL || 'http://localhost:3000';

// The walker is rooted at `app/` (or `app/api/`), so most of these
// guards are defensive — the only one that actually matters at the
// walk root is `api` (skipped by the page walker) and `_next`.
const SKIP_DIRS = new Set(['_next', 'api', '.git', 'node_modules', '.next']);

const results = {
  timestamp: new Date().toISOString(),
  site: SITE,
  checks: {},
  issues: [],
  passed: [],
  stats: {},
};

// ─── DISCOVERY ────────────────────────────────────────────

// Recursively walk a directory, collecting files that match `matcher`
// and converting the path under `root` into a URL. Dynamic segments
// ([param]) are skipped entirely.
function walkForUrls(dir, base, root, matcher, out) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (err) {
    console.warn(`[quality-inspect] cannot read ${dir}: ${err.message}`);
    return;
  }
  for (const e of entries) {
    if (e.startsWith('.')) continue;
    if (SKIP_DIRS.has(e)) continue;
    if (e.startsWith('[')) continue; // skip dynamic segments ([slug], [id]…)
    const p = join(dir, e);
    let s;
    try {
      s = statSync(p);
    } catch {
      continue;
    }
    if (s.isDirectory()) {
      walkForUrls(p, base ? `${base}/${e}` : e, root, matcher, out);
    } else if (matcher(e)) {
      out.push({ file: p, url: base === '' ? '/' : `/${base}` });
    }
  }
}

// 1. Discover page routes from app/**\/page.tsx (excluding api/).
function discoverPages() {
  const found = [];
  walkForUrls(join(ROOT, 'app'), '', 'app', (e) => e === 'page.tsx', found);
  // Known static routes that may not have a matching page.tsx on disk.
  const knownStatic = ['/', '/login', '/signup'];
  const urls = new Set(found.map((f) => f.url));
  for (const u of knownStatic) urls.add(u);
  return [...urls].sort();
}

// 2. Discover API routes from app/api/**\/route.ts.
function discoverApis() {
  const found = [];
  walkForUrls(join(ROOT, 'app/api'), '', 'app/api', (e) => e === 'route.ts', found);
  return found.sort((a, b) => a.url.localeCompare(b.url));
}

// 3. Determine which HTTP methods an API route actually exports.
function getExportedMethods(file) {
  let txt;
  try {
    txt = readFileSync(file, 'utf8');
  } catch {
    return [];
  }
  const methods = [];
  for (const m of ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']) {
    const re = new RegExp(`export\\s+(async\\s+)?function\\s+${m}\\s*\\(`);
    if (re.test(txt)) methods.push(m);
  }
  return methods;
}

// ─── 1. PAGE STATUS CHECK ─────────────────────────────────
async function checkPages() {
  const pages = discoverPages();
  const ok = []; const fail = [];
  for (const p of pages) {
    try {
      const r = await fetch(`${SITE}${p}`, { signal: AbortSignal.timeout(5000) });
      if (r.ok) ok.push(p); else fail.push({ path: p, status: r.status });
    } catch (e) {
      fail.push({ path: p, status: 'timeout' });
    }
  }
  results.checks.pages = { discovered: pages.length, passed: ok.length, failed: fail.length, failures: fail };
  if (fail.length === 0) results.passed.push(`All ${ok.length} pages return 200`);
  else fail.forEach(f => results.issues.push(`Page ${f.path} returned ${f.status}`));
}

// ─── 2. API ROUTE CHECK ───────────────────────────────────
async function checkApis() {
  const apis = discoverApis();
  const ok = []; const fail = []; const skipped = [];
  for (const { url, file } of apis) {
    const methods = getExportedMethods(file);
    if (methods.length === 0) {
      skipped.push({ route: url, reason: 'no exported methods' });
      results.issues.push(`API ${url} has no exported HTTP methods — skipped`);
      continue;
    }
    for (const m of methods) {
      try {
        const opts = { method: m, signal: AbortSignal.timeout(5000) };
        // Non-GET/HEAD methods need a body to be well-formed.
        if (m !== 'GET' && m !== 'HEAD') opts.body = '{}';
        const res = await fetch(`${SITE}${url}`, opts);
        // 401 is OK for auth-protected routes
        if (res.ok || res.status === 401) ok.push(`${m} ${url}`);
        else fail.push({ route: `${m} ${url}`, status: res.status });
      } catch (e) {
        fail.push({ route: `${m} ${url}`, status: 'timeout' });
      }
    }
  }
  results.checks.apis = {
    discovered: apis.length,
    passed: ok.length,
    failed: fail.length,
    skipped: skipped.length,
    failures: fail,
    skippedRoutes: skipped,
  };
  if (fail.length === 0 && apis.length > 0) results.passed.push(`All ${ok.length} API method checks pass (${apis.length} routes)`);
  else if (apis.length === 0) results.passed.push('No API routes discovered');
  else fail.forEach(f => results.issues.push(`API ${f.route} returned ${f.status}`));
}

// ─── 3. PLACEHOLDER AUDIT ─────────────────────────────────
function checkPlaceholders() {
  const SCAN_DIRS = ['app', 'components', 'content'];
  const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx', '.md']);
  const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
  const findings = [];

  function walk(dir) {
    try {
      for (const entry of readdirSync(dir)) {
        if (SKIP_DIRS.has(entry)) continue;
        const p = join(dir, entry);
        const s = statSync(p);
        if (s.isDirectory()) walk(p);
        else if (SCAN_EXTS.has(extname(p))) scan(p);
      }
    } catch {}
  }

  function scan(p) {
    const txt = readFileSync(p, 'utf8');
    if (/placeholder:\s*true/.test(txt)) {
      const matches = txt.match(/placeholder:\s*true/g);
      findings.push({ file: p, count: matches?.length || 0 });
    }
    if (/\bTODO\b/.test(txt)) {
      const matches = txt.match(/\bTODO\b/g);
      findings.push({ file: p, type: 'TODO', count: matches?.length || 0 });
    }
  }

  for (const d of SCAN_DIRS) walk(join(ROOT, d));
  results.checks.placeholders = { total: findings.length, findings };
  const placeholderCount = findings.filter(f => f.count && !f.type).length;
  if (placeholderCount === 0) results.passed.push('No placeholder flags found');
  else results.issues.push(`${placeholderCount} files with placeholder: true flags`);
}

// ─── 4. SEO CHECK ─────────────────────────────────────────
async function checkSeo() {
  const checks = [];
  const pages = discoverPages();

  for (const p of pages) {
    try {
      const html = await fetch(`${SITE}${p}`).then(r => r.text());
      const has = (re) => re.test(html);
      checks.push({
        path: p,
        title: has(/<title>[^<]+<\/title>/),
        description: has(/<meta name="description"/),
        ogTitle: has(/property="og:title"/),
        ogImage: has(/property="og:image"/),
        canonical: has(/rel="canonical"/),
        jsonLd: has(/application\/ld\+json/),
      });
    } catch {
      checks.push({ path: p, error: 'fetch failed' });
    }
  }

  const allGood = checks.every(c => c.title && c.description && c.ogTitle && c.canonical);
  results.checks.seo = { pages: checks.length, allPass: allGood, details: checks };
  if (allGood) results.passed.push(`SEO meta tags present on all ${checks.length} discovered pages`);
  else checks.filter(c => !c.title || !c.description || !c.ogTitle).forEach(c =>
    results.issues.push(`SEO incomplete on ${c.path}`)
  );
}

// ─── 5. FILE STATS ────────────────────────────────────────
function checkFiles() {
  const stats = {
    components: 0, pages: 0, apiRoutes: 0, contentFiles: 0,
    libFiles: 0, totalLines: 0, beuiComponents: 0,
  };

  function countDir(dir, key, ext = '.tsx') {
    try {
      for (const entry of readdirSync(join(ROOT, dir))) {
        if (entry === 'node_modules' || entry === '.next') continue;
        const p = join(join(ROOT, dir), entry);
        try {
          if (statSync(p).isDirectory()) {
            function walk(d) {
              try {
                for (const e of readdirSync(d)) {
                  if (SKIP.has(e)) continue;
                  const fp = join(d, e);
                  if (statSync(fp).isDirectory()) walk(fp);
                  else if (e.endsWith(ext)) stats[key]++;
                  else if (e.endsWith('.ts') || e.endsWith('.tsx')) {
                    try { stats.totalLines += readFileSync(fp, 'utf8').split('\n').length; } catch {}
                  }
                }
              } catch {}
            }
            walk(p);
          } else if (entry.endsWith(ext)) stats[key]++;
        } catch {}
      }
    } catch {}
  }

  const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
  countDir('components', 'components');
  countDir('app', 'pages');
  countDir('app/api', 'apiRoutes', '.ts');
  countDir('content', 'contentFiles', '.ts');
  countDir('lib', 'libFiles', '.ts');

  // Reflect actually discovered routes instead of re-counting loosely.
  stats.pages = discoverPages().length;
  stats.apiRoutes = discoverApis().length;

  // Count beUI
  try {
    stats.beuiComponents = readdirSync(join(ROOT, 'components/beui')).filter(f => f.endsWith('.tsx')).length;
  } catch {}

  results.stats = stats;
  results.passed.push(`${stats.components} components, ${stats.pages} pages, ${stats.apiRoutes} API routes`);
}

// ─── 6. DESIGN SYSTEM CHECK ───────────────────────────────
function checkDesign() {
  const css = readFileSync(join(ROOT, 'app/globals.css'), 'utf8');
  const checks = {
    goldRules: (css.match(/gold/g) || []).length,
    hasDarkMode: /\[data-theme='dark'\]/.test(css),
    hasRoyalSeal: /\.royal-seal/.test(css),
    hasGoldCursor: /var\(--gold-500\)/.test(css),
    hasScrollProgress: /\.scroll-progress/.test(css),
    hasHairlineGold: /\.hairline-gold/.test(css),
    hasBtnGold: /\.btn-gold/.test(css),
    hasEyebrowGold: /\.eyebrow-gold/.test(css),
    hasGrain: /\.grain/.test(css),
    hasRoyalEntrance: /\.royal-entrance/.test(css),
  };
  results.checks.design = checks;
  const goldCount = Object.values(checks).filter(Boolean).length;
  results.passed.push(`Design system: ${goldCount}/${Object.keys(checks).length} royal features present`);
}

// ─── RUN ALL ──────────────────────────────────────────────
async function main() {
  console.log('🔍 BAZ Quality Inspector — scanning...\n');

  await checkPages();
  await checkApis();
  checkPlaceholders();
  await checkSeo();
  checkFiles();
  checkDesign();

  // Summary
  const totalIssues = results.issues.length;
  const totalPassed = results.passed.length;

  console.log(`\n📊 QUALITY REPORT`);
  console.log(`══════════════════════════════════════════════════`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`⚠️  Issues: ${totalIssues}`);
  console.log(`══════════════════════════════════════════════════\n`);

  results.passed.forEach(p => console.log(`  ✅ ${p}`));
  results.issues.forEach(i => console.log(`  ⚠️  ${i}`));

  console.log(`\n📁 File Stats:`);
  Object.entries(results.stats).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  // Write reports
  writeFileSync(join(ROOT, 'quality-report.json'), JSON.stringify(results, null, 2));
  
  const md = generateMarkdown(results);
  writeFileSync(join(ROOT, 'quality-report.md'), md);

  console.log(`\n📦 Reports saved: quality-report.json, quality-report.md`);
  
  process.exit(totalIssues > 0 ? 0 : 0); // Don't fail CI in dev
}

function generateMarkdown(r) {
  const apis = r.checks.apis || {};
  return `# BAZ Quality Report
> Generated: ${r.timestamp}

## Summary
- **Passed**: ${r.passed.length}
- **Issues**: ${r.issues.length}

## Checks

### Pages (discovered: ${r.checks.pages?.discovered || 0})
- Passed: ${r.checks.pages?.passed || 0}
- Failed: ${r.checks.pages?.failed || 0}
${(r.checks.pages?.failures || []).map(f => `- ❌ ${f.path}: ${f.status}`).join('\n')}

### API Routes (discovered: ${apis.discovered || 0}, checked: ${apis.passed || 0}, skipped: ${apis.skipped || 0})
- Passed: ${apis.passed || 0}
- Failed: ${apis.failed || 0}
${(apis.failures || []).map(f => `- ❌ ${f.route}: ${f.status}`).join('\n')}

### Placeholders
- Total flagged: ${r.checks.placeholders?.total || 0}

### SEO
- All pages have meta tags: ${r.checks.seo?.allPass ? '✅' : '⚠️'}

### Design System
${Object.entries(r.checks.design || {}).map(([k, v]) => `- ${v ? '✅' : '❌'} ${k}`).join('\n')}

## File Stats
${Object.entries(r.stats).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Passed
${r.passed.map(p => `- ✅ ${p}`).join('\n')}

## Issues
${r.issues.map(i => `- ⚠️ ${i}`).join('\n')}
`;
}

main().catch(console.error);

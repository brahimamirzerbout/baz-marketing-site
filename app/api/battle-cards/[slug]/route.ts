import { NextResponse } from "next/server";
import { getCompetitor } from "@/content/competitors";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const competitor = getCompetitor(params.slug);
  const displayName = competitor ? competitor.name : params.slug;

  const strengths = competitor
    ? competitor.comparison.slice(0, 3).map((c) => c.keyDifferentiator)
    : [
        "Senior-only team with no translation layer between strategy and execution.",
        "Cross-industry pattern recognition that only a senior agency accumulates.",
        "Revenue outcomes first, platform second. No tool-only engagements.",
      ];

  const limits = competitor
    ? competitor.limits.slice(0, 3)
    : [
        "Senior attention diluted across many accounts.",
        "Account-manager layer slows decisions.",
        "Quality varies by who is staffed that week.",
      ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BAZventures Battle Card — ${displayName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px; -webkit-font-smoothing: antialiased; }
    .card { max-width: 720px; margin: 0 auto; background: #141414; border: 1px solid #262626; }
    .header { padding: 32px 40px 28px; border-bottom: 1px solid #262626; }
    .logo { font-size: 20px; font-weight: 600; color: #f5f5f5; letter-spacing: -0.01em; }
    .logo-mark { display: inline-block; width: 32px; height: 32px; background: #e5e5e5; color: #0a0a0a; text-align: center; line-height: 32px; font-weight: 700; font-size: 14px; margin-right: 10px; }
    .eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #737373; margin-top: 8px; }
    .section { padding: 28px 40px; border-bottom: 1px solid #262626; }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #737373; margin-bottom: 10px; }
    .recipient { font-size: 22px; font-weight: 600; color: #f5f5f5; margin-top: 4px; }
    .competitor-name { font-size: 18px; font-weight: 600; color: #f5f5f5; margin-top: 6px; }
    .tagline { font-size: 13px; color: #a3a3a3; margin-top: 6px; line-height: 1.5; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 14px 18px; font-size: 13px; color: #e5e5e5; line-height: 1.5; }
    th { background: #141414; }
    th:last-child { background: #1a1a1a; text-align: right; }
    td:last-child { background: #1a1a1a; text-align: right; }
    .row-even { background: #1a1a1a; }
    .row-even td { background: #1a1a1a; }
    .limit-item { padding: 10px 0; border-bottom: 1px solid #1f1f1f; }
    .limit-item:last-child { border-bottom: none; }
    .limit-number { display: inline-block; width: 20px; height: 20px; background: #262626; color: #a3a3a3; text-align: center; line-height: 20px; font-size: 11px; font-weight: 600; margin-right: 12px; }
    .strength-item { padding: 10px 0; border-bottom: 1px solid #1f1f1f; }
    .strength-item:last-child { border-bottom: none; }
    .check { display: inline-block; width: 20px; height: 20px; background: #f5f5f5; color: #0a0a0a; text-align: center; line-height: 20px; font-size: 11px; font-weight: 700; margin-right: 12px; }
    .cta { text-align: center; padding: 28px 40px 32px; }
    .cta-text { font-size: 14px; color: #a3a3a3; line-height: 1.5; margin-bottom: 16px; }
    .cta-button { display: inline-block; padding: 14px 32px; background: #f5f5f5; color: #0a0a0a; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
    .footer-note { font-size: 11px; color: #525252; text-align: center; margin-top: 12px; }
    .footer { padding: 20px 40px; border-top: 1px solid #262626; background: #0f0f0f; text-align: center; }
    .footer p { font-size: 10px; color: #404040; margin-top: 4px; }
    .confidential { font-size: 11px; color: #525252; }
    .price-note { font-size: 13px; color: #e5e5e5; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo"><span class="logo-mark">B</span>BAZventures</div>
      <div class="eyebrow">Battle Card — Confidential</div>
    </div>
    <div class="section">
      <div class="section-title">Prepared for</div>
      <div class="recipient">${competitor ? "Partner" : "Partner"}</div>
    </div>
    <div class="section">
      <div class="section-title">Competitor evaluated</div>
      <div class="competitor-name">${displayName}</div>
      ${competitor ? `<div class="tagline">${competitor.tagline}</div>` : ""}
    </div>
    <div class="section">
      <div class="section-title">Pricing comparison</div>
      <table>
        <tr>
          <th>${displayName}</th>
          <th>BAZventures</th>
        </tr>
        <tr class="row-even">
          <td>${competitor ? `${competitor.pricing.model}: ${competitor.pricing.range}` : "Pricing varies."}</td>
          <td>Custom engagement scope</td>
        </tr>
        <tr>
          <td>${competitor ? competitor.pricing.note : "Varies by contract terms."}</td>
          <td>Outcome-aligned, no unused retainer hours</td>
        </tr>
      </table>
    </div>
    <div class="section">
      <div class="section-title">Top 3 limits of ${displayName}</div>
      ${limits.map((limit, i) => `
        <div class="limit-item">
          <span class="limit-number">${i + 1}</span>
          <span style="font-size:13px;color:#d4d4d4;line-height:1.5;">${limit}</span>
        </div>
      `).join("")}
    </div>
    <div class="section">
      <div class="section-title">Why BAZventures wins</div>
       ${strengths.map((strength) => `
        <div class="strength-item">
          <span class="check">✓</span>
          <span style="font-size:13px;color:#d4d4d4;line-height:1.5;">${strength}</span>
        </div>
      `).join("")}
    </div>
    <div class="cta">
      <div class="cta-text">This breakdown only scratches the surface.<br/>Let&apos;s discuss what this means for your engagement.</div>
      <a href="https://bazventures.com/book" class="cta-button">Book a strategy call</a>
      <div class="footer-note">No commitment required — 30 minutes with a senior partner.</div>
    </div>
    <div class="footer">
      <div class="confidential">BAZventures — brazierbourohibrahim@gmail.com</div>
      <p>This battle card is confidential and intended solely for the recipient.</p>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="baz-battle-card-${params.slug}.html"`,
      "Cache-Control": "private, no-store",
    },
  });
}

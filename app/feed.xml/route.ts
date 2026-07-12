import { posts } from "@/content/posts";
import { cacPost } from "@/content/posts-cac";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://baz.agency").replace(/\/$/, "");

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const sorted = [...posts, cacPost].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const items = sorted
    .map((p) => {
      const bodyHtml = p.body
        .split(/\n\n+/)
        .map((par) => `<p>${xmlEscape(par.trim())}</p>`)
        .join("");
      return `
    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${SITE}/insights/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/insights/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${xmlEscape(p.excerpt)}</description>
      <author>${xmlEscape(p.author)}</author>
      <category>${xmlEscape(p.category)}</category>
      <content:encoded><![CDATA[${bodyHtml}]]></content:encoded>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
 <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
   <channel>
    <title>BAZventures — Insights</title>
    <link>${SITE}/insights</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Senior-team perspectives on growth marketing. New playbooks, no spam.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

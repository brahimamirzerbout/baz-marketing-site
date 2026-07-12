// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { site } from "@/lib/site";
import { buildMetadata, jsonLd, articleLd, organizationLd, breadcrumbLd } from "@/lib/seo";
import { cacStudy } from "@/content/posts-cac";
import { LeadGate } from "./LeadGate";

const PATH = `/insights/${cacStudy.meta.slug}`;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: cacStudy.meta.title,
    description: cacStudy.meta.excerpt,
    path: PATH,
    type: "article",
    publishedTime: cacStudy.meta.publishedAt,
  });
}

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function CacBenchmarksPage() {
  const { meta, keyFindings, byChannel, byIndustry, byRegion, methodology } = cacStudy;

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: meta.title },
          ]}
        />
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="success">Analytics</Badge>
            <Badge variant="info">Data study</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(meta.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-muted-foreground/60">·</span>
            <span className="text-sm text-muted-foreground">{meta.readingMin} min read</span>
          </div>
          <h1 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0]">
            {meta.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">{meta.excerpt}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            Composite, anonymized benchmarks across {meta.brandCount} brands · {meta.window} · read by
            channel, industry &amp; region.
          </p>
        </article>
      </Section>

      {/* Key findings */}
      <Section tone="white" size="lg">
        <Eyebrow>3 key findings</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] leading-tight mb-10">
          What the {meta.brandCount}-brand panel tells us about CAC in H1 2026.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {keyFindings.map((f) => (
            <div
              key={f.title}
              className="bg-background border border-border p-6 flex flex-col"
            >
              <p className="font-mono text-2xl tracking-tight text-foreground mb-3">{f.stat}</p>
              <h3 className="font-display text-lg font-medium tracking-[-0.01em] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Public teaser table — channel CAC */}
      <Section tone="paper" size="lg">
        <Eyebrow>Preview · by channel</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-snug mb-8">
          Blended new-customer CAC by channel (interquartile range, USD)
        </h2>
        <div className="overflow-x-auto border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3 text-right">CAC low</th>
                <th className="px-4 py-3 text-right">CAC high</th>
                <th className="px-4 py-3 text-right">LTV:CAC</th>
              </tr>
            </thead>
            <tbody>
              {byChannel.map((row) => (
                <tr key={row.channel} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.channel}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{fmt(row.cacLow)}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{fmt(row.cacHigh)}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{row.ltvCac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground/70">
          Full by-industry and by-region tables, plus methodology and LTV:CAC detail, are in the gated PDF below.
        </p>
      </Section>

      {/* Gate */}
      <Section tone="white" size="lg">
        <div className="bg-background border border-border p-8 md:p-10">
          <div className="max-w-xl">
            <Eyebrow>Free data product</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-snug">
              Get the full {meta.brandCount}-brand CAC benchmark report (PDF)
            </h2>
            <p className="mt-3 text-muted-foreground">
              {byChannel.length} channels · {byIndustry.length} industry segments · {byRegion.length} regions ·
              LTV:CAC multiples · reconciliation methodology. We&apos;ll send it to your inbox and the H2 2026 wave
              when it closes.
            </p>
          </div>
          <div className="mt-8 max-w-xl">
            <LeadGate />
          </div>
        </div>
      </Section>

      {/* Methodology + PR pitch */}
      <Section tone="paper" size="lg">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Methodology</Eyebrow>
            <ul className="space-y-3 mt-2">
              {methodology.map((m, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                  <span className="font-mono text-foreground/60 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>For PR &amp; press pitches</Eyebrow>
            <h3 className="font-display text-xl font-medium tracking-[-0.01em] mb-3">
              Suggested pitch angles
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This study is built to be cited. Pull quotes for Digiday, MarketingProfs, and trade press:
            </p>
            <blockquote className="border-l-2 border-foreground/30 pl-4 text-sm text-foreground">
              &ldquo;Across 60 brands in H1 2026, owned channels (SEO + lifecycle email) acquired customers 3–8x
              cheaper than paid social — and LinkedIn CAC ran 4–9x Paid Search in B2B segments.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Canonical URL:{" "}
              <Link href={PATH} className="text-foreground underline underline-offset-2">
                {site.url.replace(/\/$/, "")}
                {PATH}
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Related services */}
      <Section tone="white" size="lg">
        <Eyebrow>Related services</Eyebrow>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Link
            href="/services/analytics-attribution"
            className="group block bg-background border border-border p-8 hover:border-accent transition-colors"
          >
            <h3 className="font-display text-xl font-medium tracking-[-0.01em] group-hover:underline">
              Analytics, Tracking &amp; Attribution →
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The measurement foundation behind every benchmark on this page — server-side tracking, real
              attribution, and dashboards execs open.
            </p>
          </Link>
          <Link
            href="/services/performance-marketing"
            className="group block bg-background border border-border p-8 hover:border-accent transition-colors"
          >
            <h3 className="font-display text-xl font-medium tracking-[-0.01em] group-hover:underline">
              Performance Marketing →
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Turn CAC intelligence into spend that compounds — clean tracking, weekly creative iteration, and
              no wasted impressions.
            </p>
          </Link>
        </div>
        <div className="mt-8">
          <Button href={site.bookOrMailto} external variant="primary" size="lg" trackAs="cac_book_call">
            Book a growth call →
          </Button>
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          articleLd({
            title: meta.title,
            excerpt: meta.excerpt,
            slug: meta.slug,
            author: meta.author,
            publishedAt: meta.publishedAt,
          }),
          organizationLd(),
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
            { name: meta.title, url: PATH },
          ]),
        ])}
      />
    </>
  );
}

"use client";

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Checkbox, Label, Kbd, KbdGroup, Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/aether-index";
import { Badge, Avatar, Spinner, ProgressBar, Divider } from "@/components/primitives/index";
import { StatusBar, Terminal } from "@/components/structure/index";

/**
 * BAZventures Design System — living showcase.
 *
 * Renders every Midnight-Terminal-compatible Stitch React component (the
 * previously-dead aether kit — now wired in) and the full brand asset library.
 * The components resolve to --aether-* tokens, which app/color-layer.css
 * drives from the electric-cyan seed (187/90), so they render in the live
 * Midnight Terminal palette. The brand assets are the legacy Stitch palette
 * (gold/violet) and are shown as-is pending a cyan recolor pass.
 */

const ASSETS: { src: string; label: string }[] = [
  { src: "/brand/baz-mark.svg", label: "Logo mark" },
  { src: "/brand/baz-wordmark-reverse.svg", label: "Wordmark (reverse)" },
  { src: "/brand/baz-wordmark-mono.svg", label: "Wordmark (mono)" },
  { src: "/brand/og-image-1200x630.svg", label: "OG image 1200×630" },
  { src: "/brand/grid-pattern.svg", label: "Pattern · grid" },
  { src: "/brand/mesh-gradient.svg", label: "Pattern · mesh" },
  { src: "/brand/dot-pattern.svg", label: "Pattern · dots" },
  { src: "/brand/linkedin-banner.svg", label: "Social · LinkedIn banner" },
  { src: "/brand/twitter-header.svg", label: "Social · Twitter/X header" },
  { src: "/brand/business-card-front.svg", label: "Stationery · business card" },
  { src: "/brand/letterhead.svg", label: "Stationery · letterhead" },
  { src: "/brand/title-slide-ink.svg", label: "Presentation · title slide" },
  { src: "/brand/app-icon-1024.svg", label: "App icon 1024" },
  { src: "/brand/apple-touch-icon.svg", label: "Apple touch icon" },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-20">
      <div className="container">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-8">{title}</h2>
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function DesignSystemShowcase() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6">
        <div className="container">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Design system</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-4">
            Every Stitch component, every asset — rendered live.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The Midnight Terminal component kit (Æther) and the full brand asset library, rendered in the
            live electric-cyan theme. Nothing here is dead code — it&apos;s all wired in.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <Section id="buttons" eyebrow="Primitives · 01" title="Buttons">
        <Row label="Variants">
          <Button>Deploy</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Delete</Button>
        </Row>
        <Row label="Sizes">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button>Default</Button>
          <Button size="lg">LG</Button>
        </Row>
      </Section>

      {/* Cards */}
      <Section id="cards" eyebrow="Primitives · 02" title="Cards">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth system</CardTitle>
              <CardDescription>Senior-only, revenue-tied</CardDescription>
            </CardHeader>
            <CardContent>Strategy, execution, and reporting in one tightly integrated system.</CardContent>
            <CardFooter>Footer action</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CRM engineering</CardTitle>
              <CardDescription>Pipeline as a versioned asset</CardDescription>
            </CardHeader>
            <CardContent>Deterministic lead routing with SLAs and server-side tracking.</CardContent>
            <CardFooter>Footer action</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conversion ops</CardTitle>
              <CardDescription>Sub-1.5s LCP is the floor</CardDescription>
            </CardHeader>
            <CardContent>High-trust, high-intent sites built on Next.js + headless.</CardContent>
            <CardFooter>Footer action</CardFooter>
          </Card>
        </div>
      </Section>

      {/* Forms */}
      <Section id="forms" eyebrow="Primitives · 03" title="Forms">
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="ds-email">Email</Label>
            <Input id="ds-email" placeholder="you@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-err">API key</Label>
            <Input id="ds-err" placeholder="invalid-key" invalid />
          </div>
        </div>
        <Row label="Checkbox">
          <Checkbox checked />
          <Checkbox />
        </Row>
      </Section>

      {/* Feedback */}
      <Section id="feedback" eyebrow="Primitives · 04" title="Feedback & status">
        <Row label="Badge">
          <Badge dot>New</Badge>
          <Badge>Default</Badge>
        </Row>
        <Row label="Avatar">
          <Avatar name="BAZ" />
          <Avatar name="Brahim Zerbout" size={40} />
        </Row>
        <Row label="Spinner">
          <Spinner />
          <Spinner size={32} />
        </Row>
        <Row label="Progress">
          <div className="w-64"><ProgressBar value={62} /></div>
          <div className="w-64"><ProgressBar value={0} indeterminate /></div>
        </Row>
        <Row label="Divider">
          <div className="w-64"><Divider /></div>
          <div className="w-64"><Divider label="or" /></div>
        </Row>
      </Section>

      {/* Typography & nav */}
      <Section id="type" eyebrow="Primitives · 05" title="Typography & navigation">
        <Row label="Keyboard">
          <Kbd>⌘K</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Row>
        <Row label="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>›</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="/services">Services</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>›</BreadcrumbSeparator>
              <BreadcrumbItem>Design system</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Row>
      </Section>

      {/* Structure (command-center aesthetic) */}
      <Section id="structure" eyebrow="Structure · 06" title="Command-center components">
        <Row label="Status bar">
          <div className="w-full">
            <StatusBar left="main" center="BAZventures · Midnight Terminal" right="cyan 187/90" />
          </div>
        </Row>
        <Row label="Terminal">
          <div className="w-full">
            <Terminal isOpen onToggle={() => {}} lines={["baz> init midnight-terminal", "→ seed 187/90 (electric cyan)", "→ ok", "baz>"]} />
          </div>
        </Row>
      </Section>

      {/* Asset library */}
      <Section id="assets" eyebrow="Brand · 07" title="Asset library (legacy Stitch palette)">
        <p className="text-sm text-muted-foreground max-w-2xl">
          Every brand asset, surfaced. These SVGs are the legacy Stitch palette (gold/violet) —
          shown as-is pending a cyan recolor pass to match Midnight Terminal.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ASSETS.map((a) => (
            <figure key={a.src} className="rounded-sm border border-border bg-card p-3 flex flex-col gap-3">
              <div className="aspect-[4/3] grid place-items-center bg-background rounded-sm overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.src} alt={a.label} className="max-w-full max-h-full object-contain" />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground truncate">{a.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="border-t border-border py-12 px-6">
        <div className="container">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            BAZventures design system · rendered live · Midnight Terminal
          </p>
        </div>
      </section>
    </main>
  );
}
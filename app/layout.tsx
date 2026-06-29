import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import { organizationLd, websiteLd, jsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Analytics } from '@/components/analytics/Analytics';
import { ScrollReveal } from '@/components/marketing/ScrollReveal';
import { Cursor } from '@/components/ui/Cursor';
import './globals.css';

const inter = localFont({
  src: [
    { path: '../public/fonts/inter/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter/inter-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter/inter-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: false,
});
const fraunces = localFont({
  src: [
    { path: '../public/fonts/fraunces/fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-900.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-fraunces',
  fallback: ['Georgia', 'ui-serif', 'serif'],
  adjustFontFallback: false,
});
const mono = localFont({
  src: [
    { path: '../public/fonts/jetbrains-mono/jetbrainsmono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/jetbrains-mono/jetbrainsmono-500.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: 'Next.js',
  keywords: [
    'growth marketing agency',
    'SEO agency',
    'paid media agency',
    'content agency',
    'analytics agency',
    'AI search optimization',
    'CRO agency',
    'BAZ',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', site: '@bazagency' },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#ff3b2f',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the theme cookie set by the ThemeToggle so the SSR'd <html> already
  // carries the right data-theme. This prevents the light-flash on first paint
  // when a returning user has dark mode enabled.
  const themeCookie = (await cookies()).get('baz:theme')?.value;
  const initialTheme = themeCookie === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" data-theme={initialTheme} className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <head>
        {/*
          Inline script: read the theme from localStorage BEFORE the body paints.
          This is the only way to avoid a flash when the user toggles dark mode
          in the client. Runs synchronously, before any React hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('baz:theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-paper text-ink-900 antialiased">
        <a href="#main" className="skip">Skip to content</a>
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollReveal />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationLd(), websiteLd()])}
        />
      </body>
    </html>
  );
}

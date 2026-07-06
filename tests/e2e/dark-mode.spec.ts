import { test, expect } from '@playwright/test';

/**
 * Dark-only mode regression.
 *
 * The site is dark-only by design: ThemeProvider uses forcedTheme="dark",
 * enableSystem=false, themes=["dark"], and layout.tsx hardcodes the dark
 * class + a pre-paint script. There is no light mode and no toggle.
 */

const publicPages = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/pricing', name: 'pricing' },
  { path: '/brandbook', name: 'brandbook' },
  { path: '/insights', name: 'insights' },
  { path: '/contact', name: 'contact' },
  { path: '/our-story', name: 'our-story' },
  { path: '/methodology', name: 'methodology' },
];

test.describe('Dark-only mode', () => {
  for (const p of publicPages) {
    test(`${p.path} loads with data-theme="dark" and the .dark class`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      const theme = await page.evaluate(() => document.documentElement.dataset.theme);
      expect(theme, `data-theme on ${p.path}`).toBe('dark');
      const hasDarkClass = await page.evaluate(() =>
        document.documentElement.classList.contains('dark'),
      );
      expect(hasDarkClass, `html.classList contains "dark" on ${p.path}`).toBe(true);
    });
  }

  test('no theme-toggle button exists (dark-only, no light mode)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggles = await page.locator('.theme-toggle').count();
    expect(toggles, 'a theme toggle must not exist — the site is dark-only').toBe(0);
  });

  test('color-scheme is dark', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const cs = await page.evaluate(() =>
      getComputedStyle(document.documentElement).colorScheme.trim(),
    );
    expect(cs).toBe('dark');
  });
});
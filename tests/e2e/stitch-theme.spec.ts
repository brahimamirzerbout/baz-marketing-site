import { test, expect } from "@playwright/test";

/**
 * Stitch theme — visual/design regression for the BAZventures Midnight Terminal system.
 *
 * The public site is rebranded to Midnight Terminal: electric-cyan seed
 * (--seed-hue 187 / --seed-sat 90%) via app/color-layer.css, Inter typography,
 * midnight background (#020617), BAZventures wordmark. These tests verify the
 * design renders as intended: cyan brand (not the old gold), Inter, no gold
 * leaks, BAZventures wordmark, key pages 200.
 */

test.describe("Stitch theme — BAZventures Midnight Terminal design", () => {
  test("color layer is electric cyan (Midnight Terminal seed)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const hue = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--seed-hue").trim(),
    );
    const sat = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--seed-sat").trim(),
    );
    expect(hue, "--seed-hue must be 187 (cyan)").toBe("187");
    expect(sat, "--seed-sat must be 90%").toBe("90%");
  });

  test("brand token is cyan, not the old Stitch gold", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const brand = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--brand").trim().toLowerCase(),
    );
    expect(brand, "--brand must not be the old Stitch gold").not.toContain("e7c274");
    expect(brand, "--brand must not carry a gold hue").not.toMatch(/hsl\(42/);
  });

  test("homepage renders with a dark midnight background", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
    const m = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    expect(m, `background should be rgb(), got: ${bg}`).not.toBeNull();
    const [, r, g, b] = m!;
    expect(Number(r), "R channel dark").toBeLessThan(30);
    expect(Number(g), "G channel dark").toBeLessThan(30);
    expect(Number(b), "B channel dark (midnight)").toBeLessThan(40);
  });

  test("typography is Inter (Midnight Terminal font swap)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const ff = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(ff, "body font-family should include Inter").toContain("Inter");
  });

  test("homepage <title> is branded BAZventures", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BAZventures/);
  });

  test("theme-color meta is midnight (#020617)", async ({ page }) => {
    await page.goto("/");
    const content = await page.locator('meta[name="theme-color"]').getAttribute("content");
    expect(content).toBe("#020617");
  });

  test("favicon is not the old gold/violet", async ({ page }) => {
    const res = await page.goto("/favicon.svg");
    expect(res?.status()).toBe(200);
    const svg = (await res?.text()) ?? "";
    expect(svg, "favicon must not be the old gold").not.toContain("#C8A55A");
    expect(svg, "favicon must not be violet").not.toContain("#8b5cf6");
  });

  test("header uses the BAZventures wordmark (no legacy gold SVG)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await expect(header.getByRole("link").filter({ hasText: "BAZventures" })).toBeVisible();
    const legacyImg = await page.locator('header img[src*="baz-wordmark"]').count();
    expect(legacyImg, "header must not use the legacy gold wordmark SVG").toBe(0);
  });

  test("footer uses the BAZventures wordmark (no legacy gold SVG)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link").filter({ hasText: "BAZventures" })).toBeVisible();
    const legacyImg = await page.locator('footer img[src*="baz-wordmark"]').count();
    expect(legacyImg, "footer must not use the legacy gold wordmark SVG").toBe(0);
  });

  test("no gold leaks into the rendered homepage DOM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const html = await page.content();
    expect(html).not.toContain("#E7C274");
    expect(html).not.toContain("#C8A55A");
    expect(html).not.toContain("#ff5b1f");
    expect(html).not.toContain("#F2572B");
  });

  // --- Key public pages render 200 ---
  for (const path of ["/", "/services", "/pricing", "/methodology", "/brandbook", "/our-story", "/vs-others", "/contact"]) {
    test(`${path} returns 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status(), `${path} status`).toBe(200);
    });
  }

  test("services page exposes the 18-service catalog", async ({ page }) => {
    await page.goto("/services");
    const cards = page.locator('a[href^="/services/"]');
    const count = await cards.count();
    expect(count, "service card count").toBeGreaterThanOrEqual(18);
  });

  test("no leftover 'BAZ Marketing Agency' / 'BAZ Marketing Hub' on public pages", async ({ page }) => {
    for (const path of ["/", "/services", "/pricing", "/our-story", "/contact", "/methodology"]) {
      await page.goto(path);
      const body = await page.content();
      expect(body, `${path} must not say "BAZ Marketing Agency"`).not.toContain("BAZ Marketing Agency");
      expect(body, `${path} must not say "BAZ Marketing Hub"`).not.toContain("BAZ Marketing Hub");
    }
  });

  test("the product is named 'the Hub' on the homepage", async ({ page }) => {
    await page.goto("/");
    const body = await page.content();
    expect(body).toContain("the Hub");
  });
});
import { test, expect } from "@playwright/test";

/**
 * Stitch theme — visual/design regression for the BAZventures Æther + Gold system.
 *
 * The public site is Æther + Gold: stitch-gold seed (--seed-hue 42 /
 * --seed-sat 85%) via app/color-layer.css, Inter typography, neutral
 * near-black background, BAZventures wordmark. These tests verify the
 * design renders as intended: gold brand (not the old electric cyan),
 * Inter, no cyan/midnight leaks, BAZventures wordmark, key pages 200.
 */

test.describe("Stitch theme — BAZventures Æther + Gold design", () => {
  test("color layer is stitch gold (Æther + Gold seed)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const hue = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--seed-hue").trim(),
    );
    const sat = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--seed-sat").trim(),
    );
    expect(hue, "--seed-hue must be 42 (gold)").toBe("42");
    expect(sat, "--seed-sat must be 85%").toBe("85%");
  });

  test("brand token is not the old electric cyan", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const brand = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--brand").trim().toLowerCase(),
    );
    expect(brand, "--brand must not be the old electric cyan").not.toContain("#22d3ee");
    expect(brand, "--brand must not carry a cyan seed").not.toContain("187");
  });

  test("homepage renders with a dark neutral (non-blue) background", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const bg = await page.evaluate(() => {
      const de = getComputedStyle(document.documentElement).backgroundColor;
      if (de && de !== "rgba(0, 0, 0, 0)" && de !== "transparent") return de;
      return getComputedStyle(document.body).backgroundColor;
    });
    const m = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    expect(m, `background should be rgb(), got: ${bg}`).not.toBeNull();
    const [, r, g, b] = m!;
    expect(Number(r), "R channel dark").toBeLessThan(30);
    expect(Number(g), "G channel dark").toBeLessThan(30);
    expect(Number(b), "B channel dark").toBeLessThan(30);
    expect(Math.abs(Number(r) - Number(b)), "neutral (no blue tint)").toBeLessThan(10);
  });

  test("typography is Inter (Æther + Gold font)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const ff = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(ff, "body font-family should include Inter").toContain("Inter");
  });

  test("homepage <title> is branded BAZventures", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BAZventures/);
  });

  test("theme-color meta is neutral near-black (#0A0A0A)", async ({ page }) => {
    await page.goto("/");
    const content = await page.locator('meta[name="theme-color"]').getAttribute("content");
    expect(content).toBe("#0A0A0A");
  });

  test("favicon is stitch gold, not the old cyan/violet", async ({ page }) => {
    const res = await page.goto("/favicon.svg");
    expect(res?.status()).toBe(200);
    const svg = ((await res?.text()) ?? "").toLowerCase();
    expect(svg, "favicon must be stitch gold").toContain("#eeb32b");
    expect(svg, "favicon must not be the old electric cyan").not.toContain("#22d3ee");
    expect(svg, "favicon must not be violet").not.toContain("#8b5cf6");
    expect(svg, "favicon must not be the old gold").not.toContain("#c8a55a");
  });

  test("header uses the BAZventures wordmark (no legacy cyan SVG)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await expect(header.getByRole("link").filter({ hasText: "BAZventures" })).toBeVisible();
    const legacyImg = await page.locator('header img[src*="baz-wordmark"]').count();
    expect(legacyImg, "header must not use the legacy cyan wordmark SVG").toBe(0);
  });

  test("footer uses the BAZventures wordmark (no legacy cyan SVG)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link").filter({ hasText: "BAZventures" })).toBeVisible();
    const legacyImg = await page.locator('footer img[src*="baz-wordmark"]').count();
    expect(legacyImg, "footer must not use the legacy cyan wordmark SVG").toBe(0);
  });

  test("no cyan or midnight-blue leaks into the rendered homepage DOM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const html = (await page.content()).toLowerCase();
    expect(html).not.toContain("#22d3ee");
    expect(html).not.toContain("#818cf8");
    expect(html).not.toContain("#020617");
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
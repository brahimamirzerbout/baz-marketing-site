import { test, expect } from "@playwright/test";

test.describe("Stitch theme — visual regression", () => {
  test("homepage hero renders gold brand accent", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const brandColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--brand").trim(),
    );
    expect(brandColor).toBe("#E7C274");
  });

  test("homepage renders with dark background", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--background").trim(),
    );
    expect(bg).toBe("#16130E");
  });

  test("services page renders", async ({ page }) => {
    const res = await page.goto("/services");
    expect(res?.status()).toBe(200);
    expect(await page.getByRole("heading").count()).toBeGreaterThan(0);
  });

  test("hub/nova page renders", async ({ page }) => {
    const res = await page.goto("/hub/nova");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("Nova")).toBeVisible();
  });

  test("hub/cockpit page renders", async ({ page }) => {
    const res = await page.goto("/hub/cockpit");
    expect(res?.status()).toBe(200);
  });

  test("hub/triangle page renders", async ({ page }) => {
    const res = await page.goto("/hub/triangle");
    expect(res?.status()).toBe(200);
  });

  test("contact page renders gold accent on buttons", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
    );
    expect(accent).toBe("#E7C274");
  });

  test("pricing page renders", async ({ page }) => {
    const res = await page.goto("/pricing");
    expect(res?.status()).toBe(200);
  });

  test("methodology page renders", async ({ page }) => {
    const res = await page.goto("/methodology");
    expect(res?.status()).toBe(200);
  });

  test("brandbook page renders", async ({ page }) => {
    const res = await page.goto("/brandbook");
    expect(res?.status()).toBe(200);
  });

  test("favicon is Stitch gold not violet", async ({ page }) => {
    await page.goto("/");
    const favicon = page.locator('link[rel="icon"]');
    const href = await favicon.getAttribute("href");
    expect(href).toBe("/favicon.svg");

    const res = await page.goto("/favicon.svg");
    const svg = await res?.text();
    expect(svg).toContain("#C8A55A");
    expect(svg).not.toContain("#8b5cf6");
  });

  test("header uses gold wordmark SVG", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('header img[src*="baz-wordmark"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("alt", "BAZ");
  });

  test("footer uses gold wordmark SVG", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('footer img[src*="baz-wordmark"]');
    await expect(logo).toBeVisible();
  });

  test("contact page has BAZ ghost watermark", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const watermark = page.locator('div:has-text("BAZ"):not(nav):not(footer)').first();
    await expect(watermark).toBeVisible();
  });

  test("logo marks are gold not violet", async ({ page }) => {
    const res = await page.goto("/logo/baz-mark.svg");
    const svg = await res?.text();
    expect(svg).toContain("#C8A55A");
    expect(svg).not.toContain("#8b5cf6");
  });

  test("silk background renders on about page", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const silk = page.locator(".silk-bg");
    await expect(silk).toBeVisible();
  });

  test("silk background renders on pricing page", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
    const silk = page.locator(".silk-bg");
    await expect(silk).toBeVisible();
  });
});

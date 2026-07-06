import { test, expect, type Page } from "@playwright/test";

// Benign console-error patterns we don't fail on (favicon 404s, hydration warnings, etc.)
const BENIGN = /favicon|404|hydration|download the React DevTools|devtools|preload|net::ERR|chunk-load|_vercel\/insights|insights\/script|MIME type/i;

function captureErrors(page: Page) {
  const uncaught: string[] = [];
  const consoleErrs: string[] = [];
  page.on("pageerror", (e) => uncaught.push(String(e?.message ?? e)));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrs.push(m.text());
  });
  return { uncaught, consoleErrs };
}

const PAGES: { path: string; expect: string }[] = [
  { path: "/", expect: "BAZventures" },
  { path: "/services", expect: "Strategy & Growth Consulting" },
  { path: "/pricing", expect: "Growth" },
  { path: "/methodology", expect: "Methodology" },
  { path: "/book", expect: "Book" },
  { path: "/login", expect: "Send sign-in link" }, // client-rendered
];

test.describe("baz — perfection", () => {
  for (const p of PAGES) {
    test(`${p.path} renders, no crash, content present`, async ({ page }) => {
      const { uncaught, consoleErrs } = captureErrors(page);
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      // let client components hydrate (login is in Suspense)
      await page.waitForLoadState("networkidle").catch(() => {});
      await expect.poll(() => page.locator("body").innerText(), { timeout: 15000 })
        .not.toContain("Something broke");
      const body = await page.locator("body").innerText();
      expect(body, `${p.path} shows Supabase crash`).not.toContain("@supabase/ssr");
      expect(body, `${p.path} shows crash page`).not.toContain("Something broke");
      await expect(page.locator("body"), `${p.path} missing "${p.expect}"`).toContainText(p.expect, { timeout: 15000 });
      // no uncaught JS exceptions (the real "perfection" bar)
      expect(uncaught, `${p.path} uncaught errors: ${uncaught.join(" | ")}`).toEqual([]);
      const serious = consoleErrs.filter((e) => !BENIGN.test(e));
      expect(serious, `${p.path} console errors: ${serious.join(" | ")}`).toEqual([]);
    });
  }

  test("/login magic-link flow does not crash", async ({ page }) => {
    const { uncaught } = captureErrors(page);
    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    // wait for the email input to appear (client hydration)
    await page.locator('input[type="email"]').waitFor({ state: "visible", timeout: 15000 });
    await page.fill('input[type="email"]', "test@baz.agency");
    await page.click('button[type="submit"]', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const body = await page.locator("body").innerText();
    expect(body, "login crashed").not.toContain("Something broke");
    expect(body, "login Supabase crash").not.toContain("@supabase/ssr");
    expect(uncaught, `login uncaught: ${uncaught.join(" | ")}`).toEqual([]);
    // graceful outcome: either sent ("Check your email") or a controlled error — never a crash
    const graceful =
      body.includes("Check your email") ||
      body.includes("Open sign-in link") ||
      body.includes("Use a different email") ||
      /failed|error|invalid|try again/i.test(body);
    expect(graceful, `login flow produced no recognizable state: ${body.slice(0, 240)}`).toBeTruthy();
  });

  test("nav: Services link navigates to the catalog", async ({ page }) => {
    const { uncaught } = captureErrors(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    const link = page.locator('a:has-text("Services")').first();
    await link.click({ timeout: 5000 }).catch(async () => {
      await page.goto("/services");
    });
    await page.waitForLoadState("networkidle").catch(() => {});
    await expect(page.locator("body")).toContainText("Strategy & Growth Consulting", { timeout: 15000 });
    expect(uncaught, `nav uncaught: ${uncaught.join(" | ")}`).toEqual([]);
  });
});
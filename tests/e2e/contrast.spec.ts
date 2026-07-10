import { test, expect } from "@playwright/test";

// Mean channel value of an rgb()/rgba() string: 0 = black, 255 = white.
function luminance(rgb: string): number {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return 999;
  const r = Number(m[0]);
  const g = Number(m[1]);
  const b = Number(m[2]);
  return (r + g + b) / 3;
}

// Walk up to find the first ancestor with a non-transparent painted background.
// In Playwright, `page.locator(...).evaluate()` resolves the locator to the
// first matching Element before calling the callback, so `node` is `Element`.
async function paintedBg(loc: import("@playwright/test").Locator): Promise<string> {
  return await loc.evaluate((node: Element) => {
    let cur: Element | null = node;
    for (let i = 0; i < 4 && cur; i++) {
      const bg = getComputedStyle(cur).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
      cur = cur.parentElement;
    }
    return "";
  });
}

test("contrast layer: loop banner is BLACK, agent-output box is dark (no longer white-on-white)", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});

  // 1. The "marketing, sales, and finance loop — running itself" banner → pure black.
  const loopHeading = page.getByText("running itself").first();
  await expect(loopHeading).toBeVisible({ timeout: 15000 });
  const loopBg = await loopHeading.evaluate((el) => {
    const sec = el.closest("section");
    return sec ? getComputedStyle(sec).backgroundColor : "";
  });
  // pure black oklch(0 0 0) ≈ rgb(0,0,0) → luminance 0
  expect(luminance(loopBg), `loop banner bg was ${loopBg} (wanted near-black)`).toBeLessThan(20);

  // 2. The agent output box ("// output appears here") → dark panel, not white.
  const out = page.getByText("// output appears here").first();
  await expect(out).toBeVisible({ timeout: 15000 });
  const outBg = await paintedBg(out);
  expect(luminance(outBg), `output box bg was ${outBg} (wanted dark, was white before)`).toBeLessThan(80);

  await page.screenshot({ path: "tests/e2e/screenshots/contrast-home.png" });
});
/**
 * Regression: hamburger must work during cinematic intro on fresh mobile session.
 * Run: node scratch/diagnose-mobile-hero.mjs
 */
import { chromium, devices } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

async function tryOpenMenu(page) {
  const menuBtn = page.getByRole("button", { name: /toggle navigation/i });
  const navLink = page.getByRole("link", { name: /^Products$/i });
  await menuBtn.click({ timeout: 3000 });
  await page.waitForTimeout(400);
  return navLink.isVisible();
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ ...devices["iPhone 13"] });

await page.goto(BASE);
await page.evaluate(() => sessionStorage.removeItem("hasPlayedIntro"));
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(800);

const introVisible = await page
  .locator('[class*="z-[9990]"]')
  .isVisible()
  .catch(() => false);
const menuDuringIntro = await tryOpenMenu(page).catch(() => false);

await browser.close();

if (!introVisible) {
  console.error("FAIL: Expected intro overlay on fresh mobile session");
  process.exit(1);
}
if (!menuDuringIntro) {
  console.error(
    "FAIL: Hamburger menu must open while intro overlay is active (header above overlay)",
  );
  process.exit(1);
}

console.log("PASS: Mobile menu works during intro overlay");

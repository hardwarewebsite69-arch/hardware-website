import { chromium, devices } from "@playwright/test";

const BASE = "http://localhost:3000";
const browser = await chromium.launch({ headless: false, slowMo: 100 });
const page = await browser.newPage({ ...devices["iPhone 13"] });

const failed = [];
page.on("response", (r) => {
  if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
});

await page.goto(BASE);
await page.evaluate(() => sessionStorage.setItem("hasPlayedIntro", "true"));
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const menuBtn = page.getByRole("button", { name: /toggle navigation/i });
console.log("menu btn box:", await menuBtn.boundingBox());
await menuBtn.click();
await page.waitForTimeout(800);

const menuPanel = page.locator(".animate-in").first();
console.log("menu panel visible:", await menuPanel.isVisible());
console.log("aria-expanded:", await menuBtn.getAttribute("aria-expanded"));
console.log("nav links:", await page.locator('nav a').allTextContents());
console.log("failed requests:", failed.filter((u) => !u.includes("favicon")));

await page.screenshot({ path: "/tmp/mobile-menu-debug.png", fullPage: true });
await browser.close();

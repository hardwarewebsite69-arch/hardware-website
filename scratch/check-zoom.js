const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Artifacts directory
  const artifactsDir = "/home/amar-salim/.gemini/antigravity/brain/7968e6ae-d94e-4320-9879-497036bb0c7c";
  
  // Create directories if not exists
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  // 1. 100% Zoom Desktop
  const context100 = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.0
  });
  const page100 = await context100.newPage();
  await page100.goto("http://localhost:3000");
  await page100.waitForTimeout(2000); // Allow GSAP / entrance animations to finish
  const path100 = path.join(artifactsDir, "desktop-100.png");
  await page100.screenshot({ path: path100, fullPage: false });
  console.log(`Saved screenshot at 100% zoom: ${path100}`);
  await context100.close();

  // 2. 125% Zoom Desktop
  const context125 = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.25
  });
  const page125 = await context125.newPage();
  await page125.goto("http://localhost:3000");
  await page125.waitForTimeout(2000);
  const path125 = path.join(artifactsDir, "desktop-125.png");
  await page125.screenshot({ path: path125, fullPage: false });
  console.log(`Saved screenshot at 125% zoom: ${path125}`);
  await context125.close();

  // 3. Mobile Viewport (Responsive check)
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3.0,
    isMobile: true
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto("http://localhost:3000");
  await pageMobile.waitForTimeout(2000);
  const pathMobile = path.join(artifactsDir, "mobile.png");
  await pageMobile.screenshot({ path: pathMobile, fullPage: false });
  console.log(`Saved mobile screenshot: ${pathMobile}`);
  await contextMobile.close();

  await browser.close();
})();

import { chromium, devices } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ ...devices["iPhone 13"] });

await page.goto("http://localhost:3000");
await page.evaluate(() => sessionStorage.removeItem("hasPlayedIntro"));
await page.reload();

const checkpoints = [500, 1500, 2500, 3500, 4500, 5500, 8000, 12000, 20000];
let last = 0;
for (const ms of checkpoints) {
  await page.waitForTimeout(ms - last);
  last = ms;
  const state = await page.evaluate((t) => {
    const v = document.querySelector("video");
    return {
      ms: t,
      overlay: !!document.querySelector('[class*="z-[9999]"]'),
      video: v
        ? {
            currentTime: v.currentTime,
            paused: v.paused,
            readyState: v.readyState,
            networkState: v.networkState,
            error: v.error?.code ?? null,
            duration: v.duration,
            currentSrc: v.currentSrc?.slice(-60),
          }
        : null,
    };
  }, ms);
  console.log(JSON.stringify(state));
}

await browser.close();

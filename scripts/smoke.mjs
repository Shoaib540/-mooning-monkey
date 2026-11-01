import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const outDir = "/opt/cursor/artifacts";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(outDir, "scalegate_hero.png") });

await page.locator("#calc").scrollIntoViewIfNeeded();
await page.fill("#sell", "2499");
await page.fill("#cogs", "900");
await page.fill("#cpa", "1200");
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, "scalegate_kill_verdict.png") });

await page.locator("#pricing").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: /Enter unlock code/i }).click();
await page.fill("#pro-code", "SCALE-DEMO-2026");
await page.getByRole("button", { name: /Activate Pro/i }).click();
await page.waitForTimeout(400);
const pro = await page.getByText("Pro", { exact: true }).first().isVisible();
await page.screenshot({ path: path.join(outDir, "scalegate_pro.png") });

console.log(JSON.stringify({ pro, ok: pro }, null, 2));
await browser.close();

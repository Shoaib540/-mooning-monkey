import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const outDir = "/opt/cursor/artifacts";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, "foran_hero.png") });
await page.locator("#packages").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, "foran_packages.png") });
await page.locator("#today").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, "foran_start_today.png") });
const title = await page.title();
console.log(JSON.stringify({ title, ok: title.includes("Foran") }, null, 2));
await browser.close();

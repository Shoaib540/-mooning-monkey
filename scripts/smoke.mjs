import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const outDir = "/opt/cursor/artifacts";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({
  path: path.join(outDir, "nayabill_hero.png"),
  fullPage: false,
});

await page.locator("#builder").scrollIntoViewIfNeeded();
await page.fill("#fromName", "Shoaib Ahmad");
await page.fill("#fromCity", "Karachi");
await page.fill("#fromEmail", "shoaib@test.com");
await page.fill("#fromPhone", "+923001234567");
await page.fill("#clientName", "Acme Studio");
await page.fill("#clientPhone", "923009876543");
await page.locator('input[placeholder="What did you deliver?"]').fill("Website redesign");
await page.locator('input[aria-label="Rate"]').fill("50000");
await page.fill("#pay-jazz", "03001234567");
await page.waitForTimeout(400);
await page.screenshot({
  path: path.join(outDir, "nayabill_builder_filled.png"),
  fullPage: false,
});

await page.getByRole("button", { name: /Copy message/i }).click();
await page.waitForTimeout(500);

await page.locator("#pricing").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: /Enter unlock code/i }).click();
await page.fill("#pro-code", "NAYA-DEMO-2026");
await page.getByRole("button", { name: /Activate Pro/i }).click();
await page.waitForTimeout(500);

const proBadge = await page.getByText("Pro", { exact: true }).first().isVisible();
await page.screenshot({
  path: path.join(outDir, "nayabill_pro_unlocked.png"),
  fullPage: false,
});

console.log(JSON.stringify({ proBadge, ok: proBadge }, null, 2));
await browser.close();

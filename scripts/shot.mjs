import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
};

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = "screenshots";

const route = process.argv[2] ?? "/";
const only = process.argv[3];

const targets = only ? [only] : Object.keys(VIEWPORTS);
for (const name of targets) {
  if (!VIEWPORTS[name]) {
    console.error(`Unknown viewport: ${name}. Options: ${Object.keys(VIEWPORTS).join(", ")}`);
    process.exit(1);
  }
}

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const slug = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";

for (const name of targets) {
  const context = await browser.newContext({ viewport: VIEWPORTS[name], deviceScaleFactor: 2 });
  const page = await context.newPage();

  const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  if (!response?.ok()) {
    console.error(`✗ ${route} returned ${response?.status() ?? "no response"}`);
    await browser.close();
    process.exit(1);
  }

  await page.evaluate(() => document.fonts.ready);

  const path = `${OUT_DIR}/${slug}.${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${path}  (${VIEWPORTS[name].width}px)`);

  await context.close();
}

await browser.close();

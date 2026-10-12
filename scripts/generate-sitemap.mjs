// scripts/generate-sitemap.mjs
// Build-time sitemap generator for agentstack.ink.
// Reads resources.ts (12 MCP servers) and writes public/sitemap.xml.
//
// Note: agentstack uses modal-based detail pages, NOT /listings/$slug routes,
// so the only URLs to include are: /, /learn, /methodology.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SITE_CONFIG = {
  base: "https://agentstack.ink",
  changefreq: { home: "weekly", static: "monthly" },
  priority: { home: "1.0", static: "0.5" },
};

// Read resources.ts and extract slugs
const resources = readFileSync(resolve(ROOT, "src", "data", "resources.ts"), "utf8");
const slugRegex = /id:\s*['"]([^'"]+)['"]/g;
const slugs = new Set();
let m;
while ((m = slugRegex.exec(resources)) !== null) slugs.add(m[1]);

const today = new Date().toISOString().split("T")[0];

const urls = [
  { loc: SITE_CONFIG.base + "/", changefreq: SITE_CONFIG.changefreq.home, priority: SITE_CONFIG.priority.home, lastmod: today },
  { loc: SITE_CONFIG.base + "/learn", changefreq: SITE_CONFIG.changefreq.static, priority: SITE_CONFIG.priority.static },
  { loc: SITE_CONFIG.base + "/methodology", changefreq: SITE_CONFIG.changefreq.static, priority: SITE_CONFIG.priority.static },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const out = resolve(ROOT, "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`OK: wrote ${urls.length} URLs to ${out} (resources: ${slugs.size})`);

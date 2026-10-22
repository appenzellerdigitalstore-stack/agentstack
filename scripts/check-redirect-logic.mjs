// scripts/check-redirect-logic.mjs
// Fast sanity check for the generated redirect map + matcher.
// Run: node scripts/check-redirect-logic.mjs
// Exits non-zero if any expectation fails.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ts = readFileSync(resolve(ROOT, "src", "generated", "redirects.ts"), "utf8");

const EXACT = Object.fromEntries(
  [...ts.matchAll(/^\s*"([^"]+)": "([^"]+)",$/gm)].map((m) => [m[1], m[2]]),
);
const WILDCARDS = [...ts.matchAll(/^\s*\["([^"]+)", "([^"]+)"\],$/gm)].map((m) => [m[1], m[2]]);

function matchWildcard(pathname) {
  let best;
  for (const [pattern, target] of WILDCARDS) {
    const star = pattern.indexOf("*");
    const prefix = pattern.slice(0, star);
    const suffix = pattern.slice(star + 1);
    if (!pathname.startsWith(prefix)) continue;
    if (!pathname.endsWith(suffix)) continue;
    if (pathname.length < prefix.length + suffix.length) continue;
    const captured = pathname.slice(prefix.length, pathname.length - suffix.length);
    const resolved = target.replace("*", captured);
    if (resolved === pathname) continue;
    if (!best || prefix.length > best.length) best = { target: resolved, length: prefix.length };
  }
  return best?.target;
}

function resolveRedirect(pathname) {
  const exact = EXACT[pathname];
  if (exact && exact !== pathname) return exact;
  const wildcard = matchWildcard(pathname);
  if (wildcard) return wildcard;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const trimmed = pathname.replace(/\/+$/, "") || "/";
    if (trimmed !== pathname) return trimmed;
  }
  return undefined;
}

const cases = [
  // [pathname, expected, description]
  ["/go/anthropic-mcp", "/mcp/anthropic-mcp", "surviving entry keeps its page"],
  ["/listings/anthropic-mcp", "/mcp/anthropic-mcp", "old listing -> current review"],
  ["/go/adyen-mcp", "/mcp/adyen-mcp", "second surviving entry"],
  ["/go/apify-mcp", "/", "archived entry with no review -> index"],
  ["/go/definitely-not-a-real-slug", undefined, "truly unknown slug 404s, not blanket-redirected"],
  ["/category/databases", "/", "archived category -> index"],
  ["/best", "/", "retired /best"],
  ["/support", "/contact", "retired /support -> contact"],
  ["/vs/alpha-vs-beta", "/learn", "comparison wildcard"],
  ["/privacy", undefined, "canonical page is NOT redirected"],
  ["/privacy/", "/privacy", "trailing slash -> canonical"],
  ["/mcp/github-mcp", undefined, "live mcp page untouched"],
  ["/mcp/github-mcp/", "/mcp/github-mcp", "mcp trailing slash"],
  ["/insights", undefined, "live insights untouched"],
  ["/insights/some-slug", undefined, "insights detail untouched"],
  ["/insights/some-slug/", "/insights/some-slug", "insights detail trailing slash"],
  ["/", undefined, "root untouched"],
  ["/assets/index-abc123.js", undefined, "hashed asset untouched"],
  ["/sitemap.xml", undefined, "sitemap untouched"],
  ["/robots.txt", undefined, "robots untouched"],
  ["/ads.txt", undefined, "ads.txt untouched"],
  ["/manifest.webmanifest", undefined, "manifest untouched"],
  ["/favicon.ico", undefined, "favicon untouched"],
];

let failed = 0;
for (const [pathname, expected, why] of cases) {
  const actual = resolveRedirect(pathname);
  const ok = actual === expected;
  if (!ok) failed++;
  const mark = ok ? "PASS" : "FAIL";
  console.log(
    `${mark}  ${pathname.padEnd(34)} -> ${String(actual).padEnd(18)} (expected ${String(expected)})  ${why}`,
  );
}

// A redirect must never point at itself, or the edge would loop.
const selfLoops = Object.entries(EXACT).filter(([from, to]) => from === to);
if (selfLoops.length) {
  failed++;
  console.log(`FAIL  ${selfLoops.length} self-referencing rules:`, selfLoops.slice(0, 5));
}

// A wildcard must never be able to resolve to its own source path.
for (const [pattern, target] of WILDCARDS) {
  if (target === pattern) {
    failed++;
    console.log(`FAIL  wildcard ${pattern} resolves to itself`);
  }
}

console.log(
  `\n${failed === 0 ? "OK" : "FAILED"}: ${cases.length - failed}/${cases.length} cases, ` +
  `${Object.keys(EXACT).length} exact rules, ${WILDCARDS.length} wildcard rules`,
);
process.exit(failed === 0 ? 0 : 1);
#!/usr/bin/env node
/**
 * Status check script. Pings each listing's externalUrl and updates
 * data/status.json with the current up/down state + latency.
 *
 * Reads /data/listings/*.json, writes /data/status.json. The build
 * then reads the status and embeds it into the listing pages.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data', 'listings');
const outputFile = join(__dirname, '..', 'data', 'status.json');

const CONCURRENCY = 8;
const TIMEOUT_MS = 10000;

async function check(url) {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'AgentStack-StatusCheck/1.0' },
    });
    clearTimeout(timer);
    return {
      up: res.ok,
      httpStatus: res.status,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    return {
      up: false,
      error: err.name === 'AbortError' ? 'timeout' : err.message,
      latencyMs: Date.now() - start,
    };
  }
}

async function main() {
  if (!existsSync(dataDir)) {
    console.error(`No listings dir at ${dataDir}`);
    process.exit(1);
  }

  const files = readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  console.log(`Found ${files.length} listings to check`);

  // Read existing status to preserve history
  let prev = {};
  if (existsSync(outputFile)) {
    try {
      prev = JSON.parse(readFileSync(outputFile, 'utf8'));
    } catch {}
  }

  const results = {};
  const queue = [...files];

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      if (!file) return;
      const slug = file.replace('.json', '');
      const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
      const url = data.externalUrl;
      console.log(`Checking ${slug} → ${url}`);
      const check_result = await check(url);
      const prevEntry = prev[slug] || {};
      const checks = prevEntry.checks || [];
      checks.push({
        ts: new Date().toISOString(),
        up: check_result.up,
        latencyMs: check_result.latencyMs,
        httpStatus: check_result.httpStatus,
      });
      // Keep last 30 days (assuming 4 checks/day = 120 entries)
      const trimmed = checks.slice(-120);
      const upCount = trimmed.filter((c) => c.up).length;
      const uptimePct30d = trimmed.length > 0 ? (upCount / trimmed.length) * 100 : 100;
      const avgLatencyMs = trimmed.length > 0
        ? Math.round(trimmed.reduce((s, c) => s + c.latencyMs, 0) / trimmed.length)
        : 0;
      results[slug] = {
        up: check_result.up,
        httpStatus: check_result.httpStatus,
        error: check_result.error,
        lastCheck: new Date().toISOString(),
        uptimePct30d: Number(uptimePct30d.toFixed(2)),
        avgLatencyMs,
        checkCount: trimmed.length,
      };
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\nWrote status for ${Object.keys(results).length} listings to ${outputFile}`);

  const up = Object.values(results).filter((r) => r.up).length;
  const down = Object.values(results).filter((r) => !r.up).length;
  console.log(`Summary: ${up} up, ${down} down`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

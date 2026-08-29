#!/usr/bin/env node
/**
 * Broken link scanner. Checks every listing's externalUrl and repoUrl.
 * Writes data/broken-links.json with any non-2xx responses.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data', 'listings');
const outputFile = join(__dirname, '..', 'data', 'broken-links.json');

const CONCURRENCY = 6;
const TIMEOUT_MS = 15000;

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'AgentStack-BrokenLinkCheck/1.0' },
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err.name === 'AbortError' ? 'timeout' : err.message };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const files = readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  const broken = [];
  const queue = [...files];

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      if (!file) return;
      const slug = file.replace('.json', '');
      const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
      const urlsToCheck = [data.externalUrl, data.repoUrl].filter(Boolean);

      for (const url of urlsToCheck) {
        const result = await check(url);
        if (!result.ok) {
          console.log(`❌ ${slug}: ${url} → ${result.status || result.error}`);
          broken.push({ slug, name: data.name, url, status: result.status, error: result.error });
        } else {
          console.log(`✅ ${slug}: ${url}`);
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  writeFileSync(outputFile, JSON.stringify(broken, null, 2));
  console.log(`\nWrote ${broken.length} broken link(s) to ${outputFile}`);

  if (broken.length > 0) {
    process.exitCode = 0; // don't fail the workflow; the issue opener reads the file
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

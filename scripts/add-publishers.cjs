// One-off: append new publishers to data/publishers.json
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'publishers.json');
const list = JSON.parse(fs.readFileSync(file, 'utf8'));

const NEW = [
  { slug: 'gitlab', name: 'GitLab', websiteUrl: 'https://gitlab.com', githubHandle: 'gitlab-org', isVerified: true },
  { slug: 'prisma', name: 'Prisma', websiteUrl: 'https://www.prisma.io', githubHandle: 'prisma', isVerified: true },
  { slug: 'sanity', name: 'Sanity', websiteUrl: 'https://www.sanity.io', githubHandle: 'sanity-io', isVerified: true },
  { slug: 'neon', name: 'Neon', websiteUrl: 'https://neon.tech', githubHandle: 'neondatabase', isVerified: true },
  { slug: 'cockroachdb', name: 'CockroachDB', websiteUrl: 'https://www.cockroachlabs.com', githubHandle: 'cockroachdb', isVerified: true },
  { slug: 'surrealdb', name: 'SurrealDB', websiteUrl: 'https://surrealdb.com', githubHandle: 'surrealdb', isVerified: true },
  { slug: 'neo4j', name: 'Neo4j', websiteUrl: 'https://neo4j.com', githubHandle: 'neo4j', isVerified: true },
  { slug: 'arangodb', name: 'ArangoDB', websiteUrl: 'https://arangodb.com', githubHandle: 'arangodb', isVerified: true },
  { slug: 'apify', name: 'Apify', websiteUrl: 'https://apify.com', githubHandle: 'apify', isVerified: true },
  { slug: 'oxylabs', name: 'Oxylabs', websiteUrl: 'https://oxylabs.io', githubHandle: 'oxylabs', isVerified: true },
  { slug: 'browserless', name: 'Browserless', websiteUrl: 'https://www.browserless.io', githubHandle: 'browserless', isVerified: true },
  { slug: 'scrapegraph', name: 'ScrapeGraphAI', websiteUrl: 'https://scrapegraphai.com', githubHandle: 'ScrapeGraphAI', isVerified: true },
  { slug: 'obsidian', name: 'Obsidian', websiteUrl: 'https://obsidian.md', githubHandle: null, isVerified: true },
  { slug: 'todoist', name: 'Todoist', websiteUrl: 'https://todoist.com', githubHandle: null, isVerified: true },
  { slug: 'anki', name: 'Anki (open source)', websiteUrl: 'https://apps.ankiweb.net', githubHandle: 'ankitects', isVerified: true },
  { slug: 'zoom', name: 'Zoom', websiteUrl: 'https://zoom.us', githubHandle: null, isVerified: true },
  { slug: 'intercom', name: 'Intercom', websiteUrl: 'https://www.intercom.com', githubHandle: null, isVerified: true },
  { slug: 'mistral', name: 'Mistral AI', websiteUrl: 'https://mistral.ai', githubHandle: 'mistralai', isVerified: true },
  { slug: 'cohere', name: 'Cohere', websiteUrl: 'https://cohere.com', githubHandle: 'cohere-ai', isVerified: true },
  { slug: 'render', name: 'Render', websiteUrl: 'https://render.com', githubHandle: 'render-oss', isVerified: true },
  { slug: 'railway', name: 'Railway', websiteUrl: 'https://railway.app', githubHandle: null, isVerified: true },
  { slug: 'fly', name: 'Fly.io', websiteUrl: 'https://fly.io', githubHandle: 'superfly', isVerified: true },
  { slug: 'axiom', name: 'Axiom', websiteUrl: 'https://axiom.co', githubHandle: 'axiomhq', isVerified: true },
  { slug: 'logflare', name: 'Logflare (Supabase)', websiteUrl: 'https://logflare.app', githubHandle: 'logflare', isVerified: true },
  { slug: 'instana', name: 'Instana (IBM)', websiteUrl: 'https://www.instana.com', githubHandle: null, isVerified: true },
  { slug: 'betterstack', name: 'Better Stack', websiteUrl: 'https://betterstack.com', githubHandle: null, isVerified: true },
  { slug: 'honeycomb', name: 'Honeycomb', websiteUrl: 'https://www.honeycomb.io', githubHandle: 'honeycombio', isVerified: true },
  { slug: 'lemonsqueezy', name: 'Lemon Squeezy', websiteUrl: 'https://www.lemonsqueezy.com', githubHandle: null, isVerified: true },
  { slug: 'paddle', name: 'Paddle', websiteUrl: 'https://www.paddle.com', githubHandle: null, isVerified: true },
  { slug: 'square', name: 'Square (Block)', websiteUrl: 'https://squareup.com', githubHandle: null, isVerified: true },
  { slug: 'braintree', name: 'Braintree (PayPal)', websiteUrl: 'https://www.braintreepayments.com', githubHandle: null, isVerified: true },
];

const existingSlugs = new Set(list.map(p => p.slug));
let added = 0;
for (const p of NEW) {
  if (!existingSlugs.has(p.slug)) {
    list.push(p);
    existingSlugs.add(p.slug);
    added++;
  }
}
fs.writeFileSync(file, JSON.stringify(list, null, 2) + '\n');
console.log(`Publishers: ${list.length} total, ${added} added`);

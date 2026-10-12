export type Resource = {
  id: string; name: string; category: string; kind: 'MCP server' | 'Skill' | 'Plugin';
  description: string; author: string; pricing: 'Free' | 'Freemium'; tags: string[];
  featured?: boolean; beginner?: boolean; source: string; url?: string; install?: string;
};
export const categories = [
  { name: 'All components', slug: 'all', description: 'Every building block in one place.' },
  { name: 'Developer Tools', slug: 'developer-tools', description: 'Git, code review, CI/CD, and developer workflows.' },
  { name: 'Databases', slug: 'databases', description: 'SQL, NoSQL, vector, and graph databases.' },
  { name: 'Web Scraping & Search', slug: 'web-scraping', description: 'Search, crawl, and extract the live web.' },
  { name: 'Productivity & Notes', slug: 'productivity', description: 'Tasks, calendars, notes, and knowledge bases.' },
  { name: 'Communication', slug: 'communication', description: 'Messaging, email, and team collaboration.' },
  { name: 'AI & Reasoning', slug: 'ai-reasoning', description: 'Models, embeddings, and agent reasoning.' },
  { name: 'Cloud & Infrastructure', slug: 'cloud-infra', description: 'Deployments and production infrastructure.' },
  { name: 'Monitoring & Observability', slug: 'monitoring', description: 'Logs, metrics, traces, and error tracking.' },
  { name: 'Payments & Billing', slug: 'payments', description: 'Payments, transactions, and subscriptions.' },
];
const source = (id: string) => `https://agentstack.ink/listings/${id}`;
export const resources: Resource[] = [
  { id: 'firecrawl-mcp', name: 'Firecrawl MCP', category: 'Web Scraping & Search', kind: 'MCP server', author: 'Mendable (Firecrawl)', pricing: 'Freemium', featured: true, beginner: true, description: 'Turn websites into clean markdown. Crawl JavaScript-heavy pages and bring live web content into Claude, Cursor, and Windsurf.', tags: ['Web scraping', 'Markdown', 'Search'], source: source('firecrawl-mcp'), url: 'https://www.firecrawl.dev' },
  { id: 'github-mcp', name: 'GitHub MCP', category: 'Developer Tools', kind: 'MCP server', author: 'Model Context Protocol', pricing: 'Free', beginner: true, description: 'Bring repository context into your agent. Search code, triage issues, open pull requests, and assist with code review.', tags: ['GitHub', 'Code review', 'Repositories'], source: source('github-mcp'), url: 'https://github.com/github/github-mcp-server' },
  { id: 'mongodb-mcp', name: 'MongoDB MCP', category: 'Databases', kind: 'MCP server', author: 'MongoDB', pricing: 'Free', description: 'Query document databases, explore schemas, and retrieve data for grounded agent workflows.', tags: ['Data', 'NoSQL', 'RAG'], source: source('mongodb-mcp'), url: 'https://www.mongodb.com' },
  { id: 'aws-mcp', name: 'AWS MCP', category: 'Cloud & Infrastructure', kind: 'MCP server', author: 'AWS Labs', pricing: 'Free', description: 'Connect agents to AWS infrastructure workflows, including cloud resources and operational metrics.', tags: ['AWS', 'Infrastructure', 'Cloud'], source: source('aws-mcp'), url: 'https://github.com/awslabs/mcp' },
  { id: 'docker-mcp', name: 'Docker MCP', category: 'Developer Tools', kind: 'MCP server', author: 'Docker', pricing: 'Free', description: 'Work with containers and images from an agent. Inspect logs and connect container workflows to your development environment.', tags: ['Containers', 'Docker', 'Development'], source: source('docker-mcp'), url: 'https://www.docker.com' },
  { id: 'e2b-mcp', name: 'E2B MCP', category: 'Developer Tools', kind: 'MCP server', author: 'E2B', pricing: 'Freemium', description: 'Give agents an isolated code execution environment for data analysis and development scripts.', tags: ['Sandbox', 'Code execution', 'Python'], source: source('e2b-mcp'), url: 'https://e2b.dev' },
  { id: 'sitetrace-api', name: 'SiteTrace API', category: 'Web Scraping & Search', kind: 'MCP server', author: 'SiteTrace', pricing: 'Freemium', description: 'A suite for SEO audits, SERP scraping, web summarization, company intelligence, and email health checks.', tags: ['SEO', 'Research', 'APIs'], source: source('sitetrace-api') },
  { id: 'adyen-mcp', name: 'Adyen MCP', category: 'Payments & Billing', kind: 'MCP server', author: 'Adyen', pricing: 'Freemium', description: 'Connect your agent to global payments. Manage payment methods, inspect transactions, and handle disputes.', tags: ['Payments', 'Transactions', 'Enterprise'], source: source('adyen-mcp'), url: 'https://www.adyen.com' },
  { id: 'airtable-mcp', name: 'Airtable MCP', category: 'Productivity & Notes', kind: 'MCP server', author: 'Airtable', pricing: 'Freemium', beginner: true, description: 'Query records, create and update rows, manage views, and run automations. Give your agent a structured workspace.', tags: ['Spreadsheets', 'Automation', 'Data'], source: source('airtable-mcp'), url: 'https://www.airtable.com' },
  { id: 'algolia-mcp', name: 'Algolia MCP', category: 'Web Scraping & Search', kind: 'MCP server', author: 'Algolia', pricing: 'Freemium', description: 'Search Algolia indexes with ranked results, autocomplete, typo tolerance, and fine-grained ranking controls.', tags: ['Search', 'Indexes', 'Autocomplete'], source: source('algolia-mcp'), url: 'https://www.algolia.com' },
  { id: 'anki-mcp', name: 'Anki MCP', category: 'Productivity & Notes', kind: 'MCP server', author: 'Anki (open source)', pricing: 'Free', beginner: true, description: 'Add flashcards, search your deck, generate cards from text, and trigger review sessions to turn learning into long-term memory.', tags: ['Learning', 'Flashcards', 'Memory'], source: source('anki-mcp'), url: 'https://apps.ankiweb.net' },
  { id: 'anthropic-mcp', name: 'Anthropic MCP', category: 'AI & Reasoning', kind: 'MCP server', author: 'Anthropic', pricing: 'Free', description: 'Access Claude models, prompt caching, batch completions, and usage inspection from your agent.', tags: ['Claude', 'Models', 'Prompt caching'], source: source('anthropic-mcp'), url: 'https://www.anthropic.com' },
];
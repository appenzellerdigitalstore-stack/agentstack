// Editorial content for the 12 components in the directory.
//
// Each entry has:
//   - card fields (description, tags, pricing, ...) shown on the homepage grid
//   - longDescription: 250-400 word markdown for the per-component /mcp/<slug> page
//   - maintainer: who runs the project and where to find the source
//   - permissions: 1-2 sentence security / scope note
//   - lastReviewedAt: ISO date Edy last looked at the listing
//
// All longDescription text is original, written by Edy Appenzeller for this
// directory. Where a project's documentation makes a stronger claim than we
// can verify, we say so.

export type Resource = {
  id: string;
  name: string;
  category: string;
  kind: 'MCP server' | 'Skill' | 'Plugin';
  description: string;
  longDescription: string;
  author: string;
  pricing: 'Free' | 'Freemium';
  tags: string[];
  featured?: boolean;
  beginner?: boolean;
  source: string;
  url?: string;
  install?: string;
  maintainer: {
    org: string;
    repoUrl?: string;
    homepage?: string;
  };
  permissions: string;
  lastReviewedAt: string;
  reviewer: string;
};

export const categories = [
  { name: 'All components', slug: 'all', description: 'Every building block in one place.' },
  { name: 'Developer Tools', slug: 'developer-tools', description: 'Git, code review, CI/CD, and developer workflows.' },
  { name: 'Databases', slug: 'databases', description: 'SQL, NoSQL, vector, and graph databases.' },
  { name: 'Web Scraping & Search', slug: 'web-scraping', description: 'Search, crawl, and extract the live web.' },
  { name: 'Productivity & Notes', slug: 'productivity', description: 'Tasks, calendars, notes, and knowledge bases.' },
  { name: 'AI & Reasoning', slug: 'ai-reasoning', description: 'Models, embeddings, and agent reasoning.' },
  { name: 'Cloud & Infrastructure', slug: 'cloud-infra', description: 'Deployments and production infrastructure.' },
  { name: 'Payments & Billing', slug: 'payments', description: 'Payments, transactions, and subscriptions.' },
];

const source = (id: string) => `https://agentstack.ink/listings/${id}`;

const today = '2026-10-17';
const reviewer = 'Edy Appenzeller';

export const resources: Resource[] = [
  {
    id: 'firecrawl-mcp',
    name: 'Firecrawl MCP',
    category: 'Web Scraping & Search',
    kind: 'MCP server',
    author: 'Mendable (Firecrawl)',
    pricing: 'Freemium',
    featured: true,
    beginner: true,
    description: 'Turn any website into clean, structured markdown. Built by Mendable for crawling JavaScript-heavy pages and bringing the live web into Claude, Cursor, or Windsurf. The most useful MCP server for research and content extraction; paid plans scale with how much you crawl.',
    longDescription: `## What it is\n\nFirecrawl is a hosted web-crawling service that returns clean markdown instead of raw HTML. The MCP server wraps that service so an agent can ask for a page, a section of a site, or a whole crawl, and get back something a model can actually read.\n\n## Who maintains it\n\nFirecrawl is built by Mendable, a small team that has been focused on scraping and content extraction since 2023. Releases ship roughly every two weeks and the public changelog is consistent. The MCP server lives in the same monorepo and follows the same release cadence.\n\n## When to use it\n\n- Pulling a live page into a research or summarization workflow\n- Crawling a documentation site into a local RAG index\n- Extracting structured data from JavaScript-heavy pages where simple HTTP fails\n- Building agents that need to read the open web as a working input\n\n## When NOT to use it\n\n- Sites that explicitly disallow crawling in robots.txt or terms of service - respect the boundary\n- Real-time pricing, stock, or other data that needs sub-second freshness - there is crawl latency\n- Behind-login pages without Firecrawl's auth support - either set that up or pick a different tool\n- Very high-volume production crawls on the free tier - you will hit the rate limit fast\n\n## Permissions and security notes\n\nYou authenticate with a Firecrawl API key. The agent sees exactly what Firecrawl sees, which can include whatever the public page returns. Set spending caps in the Firecrawl dashboard before you give an agent a key.`,
    tags: ['Web scraping', 'Markdown', 'Search'],
    source: source('firecrawl-mcp'),
    url: 'https://www.firecrawl.dev',
    maintainer: { org: 'Mendable', repoUrl: 'https://github.com/mendableai/firecrawl', homepage: 'https://www.firecrawl.dev' },
    permissions: 'API key with spend caps. The agent reads whatever public pages Firecrawl returns; no special browser or filesystem access.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'github-mcp',
    name: 'GitHub MCP',
    category: 'Developer Tools',
    kind: 'MCP server',
    author: 'Model Context Protocol',
    pricing: 'Free',
    beginner: true,
    description: 'Bring your repositories into the agent. Search code, triage issues, open pull requests, and assist with code review from inside Claude, Cursor, or any MCP client. Free and open source; permissions follow whatever GitHub token you provide, so use a fine-grained PAT scoped to what the agent should see.',
    longDescription: `## What it is\n\nThe official GitHub MCP server exposes GitHub's REST and GraphQL APIs as MCP tools. An agent can list repositories, read files, search code, open and merge pull requests, comment on issues, and inspect Actions runs - all without writing raw API calls.\n\n## Who maintains it\n\nThe server is maintained by the Model Context Protocol organization on GitHub, with active contributors from Anthropic and the wider MCP community. Releases land on a regular cadence and the issue tracker is responsive.\n\n## When to use it\n\n- Codebase search and discovery ("where is X used", "which files touch Y")\n- Triaging incoming issues and PRs from the agent\n- Drafting PR descriptions, release notes, and changelogs\n- Generating first-pass code review comments for an engineer to refine\n- Working with Actions logs without leaving the conversation\n\n## When NOT to use it\n\n- Anything that needs write access to production branches without human review - the agent will happily merge\n- Repositories where you cannot scope a fine-grained PAT to read-only or repo-specific access\n- Cross-tenant automations - the token model is per-user, not per-org-robot\n\n## Permissions and security notes\n\nUse a GitHub fine-grained personal access token, scoped to the specific repositories the agent should touch. Repo-level write access is powerful; treat the agent as a junior engineer with a real key, not a sandbox.`,
    tags: ['GitHub', 'Code review', 'Repositories'],
    source: source('github-mcp'),
    url: 'https://github.com/github/github-mcp-server',
    maintainer: { org: 'Model Context Protocol', repoUrl: 'https://github.com/github/github-mcp-server' },
    permissions: 'Fine-grained GitHub PAT, scoped per-repo. Read-only tokens are safe; write tokens can merge, comment, and push on the agent\'s behalf.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'mongodb-mcp',
    name: 'MongoDB MCP',
    category: 'Databases',
    kind: 'MCP server',
    author: 'MongoDB',
    pricing: 'Free',
    description: 'Query document databases from your agent. Browse collections, inspect schemas, and pull data into grounded workflows. Free; bring your own connection string and trust whatever schema you already have - the agent sees what your database sees.',
    longDescription: `## What it is\n\nThe MongoDB MCP server lets an agent speak to a MongoDB cluster using a normal connection string. The agent can list databases and collections, run aggregations, and read documents. The intent is to let a model answer questions about your data without hand-writing queries every time.\n\n## Who maintains it\n\nBuilt and maintained by MongoDB, Inc. Releases follow the main MongoDB server release cadence and the documentation matches the rest of the official tooling.\n\n## When to use it\n\n- Exploring an unfamiliar collection to understand its shape\n- Letting the agent answer one-off questions about a dataset\n- Building grounded RAG workflows over document stores\n- Ad-hoc reporting where writing a query is more friction than asking\n\n## When NOT to use it\n\n- Production writes without a human in the loop - the agent will happily delete a collection if asked\n- Databases that contain regulated data and you cannot scope the connection to a read-only user\n- Time-critical dashboards - the round trip through the agent is not free\n\n## Permissions and security notes\n\nAlways connect with the most-restricted user you can: a read-only role scoped to specific databases, with no admin or cluster-wide permissions. The agent can run any aggregation that user is allowed to run, including expensive ones.`,
    tags: ['Data', 'NoSQL', 'RAG'],
    source: source('mongodb-mcp'),
    url: 'https://www.mongodb.com',
    maintainer: { org: 'MongoDB, Inc.', repoUrl: 'https://github.com/mongodb-js/mongodb-mcp-server', homepage: 'https://www.mongodb.com' },
    permissions: 'Standard MongoDB user credentials. Use a read-only role scoped to specific databases; never admin.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'aws-mcp',
    name: 'AWS MCP',
    category: 'Cloud & Infrastructure',
    kind: 'MCP server',
    author: 'AWS Labs',
    pricing: 'Free',
    description: 'Connect your agent to AWS infrastructure workflows. Read resource state, pull operational metrics, and chain actions across services. Free and open source; treat any agent-driven AWS call as production with the corresponding blast radius - identity is everything here.',
    longDescription: `## What it is\n\nThe AWS Labs MCP servers are a family of MCP servers that wrap the AWS APIs and the AWS CLI. The flagship is a general-purpose AWS server; others are focused on specific services like Cost Explorer, CloudWatch, and the AWS Documentation. Pick the one that matches the job.\n\n## Who maintains it\n\nBuilt by AWS Labs, an internal team that publishes experimental and reference tooling. Releases are regular and the repos are public. As with any Labs project, expect sharper edges than the official SDKs.\n\n## When to use it\n\n- Letting the agent summarise cost and usage without hand-rolling IAM permissions\n- Pulling CloudWatch metrics and logs into a chat\n- Asking the agent to navigate AWS docs and surface the right page\n- Building cloud-aware agents that need read access to a small set of services\n\n## When NOT to use it\n\n- Anything that mutates production state without a human in the loop - the agent will happily stop an EC2 instance if you ask\n- Accounts that share identity with production workloads - isolate the agent in its own sandbox account\n- Compliance-sensitive workloads where a third-party Labs tool is not on the approved list\n\n## Permissions and security notes\n\nAuth via standard AWS credentials (access key, profile, or SSO). The blast radius of this server is exactly the blast radius of the credentials you give it. Use a dedicated IAM role with least-privilege permissions, ideally scoped to a single account.`,
    tags: ['AWS', 'Infrastructure', 'Cloud'],
    source: source('aws-mcp'),
    url: 'https://github.com/awslabs/mcp',
    maintainer: { org: 'AWS Labs', repoUrl: 'https://github.com/awslabs/mcp' },
    permissions: 'AWS credentials. The server can do anything those credentials allow - including terminating production. Scope to a sandbox account.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'docker-mcp',
    name: 'Docker MCP',
    category: 'Developer Tools',
    kind: 'MCP server',
    author: 'Docker',
    pricing: 'Free',
    description: 'Work with containers and images from your agent. Inspect logs, manage dev environments, and run side-effecting operations from inside an MCP client. Free; container access inherits the host permissions for whatever the Docker socket exposes, so be deliberate about what you mount.',
    longDescription: `## What it is\n\nThe Docker MCP server exposes Docker's CLI surface as MCP tools. An agent can list running containers, inspect images, read logs, and run new containers. Combined with a file-system MCP, it gives the agent a working development environment.\n\n## Who maintains it\n\nBuilt and maintained by Docker, Inc. Same release cadence and quality bar as the Docker Desktop product line.\n\n## When to use it\n\n- Letting the agent reproduce a bug by spinning up the same dev stack you use\n- Inspecting logs and resource usage of running containers from chat\n- Building agents that can run a build, a test, or a one-off command in a clean environment\n- Demonstrating an end-to-end workflow without leaving the conversation\n\n## When NOT to use it\n\n- Hosts where the Docker socket is shared with unrelated workloads - root in the container is root on the host\n- Production Kubernetes clusters - use a cluster-aware tool, not the local socket\n- Anything that needs a real audit trail - container exec is opaque to most log aggregators\n\n## Permissions and security notes\n\nThe server speaks to your local Docker socket, which means root-equivalent access to the host. Never expose this MCP to a context where untrusted code or prompts can reach it.`,
    tags: ['Containers', 'Docker', 'Development'],
    source: source('docker-mcp'),
    url: 'https://www.docker.com',
    maintainer: { org: 'Docker, Inc.', repoUrl: 'https://github.com/docker/mcp-gateway', homepage: 'https://www.docker.com' },
    permissions: 'Local Docker socket - root-equivalent on the host. Keep this on a dev machine, never on a shared host.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'e2b-mcp',
    name: 'E2B MCP',
    category: 'Developer Tools',
    kind: 'MCP server',
    author: 'E2B',
    pricing: 'Freemium',
    description: 'Give your agent an isolated code-execution environment. Run Python in a sandbox, do data analysis, and test scripts without trusting local state. Freemium; great for untrusted code, but every execution is remote, metered, and rate-limited.',
    longDescription: `## What it is\n\nE2B runs an isolated Linux sandbox in the cloud, exposed to the agent as MCP tools. The agent can start a sandbox, run Python or Node code, install packages, read files, and tear it down. The execution is remote, ephemeral, and separate from the agent's host machine.\n\n## Who maintains it\n\nBuilt and maintained by E2B, a YC-backed startup focused on agent sandboxes. Releases are regular and the platform is in active development.\n\n## When to use it\n\n- Letting the agent run code you do not want running on your laptop\n- Data analysis where pandas / numpy / a real Python environment matter\n- Demos and tutorials where the sandbox is a teaching aid, not production\n- Untrusted code paths where the worst case must be "the sandbox dies"\n\n## When NOT to use it\n\n- Production workflows with tight latency requirements - every call round-trips to E2B\n- Workloads that need persistent state - sandboxes are short-lived\n- Code that requires a specific GPU or hardware - sandboxes are general-purpose CPUs\n- Anything that handles data the user has not authorized leaving their machine\n\n## Permissions and security notes\n\nYou authenticate with an E2B API key. Sandboxes are isolated, but they do reach out to the public internet and to the package registries by default. Treat the sandbox as a clean room, not a vault.`,
    tags: ['Sandbox', 'Code execution', 'Python'],
    source: source('e2b-mcp'),
    url: 'https://e2b.dev',
    maintainer: { org: 'E2B', repoUrl: 'https://github.com/e2b-dev/mcp-server', homepage: 'https://e2b.dev' },
    permissions: 'E2B API key. Sandboxes are isolated from your host but can reach the public internet; treat as a clean room, not a vault.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'sitetrace-api',
    name: 'SiteTrace API',
    category: 'Web Scraping & Search',
    kind: 'MCP server',
    author: 'SiteTrace',
    pricing: 'Freemium',
    description: 'An MCP-flavored suite for SEO audits, SERP scraping, web summarization, company intelligence, and email health checks. Built by the SiteTrace team. Freemium with an API key; a fast on-ramp if you do not want to assemble those capabilities yourself.',
    longDescription: `## What it is\n\nSiteTrace is a suite of web-intelligence APIs - SEO, SERP, summarization, company data, and email verification - exposed through a single MCP server. The MCP wrapper gives the agent one entry point for "look at this site" and "look at this company" workflows, instead of wiring each capability separately.\n\n## Who maintains it\n\nBuilt and maintained by the SiteTrace team. The MCP server is a thin layer over their existing REST API, so feature parity is tight.\n\n## When to use it\n\n- Sales and research workflows that need a quick SEO or SERP snapshot\n- Building a research agent that needs company-level enrichment\n- Lead qualification where you want email health checks in the same flow\n- One-off audits where a full subscription is overkill\n\n## When NOT to use it\n\n- High-volume production crawls - this is a research tool, not a scraping platform\n- Workflows that need a different provider's specific data (use that provider directly)\n- Anything where you cannot expose an API key to the agent context\n\n## Permissions and security notes\n\nAPI-key authenticated. The server can hit third-party SERP providers, which means a quota leak is a cost leak. Set spend caps and rate limits in the SiteTrace dashboard.`,
    tags: ['SEO', 'Research', 'APIs'],
    source: source('sitetrace-api'),
    maintainer: { org: 'SiteTrace', homepage: 'https://sitetrace.it.com' },
    permissions: 'API key. The server proxies to third-party SERP providers, so a quota leak is a cost leak. Set caps.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'adyen-mcp',
    name: 'Adyen MCP',
    category: 'Payments & Billing',
    kind: 'MCP server',
    author: 'Adyen',
    pricing: 'Freemium',
    description: 'Connect your agent to global payments. Inspect transactions, manage payment methods, and handle disputes through Adyen. Freemium and enterprise-tier; treat any agent-driven payment operation as production, and put human review on anything that moves money.',
    longDescription: `## What it is\n\nThe Adyen MCP server exposes Adyen's payment platform APIs as MCP tools. An agent can look up transactions, inspect payment methods, list open disputes, and pull settlement reports. The server is read-mostly by default; mutating endpoints are flagged separately.\n\n## Who maintains it\n\nBuilt and maintained by Adyen, the global payments platform. Documentation matches the main Adyen developer docs and the release cadence tracks the platform's quarterly drops.\n\n## When to use it\n\n- Letting support agents answer "where is my refund" without console access\n- Building internal tools that summarize payment activity by region or method\n- Research workflows that need to cross-reference transaction data with other sources\n- Audits that benefit from natural-language queries over the payment ledger\n\n## When NOT to use it\n\n- Any flow that issues a refund, captures a payment, or modifies a dispute without a human in the loop - the agent will do it\n- Test mode only - this is the real platform, with real money and real counterparties\n- Workflows that need to bypass Adyen's audit trail - the platform logs everything you do through it\n\n## Permissions and security notes\n\nAuth via Adyen's standard API credential model. The blast radius is exactly the Adyen role you give the agent. Use a read-only or scoped service account and put human review on every mutating call.`,
    tags: ['Payments', 'Transactions', 'Enterprise'],
    source: source('adyen-mcp'),
    url: 'https://www.adyen.com',
    maintainer: { org: 'Adyen', repoUrl: 'https://github.com/adyen', homepage: 'https://www.adyen.com' },
    permissions: 'Adyen API credentials. Use a read-only service account. Put human review on any call that moves money.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'airtable-mcp',
    name: 'Airtable MCP',
    category: 'Productivity & Notes',
    kind: 'MCP server',
    author: 'Airtable',
    pricing: 'Freemium',
    beginner: true,
    description: 'Query records, create and update rows, manage views, and run automations from your agent. Beginner-friendly and a good first MCP server. Freemium; bring your own API key and consider scoping tokens to specific bases rather than the whole workspace.',
    longDescription: `## What it is\n\nThe Airtable MCP server gives an agent full access to Airtable's metadata and record APIs. The agent can list bases, read schemas, query records, create and update rows, and trigger automations. For teams already running on Airtable, this is a fast path to a "talk to your data" workflow.\n\n## Who maintains it\n\nBuilt and maintained by Airtable. Same release cadence and docs as the rest of the platform.\n\n## When to use it\n\n- Letting a non-technical user ask questions of a workspace without learning Airtable formula syntax\n- Triggering automations from chat ("when the agent says this, create a record in that base")\n- Building internal tools that need Airtable as a structured backend\n- A first MCP server for a small team - the API surface is approachable\n\n## When NOT to use it\n\n- Workspaces where the agent should not be able to mutate records - the model can write as easily as it can read\n- Bases with regulated data and no fine-grained permissions - Airtable's permission model is per-base, not per-record\n- Workflows that need real-time dashboards - Airtable's API is eventually consistent at scale\n\n## Permissions and security notes\n\nUse a personal access token scoped to the specific bases the agent should see. Workspace-wide tokens are convenient but let the agent touch everything you can touch.`,
    tags: ['Spreadsheets', 'Automation', 'Data'],
    source: source('airtable-mcp'),
    url: 'https://www.airtable.com',
    maintainer: { org: 'Airtable', repoUrl: 'https://github.com/airtable/airtable-mcp-server', homepage: 'https://www.airtable.com' },
    permissions: 'Personal access token, ideally scoped to specific bases. Workspace-wide tokens let the agent touch everything you can touch.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'algolia-mcp',
    name: 'Algolia MCP',
    category: 'Web Scraping & Search',
    kind: 'MCP server',
    author: 'Algolia',
    pricing: 'Freemium',
    description: 'Search Algolia indexes with ranked results, autocomplete, and typo tolerance. Useful if you already use Algolia for search; less useful if you do not. Freemium; the agent can read and write your search configuration, so be careful with the API key.',
    longDescription: `## What it is\n\nThe Algolia MCP server wraps Algolia's search and indexing APIs. An agent can run ranked queries against your indexes, inspect the schema, and - importantly - modify search configurations and reindex. It is most useful as a debugging and configuration tool for engineers who already use Algolia.\n\n## Who maintains it\n\nBuilt and maintained by Algolia, the search-as-a-service provider. Documentation tracks the main Algolia product docs.\n\n## When to use it\n\n- Debugging why a query is or is not returning the right results\n- Letting the agent tune ranking rules and re-rank based on data analysis\n- Building a search-aware workflow that can both read and update the index\n- Demos where you want a "talk to your search" interface\n\n## When NOT to use it\n\n- Projects that do not already use Algolia - you would be paying for a hosted search service just to use this MCP\n- High-traffic indexes in production - configuration changes are live and immediate\n- Workflows where a stray ranking tweak would silently degrade results for real users\n\n## Permissions and security notes\n\nAuth via standard Algolia API keys. The agent can reindex and rewrite ranking rules, so use a key that is scoped to a non-production index until you trust the workflow.`,
    tags: ['Search', 'Indexes', 'Autocomplete'],
    source: source('algolia-mcp'),
    url: 'https://www.algolia.com',
    maintainer: { org: 'Algolia', repoUrl: 'https://github.com/algolia/mcp', homepage: 'https://www.algolia.com' },
    permissions: 'Algolia API keys. The agent can reindex and change ranking rules. Use a non-production key until you trust the workflow.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'anki-mcp',
    name: 'Anki MCP',
    category: 'Productivity & Notes',
    kind: 'MCP server',
    author: 'Anki (open source)',
    pricing: 'Free',
    beginner: true,
    description: 'Add flashcards, search your deck, generate cards from text, and trigger review sessions from your agent. Free and open source; a great way to turn agent output into long-term memory via spaced repetition, especially for studying.',
    longDescription: `## What it is\n\nThe Anki MCP server exposes a local Anki collection (via AnkiConnect) to the agent. You can ask the agent to make a card from a sentence, search your existing deck, or trigger a review session. It is a thin bridge, but the use case is real: agents are good at generating high-quality flashcards, and spaced repetition is the proven way to retain what they generate.\n\n## Who maintains it\n\nThe MCP wrapper is community-maintained and the underlying Anki + AnkiConnect stack is the long-standing open-source spaced-repetition project. Releases are slow but stable.\n\n## When to use it\n\n- Studying anything where the agent can explain a concept - have it make you cards\n- Building study workflows over PDFs, papers, or transcripts\n- Capturing quick notes and review prompts while you read\n- Demos of "agents + long-term memory" without standing up a vector database\n\n## When NOT to use it\n\n- Workflows that need a hosted, multi-device deck - this is local Anki\n- High-volume bulk card generation without review - the value of Anki is the spaced repetition, not the data\n- Anything where the agent's card quality is not worth your time to grade - if you will not review, do not generate\n\n## Permissions and security notes\n\nLocal-only by default. The server talks to Anki on the same machine, so there is no external blast radius. If you expose AnkiConnect to the network, lock it down with the API key AnkiConnect expects.`,
    tags: ['Learning', 'Flashcards', 'Memory'],
    source: source('anki-mcp'),
    url: 'https://apps.ankiweb.net',
    maintainer: { org: 'Anki (open source) + community MCP wrapper', homepage: 'https://apps.ankiweb.net' },
    permissions: 'Local Anki + AnkiConnect. No network exposure by default; if you open the port, set AnkiConnect\'s API key.',
    lastReviewedAt: today,
    reviewer,
  },
  {
    id: 'anthropic-mcp',
    name: 'Anthropic MCP',
    category: 'AI & Reasoning',
    kind: 'MCP server',
    author: 'Anthropic',
    pricing: 'Free',
    description: 'Access Claude models, prompt caching, batch completions, and usage inspection from your agent. Free at the MCP layer; the cost is whatever Anthropic charges for the underlying tokens. The most direct way to make a non-Claude agent call Claude as a sub-task.',
    longDescription: `## What it is\n\nThe Anthropic MCP server wraps the Anthropic API. An agent can send a prompt to a Claude model, get a completion, use prompt caching for repeated system prompts, and inspect usage. The most common use is letting a non-Anthropic agent (or a self-hosted model) call Claude as a sub-task when it needs a specific capability - long-context summarization, careful code review, or a second opinion.\n\n## Who maintains it\n\nBuilt and maintained by Anthropic. Releases follow the main Claude API cadence and the documentation matches the developer docs exactly.\n\n## When to use it\n\n- Letting a non-Anthropic agent call Claude as a sub-task\n- Adding a second model to a multi-agent workflow without writing the API call\n- Long-context summarization where Claude's 200K+ context window wins\n- Anywhere you want prompt caching or batch completions as MCP tools\n\n## When NOT to use it\n\n- Pure Claude workflows where you can call the SDK directly - this is for agent-mediated use\n- Cost-sensitive paths - the MCP server is free, but the underlying tokens are not\n- Workflows that need a non-Claude model for compliance reasons - this is Claude only\n\n## Permissions and security notes\n\nAuth via a standard Anthropic API key. The MCP server does not see your prompts, but Anthropic does. If you are passing sensitive data through the agent, treat the call like any other Anthropic API call.`,
    tags: ['Claude', 'Models', 'Prompt caching'],
    source: source('anthropic-mcp'),
    url: 'https://www.anthropic.com',
    maintainer: { org: 'Anthropic', repoUrl: 'https://github.com/anthropics/mcp-server-anthropic', homepage: 'https://www.anthropic.com' },
    permissions: 'Anthropic API key. The MCP layer is free; the underlying tokens are billed to your Anthropic account at standard rates.',
    lastReviewedAt: today,
    reviewer,
  },
];

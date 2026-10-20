import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, User, ShieldCheck, AlertTriangle, Globe } from "lucide-react";
import { resources } from "@/data/resources";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/mcp/$slug")({
  loader: ({ params }) => {
    const resource = resources.find(r => r.id === params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.resource.name} - AgentStack` },
      { name: "description", content: loaderData.resource.description },
      { property: "og:title", content: loaderData.resource.name },
      { property: "og:description", content: loaderData.resource.description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }) : {},
  component: McpPage,
});

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string };

/**
 * Minimal markdown-block parser for the editorial long-form entries.
 *
 * Supports: ## / ### headings, - and * bullets, 1. numbered lists,
 * > blockquotes, fenced code, and paragraphs. Blocks are separated by
 * blank lines; a run of consecutive list lines is grouped into one
 * <ul> / <ol> rather than being flattened into a single paragraph.
 */
function parseBlocks(md: string): Block[] {
  const out: Block[] = [];
  const blocks = md.split(/\n{2,}/);

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    // Fenced code
    if (block.startsWith("```")) {
      out.push({ kind: "quote", text: block.replace(/^```\w*\n?/, "").replace(/```$/, "").trim() });
      continue;
    }

    // Heading
    if (block.startsWith("### ")) {
      out.push({ kind: "h3", text: block.slice(4).trim() });
      continue;
    }
    if (block.startsWith("## ")) {
      out.push({ kind: "h2", text: block.slice(3).trim() });
      continue;
    }
    if (block.startsWith("# ")) {
      out.push({ kind: "h2", text: block.slice(2).trim() });
      continue;
    }

    // Blockquote
    if (block.startsWith("> ")) {
      out.push({
        kind: "quote",
        text: block.split("\n").map(l => l.replace(/^>\s?/, "").trim()).join(" "),
      });
      continue;
    }

    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);

    // Unordered list - every line is a bullet
    if (lines.length > 0 && lines.every(l => /^[-*]\s+/.test(l))) {
      out.push({
        kind: "ul",
        items: lines.map(l => l.replace(/^[-*]\s+/, "").trim()),
      });
      continue;
    }

    // Ordered list
    if (lines.length > 0 && lines.every(l => /^\d+[.)]\s+/.test(l))) {
      out.push({
        kind: "ol",
        items: lines.map(l => l.replace(/^\d+[.)]\s+/, "").trim()),
      });
      continue;
    }

    // Mixed paragraph - join with spaces so no raw newlines survive
    out.push({ kind: "p", text: lines.join(" ") });
  }

  return out;
}

/** Render **bold** and *italic* inline without a markdown dependency. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return <>{parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  })}</>;
}

function McpPage() {
  const { resource } = Route.useLoaderData();
  const related = resources
    .filter(r => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);
  const blocks = parseBlocks(resource.longDescription);

  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1" style={{ marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to the directory
      </Link>
      <span className="eyebrow text-primary">{resource.kind.toUpperCase()} / {resource.category.toUpperCase()}</span>
      <h1>{resource.name}</h1>
      <p className="lead">{resource.description}</p>
      <div className="meta-row" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16, color: "var(--muted-foreground)", fontSize: 13 }}>
        <span>by <strong style={{ color: "var(--foreground)" }}>{resource.author}</strong></span>
        <span><span className={`price-dot ${resource.pricing === 'Free' ? 'is-free' : ''}`} style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: resource.pricing === 'Free' ? '#22c55e' : '#a3a3a3', marginRight: 6, verticalAlign: 1 }} /> {resource.pricing}</span>
        <span><Calendar size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} /> Reviewed {resource.lastReviewedAt}</span>
        <span><User size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} /> {resource.reviewer}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
        {resource.url && <a className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-5" href={resource.url} target="_blank" rel="noreferrer">Project website<ExternalLink size={12} style={{ display: "inline", marginLeft: 6 }} /></a>}
        {resource.maintainer.repoUrl && <a className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-10 px-5" href={resource.maintainer.repoUrl} target="_blank" rel="noreferrer"><Github size={14} style={{ display: "inline", marginRight: 6 }} />Source</a>}
        <Link to="/methodology" className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-10 px-5">Editorial approach<ArrowUpRight size={12} style={{ display: "inline", marginLeft: 6 }} /></Link>
      </div>
    </div>

    <div className="methodology-layout"><div>
      <article className="prose">
        {blocks.map((b, i) => {
          if (b.kind === "h2") return <h2 key={i} className="prose-h2"><span className="prose-h2-rule" />{b.text}</h2>;
          if (b.kind === "h3") return <h3 key={i} className="prose-h3">{b.text}</h3>;
          if (b.kind === "ul") return <ul key={i} className="prose-list">{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>;
          if (b.kind === "ol") return <ol key={i} className="prose-list prose-list-ordered">{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ol>;
          if (b.kind === "quote") return <blockquote key={i} className="prose-quote">{b.text}</blockquote>;
          return <p key={i} className="prose-p"><Inline text={b.text} /></p>;
        })}

        <div className="prose-callout">
          <ShieldCheck size={20} className="prose-callout-icon" />
          <div>
            <h3>Permissions and security</h3>
            <p>{resource.permissions}</p>
          </div>
        </div>

        <div className="prose-callout is-warning">
          <AlertTriangle size={20} className="prose-callout-icon" />
          <div>
            <h3>Read before you install</h3>
            <p>This entry was last reviewed on {resource.lastReviewedAt} by {resource.reviewer}. Commands, credentials, supported clients, and pricing can change. Always read the current official documentation before installing.</p>
          </div>
        </div>
      </article>

      {related.length > 0 && <section className="related-block">
        <h2>More in {resource.category}</h2>
        <ul>
          {related.map(r => <li key={r.id}>
            <Link to="/mcp/$slug" params={{ slug: r.id }} className="related-link">
              <span className="related-name">{r.name}</span>
              <ArrowUpRight size={13} />
            </Link>
            <span className="related-desc">{r.description}</span>
          </li>)}
        </ul>
      </section>}
    </div>

    <aside className="methodology-side">
      <h3>Maintainer</h3>
      <p>{resource.maintainer.org}</p>
      {resource.maintainer.repoUrl && <a href={resource.maintainer.repoUrl} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">View repository<ArrowUpRight size={12} /></a>}
      {resource.maintainer.homepage && resource.maintainer.homepage !== resource.url && <p style={{ marginTop: 8 }}><a href={resource.maintainer.homepage} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline"><Globe size={12} /> Homepage<ArrowUpRight size={10} /></a></p>}

      <h3 style={{ marginTop: 24 }}>Pricing</h3>
      <p><span className={`price-dot ${resource.pricing === 'Free' ? 'is-free' : ''}`} style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: resource.pricing === 'Free' ? '#22c55e' : '#a3a3a3', marginRight: 6, verticalAlign: 1 }} /> {resource.pricing}</p>

      <h3 style={{ marginTop: 24 }}>Category</h3>
      <p>{resource.category}</p>

      {resource.tags.length > 0 && <>
        <h3 style={{ marginTop: 24 }}>Tags</h3>
        <div className="tag-cloud">{resource.tags.map(t => <span key={t} className="small-tag">{t}</span>)}</div>
      </>}

      <h3 style={{ marginTop: 24 }}>Source listing</h3>
      <p>Curated from the AgentStack source directory. The original listing is canonical for technical facts (versions, dependencies, current maintainer).</p>
      <a href={resource.source} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">Original listing<ArrowUpRight size={12} /></a>
    </aside></div>
  </main></DirectoryShell>;
}
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

function McpPage() {
  const { resource } = Route.useLoaderData();
  const related = resources
    .filter(r => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);
  const sections = parseLongDescription(resource.longDescription);

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
      <article className="prose-page" style={{ maxWidth: 760, margin: "0 auto" }}>
        {sections.map((s, i) => {
          if (s.kind === "h2") return <h2 key={i}>{s.text}</h2>;
          return <p key={i}>{s.text}</p>;
        })}
        <div style={{ background: "var(--muted)", padding: 18, borderRadius: 10, marginTop: 32, display: "flex", gap: 14, borderLeft: "3px solid var(--primary)" }}>
          <ShieldCheck size={22} style={{ flexShrink: 0, marginTop: 2, color: "var(--primary)" }} />
          <div>
            <h3 style={{ margin: 0, fontSize: 15 }}>Permissions and security</h3>
            <p style={{ margin: "6px 0 0 0", fontSize: 14, color: "var(--muted-foreground)" }}>{resource.permissions}</p>
          </div>
        </div>
        <div style={{ background: "var(--muted)", padding: 18, borderRadius: 10, marginTop: 12, display: "flex", gap: 14, borderLeft: "3px solid #f59e0b" }}>
          <AlertTriangle size={22} style={{ flexShrink: 0, marginTop: 2, color: "#f59e0b" }} />
          <div>
            <h3 style={{ margin: 0, fontSize: 15 }}>Read before you install</h3>
            <p style={{ margin: "6px 0 0 0", fontSize: 14, color: "var(--muted-foreground)" }}>This entry was last reviewed on {resource.lastReviewedAt} by {resource.reviewer}. Commands, credentials, supported clients, and pricing can change. Always read the current official documentation before installing.</p>
          </div>
        </div>
      </article>
      {related.length > 0 && <div style={{ marginTop: 48 }}>
        <h2>More in {resource.category}</h2>
        <ul>
          {related.map(r => <li key={r.id}><Link to="/mcp/$slug" params={{ slug: r.id }}>{r.name}</Link> - {r.description.split('.')[0]}.</li>)}
        </ul>
      </div>}
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

function parseLongDescription(md: string) {
  const out: { kind: "h2" | "p"; text: string }[] = [];
  const blocks = md.split(/\n{2,}/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) out.push({ kind: "h2", text: trimmed.slice(3).trim() });
    else if (trimmed.startsWith("# ")) out.push({ kind: "h2", text: trimmed.slice(2).trim() });
    else out.push({ kind: "p", text: trimmed });
  }
  return out;
}

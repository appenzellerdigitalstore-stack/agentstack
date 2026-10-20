import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowUpRight, Calendar, User } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [
    { title: "Insights - AgentStack" },
    { name: "description", content: "Original editorial work on the AI agent ecosystem: how we evaluate MCP servers, what the directory covers, and where the gaps are." },
    { property: "og:title", content: "Insights - AgentStack" },
    { property: "og:description", content: "Original editorial work on the AI agent ecosystem." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: InsightsIndex,
});

const articles = [
  {
    slug: "how-we-evaluate-mcp-servers",
    title: "How we evaluate MCP servers",
    excerpt: "With more than a hundred MCP servers in the wild, you cannot review all of them. Here is the four-signal framework behind every entry on this directory, and what we will not claim.",
    date: "2026-10-17",
    readingTime: 6,
  },
];

function InsightsIndex() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><BookOpen size={14} />INSIGHTS / EDITORIAL / ORIGINAL WORK</span>
      <h1>Insights.</h1>
      <p>Original editorial work on the AI agent ecosystem: how we curate, what the directory covers, and where the gaps are. Not a blog about the future of AI - a working log of how the directory is built.</p>
    </div>
    <div className="methodology-layout"><div>
      <section className="methodology-section">
        {articles.map(a => <article key={a.slug} style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--muted-foreground)", marginBottom: 8 }}>
            <span><Calendar size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />{a.date}</span>
            <span>{a.readingTime} min read</span>
            <span><User size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />Edy Appenzeller</span>
          </div>
          <h2 style={{ margin: "0 0 8px 0", fontSize: 24 }}><Link to="/insights/$slug" params={{ slug: a.slug }} className="hover:underline">{a.title}</Link></h2>
          <p style={{ margin: "0 0 16px 0", color: "var(--muted-foreground)", fontSize: 15, lineHeight: 1.6 }}>{a.excerpt}</p>
          <Link to="/insights/$slug" params={{ slug: a.slug }} className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline" style={{ fontSize: 14, fontWeight: 500 }}>Read article<ArrowUpRight size={12} /></Link>
        </article>)}
      </section>
      <p style={{ color: "var(--muted-foreground)", fontSize: 13, marginTop: 24 }}>More articles land here as the directory grows. Expect one to two pieces per month - long-form, original, and tied to specific changes in the directory or the ecosystem.</p>
    </div>
    <aside className="methodology-side">
      <h3>What you will find here</h3>
      <p>Editorial work that is too long for a methodology footnote. Pieces that document how the directory is built, what we learned from the last round of reviews, and where the MCP ecosystem is heading.</p>
      <h3 style={{ marginTop: 24 }}>What you will not find here</h3>
      <p>"The future of AI" think-pieces, vendor news, or "10 best MCP servers" listicles written for SEO. The directory does the curation; the insights explain the curation.</p>
      <h3 style={{ marginTop: 24 }}>How to suggest a topic</h3>
      <p>If there is an editorial question you want answered on the directory, use the <Link to="/contact">contact page</Link> with "insights" in the subject line.</p>
    </aside></div>
  </main></DirectoryShell>;
}

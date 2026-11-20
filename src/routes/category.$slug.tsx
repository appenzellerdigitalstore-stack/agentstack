import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Scale, Terminal } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";
import { ResourceLogo } from "@/components/resource-logo";
import { Button } from "@/components/ui/button";
import { categoryIcon, getCategoryPage, introParagraphs, listCategoryPages } from "@/lib/category-pages";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const page = getCategoryPage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.page.name} - AgentStack` },
      { name: "description", content: loaderData.page.description },
      { property: "og:title", content: `${loaderData.page.name} - AgentStack` },
      { property: "og:description", content: loaderData.page.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }) : {},
  component: CategoryPage,
});

function CategoryPage() {
  const { page } = Route.useLoaderData();
  const Icon = categoryIcon(page.icon);
  const paragraphs = introParagraphs(page.intro);
  const otherCategories = listCategoryPages().filter((entry) => entry.slug !== page.slug);

  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1" style={{ marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to the directory
      </Link>
      <span className="eyebrow text-primary"><Icon size={14} />CATEGORY / {page.name.toUpperCase()}</span>
      <h1>{page.name}</h1>
      <p className="lead">{page.description}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
        <Button asChild variant="outline"><Link to="/methodology">Editorial approach<ArrowUpRight size={12} style={{ display: "inline", marginLeft: 6 }} /></Link></Button>
      </div>
    </div>

    <div className="methodology-layout"><div>
      <article className="prose">
        <h2 className="prose-h2"><span className="prose-h2-rule" />What belongs in {page.name}</h2>
        {paragraphs.map((paragraph, index) => <p className="prose-p" key={index}>{paragraph}</p>)}

        <div className="prose-callout">
          <Scale size={20} className="prose-callout-icon" />
          <div>
            <h3>How we score these tools</h3>
            <p>{page.selectionNotes}</p>
          </div>
        </div>
      </article>

      <section style={{ marginTop: 52 }}>
        <h2 className="prose-h2"><span className="prose-h2-rule" />{page.resources.length} listing{page.resources.length === 1 ? "" : "s"} in {page.name}</h2>
        <div className="resource-grid">
          {page.resources.map(resource => <article className="resource-card" key={resource.id}>
            <div className="resource-card-top"><ResourceLogo resource={resource} /><span className="component-kind"><Terminal size={11} />{resource.kind}</span></div>
            <h3><Link to="/mcp/$slug" params={{ slug: resource.id }} className="resource-title">{resource.name}<ArrowUpRight /></Link></h3>
            <span className="resource-author">by {resource.author}</span>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-tags">{resource.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="resource-card-footer">
              <span><span className={`price-dot ${resource.pricing === 'Free' ? 'is-free' : ''}`} />{resource.pricing}</span>
              <Button asChild variant="ghost" size="sm"><Link to="/mcp/$slug" params={{ slug: resource.id }}>Read review<ArrowUpRight /></Link></Button>
            </div>
          </article>)}
        </div>
      </section>
    </div>

    <aside className="methodology-side">
      <h3>Category</h3>
      <p>{page.name}</p>

      <h3 style={{ marginTop: 24 }}>Other categories</h3>
      <ul className="prose-list">{otherCategories.map(entry => <li key={entry.slug}><Link to="/category/$slug" params={{ slug: entry.slug }}>{entry.name}</Link></li>)}</ul>

      <h3 style={{ marginTop: 24 }}>Editorial approach</h3>
      <p>Every listing on this page was read, scored, and written up by the editor. The criteria are documented in full on the methodology page.</p>
      <Link to="/methodology" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">Read the methodology<ArrowUpRight size={12} /></Link>
    </aside></div>
  </main></DirectoryShell>;
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

const articles: Record<string, { title: string; date: string; readingTime: number; sections: { heading?: string; paragraphs: string[] }[] }> = {
  "how-we-evaluate-mcp-servers": {
    title: "How we evaluate MCP servers",
    date: "2026-10-17",
    readingTime: 6,
    sections: [
      {
        paragraphs: [
          "There are more than a hundred MCP servers in the wild. The directory carries twelve. That is not a coverage problem - it is the point. The job of this site is to be a smaller, more careful selection that tells you what each tool is for, who maintains it, and whether it deserves a closer look. To do that well, every entry has to go through the same review process, every time. This article is the working notes for that process.",
        ],
      },
      {
        heading: "The four signals",
        paragraphs: [
          "Every review starts with the same four signals. They are not weighted equally, and they are not a checklist - they are a way of telling a 'yes, this is worth listing' from a 'not yet, the project needs to mature' from a 'no, this should not be on the directory'.",
        ],
      },
      {
        heading: "1. Documentation",
        paragraphs: [
          "Does the project tell you how to run it? Is the README more than a one-liner? Are there real install instructions, not just 'clone and figure it out'? Documentation is the cheapest signal to read and the most reliable one to ignore. A project with a 30-line README, a single example, and a 'see the wiki' is not a project that respects its users' time. It is also a project that will be a poor fit for an agent, which needs predictable inputs to do its job well.",
        ],
      },
      {
        heading: "2. Maintenance",
        paragraphs: [
          "Is anyone still answering issues and shipping releases? A quiet repo is not always a dead repo, but it costs time to verify - and the entry says so when I cannot. The signal I look for is not 'last commit was three weeks ago' but 'is there a person who responds to a real issue in a reasonable time'. If the maintainer is reachable, a slow release cadence is fine. If the maintainer is unreachable, even a fast cadence is suspect.",
        ],
      },
      {
        heading: "3. Capability",
        paragraphs: [
          "Does it solve a real problem an MCP client can actually use? 'Look at me, I am an MCP server' is not enough - the function has to do something useful when the agent calls it. The best test is to imagine a concrete agent workflow and ask: would I reach for this tool, or would I write the function myself? If the answer is 'I would write the function myself,' the entry does not go in.",
        ],
      },
      {
        heading: "4. Trust",
        paragraphs: [
          "Is the publisher real? Are the permissions proportionate to what the component does? Will the agent surprise the user? Trust is the signal that catches the rest. A component can have great documentation, active maintenance, and a useful capability - and still be a bad fit if it asks for filesystem access on a path it does not need, or phones home to a domain the publisher does not disclose. The Permissions and security section on each entry is the place to be honest about this.",
        ],
      },
      {
        heading: "What we do on a review",
        paragraphs: [
          "For every listing I write a long-form entry covering: what the component is, who maintains it, when to use it, when NOT to use it, and what permissions it actually asks for. I check the public repository for release cadence, issue responsiveness, and any open security disclosures. I cross-reference the source directory for prior editorial context. Then I date the entry, sign it as the reviewer, and link back to the original source for transparency.",
          "This is editorial work, not a hands-on test. I do not install every component in a sandbox before publishing. Where I have, the entry says so. Where I have not, the entry says that too.",
        ],
      },
      {
        heading: "What we will not claim",
        paragraphs: [
          "Three things this directory is not: it is not a security review; it is not a 'we use this in production' seal; it is not the most complete directory. The 'Permissions and security' section on each entry is what the publisher documents, not what we have audited. For sensitive workloads, read the publisher's security documentation directly.",
          "A directory that claims to have hands-on tested every component is a directory that is lying. Better to be honest about the gap and let the visitor fill it in.",
        ],
      },
      {
        heading: "The trust ratio",
        paragraphs: [
          "When the entry says 'we have not tested this,' it means it. When it says 'this is a real fit for X,' it means I have either run it or read enough to be confident. The directory is small enough that this discipline scales; if it ever stops scaling, the fix is to remove entries until it does again.",
        ],
      },
      {
        heading: "Closing",
        paragraphs: [
          "Curation is a slow process. The temptation is always to add more, faster - to chase the latest tool, the new release, the trending GitHub repo. The harder work is to hold the line on what goes in, to update the entries that are stale, and to remove the ones that no longer earn their place. The directory is at twelve components today. It might be at twenty in six months, or it might still be at twelve. The number is not the goal. The judgment is.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = articles[params.slug];
    if (!article) throw notFound();
    return { article, slug: params.slug };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.article.title} - AgentStack Insights` },
      { name: "description", content: loaderData.article.sections[0]?.paragraphs[0]?.slice(0, 160) ?? "" },
      { property: "og:title", content: loaderData.article.title },
      { property: "og:description", content: loaderData.article.sections[0]?.paragraphs[0]?.slice(0, 160) ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }) : {},
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <Link to="/insights" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1" style={{ marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to Insights
      </Link>
      <span className="eyebrow text-primary"><BookOpen size={14} />INSIGHTS / EDITORIAL</span>
      <h1>{article.title}</h1>
      <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--muted-foreground)", marginTop: 16 }}>
        <span><Calendar size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />{article.date}</span>
        <span>{article.readingTime} min read</span>
        <span><User size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />Edy Appenzeller</span>
      </div>
    </div>
    <article className="prose-page" style={{ maxWidth: 720, margin: "0 auto" }}>
      {article.sections.map((s, i) => (
        <div key={i}>
          {s.heading && <h2>{s.heading}</h2>}
          {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
        </div>
      ))}
      <p style={{ marginTop: 40, color: "var(--muted-foreground)", fontSize: 13 }}>
        Reviewed and published by Edy Appenzeller. <Link to="/about" style={{ textDecoration: "underline" }}>About the editor</Link>.
      </p>
    </article>
  </main></DirectoryShell>;
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { History, ArrowUpRight } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [
    { title: "Changelog - AgentStack" },
    { name: "description", content: "Documented updates to the AgentStack directory: new entries, removals, editorial changes, and infrastructure work." },
    { property: "og:title", content: "Changelog - AgentStack" },
    { property: "og:description", content: "What changed, when, and why." },
    { property: "og:type", content: "website" },
  ] }),
  component: ChangelogPage,
});

const changes: { date: string; entries: { tag: string; text: string; }[] }[] = [
  {
    date: "2026-10-17",
    entries: [
      { tag: "Added", text: "Legal pages: /privacy and /terms, with plain-English coverage of cookies, advertising, third-party services, and visitor rights." },
      { tag: "Added", text: "About page (/about) naming Edy Appenzeller as the curator and editor of the directory." },
      { tag: "Added", text: "Contact page (/contact) with subject-line hints (suggest / correction / maintainer / sponsorship / press / privacy)." },
      { tag: "Added", text: "Per-component review pages at /mcp/<slug>. Each of the 12 components now has a long-form entry: what it is, who maintains it, when to use, when NOT to use, permissions and security." },
      { tag: "Added", text: "Insights section (/insights) with the first editorial article: 'How we evaluate MCP servers'." },
      { tag: "Added", text: "Changelog page (this page), populated with documented updates." },
      { tag: "Added", text: "/ads.txt at the root, with a placeholder AdSense publisher ID pending account approval." },
      { tag: "Changed", text: "Methodology page rewritten. The 'subset of someone else's directory' framing is replaced with the actual editorial process: selection criteria, what each review covers, what we will not claim, and how a listing gets removed." },
      { tag: "Changed", text: "Card descriptions expanded to 2-3 sentences each. Empty categories (Communication, Monitoring & Observability) removed from the sidebar until real components are curated there." },
      { tag: "Changed", text: "Every component now carries a 'Last reviewed: 2026-10-17 by Edy Appenzeller' timestamp." },
      { tag: "Changed", text: "Footer updated to link About / Contact / Privacy / Terms, with a sister-site link to opensourcestack.ink and a 2026 copyright in Edy's name." },
      { tag: "Changed", text: "Sitemap regenerated. 7 static pages + 12 /mcp/<slug> URLs." },
    ],
  },
  {
    date: "Earlier in 2026",
    entries: [
      { tag: "Added", text: "Initial launch: directory of 12 MCP servers with one-sentence card descriptions, /learn onboarding flow, and /methodology editorial transparency page." },
      { tag: "Removed", text: "Submit feature (UI removed; original code preserved at src/.archive/ for restore). Replaced with a contact-page suggestion path." },
    ],
  },
];

function ChangelogPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><History size={14} />CHANGELOG / UPDATES / REMOVALS</span>
      <h1>Changelog.</h1>
      <p>What changed, when, and why. New entries, removals, editorial rewrites, and infrastructure work. Reverse-chronological, dated, and signed by the editor.</p>
    </div>
    <div className="methodology-layout"><div>
      {changes.map(group => <section key={group.date} className="methodology-section" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>{group.date}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {group.entries.map((e, i) => <li key={i} style={{ padding: "8px 0", borderBottom: "1px dashed var(--border)" }}>
            <span style={{ display: "inline-block", minWidth: 80, fontFamily: "var(--font-mono)", fontSize: 12, padding: "2px 8px", borderRadius: 4, background: e.tag === "Added" ? "#22c55e20" : e.tag === "Removed" ? "#ef444420" : e.tag === "Changed" ? "#3b82f620" : "var(--muted)", color: e.tag === "Added" ? "#16a34a" : e.tag === "Removed" ? "#dc2626" : e.tag === "Changed" ? "#2563eb" : "var(--muted-foreground)", marginRight: 12 }}>{e.tag}</span>
            {e.text}
          </li>)}
        </ul>
      </section>)}
      <p style={{ marginTop: 32, color: "var(--muted-foreground)", fontSize: 13 }}>Entries are added as changes ship. Significant changes are also noted on the homepage and in the Insights section.</p>
    </div>
    <aside className="methodology-side">
      <h3>About this log</h3>
      <p>Every change to AgentStack lands here: new entries, removals, editorial rewrites, infrastructure work, and infrastructure failures (those get their own entries too, dated to the day they happened).</p>
      <h3 style={{ marginTop: 24 }}>Why a changelog</h3>
      <p>A directory is only as useful as it is current. A public log of changes is the most honest signal that the site is being maintained - more honest than "last updated" footers, which can lie by omission.</p>
      <h3 style={{ marginTop: 24 }}>Subscribe</h3>
      <p>There is no email list for the changelog yet. If you want to be notified when the directory changes meaningfully, follow the <Link to="/about">editor's build-in-public updates</Link>.</p>
      <h3 style={{ marginTop: 24 }}>Suggest a change</h3>
      <p>If something on this site is wrong or stale, the fastest path is the <Link to="/contact">contact page</Link> with "correction" in the subject line.</p>
      <p style={{ marginTop: 16 }}><Link to="/contact" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">Contact<ArrowUpRight size={12} /></Link></p>
    </aside></div>
  </main></DirectoryShell>;
}

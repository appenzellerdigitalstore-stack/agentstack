import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck, Sparkles, Trash2, GitBranch, History } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/methodology")({
  head: () => ({ meta: [
    { title: "How we curate AgentStack - Editorial Approach" },
    { name: "description", content: "How AgentStack approaches editorial curation: selection criteria, what we check, what we will not claim, and how a listing gets removed." },
    { property: "og:title", content: "How we curate AgentStack" },
    { property: "og:description", content: "Selection criteria, review process, and the limits of editorial review." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><ShieldCheck size={14} />EDITORIAL / INDEPENDENT / TRANSPARENT</span>
      <h1>How we curate AgentStack.</h1>
      <p>The same twelve components could be presented a hundred different ways. This page explains how we pick them, what we check, what we will not claim, and how a listing gets removed.</p>
    </div>
    <div className="methodology-layout"><div>
      <section className="methodology-section">
        <h2><GitBranch size={18} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />How a component gets in</h2>
        <p>Every component in the directory has been read about, looked at, and decided on by Edy Appenzeller. Four signals drive the decision:</p>
        <ul>
          <li><strong>Documentation.</strong> Does the project tell you how to run it? Is the README more than a one-liner? Are there real install instructions, not just "clone and figure it out"?</li>
          <li><strong>Maintenance.</strong> Is anyone still answering issues and shipping releases? A quiet repo is not always a dead repo, but it costs time to verify, and the entry says so when I cannot.</li>
          <li><strong>Capability.</strong> Does it solve a real problem an MCP client can actually use? "Look at me, I am an MCP server" is not enough - the function has to do something useful when the agent calls it.</li>
          <li><strong>Trust.</strong> Is the publisher real? Are the permissions proportionate to what the component does? Will the agent surprise the user?</li>
        </ul>
        <p>If a component clears all four, it gets in. If any signal is weak, the entry says so on the page. The full entry for each component lives at <code>/mcp/&lt;slug&gt;</code> and is the substance - the directory card is the headline.</p>
      </section>

      <section className="methodology-section">
        <h2>What we do on each review</h2>
        <p>For every listing I write a long-form entry covering: what the component is, who maintains it, when to use it, when not to use it, and what permissions it actually asks for. I check the public repository for release cadence, issue responsiveness, and any open security disclosures. I cross-reference the source directory for prior editorial context. Then I date the entry, sign it as the reviewer, and link back to the original source for transparency.</p>
        <p>This is editorial work, not a hands-on test. I do not install every component in a sandbox before publishing. Where I have, the entry says so. Where I have not, the entry says that too.</p>
      </section>

      <section className="methodology-section">
        <h2>What we will not claim</h2>
        <p>Three things this directory is not:</p>
        <ul>
          <li><strong>It is not a security review.</strong> The "Permissions and security" section on each entry is what the publisher documents, not what we have audited. For sensitive workloads, read the publisher's security documentation directly.</li>
          <li><strong>It is not a "we use this in production" seal.</strong> Some entries I have run for my own work; some I have not. The entry is honest about which is which.</li>
          <li><strong>It is not the most complete directory.</strong> The source directory reports more components; we curate a smaller, more careful selection. Empty categories are not a bug - they are an honest "we have not curated enough here yet" signal.</li>
        </ul>
      </section>

      <section className="methodology-section">
        <h2><Trash2 size={18} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />How a listing gets removed</h2>
        <p>A component leaves the directory for one of four reasons:</p>
        <ul>
          <li>The project is abandoned (no releases, no responses, broken installs).</li>
          <li>The project changes in a way that breaks the trust signal (license flip, undisclosed telemetry, hostile maintainer takeover).</li>
          <li>The component gets superseded by a clearly better alternative in the same slot.</li>
          <li>The component no longer maps to a real MCP use case the directory serves.</li>
        </ul>
        <p>Removals land in the <Link to="/changelog">changelog</Link> with the reason. If a removed component later recovers, it can come back through the same review process any new entry goes through.</p>
      </section>

      <section className="methodology-section">
        <h2>Where the source data comes from</h2>
        <p>AgentStack is built on top of data from the original AgentStack directory, which is the canonical source for the project metadata. We take that metadata, run it through the editorial process above, and write a long-form entry for every component we keep. The original source remains the authoritative reference; this site is a curated selection with editorial context that the source does not provide.</p>
        <p>If a source listing and our entry disagree, the source wins on technical facts (versions, dependencies, current maintainer). The editorial voice - the "is this worth your time" call - is ours, not the source's.</p>
      </section>

      <section className="methodology-section">
        <h2>Editorial independence</h2>
        <p>Featured placement is decided by the editor, not paid for. We do not run sponsored reviews. We do not sell placements. If a project wants to flag a correction, the <Link to="/contact">contact page</Link> routes straight to the editor.</p>
      </section>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <Button asChild className="btn-glow"><Link to="/">Open the directory<ArrowUpRight size={14} style={{ display: "inline", marginLeft: 4, verticalAlign: -1 }} /></Link></Button>
        <Button asChild variant="outline"><Link to="/changelog"><History size={14} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />See the changelog</Link></Button>
        <Button asChild variant="outline"><Link to="/contact">Contact the editor</Link></Button>
      </div>
    </div>
    <aside className="methodology-side">
      <Sparkles size={27} />
      <h3>The short version.</h3>
      <p>Every entry on this site is a hand-written review, not an aggregation. When the entry says "we have not tested this," it means it. When it says "this is a real fit for X," it means I have either run it or read enough to be confident.</p>

      <h3><ShieldCheck size={17} className="inline mr-2" />What the entry always includes</h3>
      <ul style={{ paddingLeft: 18, color: "var(--muted-foreground)", fontSize: 13, lineHeight: 1.6 }}>
        <li>What the component is and who maintains it</li>
        <li>When to use it (concrete use cases)</li>
        <li>When NOT to use it (honest scenarios)</li>
        <li>Permissions and security notes</li>
        <li>Last-reviewed date and reviewer name</li>
      </ul>

      <h3><BookOpen size={17} className="inline mr-2" />New to MCP?</h3>
      <p>The learn page is the friendlier on-ramp if you are just starting with MCP servers, skills, and plugins.</p>
      <Button asChild variant="link" className="px-0 mt-3"><Link to="/learn">Start learning<ArrowRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></Link></Button>

      <h3>Open the directory</h3>
      <p>Browse the curated selection. Each card links to a full review.</p>
      <Button asChild variant="link" className="px-0 mt-3"><Link to="/">Open the directory<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></Link></Button>
    </aside></div>
  </main></DirectoryShell>;
}

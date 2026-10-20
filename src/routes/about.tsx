import { createFileRoute, Link } from "@tanstack/react-router";
import { User, ArrowUpRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About - AgentStack" },
    { name: "description", content: "AgentStack is a small, editorially curated directory of MCP servers, skills, and plugins for AI agents, run by Edy Appenzeller." },
    { property: "og:title", content: "About - AgentStack" },
    { property: "og:description", content: "Who runs the directory, why it exists, and how it is curated." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><User size={14} />ABOUT / CURATOR / EDITORIAL</span>
      <h1>The directory I kept<br /><span className="text-primary">wishing existed.</span></h1>
      <p>AgentStack is a small, editorially curated directory of MCP servers, AI skills, and plugins. It is built, run, and curated by one person.</p>
    </div>
    <div className="methodology-layout"><div>
      <section className="methodology-section">
        <h2>Who runs this</h2>
        <p><strong>Edy Appenzeller</strong> is the founder, curator, and editor of AgentStack. He builds the directory, writes the entries, decides what gets in, and answers the contact form himself. There is no team, no sponsorship-driven curation, and no algorithm choosing the order.</p>
        <p>Edy also runs <a href="https://opensourcestack.ink" target="_blank" rel="noreferrer">OpenSourceStack<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></a>, a sister directory for open-source alternatives to paid software. Both directories are part of an ongoing build-in-public project documenting what it actually takes to make a small site useful on the open web.</p>
      </section>

      <section className="methodology-section">
        <h2>Why this exists</h2>
        <p>The AI agent ecosystem is moving fast. New MCP servers, skills, and plugins appear every week. Most directories either show the same dozen tools or aggregate everything indiscriminately. AgentStack is the smaller, more careful version: a hand-picked selection with editorial context for each component.</p>
        <p>Build-in-public aside, the goal of the directory is simple: when you find a component here, you should be able to tell at a glance what it does, who maintains it, and whether it deserves a closer look.</p>
      </section>

      <section className="methodology-section">
        <h2>What "editorially curated" means here</h2>
        <p>Every component in the directory has been read about, looked at, and decided on by Edy. The selection criteria are documented in detail on the <Link to="/methodology">methodology page</Link>. The short version:</p>
        <ul>
          <li>Documentation: does the project tell you how to run it?</li>
          <li>Maintenance: is anyone still answering issues and shipping releases?</li>
          <li>Capability: does it solve a real problem an MCP client can actually use?</li>
          <li>Trust: is the publisher real, and are the permissions proportionate to what the component does?</li>
        </ul>
        <p>What is NOT claimed: direct hands-on testing of every component, security scans, or "we use this in production." When a listing has not been directly exercised, the page says so.</p>
      </section>

      <section className="methodology-section">
        <h2>Why the source link</h2>
        <p>AgentStack.ink is built on top of data from the original AgentStack directory. The original directory is the canonical source; this site is a curated, redesigned selection with editorial context. Every component card links back to its source listing so you can see the original review.</p>
      </section>

      <section className="methodology-section">
        <h2>What this is not</h2>
        <p>It is not the most complete directory. It is not a security review. It is not a marketplace. It is not affiliated with any of the publishers listed here. Featured placement is editorial, never paid.</p>
      </section>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <Button asChild className="btn-glow"><Link to="/methodology">Read the methodology<ArrowUpRight size={14} style={{ display: "inline", verticalAlign: -1, marginLeft: 4 }} /></Link></Button>
        <Button asChild variant="outline"><Link to="/contact">Contact Edy<ArrowUpRight size={14} style={{ display: "inline", verticalAlign: -1, marginLeft: 4 }} /></Link></Button>
        <Button asChild variant="outline"><Link to="/learn">Start learning</Link></Button>
      </div>
    </div>
    <aside className="methodology-side">
      <Sparkles size={27} />
      <h3>Built in public.</h3>
      <p>The work on this directory is documented as it happens, including the rejections, the rewrites, and the slow climb toward a useful site. If you want to follow the build, the changelog lives on this site and the project is part of an ongoing series.</p>

      <h3>Sister directory</h3>
      <p>OpenSourceStack covers open-source alternatives to paid software. Same editorial model, different ecosystem. Worth a look if you self-host anything.</p>
      <Button asChild variant="link" className="px-0 mt-3"><a href="https://opensourcestack.ink" target="_blank" rel="noreferrer">opensourcestack.ink<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></a></Button>

      <h3><ShieldCheck size={17} className="inline mr-2" />Editorial standards</h3>
      <p>Selection criteria, what we will not do, and how the directory is maintained: all on the methodology page.</p>
      <Button asChild variant="link" className="px-0 mt-3"><Link to="/methodology">Read the methodology<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></Link></Button>

      <h3><BookOpen size={17} className="inline mr-2" />New here?</h3>
      <p>If you are just starting with MCP servers, skills, and plugins, the learn page is the friendlier on-ramp.</p>
      <Button asChild variant="link" className="px-0 mt-3"><Link to="/learn">Start learning<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></Link></Button>
    </aside></div>
  </main></DirectoryShell>;
}

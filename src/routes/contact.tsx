import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowUpRight, Megaphone, Wrench, ShieldCheck } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact - AgentStack" },
    { name: "description", content: "Reach the editor of AgentStack: suggest a tool, report a correction, ask about sponsorship, or anything else." },
    { property: "og:title", content: "Contact - AgentStack" },
    { property: "og:description", content: "How to reach the editor of AgentStack." },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><Mail size={14} />CONTACT / SUGGEST / CORRECT</span>
      <h1>Get in touch.</h1>
      <p>Suggestions, corrections, sponsorship enquiries, and everything else. The directory is run by one person, so a clear subject line goes a long way.</p>
    </div>
    <div className="methodology-layout"><div>
      <section className="methodology-section">
        <h2><Wrench size={18} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />I want to suggest a tool</h2>
        <p>Email <strong>hello [at] agentstack.ink</strong> with:</p>
        <ul>
          <li>Project name and URL</li>
          <li>Category (MCP server, skill, or plugin)</li>
          <li>One sentence on what it does and why it deserves a spot</li>
          <li>Any links to docs, repo, or release notes that would help the review</li>
        </ul>
        <p>Suggesting a tool does not guarantee a listing. Every entry still has to clear the methodology, and some suggestions land on a "wait for more signal" list. You will hear back either way, usually within a week.</p>
      </section>

      <section className="methodology-section">
        <h2><ShieldCheck size={18} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />I have a correction</h2>
        <p>If something on a listing is wrong - a broken link, a stale description, a misuse, an outdated pricing note, a tag that does not fit - point at the page and tell us what should change. Corrections are usually applied within a few days. Email <strong>hello [at] agentstack.ink</strong> with "correction" in the subject line.</p>
      </section>

      <section className="methodology-section">
        <h2><Megaphone size={18} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />I represent a project that's in the directory</h2>
        <p>If you maintain one of the components listed here and would like a refresh, a new screenshot, a correction, or a re-review, email <strong>hello [at] agentstack.ink</strong> with "maintainer" in the subject. Maintainer corrections are treated as high-priority.</p>
      </section>

      <section className="methodology-section">
        <h2>Sponsorship and press</h2>
        <p>The directory does not run sponsored reviews and does not sell placements. Sponsorship is for site-level support only (think: a small banner of support, never a paid placement). For press or podcast enquiries, mention "press" in the subject line.</p>
      </section>

      <section className="methodology-section">
        <h2>Why an email, not a form</h2>
        <p>An email is the lowest-friction way to reach a real person, and it lets you include context, links, and screenshots without being constrained by form fields. Replies usually come from Edy directly.</p>
      </section>

      <p style={{ marginTop: 32 }}>For privacy or data requests, see the <Link to="/privacy">Privacy Policy</Link>. For site terms, see the <Link to="/terms">Terms of Service</Link>.</p>
    </div>
    <aside className="methodology-side">
      <Mail size={27} />
      <h3>hello [at] agentstack.ink</h3>
      <p>One inbox, one person. Subject-line hints that help: <em>suggest</em>, <em>correction</em>, <em>maintainer</em>, <em>sponsorship</em>, <em>press</em>, <em>privacy</em>.</p>

      <h3>Response time</h3>
      <p>Most messages get a reply within a few days. Corrections usually faster. Sponsorship and press usually a few extra days. If you do not hear back in two weeks, it was lost in spam - write again.</p>

      <h3>About the directory</h3>
      <p>AgentStack is built and curated by Edy Appenzeller. For the editorial model and selection criteria, see the methodology page.</p>
      <Link to="/about" className="text-primary underline-offset-4 hover:underline">About AgentStack<ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -1 }} /></Link>
    </aside></div>
  </main></DirectoryShell>;
}

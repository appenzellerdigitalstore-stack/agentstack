import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Service - AgentStack" },
    { name: "description", content: "Terms of service for the AgentStack directory: editorial nature, no-warranty, third-party tools, and your responsibilities as a visitor." },
    { property: "og:title", content: "Terms of Service - AgentStack" },
    { property: "og:description", content: "Terms governing use of the AgentStack directory." },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ] }),
  component: TermsPage,
});

function TermsPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><FileText size={14} />TERMS / EDITORIAL / LIABILITY</span>
      <h1>Terms of Service</h1>
      <p>The rules of the road for using this directory. Short, plain-English, and as honest as we can make it.</p>
    </div>
    <article className="prose-page" style={{ maxWidth: 760, margin: "0 auto" }}>
      <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Last updated: October 17, 2026</p>

      <h2>1. What this site is</h2>
      <p>AgentStack is an editorially curated directory of MCP servers, AI skills, and plugins. The site links out to third-party projects (the components themselves) and to the original AgentStack source directory. We do not host, install, or run those components for you.</p>

      <h2>2. No warranty on third-party tools</h2>
      <p>Every component in the directory is built and maintained by a third party. Inclusion in the directory is an editorial recommendation, not a guarantee of fitness for any particular use. Pricing labels, install commands, permissions, supported clients, and availability can change without notice. Always read the current official documentation before installing any component.</p>

      <h2>3. Editorial review vs. testing</h2>
      <p>Editorial review and direct hands-on testing are different things. We tell you on each entry and on the <Link to="/methodology">methodology page</Link> what we have and have not done. When a listing has not been directly exercised, the page says so.</p>

      <h2>4. Your responsibilities</h2>
      <p>When you connect a component from this directory to your own agent, environment, or data, you are responsible for understanding what permissions you are granting. Start with least-privilege access. Inspect dependencies and configuration. Test in a safe workspace before authorizing production actions.</p>

      <h2>5. Acceptable use</h2>
      <p>Do not use the site to attempt unauthorized access to the directory, to scrape at a rate that degrades service for other visitors, to submit malicious listings, or to impersonate the directory in correspondence with third-party maintainers.</p>

      <h2>6. Intellectual property</h2>
      <p>Directory layout, copy, and curation are by Edy Appenzeller, 2026. Underlying project names, descriptions, and source metadata belong to their original publishers and are used here under fair use for the purpose of editorial review. Trademarks belong to their respective owners.</p>

      <h2>7. Limitation of liability</h2>
      <p>The directory is provided "as is" and "as available." To the maximum extent permitted by law, we disclaim all warranties (express or implied) and will not be liable for any indirect, incidental, or consequential damages arising from your use of the directory or from your installation of any third-party component listed here.</p>

      <h2>8. Changes to these terms</h2>
      <p>We may update these terms. The "last updated" date at the top will reflect the most recent change. Material changes will be noted on the homepage.</p>

      <h2>9. Contact</h2>
      <p>For questions about these terms, use the <Link to="/contact">contact page</Link>.</p>

      <p style={{ marginTop: 32, color: "var(--muted-foreground)", fontSize: 13 }}>Last reviewed: October 17, 2026 by Edy Appenzeller, editor.</p>
    </article>
  </main></DirectoryShell>;
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { DirectoryShell } from "@/components/directory-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy - AgentStack" },
    { name: "description", content: "How AgentStack collects, uses, and protects information about its visitors. Plain-English summary of cookies, analytics, advertising, and your rights." },
    { property: "og:title", content: "Privacy Policy - AgentStack" },
    { property: "og:description", content: "How AgentStack handles visitor data, cookies, and advertising." },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <DirectoryShell><main className="page-container content-page">
    <div className="content-intro">
      <span className="eyebrow text-primary"><ShieldCheck size={14} />PRIVACY / COOKIES / DATA</span>
      <h1>Privacy Policy</h1>
      <p>What we collect, what we do not, and how third-party services used on this directory handle your data. Plain English, no surprises.</p>
    </div>
    <article className="prose-page" style={{ maxWidth: 760, margin: "0 auto" }}>
      <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Last updated: October 17, 2026</p>

      <h2>1. Information we collect</h2>
      <p>We collect very little. Like most websites, our hosting provider (Cloudflare) and analytics layer (Cloudflare Web Analytics) automatically log basic request data when you load a page: your IP address (truncated), user agent, referrer, and the URL you requested. We use that only to monitor traffic, detect abuse, and improve the directory.</p>
      <p>You do not need an account to use the directory. We do not collect your name or email unless you choose to write to us through the <Link to="/contact">contact page</Link>.</p>

      <h2>2. Cookies and local storage</h2>
      <p>We do not set advertising cookies of our own. We do not use third-party tracking cookies. Cloudflare Web Analytics is privacy-first and does not rely on cookies for cross-site tracking.</p>

      <h2>3. Advertising</h2>
      <p>Once this site is approved for ads, this directory displays ads served by Google AdSense. AdSense uses cookies to serve ads based on a user's prior visits to this site or other sites. Google's use of advertising cookies enables it and its partners to serve ads based on visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a> (<a href="https://support.google.com/adsense/answer/95421" target="_blank" rel="noreferrer">more about how Google uses data from partner sites</a>).</p>

      <h2>4. Third-party services and outbound links</h2>
      <p>The directory links out to external resources (MCP servers, plugin repositories, project websites, documentation). Once you click through to a third-party site, their privacy policy applies - not this one. We are not responsible for how those sites handle your data.</p>

      <h2>5. Children's privacy</h2>
      <p>The directory is not directed at children under 13 and we do not knowingly collect data from anyone under that age. If you believe a child has provided personal information through the contact page, write to us and we will delete it.</p>

      <h2>6. Your rights</h2>
      <p>You may request access to, correction of, or deletion of any personal data we hold about you (for example, an email you sent us through the contact page). Use the <Link to="/contact">contact page</Link> and we will respond within 30 days.</p>

      <h2>7. Data retention</h2>
      <p>Contact-form emails are kept as long as they are useful for the conversation and then deleted. Cloudflare request logs roll over on the provider's standard schedule (typically 30 days at the edge).</p>

      <h2>8. Changes to this policy</h2>
      <p>We may update this policy from time to time. The "last updated" date at the top reflects the most recent change. Material changes will be noted on the homepage.</p>

      <h2>9. Contact</h2>
      <p>For privacy questions or data requests, use the <Link to="/contact">contact page</Link>.</p>

      <p style={{ marginTop: 32, color: "var(--muted-foreground)", fontSize: 13 }}>Last reviewed: October 17, 2026 by Edy Appenzeller, editor.</p>
    </article>
  </main></DirectoryShell>;
}

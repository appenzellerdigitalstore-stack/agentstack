import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Box, ChevronDown, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listCategoryPages } from '@/lib/category-pages';
import type { ReactNode } from 'react';

const categoryPages = listCategoryPages();

export function DirectoryShell({ children }: { children: ReactNode }) {
  return <div className="app-shell">
    <header className="stack-header"><div className="page-container header-inner">
      <Link to="/" className="stack-brand"><span className="brand-mark"><Box size={22} /></span><span>agentstack<span className="text-primary">.ink</span></span></Link>
      <nav aria-label="Main navigation" className="stack-nav">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'is-active' }}>Directory</Link>
        <div className="relative group">
          <button type="button" aria-haspopup="true" className="flex items-center gap-1 h-full hover:text-foreground">Categories<ChevronDown size={12} /></button>
          <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border border-border bg-popover p-1 shadow-lg opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto">
            {categoryPages.map(page => <Link key={page.slug} to="/category/$slug" params={{ slug: page.slug }} className="flex items-center justify-between gap-3 rounded px-3 py-2 hover:bg-accent hover:text-foreground">{page.name}<ArrowUpRight size={11} /></Link>)}
          </div>
        </div>
        <Link to="/learn" activeProps={{ className: 'is-active' }}>Start learning</Link>
        <Link to="/methodology" activeProps={{ className: 'is-active' }}>Our approach</Link>
        <Link to="/about" activeProps={{ className: 'is-active' }}>About</Link>
      </nav>
      <div className="header-actions"><Button asChild variant="ghost" size="icon" title="Explore MCP on GitHub"><a href="https://github.com/modelcontextprotocol" target="_blank" rel="noreferrer" aria-label="MCP on GitHub"><Github /></a></Button></div>
    </div></header>
    {children}
    <footer className="stack-footer page-container">
      <div>
        <Link to="/" className="stack-brand"><Box size={19} />agentstack<span className="text-primary">.ink</span></Link>
        <p>The building blocks for what comes next.</p>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 6 }}>Edited by <Link to="/about" style={{ textDecoration: "underline" }}>Edy Appenzeller</Link>. Last updated: October 17, 2026.</p>
      </div>
      <nav className="footer-links" aria-label="Footer">
        <Link to="/learn">Start learning</Link>
        <Link to="/methodology">Editorial approach</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <a href="https://opensourcestack.ink" target="_blank" rel="noreferrer">Sister site<ArrowUpRight size={12} /></a>
        <span>© 2026 Edy Appenzeller</span>
      </nav>
    </footer>
  </div>;
}

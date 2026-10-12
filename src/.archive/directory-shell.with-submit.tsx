import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Box, Github, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

export function DirectoryShell({ children, onSubmit }: { children: ReactNode; onSubmit?: () => void }) {
  return <div className="app-shell">
    <header className="stack-header"><div className="page-container header-inner">
      <Link to="/" className="stack-brand"><span className="brand-mark"><Box size={22} /></span><span>agentstack<span className="text-primary">.ink</span></span></Link>
      <nav aria-label="Main navigation" className="stack-nav">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'is-active' }}>Directory</Link>
        <Link to="/learn" activeProps={{ className: 'is-active' }}>Start learning</Link>
        <Link to="/methodology" activeProps={{ className: 'is-active' }}>Our approach</Link>
      </nav>
      <div className="header-actions"><Button asChild variant="ghost" size="icon" title="Explore MCP on GitHub"><a href="https://github.com/modelcontextprotocol" target="_blank" rel="noreferrer" aria-label="MCP on GitHub"><Github /></a></Button>{onSubmit ? <Button size="sm" onClick={onSubmit}><Plus />Submit a tool</Button> : <Button asChild size="sm"><Link to="/">Explore tools<ArrowUpRight /></Link></Button>}</div>
    </div></header>
    {children}
    <footer className="stack-footer page-container"><div><Link to="/" className="stack-brand"><Box size={19} />agentstack<span className="text-primary">.ink</span></Link><p>The building blocks for what comes next.</p></div><div className="footer-links"><Link to="/learn">Start learning</Link><Link to="/methodology">Editorial approach</Link><a href="https://agentstack.ink" target="_blank" rel="noreferrer">Original directory<ArrowUpRight size={12} /></a><span>© 2026 AgentStack</span></div></footer>
  </div>;
}

import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Box, Braces, Check, ChevronDown, ChevronRight, Code2, Copy, Database, ExternalLink, Flame, Globe, GraduationCap, Grid2X2, Layers, List, MessageSquare, Monitor, Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles, Terminal, Wallet, Workflow, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { DirectoryShell } from '@/components/directory-shell';
import { categories, resources as initialResources, type Resource } from '@/data/resources';
import stackImage from '@/assets/blue-agent-stack.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AgentStack — MCP Servers, Skills & Plugins' },
    { name: 'description', content: 'Discover AI agent building blocks from AgentStack: MCP servers, skills, and plugins. Explore tools by category and learn how to build your first stack.' },
    { property: 'og:title', content: 'AgentStack — Build your agent stack' },
    { property: 'og:description', content: 'A developer-first directory of MCP servers, skills, and plugins, with a clear starting point for newcomers.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: DirectoryPage,
});
const categoryIcons = [Layers, Code2, Database, Globe, Workflow, MessageSquare, Sparkles, Box, Monitor, Wallet];
function ResourceLogo({ resource }: { resource: Resource }) {
  return <span className={`resource-logo resource-${resource.id}`} aria-hidden="true">{resource.id === 'firecrawl-mcp' ? <Flame /> : resource.id === 'github-mcp' ? <Code2 /> : resource.id === 'postgresql-mcp' ? <Database /> : resource.id === 'anki-mcp' ? <span>A<span className="logo-star">✦</span></span> : resource.id === 'anthropic-mcp' ? <Sparkles /> : resource.id === 'airtable-mcp' ? <Layers /> : resource.id === 'algolia-mcp' ? <Search /> : resource.id === 'adyen-mcp' ? <span>ad</span> : <Box />}</span>;
}
function DirectoryPage() {
  const [resources, setResources] = useState(initialResources);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All components');
  const [kind, setKind] = useState('All components');
  const [pricing, setPricing] = useState('All pricing');
  const [sort, setSort] = useState('Recommended');
  const [beginner, setBeginner] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Resource | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const directory = useRef<HTMLElement>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === 'k') { event.preventDefault(); searchInput.current?.focus(); } };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, []);
  const filtered = useMemo(() => resources.filter(resource =>
    (category === 'All components' || resource.category === category) &&
    (kind === 'All components' || resource.kind === kind) &&
    (pricing === 'All pricing' || resource.pricing === pricing) &&
    (!beginner || resource.beginner) &&
    `${resource.name} ${resource.description} ${resource.tags.join(' ')} ${resource.category}`.toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a, b) => sort === 'A–Z' ? a.name.localeCompare(b.name) : sort === 'Free first' ? Number(b.pricing === 'Free') - Number(a.pricing === 'Free') : Number(Boolean(b.featured)) - Number(Boolean(a.featured))), [resources, category, kind, pricing, query, beginner, sort]);
  const clear = () => { setQuery(''); setCategory('All components'); setKind('All components'); setPricing('All pricing'); setBeginner(false); };
  const explore = () => directory.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  async function copyInstall() { if (!selected?.install) return; try { await navigator.clipboard.writeText(selected.install); setCopied(true); } catch { setCopied(false); } }
  return <DirectoryShell onSubmit={() => { setSubmitted(false); setSubmitOpen(true); }}>
    <section className="stack-hero">
      <img src={stackImage} className="stack-hero-image" alt="An interconnected stack of electric-blue computing modules" width={1920} height={1024} fetchPriority="high" />
      <div className="page-container stack-hero-content">
        <div className="eyebrow"><span className="signal-dot" /> THE AI AGENT ECOSYSTEM, CONNECTED</div>
        <h1>AgentStack<span className="text-primary">.</span></h1>
        <h2>Small components.<br /><span className="text-primary">Extraordinary possibilities.</span></h2>
        <p>Discover MCP servers, skills, and plugins that give<br className="desktop-break" /> your AI agents the power to do more.</p>
        <div className="hero-buttons"><Button size="lg" onClick={explore}>Explore the stack<ArrowRight /></Button><Button asChild size="lg" variant="outline"><Link to="/learn"><GraduationCap />New to agents?</Link></Button></div>
        <div className="hero-proof"><span><ShieldCheck /> Editorially curated</span><span><Braces /> Built for developers</span><span><BookOpen /> Open to everyone</span></div>
      </div>
    </section>
    <div className="ecosystem-band"><div className="page-container ecosystem-inner"><span>ONE ECOSYSTEM. THREE BUILDING BLOCKS.</span><div><Terminal />MCP servers<i>/</i><Sparkles />Skills<i>/</i><Box />Plugins</div><Link to="/learn">Understand the stack<ArrowUpRight size={14} /></Link></div></div>
    <main className="page-container workspace" ref={directory}>
      <div className="discovery-heading"><div><div className="eyebrow text-primary">DISCOVER / CONNECT / BUILD</div><h2>Find your next building block.</h2><p>The right tools. A stronger agent. A better starting point.</p></div><span className="source-note"><span className="signal-dot" /> Inspired by the AgentStack directory</span></div>
      <div className="discovery-search"><Search size={21} /><input ref={searchInput} aria-label="Search components" placeholder="Search tools, capabilities, or your next idea…" value={query} onChange={e => setQuery(e.target.value)} />{query ? <Button size="icon" variant="ghost" aria-label="Clear search" onClick={() => setQuery('')}><X /></Button> : <kbd>⌘ K</kbd>}<span className="search-divider" /><span className="search-total">{resources.length} components</span></div>
      <div className="popular-row"><span>Explore:</span>{['Search', 'Data', 'Learning', 'Claude'].map(tag => <Button variant="ghost" size="sm" key={tag} onClick={() => setQuery(tag)}>{tag}<ArrowUpRight /></Button>)}</div>
      <div className="directory-layout">
        <aside className="directory-sidebar"><h3><SlidersHorizontal size={13} />CATEGORIES</h3><nav aria-label="Component categories">{categories.map((item, index) => { const Icon = categoryIcons[index] ?? Layers; const count = resources.filter(r => item.slug === 'all' || r.category === item.name).length; return <Button key={item.slug} variant="ghost" className="sidebar-category" data-active={category === item.name} onClick={() => setCategory(item.name)}><Icon /> <span>{item.name}</span><small>{count}</small></Button>; })}</nav>
          <div className="sidebar-separator" /><h3>YOUR STARTING POINT</h3><label className="beginner-toggle"><input type="checkbox" checked={beginner} onChange={e => setBeginner(e.target.checked)} /><span>Beginner picks</span><GraduationCap size={15} /></label>
          <div className="sidebar-learning"><GraduationCap size={23} className="text-primary" /><h4>Your first agent stack?</h4><p>Start with the basics.<br />Build with confidence.</p><Link to="/learn">Take the first step<ArrowRight size={14} /></Link></div>
        </aside>
        <section className="directory-content" aria-label="Component directory">
          <Link to="/learn" className="learning-strip"><span className="learning-strip-icon"><GraduationCap /></span><div><strong>A little curious? You’re in the right place.</strong><p>Get to know MCP, skills, and plugins. No experience needed.</p></div><span className="learning-strip-link">Start here<ArrowUpRight size={15} /></span></Link>
          <div className="component-tabs" role="tablist" aria-label="Component type">{[{ label: 'All components', value: 'All components', icon: Grid2X2 }, { label: 'MCP servers', value: 'MCP server', icon: Terminal }, { label: 'Skills', value: 'Skill', icon: Sparkles }, { label: 'Plugins', value: 'Plugin', icon: Box }].map(tab => <Button role="tab" aria-selected={kind === tab.value} key={tab.value} variant="ghost" data-active={kind === tab.value} onClick={() => setKind(tab.value)}><tab.icon />{tab.label}</Button>)}</div>
          <div className="results-toolbar"><div><strong>{filtered.length}</strong> components{category !== 'All components' && <span className="selected-category"> / {category}</span>}</div><div className="toolbar-controls"><label className="select-wrap"><span className="sr-only">Filter pricing</span><select value={pricing} onChange={e => setPricing(e.target.value)} className="select-control">{['All pricing', 'Free', 'Freemium'].map(value => <option key={value}>{value}</option>)}</select><ChevronDown size={12} /></label><label className="select-wrap"><span className="sr-only">Sort components</span><select value={sort} onChange={e => setSort(e.target.value)} className="select-control">{['Recommended', 'A–Z', 'Free first'].map(value => <option key={value}>{value}</option>)}</select><ChevronDown size={12} /></label><div className="view-switch"><Button variant="ghost" size="icon" aria-label="Grid view" aria-pressed={view === 'grid'} data-active={view === 'grid'} onClick={() => setView('grid')}><Grid2X2 /></Button><Button variant="ghost" size="icon" aria-label="List view" aria-pressed={view === 'list'} data-active={view === 'list'} onClick={() => setView('list')}><List /></Button></div></div></div>
          <div className={`resource-grid ${view === 'list' ? 'resource-list' : ''}`}>
            {filtered.map(resource => <article className="resource-card" key={resource.id}>
              <div className="resource-card-top"><ResourceLogo resource={resource} /><span className="component-kind"><Terminal size={11} />{resource.kind}</span>{resource.featured && <span className="editor-pick"><Sparkles size={11} />Editor pick</span>}</div>
              <h3><Button variant="link" onClick={() => { setSelected(resource); setCopied(false); }} className="resource-title">{resource.name}<ArrowUpRight /></Button></h3><span className="resource-author">by {resource.author}</span>
              <p className="resource-description">{resource.description}</p><div className="resource-tags">{resource.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="resource-card-footer"><span><span className={`price-dot ${resource.pricing === 'Free' ? 'is-free' : ''}`} />{resource.pricing}</span><Button variant="ghost" size="sm" onClick={() => { setSelected(resource); setCopied(false); }}>Explore<ArrowUpRight /></Button></div>
            </article>)}
            {filtered.length === 0 && <div className="directory-empty"><Search size={30} /><h3>{kind === 'Skill' || kind === 'Plugin' ? 'More building blocks to explore.' : 'No components match just yet.'}</h3><p>{kind === 'Skill' || kind === 'Plugin' ? 'This selection contains MCP listings. Visit the original directory for more skills and plugins.' : 'Try a different category or clear your filters.'}</p><Button variant="outline" onClick={clear}>Reset filters<X /></Button>{(kind === 'Skill' || kind === 'Plugin') && <Button asChild variant="link"><a href="https://agentstack.ink" target="_blank" rel="noreferrer">Browse original directory<ArrowUpRight /></a></Button>}</div>}
          </div>
          <div className="directory-bottom"><span>Content adapted from <a href="https://agentstack.ink" target="_blank" rel="noreferrer">agentstack.ink<ArrowUpRight size={11} /></a></span><span>No sponsored rankings.</span></div>
        </section>
      </div>
    </main>
    <section className="editorial-band"><div className="page-container editorial-inner"><div><span className="eyebrow text-primary">LESS NOISE. MORE SIGNAL.</span><h2>Good tools deserve<br />a closer look.</h2><Link to="/methodology">Inside the editorial process<ArrowRight size={15} /></Link></div><div className="editorial-principles"><div><ShieldCheck /><h3>Evidence, not hype</h3><p>Documentation, maintenance, and security signals—not just star counts.</p></div><div><Code2 /><h3>Know what you install</h3><p>Understand permissions, dependencies, and the tool’s intended capabilities.</p></div><div><BookOpen /><h3>A clear way in</h3><p>Real context for experienced builders and people taking their first step.</p></div></div></section>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="detail-modal">{selected && <><div className="detail-top"><ResourceLogo resource={selected} /><div><span className="eyebrow text-primary">{selected.kind}</span><DialogTitle>{selected.name}</DialogTitle><p className="resource-author">by {selected.author}</p></div></div><DialogDescription className="detail-description">{selected.description}</DialogDescription><div className="detail-facts"><span>Category<strong>{selected.category}</strong></span><span>Pricing model<strong>{selected.pricing}</strong></span></div><div className="resource-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="detail-install"><h3><Terminal size={16} />Connect to your stack</h3>{selected.install ? <><div className="code-toolbar"><span>Installation command</span><Button variant="ghost" size="sm" onClick={copyInstall}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy'}</Button></div><pre className="code-preview"><code>{selected.install}</code></pre><p>Review the command and required permissions before running it.</p></> : <p>Use the original listing for setup instructions, supported clients, and any credentials or permissions required.</p>}</div><div className="detail-actions"><Button asChild><a href={selected.source} target="_blank" rel="noreferrer">Read original listing<ExternalLink /></a></Button>{selected.url && <Button asChild variant="outline"><a href={selected.url} target="_blank" rel="noreferrer">Project website<ArrowUpRight /></a></Button>}</div><p className="detail-source">Source: AgentStack. Direct installation and security testing are not claimed by this redesign.</p></>}</DialogContent></Dialog>
    <Dialog open={submitOpen} onOpenChange={setSubmitOpen}><DialogContent className="detail-modal"><DialogTitle>{submitted ? 'Added to this session' : 'Share a building block.'}</DialogTitle><DialogDescription>{submitted ? 'Your component is visible for this session only. It has not been published or permanently saved.' : 'Add a component to this session. Submissions are not permanently saved or editorially reviewed.'}</DialogDescription>{submitted ? <div className="submission-success"><Check size={36} /><Button onClick={() => { setSubmitOpen(false); clear(); explore(); }}>Back to the directory<ArrowRight /></Button></div> : <form className="submission-form" onSubmit={event => { event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name')).trim(); const description = String(form.get('description')).trim(); if (!name || !description) return; const url = String(form.get('url')); setResources(current => [...current, { id: `session-${Date.now()}`, name, description, url, source: url, author: 'Community submission', pricing: String(form.get('pricing')) as Resource['pricing'], category: String(form.get('category')), kind: String(form.get('kind')) as Resource['kind'], tags: ['Session only'] }]); setSubmitted(true); }}><label>Component name<input name="name" className="form-input" required maxLength={60} placeholder="A tool worth sharing" /></label><label>Project URL<input name="url" className="form-input" type="url" pattern="https?://.*" required placeholder="https://" /></label><label>Description<textarea name="description" className="form-input" required maxLength={240} rows={3} placeholder="What can it help an agent do?" /></label><div className="form-columns"><label>Type<select name="kind" className="form-input">{['MCP server', 'Skill', 'Plugin'].map(item => <option key={item}>{item}</option>)}</select></label><label>Pricing<select name="pricing" className="form-input"><option>Free</option><option>Freemium</option></select></label></div><div className="dialog-actions"><Button type="button" variant="ghost" onClick={() => setSubmitOpen(false)}>Cancel</Button><Button type="submit" variant="glow">Share this building block<ArrowUpRight /></Button></div></form>}</DialogContent></Dialog>
  </DirectoryShell>;
}

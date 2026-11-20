import { Box, Code2, Database, Flame, Layers, Search, Sparkles } from "lucide-react";
import type { Resource } from "@/data/resources";

/**
 * The square logo mark shown on a listing card.
 *
 * Each component keeps the mark it already had on the homepage, so the card
 * looks the same wherever it appears.
 */
export function ResourceLogo({ resource }: { resource: Resource }) {
  return <span className={`resource-logo resource-${resource.id}`} aria-hidden="true">{resource.id === 'firecrawl-mcp' ? <Flame /> : resource.id === 'github-mcp' ? <Code2 /> : resource.id === 'postgresql-mcp' ? <Database /> : resource.id === 'anki-mcp' ? <span>A<span className="logo-star">✦</span></span> : resource.id === 'anthropic-mcp' ? <Sparkles /> : resource.id === 'airtable-mcp' ? <Layers /> : resource.id === 'algolia-mcp' ? <Search /> : resource.id === 'adyen-mcp' ? <span>ad</span> : <Box />}</span>;
}

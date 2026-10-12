import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getAllListings } from '../lib/listings';

export const GET: APIRoute = async (context) => {
  const listings = getAllListings();
  return rss({
    title: 'AgentStack — New & Updated AI Agent Tools',
    description: 'Hand-curated MCP servers, SKILL.md skills, and AI agent components. RSS feed of new additions and editorial updates.',
    site: context.site ?? 'https://agentstack.it.com',
    items: listings.slice(0, 30).map((l) => ({
      title: l.name,
      pubDate: new Date(l.dateAdded),
      description: l.shortDescription,
      link: `/listings/${l.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
};

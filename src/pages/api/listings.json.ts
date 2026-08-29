import type { APIRoute } from 'astro';
import { getAllListings, getCategoryBySlug, getPublisherBySlug } from '../../lib/listings';

export const GET: APIRoute = () => {
  const listings = getAllListings().map((l) => {
    const cat = getCategoryBySlug(l.category);
    const pub = getPublisherBySlug(l.publisher);
    return {
      slug: l.slug,
      name: l.name,
      tagline: l.tagline,
      shortDescription: l.shortDescription,
      tags: l.tags,
      useCases: l.useCases,
      category: l.category,
      categoryLabel: cat?.name ?? l.category,
      publisher: pub?.name ?? l.publisher,
      pricing: l.pricing,
      trust: { isOfficial: l.trust.isOfficial },
      status: { up: l.status.up, avgLatencyMs: l.status.avgLatencyMs },
    };
  });
  return new Response(JSON.stringify(listings), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
};

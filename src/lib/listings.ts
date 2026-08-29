/**
 * Data access layer for listings, categories, and publishers.
 * Reads from /data/*.json at build time via Vite's import.meta.glob.
 * No runtime database. Git commits are the editorial workflow.
 */

export type SponsorTier = 'none' | 'verified' | 'featured' | 'sponsor';

export interface Trust {
  securityScore: number;
  qualityScore: number;
  isVerified: boolean;
  isOfficial: boolean;
  lastVerifiedAt: string;
}

export interface LiveStatus {
  up: boolean;
  uptimePct30d: number;
  avgLatencyMs: number;
  lastCheck: string;
}

export interface Listing {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  kind: 'mcp_server' | 'skill' | 'plugin' | 'agent' | 'bundle';
  runtime: string;
  category: string;
  publisher: string;
  externalUrl: string;
  repoUrl?: string;
  installCommand?: string;
  installInstructions?: string;
  logoUrl: string;
  trust: Trust;
  status: LiveStatus;
  tags: string[];
  useCases: string[];
  integrations: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'enterprise';
  pricingDetails?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  sponsorTier: SponsorTier;
  dateAdded: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface Publisher {
  slug: string;
  name: string;
  websiteUrl: string;
  githubHandle?: string | null;
  isVerified: boolean;
}

// Load all listings at build time. Vite resolves the glob.
const listingModules = import.meta.glob<{ default: Listing }>('../../data/listings/*.json', { eager: true });

const allListings: Listing[] = Object.values(listingModules)
  .map((m) => m.default)
  .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));

// Categories and publishers are small, single files.
import categoriesData from '../../data/categories.json' with { type: 'json' };
import publishersData from '../../data/publishers.json' with { type: 'json' };

export function getAllListings(): Listing[] {
  return allListings;
}

export function getFeaturedListings(): Listing[] {
  return allListings.filter((l) => l.sponsorTier === 'featured' || l.sponsorTier === 'sponsor');
}

export function getVerifiedListings(): Listing[] {
  return allListings.filter((l) => l.trust.isVerified && l.trust.isOfficial);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return allListings.find((l) => l.slug === slug);
}

export function getListingsByCategory(categorySlug: string): Listing[] {
  return allListings.filter((l) => l.category === categorySlug);
}

export function getListingsByPublisher(publisherSlug: string): Listing[] {
  return allListings.filter((l) => l.publisher === publisherSlug);
}

export function getRelatedListings(listing: Listing, limit = 3): Listing[] {
  return allListings
    .filter((l) => l.slug !== listing.slug && (l.category === listing.category || l.tags.some((t) => listing.tags.includes(t))))
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return [...(categoriesData as Category[])].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}

export function getAllPublishers(): Publisher[] {
  return publishersData as Publisher[];
}

export function getPublisherBySlug(slug: string): Publisher | undefined {
  return (publishersData as Publisher[]).find((p) => p.slug === slug);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const l of allListings) {
    counts[l.category] = (counts[l.category] || 0) + 1;
  }
  return counts;
}

export function getTotalListingsCount(): number {
  return allListings.length;
}

export function getAllListingSlugs(): string[] {
  return allListings.map((l) => l.slug);
}

export function getAllCategorySlugs(): string[] {
  return (categoriesData as Category[]).map((c) => c.slug);
}

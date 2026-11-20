/**
 * Category pages.
 *
 * A category page is published only when the category actually has listings.
 * An empty category page is thin content, which is exactly what the directory
 * was rejected for, so categories without listings stay unpublished.
 *
 * The editorial (intro, selection notes) lives in data/category_intros.json,
 * the display metadata in data/categories.json, and the name -> slug mapping
 * in src/data/resources.ts.
 */

import {
  Activity,
  Brain,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Globe,
  MessageSquare,
  NotebookPen,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { categories as categoryIndex, resources, type Resource } from "@/data/resources";
import categoryMeta from "../../data/categories.json";
import categoryIntros from "../../data/category_intros.json";

export type CategoryPage = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  intro: string;
  selectionNotes: string;
  resources: Resource[];
};

const icons: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  globe: Globe,
  notebook: NotebookPen,
  message: MessageSquare,
  brain: Brain,
  cloud: Cloud,
  activity: Activity,
  "credit-card": CreditCard,
};

/** The lucide icon that belongs to a category, by its icon name. */
export function categoryIcon(icon: string): LucideIcon {
  return icons[icon] ?? Boxes;
}

function buildPage(slug: string): CategoryPage | null {
  const meta = categoryMeta.find((entry) => entry.slug === slug);
  const index = categoryIndex.find((entry) => entry.slug === slug);
  const editorial = categoryIntros.find((entry) => entry.slug === slug);
  if (!meta || !index || !editorial) return null;

  const listings = resources.filter((resource) => resource.category === index.name);
  if (listings.length === 0) return null;

  return {
    slug: meta.slug,
    name: meta.name,
    description: meta.description,
    icon: meta.icon,
    intro: editorial.intro,
    selectionNotes: editorial.selectionNotes,
    resources: listings,
  };
}

/** The published category page for a slug, or null when there is none. */
export function getCategoryPage(slug: string): CategoryPage | null {
  return buildPage(slug);
}

/** Every published category page, in the order the categories are displayed. */
export function listCategoryPages(): CategoryPage[] {
  return [...categoryMeta]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((entry) => buildPage(entry.slug))
    .filter((page): page is CategoryPage => page !== null);
}

/** The intro editorial, split into paragraphs on blank lines. */
export function introParagraphs(intro: string): string[] {
  return intro
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import type { Article, Category, CategoryInfo } from "@/types";

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}

export function getCategoryInfo(slug: Category): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  articles.forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAdjacentArticles(slug: string) {
  const sorted = getAllArticles();
  const index = sorted.findIndex((a) => a.slug === slug);
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}

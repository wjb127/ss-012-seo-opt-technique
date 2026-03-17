export type Category =
  | "technical-seo"
  | "on-page-seo"
  | "structured-data"
  | "performance"
  | "nextjs-seo"
  | "search-console"
  | "local-seo"
  | "link-building"
  | "analytics";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  emoji: string;
}

import Link from "next/link";
import type { Article } from "@/types";
import { getCategoryInfo } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategoryInfo(article.category);

  return (
    <article className="border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors">
      <Link href={`/articles/${article.slug}`}>
        <div className="flex items-center gap-2 mb-2">
          {category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)]">
              {category.name}
            </span>
          )}
          <time className="text-xs text-[var(--color-muted)]">
            {article.createdAt}
          </time>
        </div>
        <h3 className="font-semibold mb-1">{article.title}</h3>
        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-[var(--color-card)] text-[var(--color-muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}

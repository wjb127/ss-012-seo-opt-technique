import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getArticlesByCategory, getCategoryInfo } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import type { Category } from "@/types";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) return {};

  return {
    title: info.name,
    description: info.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) notFound();

  const articles = getArticlesByCategory(category as Category);

  return (
    <>
      {/* 브레드크럼 */}
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          홈
        </Link>
        <span className="mx-2">/</span>
        <span>{info.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{info.name}</h1>
        <p className="text-[var(--color-muted)]">{info.description}</p>
      </header>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articles.length === 0 && (
          <p className="text-[var(--color-muted)] text-center py-8">
            이 카테고리에 아직 글이 없습니다.
          </p>
        )}
      </div>
    </>
  );
}

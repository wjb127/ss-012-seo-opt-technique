import type { Metadata } from "next";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Category } from "@/types";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "글 목록",
  description: "SEO 최적화 노하우 전체 글 목록",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const articles = category
    ? getArticlesByCategory(category as Category)
    : getAllArticles();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">글 목록</h1>
      <Suspense>
        <CategoryFilter />
      </Suspense>
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articles.length === 0 && (
          <p className="text-[var(--color-muted)] text-center py-8">
            해당 카테고리에 글이 없습니다.
          </p>
        )}
      </div>
    </>
  );
}

import Link from "next/link";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import { categories } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const recentArticles = getAllArticles().slice(0, 10);

  return (
    <>
      {/* 소개 */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-3">SEO 최적화 노하우</h1>
        <p className="text-[var(--color-muted)] text-lg">
          실전에서 검증된 SEO 최적화 기법을 체계적으로 정리합니다.
        </p>
      </section>

      {/* 카테고리 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">카테고리</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{cat.name}</span>
                  <span className="text-xs text-[var(--color-muted)]">
                    {count}개
                  </span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 최신 글 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">최신 글</h2>
          <Link
            href="/articles"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            전체 보기
          </Link>
        </div>
        <div className="space-y-4">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
          {recentArticles.length === 0 && (
            <p className="text-[var(--color-muted)] text-center py-8">
              아직 작성된 글이 없습니다.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

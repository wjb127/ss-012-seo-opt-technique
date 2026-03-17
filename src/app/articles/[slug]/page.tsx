import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getAdjacentArticles,
  getRelatedArticles,
  getCategoryInfo,
} from "@/lib/articles";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryInfo(article.category);
  const { prev, next } = getAdjacentArticles(slug);
  const related = getRelatedArticles(slug);

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          홈
        </Link>
        <span className="mx-2">/</span>
        <Link href="/articles" className="hover:text-[var(--color-accent)]">
          글 목록
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-[var(--color-accent)]"
            >
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <article>
        {/* 헤더 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
          <p className="text-[var(--color-muted)] mb-4">
            {article.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <time>{article.createdAt}</time>
            {article.updatedAt !== article.createdAt && (
              <span>(수정: {article.updatedAt})</span>
            )}
          </div>
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
        </header>

        {/* 목차 */}
        <TableOfContents content={article.content} />

        {/* 본문 */}
        <MarkdownRenderer content={article.content} />
      </article>

      {/* 이전/다음 글 */}
      <nav className="flex justify-between mt-12 pt-8 border-t border-[var(--color-border)]">
        <div>
          {prev && (
            <Link
              href={`/articles/${prev.slug}`}
              className="text-sm hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-muted)] text-xs block">
                이전 글
              </span>
              {prev.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/articles/${next.slug}`}
              className="text-sm hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-muted)] text-xs block">
                다음 글
              </span>
              {next.title}
            </Link>
          )}
        </div>
      </nav>

      {/* 관련 글 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold mb-4">관련 글</h2>
          <div className="space-y-4">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

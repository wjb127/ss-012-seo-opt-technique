"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/articles"
        className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
          !current
            ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
            : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]"
        }`}
      >
        전체
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/articles?category=${cat.slug}`}
          className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
            current === cat.slug
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

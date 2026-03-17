"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // 마크다운에서 헤딩 추출
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .replace(/\s+/g, "-");
      toc.push({ id, text, level });
    }
    setItems(toc);
  }, [content]);

  if (items.length === 0) return null;

  return (
    <nav className="border border-[var(--color-border)] rounded-lg p-4 mb-8">
      <h2 className="font-semibold mb-2 text-sm">목차</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

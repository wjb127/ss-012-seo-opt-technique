"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="border-b border-[var(--color-border)] sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          SEO 노하우
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/articles"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            글 목록
          </Link>
          <button
            onClick={toggleDark}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-card)] transition-colors"
            aria-label="테마 전환"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}

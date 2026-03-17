import { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "nextjs-metadata-api",
    title: "Next.js Metadata API 완벽 가이드",
    description:
      "Next.js App Router의 Metadata API를 활용한 SEO 메타태그 최적화 방법을 알아봅니다.",
    category: "nextjs-seo",
    tags: ["Next.js", "메타태그", "App Router", "OG태그"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## Next.js Metadata API란?

Next.js App Router에서는 \`metadata\` export를 통해 각 페이지의 SEO 메타태그를 설정할 수 있습니다.

### 정적 메타데이터

\`\`\`typescript
// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈페이지",
  description: "사이트 설명",
  openGraph: {
    title: "홈페이지",
    description: "사이트 설명",
    images: ["/og-image.png"],
  },
};
\`\`\`

### 동적 메타데이터

\`\`\`typescript
// app/articles/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  return {
    title: article.title,
    description: article.description,
  };
}
\`\`\`

### 핵심 포인트

- \`title.template\`을 layout에서 설정하면 하위 페이지에서 일관된 타이틀 패턴 사용 가능
- \`openGraph\` 이미지는 절대 URL 사용 권장 (프로덕션 도메인 기준)
- \`robots\` 설정으로 페이지별 인덱싱 제어 가능
`,
  },
  {
    slug: "sitemap-robots-guide",
    title: "sitemap.xml과 robots.txt 설정 가이드",
    description:
      "검색 엔진 크롤러를 위한 sitemap.xml과 robots.txt의 올바른 설정 방법",
    category: "technical-seo",
    tags: ["사이트맵", "robots.txt", "크롤링", "인덱싱"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 사이트맵(sitemap.xml)

사이트맵은 검색 엔진에게 사이트의 페이지 구조를 알려주는 XML 파일입니다.

### Next.js에서 동적 사이트맵 생성

\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: \`\${baseUrl}/articles\`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    // 각 글 페이지도 동적으로 추가
  ];
}
\`\`\`

## robots.txt

\`\`\`typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
\`\`\`

### 핵심 포인트

- 사이트맵은 Google Search Console에 직접 제출하는 것이 빠른 인덱싱에 도움
- \`lastModified\`는 실제 수정일 기준으로 설정
- robots.txt의 \`Disallow\`는 크롤링만 차단하며, 인덱싱 차단은 \`noindex\` 메타태그 사용
`,
  },
];

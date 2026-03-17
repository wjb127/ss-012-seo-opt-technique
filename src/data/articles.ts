import { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "nextjs-metadata-og-images-guide",
    title: "Next.js 메타데이터 & OG 이미지 완벽 가이드 (공식 문서 정리)",
    description:
      "Next.js 공식 문서 기반으로 Metadata API, OG 이미지 생성, 파일 기반 메타데이터, 스트리밍 메타데이터 등을 상세히 정리합니다.",
    category: "nextjs-seo",
    tags: ["Next.js", "메타데이터", "OG이미지", "ImageResponse", "SEO"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Next.js의 Metadata API를 활용하면 SEO와 소셜 공유를 위한 메타데이터를 효과적으로 관리할 수 있다. 크게 3가지 방식이 있다:

1. **정적 \`metadata\` 객체** — 빌드 타임에 결정되는 고정 메타데이터
2. **동적 \`generateMetadata\` 함수** — 데이터에 의존하는 동적 메타데이터
3. **파일 기반 메타데이터** — favicon, OG 이미지, robots.txt, sitemap.xml 등 특수 파일

> \`metadata\` 객체와 \`generateMetadata\` 함수는 **서버 컴포넌트에서만** 사용 가능하다.

## 기본 제공 필드

Next.js는 라우트에 메타데이터를 정의하지 않아도 **항상 두 가지 메타 태그**를 자동 추가한다:

\`\`\`html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
\`\`\`

## 정적 메타데이터 (Static Metadata)

\`layout.tsx\` 또는 \`page.tsx\`에서 \`Metadata\` 객체를 export하면 된다:

\`\`\`typescript
// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "블로그 설명",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
\`\`\`

간단하고 빌드 타임에 확정되는 메타데이터에 적합하다.

## 동적 메타데이터 (Generated Metadata)

데이터 fetching이 필요한 경우 \`generateMetadata\` 함수를 사용한다:

\`\`\`typescript
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  const post = await fetch(\`https://api.vercel.app/blog/\${slug}\`).then((res) =>
    res.json()
  );

  return {
    title: post.title,
    description: post.description,
  };
}
\`\`\`

### 핵심 포인트
- \`params\`와 \`searchParams\`는 **Promise**이므로 \`await\` 필요 (Next.js 15+)
- 두 번째 인자 \`parent\`로 부모 레이아웃의 메타데이터에 접근 가능
- 반환 타입은 \`Promise<Metadata>\`

## 스트리밍 메타데이터 (Streaming Metadata)

Next.js 16에서는 동적 렌더링 페이지에서 **메타데이터를 별도로 스트리밍**한다:

- UI를 먼저 렌더링하고, \`generateMetadata\`가 resolve되면 \`<head>\`에 주입
- **체감 성능이 향상**됨 (메타데이터 로딩이 UI를 블로킹하지 않음)

### 봇/크롤러에 대한 처리

\`Twitterbot\`, \`Slackbot\`, \`Bingbot\` 등 **\`<head>\`에 메타데이터가 있어야 하는 봇**에 대해서는 스트리밍이 **자동 비활성화**된다. User-Agent 헤더로 감지한다.

\`next.config.ts\`의 \`htmlLimitedBots\` 옵션으로 커스터마이즈하거나 완전히 비활성화할 수 있다.

> 정적 렌더링 페이지는 빌드 타임에 메타데이터가 확정되므로 스트리밍을 사용하지 않는다.

## 데이터 요청 메모이제이션

메타데이터와 페이지 본문에서 **같은 데이터**를 fetch할 때, React의 \`cache\` 함수로 중복 요청을 방지한다:

\`\`\`typescript
// app/lib/data.ts
import { cache } from "react";
import { db } from "@/app/lib/db";

// getPost는 두 번 호출되지만 실제 실행은 한 번만 된다
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) });
  return res;
});
\`\`\`

\`\`\`typescript
// app/blog/[slug]/page.tsx
import { getPost } from "@/app/lib/data";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // 첫 번째 호출
  return { title: post.title, description: post.description };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // 캐시에서 가져옴 (중복 요청 없음)
  return <div>{post.title}</div>;
}
\`\`\`

## 파일 기반 메타데이터 (File-based Metadata)

Next.js는 다음 특수 파일을 인식한다:

| 파일명 | 용도 |
|--------|------|
| \`favicon.ico\`, \`icon.jpg\`, \`apple-icon.jpg\` | 파비콘 및 앱 아이콘 |
| \`opengraph-image.jpg\`, \`twitter-image.jpg\` | 소셜 미디어 미리보기 이미지 |
| \`robots.txt\` | 크롤러 접근 제어 |
| \`sitemap.xml\` | 사이트 구조 정보 |

### 파비콘 (Favicon)

\`app/\` 폴더 루트에 \`favicon.ico\` 파일을 넣으면 자동 인식된다. 코드로 프로그래밍 방식으로도 생성 가능하다.

### 정적 OG 이미지

\`app/\` 폴더에 \`opengraph-image.jpg\`를 넣으면 전체 사이트의 기본 OG 이미지가 된다.

**라우트별 OG 이미지**도 가능하다. 예를 들어 \`app/blog/opengraph-image.jpg\`를 넣으면 \`/blog\` 경로에서는 이 이미지가 우선 적용된다.

> 지원 포맷: \`jpeg\`, \`png\`, \`gif\`

## 동적 OG 이미지 생성 (ImageResponse)

\`next/og\`의 \`ImageResponse\`를 사용하면 **JSX와 CSS로 동적 OG 이미지**를 생성할 수 있다:

\`\`\`typescript
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getPost } from "@/app/lib/data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {post.title}
      </div>
    )
  );
}
\`\`\`

### ImageResponse 특징
- **flexbox와 일부 CSS 속성만 지원** (grid 등 고급 레이아웃은 불가)
- 커스텀 폰트, 텍스트 래핑, 중앙 정렬, 중첩 이미지 등 지원
- 내부적으로 \`@vercel/og\`, \`satori\`, \`resvg\`를 사용해 HTML/CSS를 PNG로 변환
- [Vercel OG Playground](https://og-playground.vercel.app/)에서 미리보기 가능

## 실전 팁 정리

1. **레이아웃에서 \`title.template\` 설정** → 하위 페이지에서 일관된 타이틀 패턴 유지
2. **OG 이미지는 절대 URL** 사용 (프로덕션 도메인 기준, localhost 금지)
3. **OG 이미지 크기는 1200x630** 권장
4. **동일 데이터 fetch는 \`cache()\`로 메모이제이션** → 성능 최적화
5. **봇용 메타데이터는 자동 처리**되지만, 필요시 \`htmlLimitedBots\`로 제어
6. **파비콘은 PNG 포맷 + 솔리드 배경** 추천 (네이버에서 투명 배경은 검정으로 표시됨)
7. **정적 페이지는 \`metadata\` 객체**, 동적 페이지는 \`generateMetadata\` 함수 사용
`,
  },
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

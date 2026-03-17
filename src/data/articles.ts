import { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "nextjs-seo-playbook-vercel",
    title: "Next.js SEO 플레이북 (Vercel 공식 블로그 정리)",
    description:
      "Vercel 공식 블로그의 Next.js SEO 플레이북을 한국어로 정리. 렌더링 전략, 속도 최적화, 콘텐츠 전략, 동적 메타데이터, 네비게이션, 국제화까지 총정리.",
    category: "nextjs-seo",
    tags: ["Next.js", "Vercel", "SEO", "ISR", "렌더링", "국제화"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Vercel 공식 블로그에서 발행한 Next.js SEO 플레이북을 한국어로 정리한 글이다. SEO를 신비로운 과정이 아닌 **체계적인 접근법**으로 다루며, Next.js + Vercel 조합에서 활용할 수 있는 모든 SEO 전략을 포괄한다.

## 1. 렌더링 전략이 SEO에 미치는 영향

검색 엔진은 **소스 코드**를 크롤링한다. 클라이언트 사이드 JavaScript로만 렌더링된 콘텐츠는 크롤링에 더 오래 걸리거나 아예 인덱싱되지 않을 수 있다.

### 렌더링 방식 비교

| 방식 | 특징 | SEO 영향 |
|------|------|---------|
| **CSR** (클라이언트 사이드) | 브라우저에서 JS 실행 후 렌더링 | 크롤러가 빈 페이지를 볼 수 있음 |
| **SSR** (서버 사이드) | 요청마다 서버에서 렌더링 | 크롤러에 완전한 HTML 제공, 서버 부하 존재 |
| **SSG** (정적 생성) | 빌드 타임에 HTML 생성 | 가장 빠른 로딩, 대규모 사이트에서 빌드 시간 문제 |
| **ISR** (점진적 정적 재생성) | SSG + 특정 페이지만 필요시 업데이트 | SSG의 빠른 속도 + SSR의 유연성 |

### 핵심 포인트

**ISR이 SEO에 가장 유리한 선택지**인 경우가 많다. SSG처럼 모든 페이지를 프리렌더링하면서, 콘텐츠가 변경된 페이지만 선택적으로 재생성할 수 있기 때문이다.

\`\`\`typescript
// ISR 예시 — 60초마다 페이지 재생성
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}
\`\`\`

## 2. 속도 최적화

사이트 속도는 SEO에 **직접적인 영향**을 미친다. Google은 사이트 속도를 순위 요소로 사용하며, 빠른 사이트는 사용자 참여도와 전환율도 높다.

### 속도가 영향을 미치는 3가지 영역

1. **사용자 경험**: 빠른 사이트 = 높은 참여도 = 높은 전환율
2. **검색 엔진 순위**: Google이 속도를 강력한 순위 신호로 사용
3. **모바일 최적화**: 대부분의 트래픽이 모바일, Google은 모바일 우선 크롤링

### Next.js 내장 최적화 도구

#### next/image

디바이스별 이미지 자동 최적화. 최소한의 추가 JavaScript만 로드한다.

\`\`\`typescript
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="히어로 배너 설명"
  width={1200}
  height={630}
  priority  // above-the-fold 이미지는 프리로드
/>
\`\`\`

#### Dynamic Imports

**컴포넌트 단위**까지 스크립트 지연 로딩이 가능하다:

\`\`\`typescript
import dynamic from "next/dynamic";

// 사용자가 필요할 때만 로드
const HeavyChart = dynamic(() => import("@/components/Chart"), {
  loading: () => <p>로딩 중...</p>,
});
\`\`\`

#### 자동 웹폰트 최적화

Next.js는 불필요한 외부 요청을 제거하고, 폰트를 자체 호스팅하여 렌더링 블로킹을 최소화한다.

#### 반응형 디자인

별도의 AMP 버전 없이도 모바일 최적화가 가능하다. Next.js + Tailwind CSS 조합이면 충분하다.

## 3. 콘텐츠 전략

### 구조화된 콘텐츠의 중요성

"헤더만 중요한 게 아니다. **서브헤더, 리스트, 테이블도 모두 중요하다.**"

검색 엔진 크롤러는 시각적 구조를 통해 콘텐츠의 컨텍스트를 파악한다. 시맨틱 HTML을 적극 활용하자:

\`\`\`html
<article>
  <h1>메인 제목</h1>
  <p>도입부...</p>

  <h2>주요 섹션</h2>
  <p>설명...</p>

  <h3>하위 주제</h3>
  <ul>
    <li>포인트 1</li>
    <li>포인트 2</li>
  </ul>

  <table>
    <thead><tr><th>항목</th><th>설명</th></tr></thead>
    <tbody><tr><td>데이터</td><td>값</td></tr></tbody>
  </table>
</article>
\`\`\`

### Schema.org 구조화 데이터

Google의 Structured Data Markup Helper를 활용해 **리치 스니펫**용 JSON-LD를 생성하자. Article, FAQ, HowTo, Product 등 다양한 스키마를 적용할 수 있다.

## 4. 동적 메타데이터 엔지니어링

HTML \`<head>\` 내에 포함해야 할 메타데이터 요소:

| 요소 | 용도 |
|------|------|
| **Title** | 검색 결과에 표시되는 페이지 제목 |
| **Description** | 검색 결과 스니펫에 표시되는 설명 |
| **Meta tags** | 키워드, robots 지시어 등 |
| **Open Graph** | 소셜 미디어 공유 시 미리보기 |
| **Structured Data** | 리치 스니펫용 JSON-LD |

### App Router에서의 메타데이터 관리

App Router를 사용하면 **컴포넌트 단위**에서 동적으로 메타데이터를 생성할 수 있다:

\`\`\`typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost((await params).slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}
\`\`\`

## 5. 스마트 네비게이션 설계

검색 엔진은 **어떤 페이지가 어떤 페이지로 링크하는지**를 기반으로 사이트 구조를 파악한다.

### Next.js 네비게이션 도구

| 도구 | SEO 기여 |
|------|---------|
| **App Router** | 디렉토리 기반 라우팅으로 자연스러운 페이지 계층 구조 |
| **Layouts** | 네비게이션, 푸터 등 반복 요소 중앙 관리 |
| **Dynamic Segments** | 프로그래밍 방식으로 서브페이지 생성 |
| **Link 컴포넌트** | 프리페칭 + 클라이언트 사이드 네비게이션 |
| **useRouter Hook** | 조건부 라우팅 처리 |

### 캐노니컬 URL

유사하거나 중복된 콘텐츠가 있을 경우, **선호하는 버전의 URL**을 명시해야 한다:

\`\`\`typescript
export const metadata = {
  alternates: {
    canonical: "/blog/original-post",
  },
};
\`\`\`

이렇게 하면 \`?utm_source=...\` 같은 쿼리 파라미터가 붙은 URL이 별도 페이지로 인덱싱되는 것을 방지한다.

## 6. 404 페이지 & 에러 처리

### 잘못된 방식

- 404 에러 시 홈페이지로 리다이렉트 (Google이 싫어함)
- 복잡하고 장황한 에러 페이지

### 올바른 방식

- 명확하고 심플한 404 페이지
- "이 페이지를 찾을 수 없습니다" 직설적 메시지
- **인기 콘텐츠 링크** 제공으로 사용자 이탈 방지
- 필요시 \`noindex\`로 에러 페이지 인덱싱 차단

\`\`\`typescript
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
\`\`\`

## 7. 국제화 (i18n)와 지역 SEO

### 국제화 프로세스

1. 코드베이스를 다국어 지원 가능하도록 준비
2. RTL(오른쪽→왼쪽) 등 텍스트 방향성 CSS 지원
3. Next.js의 i18n 설정으로 자동 로케일 감지

### Next.js i18n 기능

- **자동 로케일 감지**: 브라우저 설정 기반
- **\`lang\` 속성 자동 추가**: \`<html lang="ko">\`
- **로케일 간 자연스러운 전환**

### hreflang 태그

다국어 사이트에서 검색 엔진에 언어별 버전을 알려주려면 **수동으로** \`hreflang\` 메타 태그를 추가해야 한다:

\`\`\`typescript
export const metadata = {
  alternates: {
    languages: {
      "ko": "/ko",
      "en": "/en",
      "ja": "/ja",
    },
  },
};
\`\`\`

### 현지화 팁

- 브라우저 자동 번역에만 의존하지 말 것
- 문화적, 정치적, 법적 뉘앙스를 고려한 **수동 현지화** 권장
- 단순 번역이 아닌 해당 문화권에 맞는 콘텐츠 적응 필요

## 8. Vercel 배포 & 모니터링

| 기능 | 설명 |
|------|------|
| **Next.js Analytics** | Lighthouse + Core Web Vitals 기반 분석 |
| **Real Experience Score** | 실제 사용자 기준 사이트 성능 지속 측정 |
| **Git 워크플로우** | 브랜치 기반 자동 배포 (Preview + Production) |
| **Preview 배포** | PR마다 고유 URL 생성, 실시간 팀 코멘팅 가능 |

### 실전 워크플로우

1. 기능 브랜치에서 개발
2. PR 생성 → Preview 배포 자동 생성
3. Preview에서 SEO 요소 확인 (메타태그, OG 이미지, 구조화 데이터)
4. 머지 → Production 자동 배포
5. Analytics에서 Core Web Vitals 모니터링

## 핵심 요약

| 영역 | 전략 |
|------|------|
| **렌더링** | ISR로 빠른 속도 + 유연한 업데이트 |
| **속도** | next/image, Dynamic Import, 웹폰트 최적화 |
| **콘텐츠** | 시맨틱 HTML + Schema.org 구조화 데이터 |
| **메타데이터** | App Router의 동적 메타데이터 API 활용 |
| **네비게이션** | 디렉토리 기반 라우팅 + 캐노니컬 URL |
| **에러 처리** | 심플한 404 + 인기 콘텐츠 링크 |
| **국제화** | i18n + hreflang + 문화적 현지화 |
| **배포** | Vercel Preview 배포로 SEO 사전 검증 |
`,
  },
  {
    slug: "nextjs-seo-zero-to-hero",
    title: "Next.js SEO 제로부터 히어로까지: 프로덕션 체크리스트",
    description:
      "metadataBase 설정부터 JSON-LD 구조화 데이터, 캐노니컬 URL, Core Web Vitals, 흔한 실수까지 — Next.js App Router 기반 SEO를 프로덕션 수준으로 완성하는 종합 가이드",
    category: "nextjs-seo",
    tags: ["Next.js", "SEO", "JSON-LD", "Core Web Vitals", "메타데이터", "canonical"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Next.js App Router의 빌트인 API만으로 프로덕션 수준의 SEO를 구현하는 종합 가이드. 추가 npm 패키지 없이 Next.js가 제공하는 기능만으로 충분하다.

### 핵심 체크리스트 (TL;DR)

- 루트 레이아웃에 \`metadataBase\` 설정 (OG 이미지 상대 경로 문제 방지)
- \`sitemap.ts\`, \`robots.ts\` 파일 생성
- \`title.template\` 패턴으로 고유한 페이지 타이틀
- 모든 페이지에 캐노니컬 URL
- JSON-LD 구조화 데이터
- \`next/image\`에 alt 텍스트 + priority 프로퍼티
- \`next/font\`로 레이아웃 시프트 제거

## SEO 프로젝트 구조

\`\`\`
app/
├── layout.tsx          # 루트 레이아웃 (글로벌 메타데이터)
├── page.tsx            # 홈페이지 (구조화 데이터)
├── sitemap.ts          # 동적 사이트맵
├── robots.ts           # robots.txt
├── manifest.ts         # PWA 매니페스트
├── blog/
│   ├── page.tsx        # 블로그 인덱스
│   └── [slug]/
│       └── page.tsx    # 동적 블로그 포스트
lib/
└── seo.ts              # 재사용 메타데이터 빌더
\`\`\`

## metadataBase: 가장 먼저 해야 할 설정

\`metadataBase\`는 OG 이미지, 캐노니컬 URL 등의 **상대 경로를 절대 URL로 변환**하는 기준이 된다. 이걸 빠뜨리면 소셜 미디어 카드에서 이미지가 깨진다.

\`\`\`typescript
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "사이트 기본 타이틀",
    template: "%s | 사이트명",  // 하위 페이지: "About | 사이트명"
  },
  description: "사이트 설명",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "사이트명",
    images: ["/opengraph-image.png"],  // metadataBase 덕분에 절대 URL로 변환됨
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
\`\`\`

## 재사용 가능한 메타데이터 빌더

매 페이지마다 메타데이터를 반복 작성하지 말고, **헬퍼 함수**를 만들자:

\`\`\`typescript
// lib/seo.ts
import type { Metadata } from "next";

const SITE_URL = "https://yourdomain.com";
const SITE_NAME = "사이트명";

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const canonical = path?.startsWith("/") ? path : \`/\${path ?? ""}\`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: \`\${SITE_URL}\${canonical}\`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(typeof noIndex === "boolean" && {
      robots: { index: !noIndex, follow: !noIndex },
    }),
  };
}
\`\`\`

### 사용법

\`\`\`typescript
// app/blog/page.tsx
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "블로그",
  description: "웹 개발과 SEO에 대한 인사이트",
  path: "/blog",
  keywords: ["Next.js", "SEO", "웹 개발"],
});
\`\`\`

## 사이트맵 우선순위 전략

\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com";
  const posts = getAllPosts();

  return [
    { url: baseUrl, priority: 1.0, changeFrequency: "monthly" },           // 홈: 최고 우선순위
    { url: \`\${baseUrl}/blog\`, priority: 0.8, changeFrequency: "weekly" },   // 콘텐츠 허브
    ...posts.map((post) => ({
      url: \`\${baseUrl}/blog/\${post.slug}\`,
      lastModified: new Date(post.date),
      priority: 0.7,                                                         // 개별 콘텐츠
      changeFrequency: "monthly" as const,
    })),
  ];
}
\`\`\`

### 우선순위 가이드

| 우선순위 | 대상 |
|---------|------|
| **1.0** | 홈페이지 |
| **0.8** | 콘텐츠 허브 (블로그 인덱스 등) |
| **0.7** | 개별 콘텐츠 (블로그 포스트) |
| **0.6** | 보조 페이지 (소개, 경력 등) |

## JSON-LD 구조화 데이터

검색 결과에 **리치 스니펫**을 표시하려면 JSON-LD가 필수다.

### Article 스키마 예시

\`\`\`typescript
function generateArticleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "작성자명",
      url: "https://yourdomain.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": \`https://yourdomain.com/blog/\${post.slug}\`,
    },
  };
}
\`\`\`

### 보안 주의: XSS 방지

JSON-LD를 \`dangerouslySetInnerHTML\`로 삽입할 때 반드시 \`<\` 문자를 이스케이프해야 한다:

\`\`\`typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\\\u003c"),
  }}
/>
\`\`\`

이렇게 안 하면 악의적 콘텐츠가 \`</script>\` 태그를 삽입해 XSS 공격이 가능해진다.

## Core Web Vitals & 성능

| 메트릭 | 측정 대상 | 좋은 점수 | Next.js 해법 |
|--------|---------|----------|-------------|
| **LCP** | 로딩 성능 | ≤ 2.5초 | \`next/image\` + \`priority\`, 정적 생성 |
| **INP** | 반응성 | ≤ 200ms | 서버 컴포넌트, 최소한의 클라이언트 JS |
| **CLS** | 시각적 안정성 | ≤ 0.1 | \`next/font\`, \`next/image\`에 크기 지정 |

### 이미지 최적화 핵심

\`\`\`typescript
import Image from "next/image";

// 히어로 이미지 (above the fold) — LCP 최적화
<Image
  src="/hero.jpg"
  alt="상세한 설명 텍스트"
  width={1200}
  height={630}
  priority  // 프리로드로 LCP 개선
/>

// 아래쪽 이미지 — 자동 레이지 로드
<Image
  src={post.coverImage}
  alt={\`\${post.title} 커버 이미지\`}
  width={800}
  height={400}
/>
\`\`\`

| 프로퍼티 | SEO 영향 | 사용 시점 |
|---------|---------|---------|
| \`alt\` | 이미지 검색 순위에 **직접 영향** | 의미 있는 이미지에 항상 |
| \`priority\` | LCP 점수 개선 | above-the-fold 이미지 |
| \`width\` + \`height\` | CLS 방지 | 항상 지정 |
| \`sizes\` | 대역폭 최적화 | 반응형 그리드 레이아웃 |

> 장식용 이미지는 \`alt=""\`로 설정해 스크린 리더가 건너뛰게 한다.

### 폰트 최적화

\`\`\`typescript
import { Geist } from "next/font/google";

const font = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",  // 폰트 로딩 중 텍스트가 보이지 않는 문제 방지
});
\`\`\`

## Next.js SEO 흔한 실수 7가지

### 1. metadataBase 누락

\`\`\`typescript
// 잘못됨 — OG 이미지가 상대 경로로 남아 소셜 카드에서 깨짐
openGraph: { images: ["/og-image.png"] }

// 올바름 — 루트 레이아웃에 metadataBase 설정
metadataBase: new URL("https://yourdomain.com"),
openGraph: { images: ["/og-image.png"] }  // → https://yourdomain.com/og-image.png
\`\`\`

### 2. 모든 페이지에서 동일한 타이틀

Google Search Console에서 "중복 타이틀 태그" 경고가 뜬다. \`title.template\`을 활용하자.

### 3. 이미지 alt 텍스트 누락/부실

\`\`\`typescript
// 나쁜 예
<Image src={photo} alt="image" />
<Image src={photo} alt="photo.jpg" />

// 좋은 예
<Image src={photo} alt="스프린트 플래닝 중 화이트보드 앞에서 협업하는 팀" />
\`\`\`

### 4. 캐노니컬 URL 미설정

\`yoursite.com/blog/post\`와 \`yoursite.com/blog/post?utm_source=twitter\`가 **별개의 페이지로 인덱싱**되어 랭킹이 분산된다.

\`\`\`typescript
alternates: { canonical: "/blog/post" }
\`\`\`

### 5. 클라이언트 사이드에서만 콘텐츠 렌더링

\`useEffect\`로 fetch하는 콘텐츠는 **크롤러가 볼 수 없다**. 서버 컴포넌트에서 데이터를 가져와야 한다.

\`\`\`typescript
// 잘못됨 — 크롤러에게 빈 페이지
const [data, setData] = useState(null);
useEffect(() => { fetch("/api/content").then(r => r.json()).then(setData) }, []);

// 올바름 — 서버에서 렌더링되어 크롤러가 내용을 볼 수 있음
export default async function Page() {
  const data = await getContent();
  return <div>{data.content}</div>;
}
\`\`\`

### 6. robots.txt에서 /_next/ 차단

\`\`\`
# 절대 하면 안 됨!
Disallow: /_next/
\`\`\`

Googlebot은 페이지를 렌더링하기 위해 \`/_next/\` 안의 JS 파일이 필요하다. 차단하면 빈 페이지가 인덱싱된다.

### 7. JSON-LD에서 \`<\` 이스케이프 누락

\`JSON.stringify(jsonLd)\`만 하면 XSS 취약점이 생긴다. 반드시 \`.replace(/</g, "\\\\u003c")\`를 추가하자.

## SEO 테스트 도구 모음

| 도구 | 용도 |
|------|------|
| Google Rich Results Test | JSON-LD 구조화 데이터 검증 |
| Schema Markup Validator | 스키마 마크업 추가 검증 |
| Facebook Sharing Debugger | OG 카드 미리보기 & 디버깅 |
| opengraph.xyz | Twitter/Facebook/LinkedIn 카드 미리보기 |
| Google Search Console | 인덱싱 모니터링, 사이트맵 제출 |
| PageSpeed Insights | Core Web Vitals 실측 |
| Lighthouse | SEO/성능/접근성 종합 감사 (Chrome DevTools) |

> 소셜 플랫폼은 OG 태그를 **공격적으로 캐싱**한다. 태그를 수정한 후에는 반드시 디버거 도구에서 "다시 스크랩"을 눌러야 반영된다.

## 배포 전 SEO 감사 체크리스트

- [ ] \`metadataBase\` 설정됨
- [ ] \`title.template\`으로 일관된 브랜딩
- [ ] 모든 페이지에 OpenGraph + Twitter 카드
- [ ] 모든 페이지에 캐노니컬 URL
- [ ] 동적 사이트맵 (모든 라우트 포함)
- [ ] robots.txt에서 크롤러 허용
- [ ] JSON-LD 구조화 데이터 (Article, WebSite 등)
- [ ] 모든 이미지에 적절한 alt 텍스트
- [ ] 시맨틱 HTML (\`<main>\`, \`<article>\`, \`<nav>\`)
- [ ] \`<html>\` 태그에 \`lang\` 속성
- [ ] \`next/font\`로 CLS 방지
- [ ] 외부 링크에 \`rel="noopener noreferrer"\`
`,
  },
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

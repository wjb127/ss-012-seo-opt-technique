import { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "google-seo-for-developers",
    title: "Google 검색 시작하기: 개발자 가이드 (공식 문서 정리)",
    description:
      "Google 공식 개발자 SEO 가이드 정리. 크롤링 가능한 링크, JavaScript SEO, 텍스트 우선 전략, noindex/robots.txt 차이, 구조화 데이터로 리치 결과 구현까지.",
    category: "technical-seo",
    tags: ["Google", "개발자", "JavaScript SEO", "크롤링", "리치결과", "noindex"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Google 검색 센터의 개발자용 SEO 시작 가이드를 정리한 글이다. **웹 개발자 관점**에서 Google 검색에 사이트를 최적화하는 실전 방법을 다룬다.

> 검색에 최적화된 콘텐츠를 만들면 관심 있는 사용자를 더 많이 유입할 수 있다.

## 1. Google이 사이트를 인식하는 방법

### 프로세스

1. **Googlebot**(웹 크롤링 봇)이 새로운/업데이트된 페이지를 발견
2. 페이지를 크롤링하고 렌더링
3. Google 색인에 포함

### 사용자 뷰 vs Google 뷰

사용자는 브라우저에서 이미지와 텍스트를 볼 수 있지만, **Google이 지원하지 않는 JavaScript 기능**을 사용하면 해당 콘텐츠를 인식하지 못할 수 있다.

### 테스트 도구

- **URL 검사 도구** (Search Console) — Google이 페이지를 어떻게 보는지 확인
- **리치 결과 테스트** — 구조화 데이터 검증

## 2. 크롤링 가능한 링크 만들기

Googlebot은 **링크, 사이트맵, 리디렉션**을 파싱하여 URL 사이를 이동한다.

### 필수 규칙

#### \`<a>\` 태그를 사용하라

\`\`\`html
<!-- 올바름 — Google이 크롤링 가능 -->
<a href="/about">소개 페이지</a>

<!-- 잘못됨 — Google이 따라가지 못할 수 있음 -->
<div onclick="location.href='/about'">소개 페이지</div>
<button onclick="navigate('/about')">소개 페이지</button>
\`\`\`

모든 페이지가 검색 가능한 **다른 페이지의 링크로 연결**되어야 한다. 어디서도 링크되지 않은 페이지는 Google이 발견할 수 없다.

#### 링크 텍스트와 alt 속성

\`\`\`html
<!-- 좋은 예 — 링크 대상을 명확히 설명 -->
<a href="/seo-guide">SEO 기본 가이드</a>

<!-- 이미지 링크는 alt 속성 필수 -->
<a href="/products">
  <img src="shoes.jpg" alt="운동화 컬렉션">
</a>
\`\`\`

#### 사이트맵 제출

사이트맵은 사이트에 있는 **페이지, 동영상, 기타 파일과 각 관계**에 관한 정보를 제공한다. Search Console에서 제출하자.

#### SPA(싱글 페이지 앱) 주의사항

JavaScript 앱에서는 각 화면/개별 콘텐츠마다 **고유 URL**이 있어야 한다. URL이 바뀌지 않으면 Google은 각 콘텐츠를 별개의 페이지로 인식하지 못한다.

\`\`\`
# SPA에서 고유 URL 필수
https://example.com/products         → 제품 목록
https://example.com/products/shoes   → 신발 상세
https://example.com/about            → 소개
\`\`\`

## 3. JavaScript SEO

### Google의 JavaScript 처리

Google은 JavaScript를 **실행하지만 제한사항이 존재**한다:

- 일부 JavaScript API를 지원하지 않을 수 있음
- 렌더링 대기 시간이 추가로 소요됨
- 크롤링 → 렌더링이 2단계로 분리되어 있음

### 핵심 원칙

페이지 설계 시 **크롤러의 콘텐츠 접근/렌더링 방식**을 항상 고려해야 한다:

1. 중요한 콘텐츠는 **서버 사이드 렌더링** 또는 **정적 생성** 권장
2. JavaScript로만 렌더링되는 콘텐츠는 색인이 **지연**될 수 있음
3. Google이 지원하지 않는 JS 기능을 사용하면 **콘텐츠가 보이지 않음**

## 4. 콘텐츠 변경 시 Google에 알리기

### 빠른 크롤링 방법

1. **사이트맵 제출** — 신규/업데이트된 페이지 포함
2. **URL 재크롤링 요청** — Search Console에서 직접 요청

### 디버깅

색인 생성에 계속 문제가 발생하면 **서버 로그에서 오류를 확인**하자. Googlebot의 접근 실패, 5xx 에러 등이 원인일 수 있다.

## 5. 텍스트 우선 전략

> "Googlebot은 텍스트로 표시되는 콘텐츠만 확인할 수 있다."

### 실전 규칙

#### 시각적 콘텐츠에 텍스트 대안 제공

\`\`\`html
<!-- 나쁜 예 — 이미지만 나열 -->
<div class="products">
  <img src="product1.jpg">
  <img src="product2.jpg">
</div>

<!-- 좋은 예 — 텍스트 설명 포함 -->
<div class="products">
  <div>
    <img src="product1.jpg" alt="클래식 가죽 지갑">
    <h3>클래식 가죽 지갑</h3>
    <p>수제 이탈리안 가죽으로 만든 슬림 지갑</p>
  </div>
</div>
\`\`\`

#### 모든 페이지에 고유한 제목 + 메타 설명

\`\`\`html
<head>
  <title>클래식 가죽 지갑 | 핸드메이드 가죽 제품</title>
  <meta name="description" content="수제 이탈리안 가죽으로 만든 슬림 지갑. 6개 카드 슬롯과 지폐 수납 공간.">
</head>
\`\`\`

고유한 제목과 메타 설명이 있으면 Google이 **페이지와 사용자의 관련성**을 표시하는 데 도움이 된다.

#### 의미론적 HTML 사용

\`\`\`html
<!-- 좋은 예 — 시맨틱 HTML -->
<article>
  <h1>SEO 가이드</h1>
  <nav>목차</nav>
  <section>
    <h2>크롤링이란?</h2>
    <p>설명...</p>
  </section>
</article>

<!-- 피해야 할 것 -->
<!-- Java, Silverlight 등 플러그인 필요한 콘텐츠 -->
<!-- Canvas 안에서만 렌더링되는 텍스트 -->
\`\`\`

#### CSS content 속성 주의

\`\`\`css
/* Google이 무시할 수 있음 — 장식용으로만 사용 */
.badge::after {
  content: "NEW";  /* Google이 이 텍스트를 인식하지 못할 수 있음 */
}
\`\`\`

CSS \`content\` 속성으로 추가된 콘텐츠는 Google이 **무시**할 수 있다. 중요한 텍스트는 반드시 **DOM에 직접** 포함하자.

### 색인 가능한 파일 형식

| 가능 | 불가능 |
|------|--------|
| HTML | Canvas 렌더링 텍스트 |
| PDF | 플러그인 기반 콘텐츠 (Java, Silverlight) |
| 이미지 (alt 텍스트) | CSS content 속성 텍스트 |
| 동영상 (메타데이터) | |

## 6. 콘텐츠의 다른 버전 알리기

Google은 사이트의 **여러 버전**(모바일/데스크톱, 다국어 등)을 자동으로 인식하지 못한다. 직접 알려줘야 한다.

### 중복 URL 통합

\`\`\`html
<!-- 정규 URL 지정 -->
<link rel="canonical" href="https://example.com/original-page">
\`\`\`

### 다국어/지역별 버전

\`\`\`html
<link rel="alternate" hreflang="ko" href="https://example.com/ko/page">
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
\`\`\`

## 7. 크롤링/색인 제어

### 접근 제한 4가지 방법

| 방법 | 크롤링 | 색인 | 용도 |
|------|--------|------|------|
| **로그인 제한** | 차단 | 차단 | 회원 전용 콘텐츠 |
| **robots.txt** | 차단 | 차단 안 됨 | 크롤링 리소스 절약 |
| **noindex** | 허용 | 차단 | 검색결과에서 숨기기 |
| **비밀번호 보호** | 차단 | 차단 | 비공개 페이지 |

### 핵심 차이: robots.txt vs noindex

\`\`\`
# robots.txt — 크롤링만 차단, 색인은 막지 못함
# 다른 페이지에서 링크되면 URL이 색인될 수 있음!
User-agent: *
Disallow: /private/
\`\`\`

\`\`\`html
<!-- noindex — 색인 생성 직접 차단 (크롤링은 허용) -->
<meta name="robots" content="noindex">
\`\`\`

> robots.txt는 **검색에서 숨기는 메커니즘이 아니다**. 검색에서 숨기려면 \`noindex\`를 사용하자.

### 규칙 충돌 주의

여러 크롤링/색인 규칙을 함께 사용하면 **충돌**할 수 있다. 예: robots.txt로 차단한 페이지에 noindex를 넣으면 Google이 noindex를 읽을 수 없어 오히려 색인될 수 있다.

## 8. 콘텐츠 미표시 시 디버깅

### 3단계 디버깅 프로세스

1. **URL 검사 도구** — Googlebot이 페이지에 접근 가능한지 확인
2. **robots.txt 테스트** — 의도치 않은 크롤링 차단이 있는지 확인
3. **HTML 메타태그 확인** — \`noindex\` 규칙이 잘못 적용되었는지 검증

## 9. 리치 결과 구현

리치 결과란 검색결과에서 **스타일, 이미지, 상호작용 기능**이 추가된 형태다.

### 구현 방법

**구조화된 데이터 마크업**(JSON-LD)을 추가하면 Google이 페이지를 더 잘 이해하고 리치 결과로 표시할 수 있다:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "김치찌개",
  "description": "정통 한국식 김치찌개 레시피",
  "cookTime": "PT30M",
  "recipeYield": "4인분",
  "image": "https://example.com/kimchi-stew.jpg"
}
</script>
\`\`\`

### 사용 가능한 리치 결과 유형

레시피, 이벤트, 채용 공고, FAQ, HowTo, 제품, 리뷰 등 — Google의 **리치 결과 갤러리**에서 사이트에 맞는 유형을 확인하자.

## 핵심 요약

| 영역 | 핵심 조치 |
|------|----------|
| **크롤링** | \`<a href>\` 링크 사용, 사이트맵 제출, SPA에 고유 URL |
| **JavaScript** | SSR/SSG 권장, JS 제한사항 인지 |
| **콘텐츠** | 텍스트 우선, 시맨틱 HTML, 고유 title + description |
| **버전 관리** | canonical URL, hreflang 태그 |
| **접근 제어** | robots.txt ≠ 검색 숨기기, noindex로 색인 차단 |
| **리치 결과** | JSON-LD 구조화 데이터 마크업 |
| **디버깅** | URL 검사 → robots.txt → noindex 순서로 확인 |
`,
  },
  {
    slug: "google-seo-maintenance-guide",
    title: "웹사이트 SEO 유지관리 심화 가이드 (Google 공식 문서 정리)",
    description:
      "Google 검색 센터의 기술 SEO 심화 가이드 정리. 크롤링/색인 제어, robots.txt, 사이트맵, 리디렉션, 크롤링 예산, 구조화 데이터, Core Web Vitals, 모바일 최적화까지.",
    category: "technical-seo",
    tags: ["Google", "크롤링", "색인", "robots.txt", "사이트맵", "Core Web Vitals"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Google 검색 센터의 기술 SEO 심화 가이드를 정리한 글이다. 이미 기본적인 SEO를 이해하고 있는 상태에서, **크롤링/색인 제어, 사이트 이전, 크롤링 예산 관리, 사용자 환경 최적화** 등 실전 유지관리 전략을 다룬다.

## 1. 크롤링 및 색인 방법 제어

### 기본 전제

먼저 Google의 **크롤링 → 색인 생성 → 게재** 파이프라인을 이해해야 문제 디버깅과 예측이 가능하다.

### 리소스 접근성

Google이 페이지를 제대로 이해하려면:

- 이미지, CSS 등 **모든 리소스에 접근 가능**해야 함
- robots.txt로 차단하면 안 됨
- 익명 사용자(비로그인)도 접근 가능한 상태여야 함

**모니터링 방법:**
- Search Console의 **페이지 색인 생성 보고서** 확인
- **URL 검사 도구**로 Google이 실제로 보는 렌더링 결과 확인

### robots.txt 관리

\`\`\`
# 불필요한 리소스 크롤링 차단 (아이콘, 로고 등)
User-agent: *
Disallow: /assets/icons/

# 중복 콘텐츠 크롤링 방지
Disallow: /duplicate-page/
\`\`\`

> robots.txt를 **색인 생성 방지 수단으로 사용하면 안 된다**. 색인 차단은 \`noindex\` 메타태그나 로그인 요구사항을 사용하자.

### 사이트맵 활용

사이트맵의 역할:
- 중요한 페이지를 Google에 알려주는 **매우 중요한 방법**
- 업데이트 빈도 정보 제공
- 텍스트 미포함 콘텐츠(이미지, 동영상) 크롤링에 필수

사이트맵의 한계:
- Google은 사이트맵에 있는 페이지**만** 크롤링하는 것이 아님
- 우선순위 지정 용도로 활용

**특히 중요한 경우:**
- 빠르게 변경되는 콘텐츠 사이트
- 다른 페이지에서 링크되지 않아 검색되기 어려운 페이지

## 2. 다국적/다국어 사이트 관리

### hreflang 태그

여러 언어 버전의 페이지 간 관계를 명시한다:

\`\`\`html
<link rel="alternate" hreflang="ko" href="https://example.com/ko/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="ja" href="https://example.com/ja/page" />
\`\`\`

### 주의사항

요청 언어에 따라 페이지 콘텐츠를 동적으로 변경하는 경우, **Google 크롤러가 어떤 버전을 보는지** 반드시 확인해야 한다.

## 3. 페이지/사이트 이전 전략

### 리디렉션 종류

| 유형 | 용도 | Google 동작 |
|------|------|-----------|
| **301** (영구) | 페이지를 완전히 이동 | 새 URL을 색인, 신호 전달 |
| **302** (임시) | 일시적 이동 | 원본 URL 계속 크롤링 |

### 404 에러 처리

- 삭제된 페이지는 **실제 404 오류**를 반환해야 함
- **soft 404** (200 상태 코드인데 콘텐츠가 없는 페이지) 반환 금지
- 맞춤 404 페이지로 사용자 경험 개선

### 사이트 전체 이전 시

1. 모든 URL에 **301 리디렉션** 구현
2. **사이트맵** 새 도메인 기준으로 변경
3. Search Console에서 **이전 사실 알림**
4. 신호(링크 가치 등)가 새 도메인으로 전달되도록 설정

## 4. 크롤링 & 색인 생성 권장사항

### 크롤링 가능한 링크

모든 중요 링크를 **일반 하이퍼링크(\`<a href>\`)**로 구현해야 한다. JavaScript로만 동작하는 링크는 크롤러가 따라가지 못할 수 있다.

### rel=nofollow 사용 시점

| 상황 | 이유 |
|------|------|
| 로그인 필요 링크 | 크롤러가 접근 불가 |
| 사용자 제출 콘텐츠 (UGC) | 스팸 방지 |
| 유료 링크 | 링크 품질 신호 차단 |

### 크롤링 예산 관리

수억 개 이상 페이지를 보유한 **대규모 사이트**에서 중요:

- 가장 중요한 페이지를 **사이트맵에 우선 표기**
- robots.txt로 **덜 중요한 페이지** 크롤링 차단
- 불필요한 URL 파라미터 정리

> 소규모 사이트(수천 페이지 이하)에서는 크롤링 예산을 걱정할 필요 없다.

### 페이지네이션 관리

**다중 페이지 문서:**
- 사용자가 클릭할 수 있는 **"다음/이전" 링크 필수**
- 크롤링 가능한 상태 유지

**무한 스크롤:**
- Google이 스크롤 처리에 **어려움**을 겪을 수 있음
- 페이지네이션 버전을 함께 제공 권장

### 상태 변경 URL 차단

다음과 같은 **상태 변경 URL**은 크롤링에서 제외해야 한다:

\`\`\`
# robots.txt
User-agent: *
Disallow: /api/comments/  # 댓글 게시
Disallow: /api/cart/       # 장바구니
Disallow: /api/account/    # 계정 생성
\`\`\`

### HTTPS 전환

- HTTP 사이트는 Chrome에서 **'안전하지 않음'** 표시
- 사용자와 웹마스터 보안 모두 중요
- Google도 HTTPS를 선호

## 5. Google이 사이트를 이해하도록 돕기

### 텍스트 우선 전략

> "페이지 콘텐츠를 이해하는 데 가장 안전한 방법은 텍스트다."

핵심 정보는 반드시 **텍스트**로 제공하자. 그래픽이나 이미지 안에만 있는 텍스트는 Google이 인식하지 못할 수 있다.

### 구조화된 데이터

JSON-LD로 **콘텐츠의 의미**를 명시적으로 전달:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "글 제목",
  "datePublished": "2026-03-18",
  "author": { "@type": "Person", "name": "작성자" }
}
</script>
\`\`\`

활용 가능한 리치 결과: 레시피, 이벤트, 채용 공고, FAQ, HowTo 등

### 도구

- **WYSIWYG 구조화 데이터 마크업 도우미** — 코드 없이 마크업 생성
- **데이터 하이라이터** — 페이지 일부를 강조표시해 의미 명시

## 6. 사용자 환경 관리

### Core Web Vitals

| 메트릭 | 측정 대상 | 좋은 점수 |
|--------|---------|----------|
| **LCP** | 로딩 성능 | ≤ 2.5초 |
| **INP** | 반응성 | ≤ 200ms |
| **CLS** | 시각적 안정성 | ≤ 0.1 |

**측정 도구:**
- **Core Web Vitals 보고서** (Search Console) — 전체 사이트
- **PageSpeed Insights** — 개별 페이지

### 모바일 최적화

- 전 세계 인터넷 인구 **60% 이상이 모바일** 사용
- Google의 기본 크롤러가 **모바일 크롤러**
- 모바일 친화적 설계 필수

## 7. 검색 노출 제어

### 활용 가능한 검색결과 기능

- 리뷰 별점
- 특수 검색결과 유형 (이벤트, 레시피)
- 파비콘 표시
- 문서 날짜 표시

### 스니펫 제어

\`\`\`html
<!-- 스니펫 길이 제한 (최대 150자) -->
<meta name="robots" content="max-snippet:150">

<!-- 스니펫 완전 비활성화 -->
<meta name="robots" content="nosnippet">

<!-- 이미지 미리보기 크기 제한 -->
<meta name="robots" content="max-image-preview:large">
\`\`\`

## 8. 콘텐츠 유형별 가이드라인

| 콘텐츠 유형 | 핵심 사항 |
|------------|----------|
| **동영상** | 동영상 권장사항 준수, 호스팅 동영상 크롤링 설정 |
| **이미지** | 이미지 메타데이터 제공, 필요시 robots.txt로 차단 |
| **아동용** | COPPA 준수, 아동 대상 태그 지정 |
| **성인용** | 성인용 콘텐츠 태그, 세이프서치 필터링 |
| **뉴스** | 뉴스 사이트맵, 구독/페이월 관리, AMP 활용 |

## 필수/권장 체크리스트

### 필수

- [ ] Search Essentials 준수
- [ ] HTTPS 전환 완료
- [ ] robots.txt 적절히 구성
- [ ] 사이트맵 생성 및 제출
- [ ] 모든 리소스에 크롤러 접근 허용
- [ ] 중복 콘텐츠 관리 (canonical)
- [ ] 다국어 사이트면 hreflang 설정

### 권장

- [ ] Core Web Vitals 개선
- [ ] 구조화된 데이터 추가
- [ ] 모바일 최적화
- [ ] 크롤링 예산 관리 (대규모 사이트)
- [ ] Search Console 정기 모니터링
- [ ] 페이지 속도 최적화
- [ ] 스니펫 제어 메타태그 설정
`,
  },
  {
    slug: "do-i-need-seo-google-guide",
    title: "SEO 전문가가 필요한가? (Google 공식 가이드 정리)",
    description:
      "Google 공식 문서 기반으로 SEO 전문가 고용 여부 판단법, 좋은 전문가 선택 기준, 사기성 SEO 업체의 위험 신호를 총정리합니다.",
    category: "analytics",
    tags: ["Google", "SEO", "SEO업체", "스팸정책", "Search Console"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Google 검색 센터의 "검색엔진 최적화가 필요한가요?" 공식 가이드를 한국어로 정리한 글이다. SEO 전문가를 고용해야 하는지, 어떻게 좋은 전문가를 선별하는지, 그리고 **사기성 SEO 업체의 위험 신호**를 다룬다.

> SEO 전문가는 사이트 개선과 시간 절약에 도움이 될 수 있으나, 책임감 없는 업체는 회사 명성에 위험을 초래할 수 있다.

## SEO 전문가가 제공하는 서비스

좋은 SEO 전문가가 일반적으로 하는 일:

- 사이트 콘텐츠 또는 구조 검토
- 호스팅, 리디렉션, 오류 페이지, JavaScript 사용 관련 **기술 조언**
- 콘텐츠 개발
- 온라인 비즈니스 개발 캠페인 관리
- **키워드 리서치**
- SEO 교육
- 특정 시장과 지역 전문 지식 제공

## 직접 시작하기 (소규모 비즈니스)

전문가를 고용하기 전에 스스로 할 수 있는 일부터 하자:

1. **검색 Essentials** 확인 — Google이 요구하는 기본 요구사항
2. **Google 검색 작동 방식** 이해 — 크롤링, 색인 생성, 게재 방식
3. **SEO 기본 가이드** 학습 — 검색엔진 최적화 기능 상세

### 성과까지 걸리는 시간

변경을 시작해서 성과가 나타날 때까지 보통 **4개월에서 1년** 소요된다. 조급해하지 말 것.

## SEO 전문가 선택 5단계

### 1단계: 권장사항 구현 의지 확인

전문가의 조언을 따르는 데 **시간과 노력을 투자할 준비**가 되어 있어야 한다. 조언만 받고 실행하지 않으면 무의미.

### 2단계: 후보 인터뷰

#### 전문가에게 물어봐야 할 질문

| 질문 | 확인 포인트 |
|------|-----------|
| 이전 작업 예시와 성공사례? | **포트폴리오** 검증 |
| Google 검색 Essentials 준수하는가? | **규정 준수** 여부 |
| 자연 검색 보완 마케팅 서비스도 하는가? | **서비스 범위** |
| 어떤 성과를, 언제, 어떻게 측정하는가? | **결과 측정** 방법 |
| 동종 업계 경험이 있는가? | **산업 경험** |
| 해당 지역/국가 경험은? | **지역 전문성** |
| 다중 언어 사이트 경험은? | **다국어 경험** |
| 주요 SEO 기법을 설명해줄 수 있는가? | **기법 투명성** |
| SEO 경력은 얼마나 되는가? | **경력** |
| 변경사항을 어떻게 공유/설명하는가? | **소통 방식** |

#### 전문가가 너에게 물어야 할 질문

좋은 전문가라면 **네 비즈니스를 이해하려고** 노력한다:

- 비즈니스의 고유 가치 제안은?
- 고객 기반은?
- 수익 창출 방식과 검색결과의 역할은?
- 현재 사용 중인 광고 채널은?
- 경쟁업체는?

> 이런 질문을 하지 않는 전문가는 관심이 없는 것이다. 다른 업체를 찾자.

### 3단계: 평판 확인

이전 고객에게 확인:
- 유용한 서비스를 제공했는가?
- 협업이 수월했는가?
- 긍정적인 결과를 달성했는가?

### 4단계: 기술 감사 요청

전문가가 명시해야 할 것:
- **수행할 작업**
- **수행 이유**
- **예상 결과**

> "우리 권장사항대로 하면 검색결과 1위를 차지할 수 있다"고 장담하면 **즉시 다른 업체를 찾자.**

감사 단계에서는 Search Console **읽기 전용** 접근만 제공할 것.

### 5단계: 고용 결정

위 단계를 모두 통과한 전문가만 고용하자.

## 사기성 SEO 업체의 위험 신호

### 1. 섀도 도메인 (Shadow Domain) 사기

고객을 대신한다며 **별도의 도메인을 소유**하는 행위. 관계가 악화되면 도메인을 경쟁사로 리디렉션할 수 있다.

### 2. 도어웨이 페이지 (Doorway Pages)

"다양한 키워드와의 관련성을 높인다"며 **여러 최적화 페이지를 생성**하는 행위:
- 논리적 근거가 없는 주장
- 다른 고객 사이트로의 **숨은 링크** 포함 가능
- 불쾌한 또는 불법 콘텐츠 사이트로 연결될 수 있음

### 3. 불법 링크 구매

다른 사이트의 링크를 구매해 순위를 올리려는 시도. **Google 스팸 정책 위반**으로 처벌 가능.

### 4. 원치 않는 이메일 스팸

"사이트가 주요 검색엔진에 등록되지 않았다"는 주장을 담은 스팸 메일. 무시하면 된다.

## Google이 절대 하지 않는 것들

이런 주장을 하는 업체는 100% 사기다:

| 거짓 주장 | 사실 |
|----------|------|
| "비용을 내면 검색 순위를 높여준다" | Google은 비용을 받고 순위를 올리지 않음 |
| "Google과 특별한 관계가 있다" | 그런 관계는 존재하지 않음 |
| "우선 등록 권한이 있다" | Google에 우선 등록은 없음 |
| "1위 순위를 보장한다" | 아무도 보장할 수 없음 |

> 자연 검색 결과에 게재되는 데에는 **비용이 들지 않는다**.

### Google에 사이트를 제출하는 실제 방법

- **URL 검사 도구** (Search Console)
- **사이트맵 제출** (Search Console)
- **Google Indexing API** (고급 콘텐츠용)

## 절대 피해야 할 체크리스트

이 중 하나라도 해당되면 해당 업체와 즉시 관계를 끊자:

- [ ] 섀도 도메인을 소유하려 함
- [ ] 도어웨이 페이지에 다른 고객으로의 숨은 링크
- [ ] 주소 표시줄 키워드 판매 제안
- [ ] 검색결과와 광고의 구분이 불명확
- [ ] 모호한 긴 키워드 문구로만 순위 보장
- [ ] 여러 별칭 또는 잘못된 WHOIS 정보 사용
- [ ] 허위 검색엔진, 스파이웨어로 트래픽 생성
- [ ] Google 색인에서 도메인이 삭제된 경력
- [ ] 업체 자체가 Google 검색에 미등록

## 광고 vs 자연 검색

Google의 핵심 원칙:

1. **독립성** — 광고 게재는 자연 검색 순위에 **영향 없음**
2. **명확한 구분** — 광고는 명확하게 라벨 표시됨
3. **무료 게재** — 자연 검색 결과 게재에 비용 불필요

### 주의할 부정행위

일부 업체의 수법:
- 광고를 집행하고 **검색결과라고 속이는 행위**
- 실시간 입찰가 조정으로 "순위 제어" 능력을 시뮬레이션
- 검색엔진 순위를 올리지 않으면서 비용 청구

## 핵심 요약

| 원칙 | 설명 |
|------|------|
| **직접 기본기** | SEO 기본 가이드를 먼저 학습하고 직접 시작 |
| **인내심** | 성과까지 4개월~1년, 조급하지 말 것 |
| **철저한 검증** | 포트폴리오, 평판, 기술 감사로 전문가 검증 |
| **위험 신호 감지** | 순위 보장, 특별 관계 주장 = 사기 |
| **독립적 검증** | 전문가 조언을 Google 공식 문서로 대조 확인 |
| **직감 신뢰** | 설명이 명확하지 않으면 피하기 |
`,
  },
  {
    slug: "google-seo-starter-guide",
    title: "Google 공식 SEO 기본 가이드 총정리",
    description:
      "Google 검색 센터의 공식 SEO 기본 가이드를 한국어로 정리. 크롤링 원리, URL 구조, 콘텐츠 작성법, 메타태그, 이미지 최적화, 흔한 SEO 미신까지 총망라.",
    category: "on-page-seo",
    tags: ["Google", "SEO", "검색엔진", "크롤링", "메타태그", "구조화데이터"],
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
    content: `## 개요

Google 검색 센터에서 발행한 공식 SEO 기본 가이드를 한국어로 정리한 글이다. SEO의 기초부터 콘텐츠 전략, 기술적 최적화, 그리고 **무시해야 할 SEO 미신**까지 포괄한다.

> SEO란 검색엔진이 콘텐츠를 이해하도록 돕고, 사용자가 사이트를 찾을 수 있게 하는 실무다.

## 1. Google 검색의 작동 원리

### 자동 크롤링

- Google은 **크롤러**라는 프로그램으로 끊임없이 웹을 탐색한다
- 대부분의 사이트는 웹 크롤링 시 **자동으로 발견**됨
- 변경사항 반영에는 **수 시간 ~ 수 개월** 소요 (보통 몇 주 기다릴 것)

### 색인 여부 확인

\`site:\` 검색 연산자로 인덱싱 상태를 확인할 수 있다:

\`\`\`
site:yourdomain.com
\`\`\`

결과가 나오면 인덱싱된 것, 없으면 아직 크롤링되지 않은 것이다.

### 콘텐츠 발견 경로

1. **링크를 통한 발견** — Google은 이미 크롤링한 페이지의 링크를 따라 새 페이지를 발견
2. **사이트맵 제출** — URL 리스트를 Search Console에 직접 제출

### Google이 페이지를 제대로 보려면

Google이 사용자 브라우저와 **동일한 리소스에 접근**할 수 있어야 한다:
- CSS 파일 접근 차단 금지
- JavaScript 실행 환경 제공
- 숨겨진 리소스가 있으면 페이지를 이해하지 못할 수 있음

> Search Console의 **URL 검사 도구**로 Google이 페이지를 어떻게 보는지 확인 가능

## 2. 사이트 구조화

### 설명적 URL 사용

\`\`\`
# 좋은 URL
https://example.com/pets/cats.html

# 나쁜 URL
https://example.com/2/6772756D707920636174
\`\`\`

URL에 의미 있는 단어를 포함하면 Google이 자동으로 탐색경로(breadcrumb)를 학습한다.

### 디렉토리로 주제 그룹화

\`\`\`
https://example.com/policies/return-policy.html   # 정책: 변경 빈도 낮음
https://example.com/promotions/new-promos.html     # 프로모션: 변경 빈도 높음
\`\`\`

Google은 각 디렉토리를 **서로 다른 빈도로 크롤링**한다. 사이트 규모가 클수록 URL 구조가 더 중요해진다.

### 중복 콘텐츠 처리

같은 콘텐츠가 다른 URL로 접근 가능한 경우:

\`\`\`html
<!-- 정규 URL 지정 -->
<link rel="canonical" href="https://example.com/preferred-url">
\`\`\`

- 선호하지 않는 URL은 **301 리다이렉트**로 처리
- 직접 설정하지 않으면 Google이 자동으로 표준화

> 중복 콘텐츠는 스팸 정책 위반은 아니지만, 크롤링 리소스 낭비를 유발한다.

## 3. 콘텐츠 작성 원칙

### 좋은 콘텐츠의 4가지 속성

| 속성 | 설명 |
|------|------|
| **가독성** | 자연스럽고 잘 작성된 글, 단락과 섹션으로 분할, 적절한 제목 |
| **고유성** | 직접 작성한 원본 콘텐츠, 복사/재해시 금지 |
| **최신성** | 이전 콘텐츠 정기 검토, 필요시 업데이트, 구식 콘텐츠 제거 |
| **신뢰성** | 출처 명시, 전문성/경험 기반, 독자 신뢰 구축 |

### 검색 의도 예측

사용자는 같은 주제를 **다른 검색어**로 찾을 수 있다:
- 전문가: "샤퀴테리" 검색
- 초보자: "가공육" 검색

다양한 검색 행동을 예상하고 청중 중심으로 콘텐츠를 작성하자. Google의 언어 일치 시스템이 정교해서 정확한 표현이 아니어도 관련성을 파악한다.

### 링크 텍스트 (앵커 텍스트) 작성법

링크 텍스트는 사용자와 Google 모두에게 **링크된 페이지가 어떤 페이지인지** 알려준다.

\`\`\`html
<!-- 나쁜 예 -->
<a href="/guide">여기를 클릭하세요</a>

<!-- 좋은 예 -->
<a href="/guide">SEO 기본 가이드</a>
\`\`\`

### 신뢰할 수 없는 외부 링크

\`\`\`html
<a href="..." rel="nofollow">불신뢰 콘텐츠</a>
\`\`\`

\`nofollow\`를 추가하면 Google 순위에 부정적 영향을 방지할 수 있다. 사용자 생성 콘텐츠(댓글, 포럼)의 링크에는 자동으로 \`nofollow\`를 추가하는 것이 좋다.

## 4. 검색 결과 시각화

### 제목 링크 (Title)

\`\`\`html
<title>런던 스포츠 신발 판매점 - FitRunners</title>
\`\`\`

- 명확하고 간결하게 페이지 콘텐츠를 정확히 설명
- **페이지별 고유**한 제목 작성
- 비즈니스명, 위치, 서비스 등 포함 가능

### 메타 설명 (Description)

\`\`\`html
<meta name="description"
      content="완벽한 계란 요리 가이드. 서니사이드업, 삶기, 수란 등 모든 방식을 다룹니다.">
\`\`\`

- 짧고 간결한 한두 문장
- 각 페이지에 고유한 설명
- 가장 관련성 높은 정보 포함

## 5. 이미지 최적화

### 핵심 원칙

- **고화질 이미지** 사용
- **관련 텍스트 근처**에 배치 (Google이 이미지 맥락을 이해하는 데 도움)
- 많은 사용자가 이미지 검색으로 사이트를 처음 발견

### Alt 텍스트

\`\`\`html
<img src="tart.jpg" alt="딸기가 가득한 신선한 과일 타르트">
\`\`\`

- 이미지와 콘텐츠 간의 관계를 설명
- "이미지"라는 단어 반복 금지
- 키워드를 자연스럽게 포함
- 장식용 이미지는 \`alt=""\`

## 6. 동영상 최적화

- 고화질 동영상을 **독립형 페이지**에 삽입
- 동영상 근처에 **관련 텍스트** 배치
- 명확한 제목과 설명 작성
- 동영상 중심 사이트라면: 구조화 데이터 마크업 + 동영상 사이트맵 + 트랜스크립션 제공

## 7. 웹사이트 홍보

### 효과적인 홍보 방법

1. **소셜 미디어** — 주요 플랫폼 공유, 커뮤니티 참여
2. **커뮤니티 활동** — 관련 포럼/그룹에서 신뢰 구축
3. **입소문** — 가장 효과적이고 지속적인 방법
4. **오프라인** — 명함, 서신, 포스터에 URL 표기

### 주의사항

과도한 홍보는 역효과. 일부 관행은 **검색 결과 조작으로 인식**될 수 있다.

## 8. 무시해야 할 SEO 미신 11가지

Google이 공식적으로 "이건 신경 쓰지 마라"고 밝힌 항목들이다.

### 1) 메타 키워드 태그

\`\`\`html
<!-- Google은 이 태그를 완전히 무시한다 -->
<meta name="keywords" content="고양이, 반려동물">
\`\`\`

### 2) 키워드 반복 (Keyword Stuffing)

같은 단어를 과도하게 반복하면 **스팸 정책 위반**이다.

\`\`\`
# 나쁜 예
고양이 사료, 고양이 건강, 고양이 영양, 고양이 행복...

# 좋은 예
고양이를 위한 완벽한 영양식. 건강하고 행복한 반려묘 돌보기.
\`\`\`

### 3) 도메인명의 키워드

도메인에 키워드를 넣어도 순위에 **미미한 영향**. 비즈니스 정체성에 맞는 이름을 선택하자.

### 4) TLD(도메인 확장자) 차이

\`.com\`이 \`.guru\`보다 낫다? **아니다.** Google은 TLD를 순위에 고려하지 않는다. 단, 지역 타겟팅 시 국가 도메인(\`.kr\`, \`.ch\`)은 도움이 될 수 있다.

### 5) 콘텐츠 길이

최소/최대 단어 수 기준은 **없다**. 콘텐츠 길이 자체는 순위 결정과 무관하다.

### 6) 하위 도메인 vs 하위 디렉토리

\`blog.example.com\` vs \`example.com/blog/\` — SEO 관점에서 **차이 없음**. 비즈니스에 맞는 방식을 선택하면 된다.

### 7) PageRank 집착

PageRank는 Google의 수많은 순위 결정 신호 중 **하나일 뿐**이다. 링크 외에도 훨씬 많은 요소가 존재한다.

### 8) 중복 콘텐츠 '페널티'

중복 콘텐츠에 대한 **직접적인 페널티는 없다**. 비효율적이긴 하지만 조치가 부과되지는 않는다. (단, 표절은 별개 문제)

### 9) 제목 태그(h1~h6) 순서

\`h1 → h2 → h3\` 순서를 반드시 지킬 필요 없다. Google은 HTML 사양의 **의미론적 순서에 의존하지 않는다**. (접근성을 위해선 지키는 게 좋음)

### 10) 이상적인 제목 개수

페이지당 정해진 제목 개수는 없다. "너무 많다고 느끼면, 그럴 가능성이 높다."

### 11) E-E-A-T가 직접적인 순위 신호?

Google의 답변: **"아니요."** E-E-A-T(전문성, 경험, 권위, 신뢰)는 콘텐츠 품질 평가의 맥락 요소이지, 직접적인 순위 결정 요소가 아니다.

## 9. 모니터링 & 분석

### Search Console 활용

- Google 검색 성과 모니터링
- 인덱싱 상태 확인
- 순위 추적 & 문제 해결
- 사이트맵 제출

### 트래픽 감소 진단

1. Search Console에서 문제 확인
2. 트래픽 하락 시점 파악
3. 기술적 오류 검토
4. 콘텐츠 변경 사항 확인
5. 알고리즘 업데이트 여부 확인

## 핵심 요약: SEO 10대 원칙

| 원칙 | 설명 |
|------|------|
| **사용자 중심** | 검색엔진이 아닌 사용자를 위해 설계 |
| **명확한 구조** | 설명적 URL + 논리적 디렉토리 |
| **고유 콘텐츠** | 직접 작성한 원본, 복사/재해시 금지 |
| **관련 링크** | 의미 있는 앵커 텍스트 + 신뢰할 수 있는 리소스 |
| **미디어 최적화** | 고화질 이미지/동영상 + alt 텍스트 |
| **기술적 접근성** | CSS/JS 등 모든 리소스에 크롤러 접근 허용 |
| **모바일 최적화** | 반응형 디자인 + 빠른 로딩 |
| **신뢰성** | 전문성, 경험, 출처 명시 |
| **정기 갱신** | 콘텐츠 최신성 유지, 구식 콘텐츠 제거 |
| **모니터링** | Search Console로 지속적 추적 |

## 유용한 도구

| 도구 | URL |
|------|-----|
| Google Search Console | search.google.com/search-console |
| 리치 검색결과 테스트 | search.google.com/test/rich-results |
| PageSpeed Insights | pagespeed.web.dev |
| Google 검색 센터 블로그 | developers.google.com/search/blog |
`,
  },
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

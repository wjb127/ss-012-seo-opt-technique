# PRD: SEO 최적화 노하우 웹사이트

## 개요
SEO 최적화 실전 노하우를 체계적으로 정리한 개인용 지식 베이스 웹사이트.
DB 없이 하드코딩 방식으로 콘텐츠를 관리하며, AI(Claude)에게 명령하여 콘텐츠를 추가/수정하는 워크플로우.

## 기술 스택
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Vercel 배포
- DB 없음 — 모든 콘텐츠는 소스코드에 하드코딩

## 핵심 원칙
- **간단한 아키텍처**: 최소한의 구조, 불필요한 추상화 없음
- **콘텐츠 중심**: 읽기 쉽고 찾기 쉬운 구조
- **SEO 실천**: 이 사이트 자체가 SEO 모범 사례를 따름 (독 트리트먼트)

## 콘텐츠 관리 방식
1. 노하우 데이터는 `src/data/` 디렉토리에 TypeScript 파일로 관리
2. 각 글(article)은 타입이 정해진 객체 배열로 저장
3. 콘텐츠 추가/수정은 Claude에게 명령 → Claude가 data 파일 수정 → 커밋

```
예시 흐름:
사용자: "구조화된 데이터 마크업에 대한 노하우 추가해줘"
Claude: src/data/articles.ts에 새 article 객체 추가 → 빌드 확인 → 커밋
```

## 데이터 구조

```typescript
// src/data/articles.ts
interface Article {
  slug: string;           // URL용 슬러그
  title: string;          // 글 제목
  description: string;    // 메타 디스크립션 / 요약
  category: Category;     // 카테고리
  tags: string[];         // 태그
  content: string;        // 마크다운 본문
  createdAt: string;      // 작성일 (YYYY-MM-DD)
  updatedAt: string;      // 수정일 (YYYY-MM-DD)
}

type Category =
  | "technical-seo"      // 테크니컬 SEO (사이트맵, robots, 크롤링 등)
  | "on-page-seo"        // 온페이지 SEO (메타태그, 콘텐츠, 키워드 등)
  | "structured-data"    // 구조화된 데이터 (JSON-LD, 스키마 마크업)
  | "performance"        // 성능 최적화 (Core Web Vitals, 로딩 등)
  | "nextjs-seo"         // Next.js 특화 SEO
  | "search-console"     // 서치콘솔 활용법
  | "local-seo"          // 로컬 SEO (네이버, 카카오 등)
  | "link-building"      // 링크 빌딩
  | "analytics"          // 분석 & 측정
```

## 페이지 구조

```
/                       → 홈 (소개 + 최신 글 목록)
/articles               → 전체 글 목록 (카테고리 필터)
/articles/[slug]        → 개별 글 상세
/categories/[category]  → 카테고리별 글 목록
```

총 4개 라우트. 최소한의 구조.

## 페이지별 상세

### 홈 (`/`)
- 사이트 제목 + 한 줄 소개
- 카테고리 목록 (글 수 표시)
- 최신 글 목록 (최근 10개)

### 글 목록 (`/articles`)
- 전체 글 카드 리스트
- 카테고리 필터 (탭 또는 버튼)
- 태그 클릭 시 해당 태그 글만 필터

### 글 상세 (`/articles/[slug]`)
- 마크다운 렌더링 (코드 하이라이팅 포함)
- 목차(TOC) 자동 생성
- 이전/다음 글 네비게이션
- 관련 글 추천 (같은 카테고리)

### 카테고리 (`/categories/[category]`)
- 해당 카테고리 설명
- 소속 글 목록

## SEO 적용 사항 (이 사이트 자체에)
- `sitemap.ts` — 동적 사이트맵 생성
- `robots.ts` — robots.txt
- 각 페이지 `metadata` export (title, description, openGraph)
- OG 이미지 1200x630
- JSON-LD 구조화 데이터 (Article, BreadcrumbList, WebSite)
- 시맨틱 HTML (`article`, `nav`, `main`, `header`, `footer`)
- 파비콘 PNG (솔리드 배경)

## 디자인
- 미니멀, 깔끔한 블로그 스타일
- 다크/라이트 모드 지원
- 모바일 퍼스트 반응형
- 코드 블록 하이라이팅 (SEO 관련 코드 예시가 많으므로)

## 디렉토리 구조 (예상)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 홈
│   ├── articles/
│   │   ├── page.tsx                # 글 목록
│   │   └── [slug]/
│   │       └── page.tsx            # 글 상세
│   ├── categories/
│   │   └── [category]/
│   │       └── page.tsx            # 카테고리별 목록
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ArticleCard.tsx
│   ├── CategoryFilter.tsx
│   ├── TableOfContents.tsx
│   └── MarkdownRenderer.tsx
├── data/
│   ├── articles.ts                 # 글 데이터
│   └── categories.ts               # 카테고리 메타 정보
├── lib/
│   └── articles.ts                 # 데이터 조회 유틸
└── types/
    └── index.ts                    # 타입 정의
```

## 외부 패키지 (최소한)
- `react-markdown` + `remark-gfm` — 마크다운 렌더링
- `rehype-highlight` 또는 `shiki` — 코드 하이라이팅
- `rehype-slug` + `rehype-autolink-headings` — 목차용 헤딩 ID

## 향후 확장 가능성 (지금은 안 함)
- 검색 기능
- RSS 피드
- 조회수 트래킹
- 댓글

## 마일스톤
1. **v0.1** — 프로젝트 세팅 + 기본 레이아웃 + 빈 데이터 구조
2. **v0.2** — 4개 페이지 구현 + 마크다운 렌더링
3. **v0.3** — SEO 메타데이터 + 사이트맵 + JSON-LD
4. **v0.4** — 디자인 다듬기 + 다크모드
5. **배포** — Vercel 배포 + 도메인 연결
6. **콘텐츠** — 노하우 글 추가 시작

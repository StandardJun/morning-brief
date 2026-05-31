# 생각하는 아침 — 데일리 큐레이션 리더

매일 아침, 일곱 갈래의 글 한 묶음을 차분하게 읽는 개인용 리더 사이트.
GitHub 레포에 매일 7개의 마크다운 글이 추가되면, 사이트는 이를 카드 피드로 보여준다.
Medium · Read.cv 같은 집중력 있는 리딩 경험을 목표로 한다.

## 기술 스택

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography` (본문 prose 스타일)
- **gray-matter** (프론트매터 파싱)
- **unified** 파이프라인: `remark-parse → remark-gfm → remark-rehype → rehype-slug → rehype-highlight → rehype-stringify`
- **next-themes** (다크/라이트 모드)
- **date-fns** (한국어 로케일 날짜 포매팅)

> **설계 메모 — 마크다운 파이프라인:** 사양의 `remark-html`은 rehype 계열 플러그인(코드 신택스 하이라이팅)을 붙일 수 없어, 동일 결과(HTML 문자열)를 내면서 하이라이팅까지 한 파이프라인에 담는 `unified`를 직접 구성했다. 변환은 빌드 타임([lib/markdown.ts](lib/markdown.ts))에만 실행된다.
>
> **설계 메모 — 폰트:** `next/font`의 CJK 폰트는 빌드 시 거대한 폰트 파일을 받아오고 `korean` subset preload 경고가 잦다. 대신 Google Fonts `<link>`로 런타임 로드하고 CSS 변수로 연결했다([app/layout.tsx](app/layout.tsx)). 빌드가 네트워크에 의존하지 않으며, 폰트 로드 실패·오프라인 시 system serif/sans로 폴백된다.

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

프로덕션 빌드 확인:

```bash
npm run build
npm run start
```

## Vercel 배포

별도 설정 없이 동작한다. 환경 변수도 필요 없다(콘텐츠는 전부 빌드 타임에 정적 생성).

1. 이 레포를 GitHub에 푸시한다.
2. [vercel.com](https://vercel.com)에서 **New Project → 레포 선택**.
3. Framework는 자동으로 **Next.js**로 감지된다. 그대로 **Deploy**.

이후 `content/posts/`에 새 글이 푸시될 때마다 Vercel이 자동으로 재빌드·배포한다.

## 콘텐츠 추가 방법

### 디렉토리 구조

```
content/posts/
  YYYY-MM-DD/
    01-issue.md
    02-economy.md
    03-tech.md
    04-science.md
    05-concept.md
    06-book.md
    07-essay.md
```

날짜 폴더 하나에 7개 파일. 카테고리는 고정 7종이다.

| order | category | label        | emoji |
| ----- | -------- | ------------ | ----- |
| 1     | issue    | 오늘의 이슈   | 📰    |
| 2     | economy  | 경제 인사이트 | 💰    |
| 3     | tech     | 기술/산업     | 🔧    |
| 4     | science  | 과학          | 🔬    |
| 5     | concept  | 개념/철학     | 🧠    |
| 6     | book     | 책 한 권      | 📚    |
| 7     | essay    | 에세이        | ✍️    |

- 파일명에서 `.md`를 뗀 것이 글 URL의 slug가 된다(예: `04-science` → `/2026-05-28/04-science`).
- 7개를 다 채울 필요는 없다. 폴더 안의 `.md` 파일을 `order` 순으로 자동 배치한다.

### 자동 추가 (Claude Code Routine 등)

매일 정해진 시각에 글을 생성해 레포에 커밋하는 루틴을 붙이면 된다. 루틴은 다음만 지키면 된다.

1. `content/posts/<오늘 날짜>/` 폴더 생성
2. 아래 스키마에 맞는 `.md` 파일 작성
3. 커밋 & 푸시 → Vercel 자동 재배포

### 수동 추가

해당 날짜 폴더에 `.md` 파일을 추가하고 푸시하면 끝.

### 프론트매터 스키마

각 `.md` 파일은 다음 YAML 프론트매터로 시작한다.

```yaml
---
title: "보이지 않는 우주의 95%를 처음 본 사람"
date: "2026-05-28"        # ISO YYYY-MM-DD, 폴더명과 일치시킬 것
category: "science"       # issue | economy | tech | science | concept | book | essay
order: 4                  # 1-7, 피드 정렬 순서
readingTime: 11           # 분. 생략하면 본문 길이로 대략 추정
summary: "한 줄 요약 — 카드와 글 상단에 표시된다."
tags: ["천문학", "암흑물질"] # 선택
---
```

프론트매터 아래에는 일반 마크다운 본문을 쓴다. GFM(표·체크박스 등), 코드 블록 신택스 하이라이팅, 인용구·이미지 스타일이 모두 지원된다.

타입 정의는 [lib/posts.ts](lib/posts.ts)의 `PostFrontmatter` 참조.

## 라우트

| 경로               | 내용                                |
| ------------------ | ----------------------------------- |
| `/`                | 가장 최근 날짜의 7개 카드 피드       |
| `/[date]`          | 특정 날짜 피드 (예: `/2026-05-28`)   |
| `/[date]/[slug]`   | 개별 글 (예: `/2026-05-28/04-science`) |
| `/archive`         | 전체 날짜 목록                       |

모든 경로는 `generateStaticParams`로 빌드 타임에 정적 생성된다.

## 프로젝트 구조

```
app/
  layout.tsx              # 폰트·테마·메타데이터·매니페스트
  globals.css             # Tailwind + 코드블록/prose 커스텀
  page.tsx                # 홈 (최신 날짜 피드)
  [date]/page.tsx         # 날짜 피드
  [date]/[slug]/page.tsx  # 개별 글 (마크다운 → HTML)
  archive/page.tsx        # 아카이브
  not-found.tsx
components/
  DateFeed.tsx            # 홈·날짜 페이지가 공유하는 피드 뷰
  PostCard.tsx, CategoryBadge.tsx, Header.tsx
  ThemeProvider.tsx, ThemeToggle.tsx
lib/
  posts.ts                # 파일시스템 읽기 (getAllDates, getPostsByDate, getPost ...)
  markdown.ts             # unified 마크다운 → HTML
  categories.ts           # 카테고리 메타·배지 색상
  format.ts               # 한국어 날짜 포매팅
content/posts/<date>/*.md # 콘텐츠
public/
  manifest.json, icon.svg, icon-192.png, icon-512.png   # PWA
```

## 디자인 결정

- **모바일 우선.** 본문 max-width 680px, line-height 1.8.
- **따뜻한 어둠.** 다크 모드 배경은 순흑이 아닌 `#111`.
- **본문 세리프 / UI 산세리프.** Noto Serif KR · Noto Sans KR.
- **테마.** 기본은 시스템 설정을 따르고, 토글로 수동 변경 가능.
- **PWA.** `manifest.json` + 아이콘으로 "홈 화면에 추가" 지원.

## 의도적으로 넣지 않은 것

댓글 · 좋아요 · 검색 · 사용자 인증 · CMS · 애널리틱스.
날짜 기반 네비게이션만으로 충분하도록 설계했다.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category } from "./categories";

export interface PostFrontmatter {
  title: string;
  date: string; // ISO YYYY-MM-DD
  category: Category;
  order: number; // 1-7
  readingTime: number; // 분
  summary: string;
  tags?: string[];
}

export interface Post extends PostFrontmatter {
  /** 파일명에서 .md를 뗀 것. 예: "04-science" */
  slug: string;
  /** 마크다운 본문 (프론트매터 제외) */
  content: string;
}

export type PostMeta = Omit<Post, "content">;

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** content/posts 안의 모든 날짜 폴더를 최신순(내림차순)으로 반환 */
export function getAllDates(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && DATE_RE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => b.localeCompare(a));
}

/** 가장 최근 날짜. 콘텐츠가 없으면 null */
export function getLatestDate(): string | null {
  return getAllDates()[0] ?? null;
}

function readRawPost(date: string, fileName: string): Post | null {
  const fullPath = path.join(POSTS_DIR, date, fileName);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.md$/, "");

  const fm = data as Partial<PostFrontmatter>;

  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? date,
    category: (fm.category ?? "essay") as Category,
    order: fm.order ?? 99,
    readingTime: fm.readingTime ?? estimateReadingTime(content),
    summary: fm.summary ?? "",
    tags: fm.tags ?? [],
    content,
  };
}

/** 특정 날짜의 모든 글을 order 오름차순으로 반환 */
export function getPostsByDate(date: string): Post[] {
  const dir = path.join(POSTS_DIR, date);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readRawPost(date, f))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => a.order - b.order);
}

/** 날짜의 메타데이터만 (본문 제외) — 카드 리스트용 */
export function getPostMetasByDate(date: string): PostMeta[] {
  return getPostsByDate(date).map(({ content: _content, ...meta }) => meta);
}

/** 개별 글 */
export function getPost(date: string, slug: string): Post | null {
  return readRawPost(date, `${slug}.md`);
}

/** 이전/다음(더 과거 / 더 미래) 날짜 — 글 페이지의 날짜 네비용 */
export function getAdjacentDates(date: string): {
  prev: string | null;
  next: string | null;
} {
  const dates = getAllDates(); // 내림차순
  const i = dates.indexOf(date);
  if (i === -1) return { prev: null, next: null };
  return {
    next: dates[i - 1] ?? null, // 더 최신
    prev: dates[i + 1] ?? null, // 더 과거
  };
}

/** 프론트매터에 readingTime이 없을 때의 대략 추정 (한국어 ~500자/분) */
function estimateReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}

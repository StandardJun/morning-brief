import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllDates,
  getPostsByDate,
  getPost,
  getPostMetasByDate,
  getAdjacentDates,
} from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { formatKoreanDate, formatKoreanDateShort } from "@/lib/format";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PostCard } from "@/components/PostCard";
import { ThemeToggle } from "@/components/ThemeToggle";

export function generateStaticParams() {
  return getAllDates().flatMap((date) =>
    getPostsByDate(date).map((post) => ({ date, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}): Promise<Metadata> {
  const { date, slug } = await params;
  const post = getPost(date, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}) {
  const { date, slug } = await params;
  const post = getPost(date, slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);
  const others = getPostMetasByDate(date).filter((p) => p.slug !== slug);
  const { prev, next } = getAdjacentDates(date);

  return (
    <div className="min-h-dvh">
      {/* 상단 바: 뒤로 가기 + 테마 토글 */}
      <div className="mx-auto flex max-w-reading items-center justify-between px-5 py-4">
        <Link
          href={`/${date}`}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-stone-500 transition-colors hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-100"
        >
          ← 그날의 글
        </Link>
        <ThemeToggle />
      </div>

      <main className="mx-auto max-w-reading px-5 pb-24">
        <article>
          {/* 글 메타 */}
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <CategoryBadge category={post.category} size="md" />
            <span className="text-sm text-stone-400 dark:text-stone-500">
              {formatKoreanDate(post.date)} · {post.readingTime}분
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
            {post.title}
          </h1>

          {post.summary && (
            <p className="mt-4 font-serif text-lg leading-relaxed text-stone-500 dark:text-stone-400">
              {post.summary}
            </p>
          )}

          <hr className="my-8 border-stone-200 dark:border-stone-800" />

          {/* 본문 */}
          <div
            className="prose prose-stone prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-500 dark:bg-stone-800/60 dark:text-stone-400"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* 오늘의 다른 글 */}
        {others.length > 0 && (
          <section className="mt-16 border-t border-stone-200 pt-10 dark:border-stone-800">
            <h2 className="mb-5 font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
              오늘의 다른 글
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* 어제 / 내일 */}
        <nav className="mt-12 flex items-center justify-between border-t border-stone-200 pt-6 text-sm dark:border-stone-800">
          {prev ? (
            <Link
              href={`/${prev}`}
              className="text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            >
              ← {formatKoreanDateShort(prev)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${next}`}
              className="text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            >
              {formatKoreanDateShort(next)} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </div>
  );
}

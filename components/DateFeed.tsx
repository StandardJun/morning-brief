import Link from "next/link";
import { getPostMetasByDate, getAdjacentDates } from "@/lib/posts";
import { formatKoreanDate, formatKoreanDateShort } from "@/lib/format";
import { Header } from "./Header";
import { PostCard } from "./PostCard";

/** 한 날짜의 7개 카드 피드. 홈(/)과 /[date]가 공유한다. */
export function DateFeed({ date }: { date: string }) {
  const posts = getPostMetasByDate(date);
  const { prev, next } = getAdjacentDates(date);

  return (
    <div className="min-h-dvh">
      <Header subtitle={formatKoreanDate(date)} />

      <main className="mx-auto max-w-reading px-5 pb-20">
        {posts.length === 0 ? (
          <p className="py-20 text-center text-stone-400">
            이 날짜에는 아직 글이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* 날짜 네비게이션 */}
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

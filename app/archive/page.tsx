import Link from "next/link";
import type { Metadata } from "next";
import { getAllDates, getPostMetasByDate } from "@/lib/posts";
import { formatKoreanDate } from "@/lib/format";
import { Header } from "@/components/Header";
import { getCategoryMeta } from "@/lib/categories";

export const metadata: Metadata = {
  title: "아카이브",
};

export default function ArchivePage() {
  const dates = getAllDates();

  return (
    <div className="min-h-dvh">
      <Header subtitle="아카이브" />

      <main className="mx-auto max-w-reading px-5 pb-20">
        {dates.length === 0 ? (
          <p className="py-20 text-center text-stone-400">
            아직 글이 없습니다.
          </p>
        ) : (
          <div className="space-y-10">
            {dates.map((date) => {
              const posts = getPostMetasByDate(date);
              return (
                <section key={date}>
                  <Link
                    href={`/${date}`}
                    className="font-serif text-lg font-semibold text-stone-900 transition-colors hover:text-stone-500 dark:text-stone-100 dark:hover:text-stone-400"
                  >
                    {formatKoreanDate(date)}
                  </Link>
                  <ul className="mt-3 divide-y divide-stone-200/70 dark:divide-stone-800/70">
                    {posts.map((post) => {
                      const meta = getCategoryMeta(post.category);
                      return (
                        <li key={post.slug}>
                          <Link
                            href={`/${date}/${post.slug}`}
                            className="group flex items-baseline gap-3 py-2.5"
                          >
                            <span
                              aria-hidden
                              className="w-5 shrink-0 text-center text-sm"
                            >
                              {meta.emoji}
                            </span>
                            <span className="text-[15px] text-stone-700 transition-colors group-hover:text-stone-950 dark:text-stone-300 dark:group-hover:text-white">
                              {post.title}
                            </span>
                            <span className="ml-auto shrink-0 text-xs text-stone-400 dark:text-stone-500">
                              {post.readingTime}분
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

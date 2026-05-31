import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/${post.date}/${post.slug}`}
      className="group block rounded-2xl border border-stone-200/80 bg-white/60 p-5 transition-all hover:border-stone-300 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700 sm:p-6"
    >
      <div className="mb-3">
        <CategoryBadge category={post.category} />
      </div>

      <h2 className="font-serif text-xl font-semibold leading-snug tracking-tight text-stone-900 transition-colors group-hover:text-stone-600 dark:text-stone-100 dark:group-hover:text-stone-300 sm:text-2xl">
        {post.title}
      </h2>

      {post.summary && (
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
          {post.summary}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500">
        <span>{post.readingTime}분</span>
        {post.tags && post.tags.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <span className="truncate">
              {post.tags.map((t) => `#${t}`).join("  ")}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}

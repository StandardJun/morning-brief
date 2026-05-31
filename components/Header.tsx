import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

/**
 * 사이트 공통 헤더.
 * @param subtitle 사이트명 아래 작게 표시할 텍스트(보통 한국어 날짜). 없으면 생략.
 */
export function Header({ subtitle }: { subtitle?: string }) {
  return (
    <header className="mx-auto flex max-w-reading items-center justify-between px-5 py-5 sm:py-7">
      <div>
        <Link
          href="/"
          className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100"
        >
          생각하는 아침
        </Link>
        {subtitle && (
          <p className="mt-0.5 text-[13px] text-stone-400 dark:text-stone-500">
            {subtitle}
          </p>
        )}
      </div>

      <nav className="flex items-center gap-1">
        <Link
          href="/archive"
          className="rounded-full px-3 py-1.5 text-sm text-stone-500 transition-colors hover:bg-stone-200/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-100"
        >
          아카이브
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

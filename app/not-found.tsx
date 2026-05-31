import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto max-w-reading px-5 py-24 text-center">
        <p className="font-serif text-2xl font-semibold text-stone-800 dark:text-stone-200">
          찾는 글이 없습니다
        </p>
        <p className="mt-2 text-stone-400">
          날짜가 잘못되었거나 아직 올라오지 않은 글이에요.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-stone-900 px-5 py-2 text-sm text-white transition-colors hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
        >
          오늘의 글로
        </Link>
      </main>
    </div>
  );
}

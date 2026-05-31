import Link from "next/link";
import { getLatestDate } from "@/lib/posts";
import { DateFeed } from "@/components/DateFeed";
import { Header } from "@/components/Header";

export default function HomePage() {
  const latest = getLatestDate();

  if (!latest) {
    return (
      <div className="min-h-dvh">
        <Header />
        <main className="mx-auto max-w-reading px-5 py-24 text-center">
          <p className="text-stone-400">
            아직 글이 없습니다. <code>content/posts/</code>에 날짜 폴더를
            추가해 보세요.
          </p>
          <Link
            href="/archive"
            className="mt-4 inline-block text-sm text-stone-500 underline underline-offset-2"
          >
            아카이브 보기
          </Link>
        </main>
      </div>
    );
  }

  return <DateFeed date={latest} />;
}

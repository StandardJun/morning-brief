import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllDates, getPostMetasByDate } from "@/lib/posts";
import { formatKoreanDate } from "@/lib/format";
import { DateFeed } from "@/components/DateFeed";

export function generateStaticParams() {
  return getAllDates().map((date) => ({ date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  return { title: formatKoreanDate(date) };
}

export default async function DatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  if (getPostMetasByDate(date).length === 0) {
    notFound();
  }

  return <DateFeed date={date} />;
}

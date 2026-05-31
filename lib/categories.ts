export type Category =
  | "issue"
  | "economy"
  | "tech"
  | "science"
  | "concept"
  | "book"
  | "essay";

export interface CategoryMeta {
  category: Category;
  label: string;
  emoji: string;
  order: number;
  /** 배지 색상 — 라이트/다크 모두에서 너무 튀지 않도록 톤 다운 */
  badge: string;
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  issue: {
    category: "issue",
    label: "오늘의 이슈",
    emoji: "📰",
    order: 1,
    badge:
      "text-red-700 bg-red-50 ring-red-600/20 dark:text-red-300 dark:bg-red-950/40 dark:ring-red-400/20",
  },
  economy: {
    category: "economy",
    label: "경제 인사이트",
    emoji: "💰",
    order: 2,
    badge:
      "text-amber-700 bg-amber-50 ring-amber-600/20 dark:text-amber-300 dark:bg-amber-950/40 dark:ring-amber-400/20",
  },
  tech: {
    category: "tech",
    label: "기술/산업",
    emoji: "🔧",
    order: 3,
    badge:
      "text-blue-700 bg-blue-50 ring-blue-600/20 dark:text-blue-300 dark:bg-blue-950/40 dark:ring-blue-400/20",
  },
  science: {
    category: "science",
    label: "과학",
    emoji: "🔬",
    order: 4,
    badge:
      "text-emerald-700 bg-emerald-50 ring-emerald-600/20 dark:text-emerald-300 dark:bg-emerald-950/40 dark:ring-emerald-400/20",
  },
  concept: {
    category: "concept",
    label: "개념/철학",
    emoji: "🧠",
    order: 5,
    badge:
      "text-violet-700 bg-violet-50 ring-violet-600/20 dark:text-violet-300 dark:bg-violet-950/40 dark:ring-violet-400/20",
  },
  book: {
    category: "book",
    label: "책 한 권",
    emoji: "📚",
    order: 6,
    badge:
      "text-orange-700 bg-orange-50 ring-orange-600/20 dark:text-orange-300 dark:bg-orange-950/40 dark:ring-orange-400/20",
  },
  essay: {
    category: "essay",
    label: "에세이",
    emoji: "✍️",
    order: 7,
    badge:
      "text-stone-700 bg-stone-100 ring-stone-500/20 dark:text-stone-300 dark:bg-stone-800/60 dark:ring-stone-400/20",
  },
};

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    CATEGORIES[category as Category] ?? {
      category: "essay",
      label: category,
      emoji: "•",
      order: 99,
      badge:
        "text-stone-700 bg-stone-100 ring-stone-500/20 dark:text-stone-300 dark:bg-stone-800/60 dark:ring-stone-400/20",
    }
  );
}

import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

/** "2026-05-28" → "2026년 5월 28일 (목)" */
export function formatKoreanDate(isoDate: string): string {
  return format(parseISO(isoDate), "yyyy년 M월 d일 (eee)", { locale: ko });
}

/** "2026-05-28" → "5월 28일 (목)" — 더 짧은 표기 */
export function formatKoreanDateShort(isoDate: string): string {
  return format(parseISO(isoDate), "M월 d일 (eee)", { locale: ko });
}

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

/**
 * 마크다운 본문 → HTML 문자열.
 *
 * remark-html 단독으로는 rehype 계열 플러그인(신택스 하이라이팅)을 붙일 수
 * 없어, unified 파이프라인을 직접 구성한다:
 *   parse → gfm → rehype 변환 → heading id → 코드 하이라이팅 → stringify
 *
 * 빌드 타임(정적 생성)에만 호출되므로 비용은 문제되지 않는다.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 콘텐츠는 모두 빌드 타임에 정적 생성된다. 마크다운 변환은
  // 서버 컴포넌트(lib/markdown.ts)에서 unified 파이프라인으로 처리하므로
  // 별도의 webpack/loader 설정이 필요 없다.
  reactStrictMode: true,
};

export default nextConfig;

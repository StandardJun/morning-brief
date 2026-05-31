import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // next/font가 주입하는 CSS 변수에 연결
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // 따뜻한 어둠 — 순흑 대신
        ink: {
          DEFAULT: "#111111",
          soft: "#0e0e0e",
        },
      },
      maxWidth: {
        reading: "680px",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.stone.700"),
            "--tw-prose-headings": theme("colors.stone.900"),
            "--tw-prose-links": theme("colors.stone.900"),
            "--tw-prose-quotes": theme("colors.stone.600"),
            "--tw-prose-quote-borders": theme("colors.stone.300"),
            maxWidth: "none",
            fontFamily: "var(--font-serif), Georgia, serif",
            lineHeight: "1.8",
            "p, li": { lineHeight: "1.8" },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.stone.300"),
            "--tw-prose-headings": theme("colors.stone.100"),
            "--tw-prose-links": theme("colors.stone.100"),
            "--tw-prose-quotes": theme("colors.stone.400"),
            "--tw-prose-quote-borders": theme("colors.stone.700"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

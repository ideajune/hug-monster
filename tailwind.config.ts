import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F3C65F", // 세련된 샴페인 골드·앰버 (포인트용으로만 절제 사용)
          orange: "#F26430", // 모던 테라코타 코랄 (핵심 CTA)
          navy: "#0F172A",   // 딥 슬레이트 네이비 (전문성·신뢰 중심 메인 컬러)
          sky: "#38BDF8",    // 모던 스카이
          pink: "#F472B6",   // 세련된 로즈 핑크
          offwhite: "#FAF9F6", // 에디토리얼 웜 화이트
          lightgray: "#F3F4F6", // 쿨 스튜디오 그레이
          charcoal: "#1E293B", // 본문 딥 차콜
          muted: "#64748B",    // 슬레이트 그레이
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Noto Sans KR",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Poppins",
          "Montserrat",
          "Pretendard Variable",
          "Pretendard",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 4px 20px -4px rgba(15, 23, 42, 0.06)",
        cardHover: "0 16px 36px -8px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomCta } from "@/components/MobileBottomCta";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { BRAND_INFO } from "@/lib/site-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://hug-monster777.vercel.app");
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isRealGaId = gaId && gaId !== "G-XXXXXXXXXX" && gaId.startsWith("G-");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HUG MONSTER (허그몬스터) | 캐릭터 기반 체험형 이벤트 마케팅 서비스",
    template: "%s | HUG MONSTER",
  },
  description: BRAND_INFO.description,
  keywords: [
    "인형탈 이벤트",
    "캐릭터 이벤트",
    "매장 오픈 이벤트",
    "개업 홍보 이벤트",
    "기업 이벤트",
    "브랜드 프로모션",
    "축제 캐릭터 이벤트",
    "허그몬스터",
    "HUG MONSTER",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "HUG MONSTER (허그몬스터)",
    title: "HUG MONSTER | 사람들은 광고를 피하지만, 즐거운 경험은 스스로 공유합니다",
    description: BRAND_INFO.description,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUG MONSTER 공식 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUG MONSTER | 사람들은 광고를 피하지만, 즐거운 경험은 스스로 공유합니다",
    description: BRAND_INFO.description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-brand-offwhite text-brand-charcoal antialiased">
        {isRealGaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingHomeButton />
        <MobileBottomCta />
      </body>
    </html>
  );
}

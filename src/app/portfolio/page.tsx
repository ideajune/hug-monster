import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "PORTFOLIO — 행사 활용 사례",
  description:
    "매장 오픈, 브랜드 프로모션, 지역 축제, 기업 행사 등 HUG MONSTER 현장 이벤트 구성 사례.",
};

export default function PortfolioPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-2.5">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            PORTFOLIO & CASES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            업종별 이벤트 활용 사례
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            매장 오픈부터 브랜드 팝업, 지역 축제까지 목적별 운영 구성을 확인하세요.
          </p>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <PortfolioGallery />
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title="원하시는 사례와 동일한 구성으로 준비해 보세요."
        description="현장 여건에 맞춘 운영 계획서(SOP)와 견적을 제안해 드립니다."
        buttonText="비슷한 행사 문의"
        href="/contact"
      />
    </div>
  );
}

import type { Metadata } from "next";
import { CharactersDirectory } from "@/components/CharactersDirectory";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "CHARACTERS — 캐릭터 라인업 및 섭외",
  description:
    "매장 오픈, 브랜드 프로모션, 축제, 병원·학원 행사에 어울리는 HUG MONSTER 캐릭터 라인업.",
};

export default function CharactersPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-2.5">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            CHARACTER LINEUP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            행사 목적별 캐릭터 포트폴리오
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            시그니처 몬스터, 거대 공룡, 포근한 베어·토끼, 시즌 캐릭터까지 현장 분위기에 맞춰 선택하세요.
          </p>
        </div>
      </section>

      {/* 캐릭터 필터 및 목록 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <CharactersDirectory />
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title="우리 매장에 어울리는 캐릭터를 추천받아 보세요."
        description="업종과 타깃 연령대에 가장 반응이 좋은 캐릭터 조합을 제안해 드립니다."
        buttonText="캐릭터 추천 상담"
        href="/contact"
      />
    </div>
  );
}

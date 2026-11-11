import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  ShieldCheck,
  ArrowRight,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { BRAND_INFO, CORE_VALUES, SAFETY_RULES } from "@/lib/site-data";
import { CharacterVisual } from "@/components/CharacterVisual";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "ABOUT — 브랜드 철학 및 운영 기준",
  description:
    "사람들은 광고를 피하지만, 즐거운 경험은 스스로 공유합니다. HUG MONSTER의 경험 중심 이벤트 전략과 5대 안전 원칙.",
};

export default function AboutPage() {
  return (
    <div>
      {/* 1. 브랜드 소개 Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        {/* Hero 배경 이미지 & 가독성 보호 그라데이션 레이어 */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/characters/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-white/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-container grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              ABOUT HUG MONSTER
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy leading-tight">
              사람들은 광고를 피하지만,
              <br />
              <span className="text-brand-orange">즐거운 경험</span>은 스스로 공유합니다.
            </h1>
            <p className="text-base sm:text-lg text-brand-charcoal leading-relaxed">
              사람들의 발걸음을 멈추게 하고, 브랜드를 기억하게 만드는 특별한 경험.
              HUG MONSTER는 다양한 캐릭터 퍼포먼스로 매장 오픈, 기업 프로모션, 지역 축제 현장을 웃음과 참여로 채웁니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/service"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-pill bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:bg-brand-orange transition-colors"
              >
                <span>제공 서비스 알아보기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/characters"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-pill border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:bg-slate-50 transition-colors"
              >
                <span>캐릭터 라인업 보기</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[24px] border border-slate-200 bg-brand-offwhite p-5 shadow-card">
              <CharacterVisual
                type="about"
                className="w-full h-64 sm:h-72 rounded-2xl"
                badgeText="인형탈 퍼포먼스 현장"
              />
              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/80">
                <p className="font-display text-xs font-extrabold text-brand-orange uppercase tracking-wider">
                  CORE PHILOSOPHY · ENTERTAIN · CONNECT · ENGAGE
                </p>
                <p className="text-base font-extrabold text-brand-navy mt-1">
                  &ldquo;시선은 멈추고, 카메라는 켜지고, 브랜드는 기억됩니다.&rdquo;
                </p>
                <p className="text-xs text-brand-muted mt-1">
                  멈춰 선 시선이 즐거운 참여로, 특별한 기억이 자발적인 공유로 이어집니다. ({BRAND_INFO.englishSlogan})
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 기존 광고 vs 체험형 이벤트 비교 (키워드 축약) */}
      <section className="py-14 md:py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="mb-10">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              DIFFERENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
              일방향 전단지 vs 캐릭터 경험 마케팅
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-card bg-slate-100 border border-slate-200 p-6 sm:p-7 space-y-4">
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-muted">
                기존 오프라인 전단지 홍보
              </span>
              <h3 className="text-lg font-extrabold text-brand-charcoal">
                외면받고 즉시 버려지는 일방향 전달
              </h3>
              <ul className="space-y-2.5 text-sm text-brand-muted">
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 shrink-0" />
                  <span>스마트폰에 집중한 행인들의 수령 회피</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 shrink-0" />
                  <span>수령 즉시 쓰레기통 폐기 · 높은 피로감</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 shrink-0" />
                  <span>온라인 2차 확산(SNS 공유) 불가</span>
                </li>
              </ul>
            </div>

            <div className="rounded-card bg-white border-2 border-brand-navy p-6 sm:p-7 shadow-card space-y-4">
              <span className="inline-block rounded-full bg-brand-navy px-3 py-1 text-xs font-bold text-white">
                HUG MONSTER 체험형 이벤트
              </span>
              <h3 className="text-lg font-extrabold text-brand-navy">
                발걸음을 멈추고 스스로 공유하는 경험
              </h3>
              <ul className="space-y-2.5 text-sm text-brand-charcoal font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0" />
                  <span><strong>의외성 · 호기심:</strong> 등장 즉시 거리 시선 집중</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0" />
                  <span><strong>호감 전이:</strong> 캐릭터의 유쾌함이 브랜드 호감으로 연결</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0" />
                  <span><strong>자발적 확산:</strong> 포토타임 인증샷을 통한 SNS 공유</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 운영 구조 (50:50 하이브리드 & SOP) */}
      <section className="py-14 md:py-20 bg-brand-navy text-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
                OPERATING MODEL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                유연한 공급 · 검증된 현장 운영
              </h2>
              <p className="text-sm text-slate-300">
                행사 목적과 규모에 맞춰 최적의 캐릭터와 전문 인력을 배정합니다.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
                <Layers className="h-5 w-5 text-brand-yellow" />
                <h3 className="text-base font-extrabold text-white">
                  자체 50% + 파트너 조달 50%
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  자체 주력 캐릭터와 외부 파트너 네트워크를 결합해 소규모 매장부터 대형 축제까지 유연하게 대응합니다.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
                <HeartHandshake className="h-5 w-5 text-brand-orange" />
                <h3 className="text-base font-extrabold text-white">
                  사전 운영 계획(SOP) 기반 실행
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  가용성 확인 및 계약 확정 후, 시간대별 거점 동선과 안전 기준을 담은 운영 계획서로 현장을 운영합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-white/10">
            {CORE_VALUES.map((item) => (
              <div key={item.code} className="space-y-1">
                <span className="font-display text-xs font-bold text-brand-yellow">
                  {item.badge}
                </span>
                <h3 className="text-base font-extrabold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 5대 현장 안전 및 품질 수칙 */}
      <section className="py-14 md:py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              <ShieldCheck className="h-4 w-4" />
              SAFETY & QUALITY RULES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
              5대 현장 행동 및 안전 원칙
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAFETY_RULES.map((rule) => (
              <div
                key={rule.number}
                className="rounded-card bg-white border border-slate-200/90 p-6 shadow-card space-y-2"
              >
                <span className="inline-block font-display text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-brand-navy">
                  {rule.number}
                </span>
                <h3 className="text-base font-extrabold text-brand-navy">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}

            <div className="rounded-card bg-brand-navy text-white p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="font-display text-[11px] font-bold text-brand-yellow">
                  STANDARD SOP
                </span>
                <h3 className="text-base font-extrabold">
                  사전 운영 계획서(SOP) 운영
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  동선, 역할, 우천 시 대체 방안까지 사전 합의된 매뉴얼로 실행합니다.
                </p>
              </div>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-pill bg-white text-xs font-bold text-brand-navy hover:bg-brand-orange hover:text-white transition-colors"
              >
                <span>진행 절차 보기</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title="브랜드의 품격과 현장의 즐거움을 동시에 잡으세요."
        description="행사 성격에 맞는 캐릭터 추천부터 안전 운영 계획까지 맞춤형으로 제안합니다."
        buttonText="이벤트 상담 신청"
        href="/contact"
      />
    </div>
  );
}

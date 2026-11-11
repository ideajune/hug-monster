import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Smile,
  HeartHandshake,
  Share2,
  Store,
  Sparkles,
  PartyPopper,
  Building2,
} from "lucide-react";
import {
  BRAND_INFO,
  CORE_VALUES,
  CHARACTERS,
  SERVICES,
  PACKAGES,
  PORTFOLIOS,
  PROCESS_STEPS,
} from "@/lib/site-data";
import { CharacterVisual } from "@/components/CharacterVisual";
import { CtaBanner } from "@/components/CtaBanner";

export default function HomePage() {
  const previewCharacters = CHARACTERS.slice(0, 4);
  const previewPortfolios = PORTFOLIOS.slice(0, 3);

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="relative overflow-hidden bg-white pt-12 pb-20 md:py-24 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
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

        <div className="relative z-10 mx-auto max-w-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* 좌측 메인 카피 및 CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-4 py-1.5 text-xs sm:text-sm font-display font-bold text-brand-navy shadow-sm">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                <span>{BRAND_INFO.englishSlogan}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-brand-navy leading-[1.18] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                우리는 전단지를 돌리지 않습니다.
                <br />
                <span className="text-brand-orange">사람들의 미소와 기억</span>을 만듭니다.
              </h1>

              <p className="text-base sm:text-xl text-brand-charcoal font-medium leading-relaxed max-w-2xl">
                스마트폰과 이어폰에 집중한 채 빠르게 스쳐 지나가는 거리에서, 전단지 한 장으로 발걸음을 멈추게 하는 일은 점점 더 어려워졌습니다.
                HUG MONSTER는 &lsquo;피해야 할 광고&rsquo; 대신 누구든 먼저 다가와 하이파이브하고 사진을 찍고 싶어지는 &lsquo;즐거운 오프라인 경험&rsquo;을 기획하고 실행합니다.
              </p>

              {/* CTA 버튼 2종 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-pill bg-brand-navy px-8 py-4 text-base sm:text-lg font-extrabold text-white shadow-sm hover:bg-brand-orange transition-all"
                >
                  <span>이벤트 상담하기</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/characters"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-pill border border-slate-300 bg-white px-7 py-4 text-base font-bold text-brand-navy hover:bg-slate-50 transition-colors"
                >
                  <span>캐릭터 둘러보기</span>
                </Link>
              </div>
            </div>

            {/* 우측 대표 캐릭터 비주얼 쇼케이스 */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-slate-200 bg-brand-offwhite p-5 sm:p-6 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-xs font-bold tracking-wider uppercase text-brand-muted">
                    HUG MONSTER LINEUP
                  </span>
                  <span className="text-xs font-bold text-brand-navy bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    맞춤 캐릭터 배정
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-100 border border-slate-200/80 overflow-hidden">
                  <CharacterVisual
                    type="hero"
                    className="w-full h-72 sm:h-80"
                    badgeText="인형탈 퍼포먼스 현장"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Brand Value — 핵심 키워드 3단 카드 */}
      <section className="py-16 md:py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                CORE VALUE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1 leading-snug">
                멈춰 선 시선이 <span className="text-brand-orange">즐거운 참여</span>로, 특별한 기억이 <span className="text-brand-orange">자발적인 공유</span>로 이어집니다
              </h2>
            </div>
            <p className="text-sm text-brand-muted">
              전단지 대신 현장의 경험으로 고객의 반응을 이끌어냅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CORE_VALUES.map((val, idx) => {
              const icons = [Smile, HeartHandshake, Share2];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={val.code}
                  className="rounded-card bg-white border border-slate-200/90 p-6 sm:p-7 shadow-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold tracking-wider text-brand-orange">
                      {val.badge}
                    </span>
                    <div className="h-9 w-9 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-navy">
                    {val.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-muted">
                    {val.subtitle}
                  </p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Characters Preview */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200/80 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                CHARACTERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
                행사 목적별 캐릭터 라인업
              </h2>
            </div>
            <Link
              href="/characters"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              <span>전체 캐릭터 ({CHARACTERS.length}종)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {previewCharacters.map((char) => (
              <div
                key={char.id}
                className="group rounded-card bg-brand-offwhite border border-slate-200/90 overflow-hidden shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <Link href={`/characters/${char.slug}`} className="block">
                  <CharacterVisual
                    type={char.visualTheme.characterType}
                    className={`w-full h-52 bg-gradient-to-br ${char.visualTheme.bgGradient}`}
                  />
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-brand-orange">
                        {char.category}
                      </span>
                      <span className="text-brand-muted">{char.supplyType}</span>
                    </div>
                    <Link href={`/characters/${char.slug}`}>
                      <h3 className="text-lg font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors">
                        {char.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-brand-muted line-clamp-2">
                      {char.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex flex-wrap gap-1">
                      {char.moodTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-brand-charcoal"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/characters/${char.slug}`}
                        className="flex-1 inline-flex min-h-[38px] items-center justify-center rounded-pill border border-slate-200 text-xs font-bold text-brand-navy hover:bg-slate-50"
                      >
                        상세
                      </Link>
                      <Link
                        href={`/contact?character=${encodeURIComponent(char.name)}`}
                        className="flex-1 inline-flex min-h-[38px] items-center justify-center rounded-pill bg-brand-navy text-xs font-bold text-white hover:bg-brand-orange transition-colors"
                      >
                        섭외 문의
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Services Preview */}
      <section className="py-16 md:py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
                시선을 모으는 맞춤형 현장 프로그램
              </h2>
            </div>
            <Link
              href="/service"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              <span>서비스 전체 보기</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.slice(0, 4).map((svc, idx) => {
              const icons = [Store, Sparkles, PartyPopper, Building2];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={svc.id}
                  className="rounded-card bg-white border border-slate-200/90 p-6 shadow-card flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[11px] font-bold tracking-wider text-brand-muted">
                        {svc.code}
                      </span>
                      <div className="h-9 w-9 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-brand-navy">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-orange">
                      {svc.subtitle}
                    </p>
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {svc.activities.slice(0, 3).map((act) => (
                        <li
                          key={act}
                          className="flex items-center gap-2 text-xs text-brand-charcoal"
                        >
                          <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?eventType=${encodeURIComponent(svc.title)}`}
                    className="inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-pill border border-slate-300 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors"
                  >
                    <span>상담 신청</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Packages Preview — 모던 다크 & 화이트 카드 */}
      <section className="py-16 md:py-20 bg-brand-navy text-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
                PRICING & PACKAGES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                투명한 3단계 표준 패키지
              </h2>
            </div>
            <Link
              href="/package"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              <span>비교표 및 상세 조건 보기</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-card p-7 flex flex-col justify-between transition-all ${
                  pkg.recommended
                    ? "bg-white text-brand-navy border-2 border-brand-orange shadow-xl"
                    : "bg-white/5 text-white border border-white/15"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-extrabold tracking-wide">
                      {pkg.name}
                    </span>
                    {pkg.recommended && (
                      <span className="rounded-full bg-brand-orange px-3 py-0.5 text-[11px] font-bold text-white">
                        BEST 추천
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-display">
                      {pkg.priceText}
                    </div>
                    <p
                      className={`text-xs mt-1 font-semibold ${
                        pkg.recommended ? "text-brand-orange" : "text-brand-yellow"
                      }`}
                    >
                      {pkg.characterCount} · {pkg.duration}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-current/10">
                    {pkg.features.slice(0, 4).map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs sm:text-sm">
                        <Check
                          className={`h-4 w-4 shrink-0 ${
                            pkg.recommended ? "text-brand-orange" : "text-brand-yellow"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 space-y-2.5">
                  <p
                    className={`text-[11px] ${
                      pkg.recommended ? "text-brand-muted" : "text-slate-400"
                    }`}
                  >
                    * {pkg.conditionNote}
                  </p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.id)}`}
                    className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-bold transition-all ${
                      pkg.recommended
                        ? "bg-brand-orange text-white hover:bg-[#dc5624]"
                        : "bg-white/15 text-white hover:bg-white hover:text-brand-navy"
                    }`}
                  >
                    <span>{pkg.name} 문의하기</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Portfolio Preview */}
      <section className="py-16 md:py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
                업종별 현장 연출 사례
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              <span>전체 사례 보기</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewPortfolios.map((item) => (
              <div
                key={item.id}
                className="rounded-card bg-white border border-slate-200/90 overflow-hidden shadow-card flex flex-col justify-between"
              >
                <div>
                  <CharacterVisual
                    type={item.visualTheme.characterType}
                    className={`w-full h-48 bg-gradient-to-br ${item.visualTheme.bg}`}
                    badgeText="샘플 사례"
                  />
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-navy bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="font-display font-bold text-brand-orange">
                        {item.packageUsed}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-brand-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <Link
                    href={`/contact?eventType=${encodeURIComponent(item.category)}&package=${encodeURIComponent(item.packageUsed)}`}
                    className="inline-flex min-h-[38px] w-full items-center justify-center gap-1 rounded-pill border border-slate-200 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    <span>동일 구성 문의</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: How It Works 5-Step */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-200/80 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                PROCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
                5단계 표준 진행 절차
              </h2>
            </div>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-orange"
            >
              <ShieldCheck className="h-4 w-4 text-brand-orange" />
              <span>운영 계획서(SOP) 상세 보기</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-brand-offwhite border border-slate-200/80 p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-extrabold text-brand-orange">
                    {item.step}
                  </span>
                  <span className="font-display text-[10px] font-bold text-brand-muted">
                    {item.code}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-brand-navy">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-muted leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <CtaBanner
        variant="navy"
        title="특별한 오프라인 이벤트, HUG MONSTER와 시작하세요."
        description="희망 일정과 장소만 남겨주시면 가용 캐릭터와 맞춤 견적을 안내해 드립니다."
        buttonText="무료 상담 문의"
        href="/contact"
      />
    </div>
  );
}

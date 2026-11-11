import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  Store,
  PartyPopper,
  Building2,
  HeartHandshake,
} from "lucide-react";
import { SERVICES, PORTFOLIOS } from "@/lib/site-data";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "SERVICE — 목적별 이벤트 솔루션",
  description:
    "매장 오픈, 브랜드 프로모션, 지역 축제, 기업 행사, 개인 서프라이즈까지 HUG MONSTER의 맞춤형 이벤트 서비스.",
};

const ICON_MAP = {
  Store,
  Sparkles,
  PartyPopper,
  Building2,
  HeartHandshake,
};

export default function ServicePage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-3">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            EVENT SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            행사 목적별 5대 체험형 서비스
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            업종과 공간 특성에 맞춰 시선을 모으고 참여를 이끄는 현장 프로그램을 운영합니다.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {SERVICES.map((svc) => (
              <a
                key={svc.id}
                href={`#${svc.slug}`}
                className="inline-flex min-h-[36px] items-center rounded-pill bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              >
                {svc.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 상세 카드 목록 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-8">
          {SERVICES.map((svc, idx) => {
            const Icon = ICON_MAP[svc.iconName] || Sparkles;
            const relatedPortfolios = PORTFOLIOS.filter(
              (pf) =>
                svc.title.includes(pf.category.split("·")[0]) ||
                pf.category.includes(svc.title.split(" ")[0])
            ).slice(0, 2);

            return (
              <article
                key={svc.id}
                id={svc.slug}
                className="scroll-mt-24 rounded-[24px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-display font-bold text-brand-orange">
                        0{idx + 1} · {svc.code}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-brand-navy">
                        추천: {svc.recommendedPackage}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                      {svc.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-brand-muted">
                      {svc.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex h-11 w-11 rounded-xl bg-slate-100 text-brand-navy items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Link
                      href={`/contact?eventType=${encodeURIComponent(svc.title)}&package=${encodeURIComponent(svc.recommendedPackage)}`}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-pill bg-brand-navy px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-orange transition-colors"
                    >
                      <span>이 서비스 상담</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* 3단 키워드 요약 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-brand-offwhite border border-slate-200/60 p-4 space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-muted">
                      주요 대상 고객
                    </h3>
                    <ul className="space-y-1.5">
                      {svc.targetCustomers.map((target) => (
                        <li
                          key={target}
                          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-charcoal"
                        >
                          <Check className="h-3.5 w-3.5 text-brand-navy shrink-0" />
                          <span>{target}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-brand-offwhite border border-slate-200/60 p-4 space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                      제공 프로그램
                    </h3>
                    <ul className="space-y-1.5">
                      {svc.activities.map((act) => (
                        <li
                          key={act}
                          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-charcoal"
                        >
                          <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4 space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy">
                      운영 프로세스
                    </h3>
                    <ol className="space-y-1.5">
                      {svc.operationSteps.map((step, sIdx) => (
                        <li
                          key={step}
                          className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal"
                        >
                          <span className="font-display text-xs font-bold text-brand-orange">
                            0{sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {relatedPortfolios.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-brand-muted">관련 사례:</span>
                      {relatedPortfolios.map((pf) => (
                        <Link
                          key={pf.id}
                          href="/portfolio"
                          className="font-bold text-brand-navy bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors"
                        >
                          {pf.title} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title="우리 행사에 가장 효과적인 구성을 추천받아 보세요."
        description="업종과 장소, 일정에 맞춘 최적의 프로그램을 제안해 드립니다."
        buttonText="맞춤 서비스 문의"
        href="/contact"
      />
    </div>
  );
}

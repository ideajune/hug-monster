import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Info,
  Plus,
} from "lucide-react";
import { PACKAGES, PACKAGE_ADDONS } from "@/lib/site-data";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "PACKAGE — 패키지 가격 및 구성 비교",
  description:
    "STARTER(199,000원), BUSINESS(349,000원), PREMIUM(별도 견적) 패키지 구성 및 거래 조건 안내.",
};

const COMPARISON_ROWS = [
  {
    feature: "판매 가격",
    starter: "199,000원",
    business: "349,000원",
    premium: "별도 견적",
  },
  {
    feature: "투입 캐릭터",
    starter: "1명",
    business: "2명",
    premium: "3명+ 맞춤",
  },
  {
    feature: "행사 시간",
    starter: "2시간",
    business: "3시간",
    premium: "일정 협의",
  },
  {
    feature: "전단지 · 홍보물 배포",
    starter: "포함",
    business: "포함",
    premium: "맞춤 포함",
  },
  {
    feature: "포토타임 · SNS 이벤트",
    starter: "기본 인사 중심",
    business: "포토타임 · SNS 참여 포함",
    premium: "맞춤 포토존 · 캠페인 연출",
  },
  {
    feature: "퍼포먼스 · 퍼레이드",
    starter: "손인사 · 하이파이브",
    business: "간단 율동 · 2인 호흡",
    premium: "거리 퍼레이드 · 무대 연출",
  },
  {
    feature: "운영 계획서 (SOP)",
    starter: "기본 동선 협의",
    business: "맞춤 SOP 수립",
    premium: "전문 연출·안전 계획서",
  },
];

const SALES_CONDITION_ITEMS = [
  {
    title: "부가세 (VAT) · 세금계산서",
    status: "상담 시 안내",
    detail: "부가세 포함 여부 및 세금계산서·현금영수증 발행 조건은 견적 시 안내합니다.",
  },
  {
    title: "기본 지역 · 출장비",
    status: "상담 시 안내",
    detail: "행사 지역 및 이동 거리에 따른 출장비 여부는 장소 확인 후 사전 안내합니다.",
  },
  {
    title: "행사 시간 · 휴식 기준",
    status: "휴식 사이클 포함",
    detail: "안전과 텐션 유지를 위해 30~40분 활동 후 10~15분 휴식 사이클을 적용합니다.",
  },
  {
    title: "고객사 현장 준비",
    status: "사전 협의",
    detail: "인형탈 환복·휴식용 실내 대기 공간과 배포할 홍보물을 사전에 준비합니다.",
  },
  {
    title: "계약금 · 잔금 정산",
    status: "계약서 명시",
    detail: "계약 확정 시 계약금(선금) 수령 후 행사 종료 시 잔금을 정산합니다.",
  },
  {
    title: "우천 · 취소 · 환불",
    status: "계약서 명시",
    detail: "우천 시 실내 대체 또는 일정 변경 기준과 위약금 규정을 서면 합의합니다.",
  },
];

export default function PackagePage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-2.5">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            PACKAGES & PRICING
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            투명한 가격과 3단계 패키지 구성
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            단일 거점 홍보용 STARTER부터 2인 시너지 주력 BUSINESS, 맞춤형 PREMIUM까지 목적에 맞게 선택하세요.
          </p>
        </div>
      </section>

      {/* 1. 3대 패키지 가격 카드 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-[24px] p-7 flex flex-col justify-between transition-all ${
                  pkg.recommended
                    ? "bg-brand-navy text-white border-2 border-brand-orange shadow-cardHover relative"
                    : "bg-white text-brand-navy border border-slate-200/90 shadow-card"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-7 inline-flex items-center rounded-full bg-brand-orange px-3.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    MOST POPULAR · 주력 추천
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <span
                      className={`font-display text-xs font-bold uppercase tracking-wider ${
                        pkg.recommended ? "text-brand-yellow" : "text-brand-orange"
                      }`}
                    >
                      {pkg.name}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1">
                      {pkg.priceText}
                    </h2>
                    <p
                      className={`text-xs font-bold mt-1.5 ${
                        pkg.recommended ? "text-slate-300" : "text-brand-muted"
                      }`}
                    >
                      {pkg.characterCount} · {pkg.duration}
                    </p>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      pkg.recommended ? "text-slate-200" : "text-brand-charcoal"
                    }`}
                  >
                    {pkg.summary}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-current/10">
                    <ul className="space-y-2">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs sm:text-sm">
                          <Check
                            className={`h-4 w-4 shrink-0 ${
                              pkg.recommended ? "text-brand-yellow" : "text-brand-orange"
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pkg.suitableFor.map((item) => (
                      <span
                        key={item}
                        className={`rounded px-2 py-0.5 text-[11px] font-medium ${
                          pkg.recommended
                            ? "bg-white/10 text-slate-200"
                            : "bg-slate-100 text-brand-charcoal"
                        }`}
                      >
                        #{item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <p
                    className={`text-[11px] ${
                      pkg.recommended ? "text-slate-400" : "text-brand-muted"
                    }`}
                  >
                    * {pkg.conditionNote}
                  </p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.id)}`}
                    className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-bold transition-all ${
                      pkg.recommended
                        ? "bg-brand-orange text-white hover:bg-[#dc5624]"
                        : "bg-brand-navy text-white hover:bg-brand-orange"
                    }`}
                  >
                    <span>{pkg.name} 상담 문의</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 비교 테이블 */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-200/80 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              COMPARISON
            </span>
            <h2 className="text-2xl font-extrabold text-brand-navy mt-1">
              패키지 한눈에 비교
            </h2>
          </div>

          <div className="overflow-x-auto rounded-card border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white text-xs sm:text-sm">
                  <th className="py-3.5 px-5 font-bold w-1/4">항목</th>
                  <th className="py-3.5 px-5 font-bold w-1/4">STARTER</th>
                  <th className="py-3.5 px-5 font-bold bg-brand-orange text-white w-1/4">
                    BUSINESS (추천)
                  </th>
                  <th className="py-3.5 px-5 font-bold w-1/4">PREMIUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-brand-navy bg-slate-50/70">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 text-brand-charcoal">{row.starter}</td>
                    <td className="py-3.5 px-5 font-bold text-brand-navy bg-orange-50/30">
                      {row.business}
                    </td>
                    <td className="py-3.5 px-5 text-brand-charcoal">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 추가 선택 옵션 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              ADD-ONS
            </span>
            <h2 className="text-2xl font-extrabold text-brand-navy mt-1">
              추가 선택 옵션
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PACKAGE_ADDONS.map((addon) => (
              <div
                key={addon.title}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-brand-navy flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-brand-orange shrink-0" />
                      <span>{addon.title}</span>
                    </h3>
                    <span className="text-[11px] font-bold text-brand-muted bg-slate-100 px-2 py-0.5 rounded-full">
                      {addon.pricePolicy}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 판매 및 계약 조건 */}
      <section className="py-12 md:py-16 bg-brand-navy text-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-brand-yellow">
                <Info className="h-3.5 w-3.5 text-brand-orange" />
                TERMS & CONDITIONS
              </span>
              <h2 className="text-2xl font-extrabold mt-1">
                가격 및 계약 필수 확인 사항
              </h2>
            </div>
            <Link
              href="/how-it-works#policy"
              className="text-xs font-bold text-slate-300 hover:text-white underline underline-offset-4"
            >
              서면 계약 기준 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SALES_CONDITION_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-brand-yellow shrink-0">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        variant="yellow"
        title="행사 일정과 장소에 맞춘 정확한 견적을 받아보세요."
        description="가용 캐릭터와 포함 조건을 투명하게 안내해 드립니다."
        buttonText="견적 문의하기"
        href="/contact"
      />
    </div>
  );
}

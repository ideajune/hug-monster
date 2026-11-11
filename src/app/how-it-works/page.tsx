import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  FileText,
  ShieldCheck,
  CloudRain,
  ArrowRight,
} from "lucide-react";
import { PROCESS_STEPS, SOP_CHECKLIST } from "@/lib/site-data";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "HOW IT WORKS — 5단계 진행 절차 및 운영 계획(SOP)",
  description:
    "상담 문의부터 운영 계획서(SOP) 수립, 계약, 현장 진행, 정산까지 HUG MONSTER의 5단계 프로세스.",
};

const CONTRACT_ESSENTIALS = [
  { title: "01. 당사자 정보", desc: "공급자·고객사 상호, 담당자, 연락처 명시" },
  { title: "02. 서비스 범위 (SOP)", desc: "일시, 장소, 캐릭터 수, 시간, 프로그램 명시" },
  { title: "03. 금액 · 정산 조건", desc: "계약금(선금) 및 행사 후 잔금 지급 조건" },
  { title: "04. 역할 및 책임", desc: "퍼포먼스 수행 의무 및 대기 공간·홍보물 협조" },
  { title: "05. 취소 · 우천 기준", desc: "우천 시 대체 운영·일정 변경 및 위약금 규정" },
  { title: "06. 서면 확인 · 날인", desc: "분쟁 방지를 위한 전자·서면 계약 체결" },
];

const CUSTOMER_PREPARATIONS = [
  "인형탈 환복 및 휴식(30~40분 활동 / 10~15분 휴식)을 위한 실내 대기 공간 확보",
  "현장 연기자 수분 보충을 위한 기본 식수 협조",
  "배포용 전단지·할인 쿠폰·피켓 사전 준비 (제작 옵션 대행 가능)",
  "건물 관리실 또는 행사 구역 사전 승인 확인",
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-2.5">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            HOW IT WORKS & SOP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            5단계 진행 절차 및 운영 기준
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            사전 운영 계획서(SOP)와 서면 계약, 현장 안전 수칙으로 완성도 높은 이벤트를 실행합니다.
          </p>
        </div>
      </section>

      {/* 1. 5단계 프로세스 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              5-STEP WORKFLOW
            </span>
            <h2 className="text-2xl font-extrabold text-brand-navy mt-1">
              이벤트 진행 프로세스
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-card bg-white border border-slate-200/90 p-5 shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-extrabold text-brand-orange">
                      {item.step}
                    </span>
                    <span className="font-display text-[10px] font-bold text-brand-muted">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <ul className="space-y-1 pt-3 border-t border-slate-100">
                  {item.details.map((det) => (
                    <li
                      key={det}
                      className="flex items-center gap-1.5 text-xs font-medium text-brand-charcoal"
                    >
                      <Check className="h-3 w-3 text-brand-orange shrink-0" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 운영 계획서 (SOP) 6대 항목 */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-200/80 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              STANDARD OPERATING PROCEDURE
            </span>
            <h2 className="text-2xl font-extrabold text-brand-navy mt-1">
              사전 운영 계획서 (SOP) 6대 항목
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOP_CHECKLIST.map((sop) => (
              <div
                key={sop.title}
                className="rounded-2xl bg-brand-offwhite border border-slate-200/80 p-5 space-y-1.5"
              >
                <h3 className="text-sm sm:text-base font-extrabold text-brand-navy">
                  {sop.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {sop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 계약·우천·고객 준비사항 */}
      <section id="policy" className="scroll-mt-24 py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-8">
          <div className="rounded-[24px] bg-brand-navy text-white p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-brand-yellow uppercase">
                <FileText className="h-4 w-4 text-brand-orange" />
                WRITTEN CONTRACT
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                서면 계약서 6대 필수 항목
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTRACT_ESSENTIALS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1"
                >
                  <h3 className="text-xs sm:text-sm font-extrabold text-brand-yellow">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-card bg-white border border-slate-200/90 p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center">
                  <CloudRain className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold text-brand-navy">
                  우천 · 취소 · 안전 기준
                </h3>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-brand-charcoal">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>우천 시 대체:</strong> 매장 처마/실내 전환 또는 사전 협의를 통한 일정 조정</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>취소·환불:</strong> 의상·인력 선조달 특성에 따른 취소 기한 및 위약금 계약서 명시</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>안전 최우선:</strong> 폭염·인파 과밀 등 위험 시 휴식 및 동선 즉시 조정</span>
                </li>
              </ul>
            </div>

            <div className="rounded-card bg-white border border-slate-200/90 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-navy">
                    고객사 사전 협조 사항
                  </h3>
                </div>
                <Link
                  href="/about"
                  className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1"
                >
                  <span>5대 안전 수칙</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-brand-charcoal">
                {CUSTOMER_PREPARATIONS.map((prep) => (
                  <li key={prep} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-brand-navy shrink-0 mt-0.5" />
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title="체계적인 운영 계획서로 오픈 이벤트를 준비하세요."
        description="일정과 장소만 남겨주시면 담당자가 1:1 상담을 도와드립니다."
        buttonText="상담 시작하기"
        href="/contact"
      />
    </div>
  );
}

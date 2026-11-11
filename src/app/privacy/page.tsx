import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "HUG MONSTER 홈페이지 상담 및 견적 문의 처리를 위한 개인정보 처리방침 안내입니다.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-14 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-orange"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>상담 문의 페이지로 돌아가기</span>
        </Link>

        <div className="rounded-[28px] bg-white border-2 border-brand-navy/15 p-7 sm:p-10 shadow-card space-y-6">
          <div className="space-y-2 border-b border-brand-navy/10 pb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-brand-orange uppercase">
              <ShieldCheck className="h-4 w-4" />
              PRIVACY POLICY
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              HUG MONSTER 개인정보 처리방침
            </h1>
            <p className="text-xs text-brand-muted">
              시행일: 2026년 11월 10일 (출시 전 실제 사업자 정보 확정 후 최종 고지)
            </p>
          </div>

          <div className="space-y-5 text-sm text-brand-charcoal leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">
                1. 개인정보의 수집 및 이용 목적
              </h2>
              <p>
                HUG MONSTER(이하 &ldquo;브랜드&rdquo;)는 홈페이지 방문 고객의 이벤트 상담, 일정 및 캐릭터 가용성 확인, 맞춤형 견적서 발송, 계약 체결 및 행사 진행 안내를 위해 최소한의 개인정보만을 수집·이용합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">
                2. 수집하는 개인정보의 항목
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>필수 항목:</strong> 업체명 또는 담당자명, 연락처(전화번호), 행사 유형, 희망 날짜, 행사 장소, 예상 행사 시간, 개인정보 수집·이용 동의 여부
                </li>
                <li>
                  <strong>선택 항목:</strong> 이메일 주소, 희망 패키지, 희망 캐릭터, 예상 예산, 세부 문의 내용
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <p>
                수집된 개인정보는 상담 문의 접수일로부터 <strong>1년간 보관</strong> 후 지체 없이 파기합니다. 단, 실제 계약이 체결된 경우에는 관련 법령(전자상거래 등에서의 소비자보호에 관한 법률 등)에 따라 계약 및 대금결제 기록을 법정 기간 동안 보관하며, 정보주체가 삭제를 요청하는 경우 즉시 파기합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">
                4. 개인정보의 안전성 확보 조치 및 문의처
              </h2>
              <p>
                브랜드는 문의 데이터의 무단 접근을 방지하기 위해 관리자 인증 및 접근 통제를 적용합니다. 개인정보 열람·정정·삭제 요청은 아래 연락처로 문의해 주시기 바랍니다.
              </p>
              <div className="rounded-xl bg-brand-offwhite border border-brand-navy/10 p-4 text-xs space-y-1">
                <p>
                  <strong>상호명:</strong> {BRAND_INFO.contact.companyName} (사업자등록번호: {BRAND_INFO.contact.businessNumber})
                </p>
                <p>
                  <strong>주소:</strong> {BRAND_INFO.contact.address}
                </p>
                <p>
                  <strong>이메일:</strong> {BRAND_INFO.contact.email}
                </p>
                <p>
                  <strong>연락처:</strong> {BRAND_INFO.contact.phone}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

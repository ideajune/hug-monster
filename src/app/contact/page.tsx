import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Phone, Mail, Clock, Check } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "CONTACT — 상담 및 견적 문의",
  description:
    "행사 날짜, 장소, 희망 캐릭터와 패키지를 남겨주시면 HUG MONSTER가 맞춤형 견적을 안내해 드립니다.",
};

export default function ContactPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-white py-12 md:py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-2.5">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
            CONTACT & INQUIRY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            이벤트 상담 및 견적 문의
          </h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-xl">
            일정과 장소, 목적만 남겨주시면 캐릭터 가용성 확인 후 맞춤 견적을 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* 본문 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 좌측 직통 연락처 */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-card bg-brand-navy text-white p-6 space-y-4 shadow-card">
              <h2 className="text-lg font-extrabold text-white">
                직통 상담 채널
              </h2>

              <div className="space-y-3.5 pt-2 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={`tel:${BRAND_INFO.contact.phone}`}
                      className="text-base font-extrabold text-white hover:text-brand-yellow"
                    >
                      {BRAND_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-brand-orange shrink-0" />
                  <a
                    href={`mailto:${BRAND_INFO.contact.email}`}
                    className="font-bold text-white hover:text-brand-yellow"
                  >
                    {BRAND_INFO.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span>{BRAND_INFO.contact.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="rounded-card bg-white border border-slate-200/90 p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-extrabold text-brand-navy">
                문의 후 진행 절차
              </h3>
              <ul className="space-y-2 text-xs text-brand-charcoal">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                  <span><strong>01.</strong> 일정·지역 캐릭터 가용성 확인</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                  <span><strong>02.</strong> 동선·운영 계획(SOP) 1:1 상담</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                  <span><strong>03.</strong> 최종 견적서 발송 및 서면 계약</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 우측 폼 */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="rounded-[24px] bg-white border border-slate-200 p-10 text-center text-sm text-brand-muted">
                  문의 양식을 불러오는 중입니다...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}

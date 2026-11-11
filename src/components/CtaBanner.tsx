import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";

interface CtaBannerProps {
  variant?: "yellow" | "navy";
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function CtaBanner({
  variant = "navy",
  title = "우리 매장 앞도 사람들의 포토존으로 만들어 보세요.",
  description = "행사 일정과 장소만 알려주시면 최적의 캐릭터 구성과 견적을 제안해 드립니다.",
  buttonText = "무료 상담 신청",
  href = "/contact",
}: CtaBannerProps) {
  const isLight = variant === "yellow";

  return (
    <section className="py-12 md:py-20 px-5 sm:px-8 lg:px-12">
      <div
        className={`mx-auto max-w-container rounded-[24px] p-8 sm:p-12 shadow-card transition-all ${
          isLight
            ? "bg-white text-brand-navy border border-slate-200"
            : "bg-brand-navy text-white border border-slate-800"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span
              className={`inline-block font-display text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isLight
                  ? "bg-slate-100 text-brand-orange"
                  : "bg-white/10 text-brand-yellow"
              }`}
            >
              EXPERIENTIAL MARKETING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              {title}
            </h2>
            <p
              className={`text-sm sm:text-base ${
                isLight ? "text-brand-muted" : "text-slate-300"
              }`}
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <Link
              href={href}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-7 py-3 text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#dc5624] transition-all"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${BRAND_INFO.contact.phone}`}
              className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-bold border transition-colors ${
                isLight
                  ? "border-slate-300 bg-white text-brand-navy hover:bg-slate-50"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>전화 상담</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

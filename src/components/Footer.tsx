import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-14 pb-28 md:pb-14 border-t border-slate-800">
      <div className="mx-auto max-w-container px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 pb-10 border-b border-white/10">
          {/* 브랜드 요약 */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-brand-yellow font-display font-extrabold text-sm border border-white/15">
                HM
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                HUG MONSTER
              </span>
            </div>
            <p className="text-white font-bold text-base">
              &ldquo;{BRAND_INFO.slogan}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {BRAND_INFO.description}
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                ENTERTAIN · 시선 집중
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                CONNECT · 호감 연결
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                ENGAGE · 자발적 공유
              </span>
            </div>
          </div>

          {/* 메뉴 */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-slate-400">
              NAVIGATION
            </h2>
            <ul className="grid grid-cols-2 gap-1.5 text-xs sm:text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors py-1 inline-block">HOME</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors py-1 inline-block">ABOUT</Link></li>
              <li><Link href="/characters" className="hover:text-white transition-colors py-1 inline-block">CHARACTERS</Link></li>
              <li><Link href="/service" className="hover:text-white transition-colors py-1 inline-block">SERVICE</Link></li>
              <li><Link href="/package" className="hover:text-white transition-colors py-1 inline-block">PACKAGE</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors py-1 inline-block">PORTFOLIO</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors py-1 inline-block">HOW IT WORKS</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange font-bold text-white transition-colors py-1 inline-block">CONTACT</Link></li>
            </ul>
          </div>

           {/* 연락처 및 사업자 정보 */}
          <div className="lg:col-span-4 space-y-2.5">
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-slate-400">
              CONTACT & BUSINESS INFO
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="text-xs text-slate-300">
                <span className="font-semibold text-white">상호명:</span> {BRAND_INFO.contact.companyName} ·{" "}
                <span className="font-semibold text-white">사업자등록번호:</span> {BRAND_INFO.contact.businessNumber}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.contact.phone}`}
                  className="font-bold text-white hover:text-brand-yellow inline-flex items-center gap-1"
                >
                  <span>{BRAND_INFO.contact.phone}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="text-white hover:text-brand-yellow inline-flex items-center gap-1"
                >
                  <span>{BRAND_INFO.contact.email}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{BRAND_INFO.contact.operatingHours}</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{BRAND_INFO.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 사업자 고지 및 바로가기 */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            상호명: {BRAND_INFO.contact.companyName} | 사업자등록번호: {BRAND_INFO.contact.businessNumber} | 주소: {BRAND_INFO.contact.address} | 전화번호: {BRAND_INFO.contact.phone}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-white underline underline-offset-4">
              개인정보 처리방침
            </Link>
            <Link href="/how-it-works#policy" className="hover:text-white underline underline-offset-4">
              계약·환불 기준
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 hover:text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>관리자</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

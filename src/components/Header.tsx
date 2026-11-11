"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ArrowUpRight, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "CHARACTERS", href: "/characters" },
  { label: "SERVICE", href: "/service" },
  { label: "PACKAGE", href: "/package" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-brand-offwhite/90 backdrop-blur-sm border-b border-slate-200/60"
      }`}
    >
      <div className="mx-auto flex h-16 lg:h-20 max-w-container items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* 좌측 로고: 공식 HUG MONSTER 캐릭터 & 텍스트 로고 */}
        <Link
          href="/"
          className="group flex items-center py-1.5 focus:outline-none"
          aria-label="HUG MONSTER 홈으로 이동"
        >
          <img
            src="/images/logo-header.png"
            alt="HUG MONSTER 로고"
            className="h-11 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-full font-display text-xs font-bold tracking-wider transition-all ${
                  active
                    ? "bg-brand-navy text-white"
                    : "text-brand-charcoal hover:bg-slate-200/60 hover:text-brand-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 강조 CTA 버튼 */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/contact"
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-pill bg-brand-orange px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#dc5624] active:scale-[0.99]"
          >
            <span>견적 문의</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex xl:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-navy hover:bg-slate-50"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="xl:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-6 shadow-xl"
        >
          <nav className="flex flex-col space-y-1" aria-label="모바일 메뉴">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 font-display text-sm font-bold transition-colors ${
                    active
                      ? "bg-brand-navy text-white"
                      : "text-brand-charcoal hover:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="text-[11px] font-sans font-medium text-brand-yellow">
                      현재 페이지
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/contact"
              className="flex-1 inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-pill bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm"
            >
              <span>상담 및 견적 문의</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${BRAND_INFO.contact.phone}`}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-pill border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-brand-navy"
            >
              <PhoneCall className="h-4 w-4" />
              <span>전화 ({BRAND_INFO.contact.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

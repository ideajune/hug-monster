"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquarePlus } from "lucide-react";
import { BRAND_INFO } from "@/lib/site-data";

export function MobileBottomCta() {
  const pathname = usePathname();

  // 문의 페이지나 관리자 페이지에서는 하단 중복 바를 숨김
  if (pathname === "/contact" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-brand-navy/15 px-4 py-2.5 shadow-[0_-8px_24px_rgba(23,36,58,0.1)]">
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${BRAND_INFO.contact.phone}`}
          className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-pill border-2 border-brand-navy bg-white px-4 py-2.5 text-xs font-bold text-brand-navy active:scale-95"
          aria-label="전화로 이벤트 상담하기"
        >
          <Phone className="h-4 w-4 text-brand-orange" />
          <span>전화 상담</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 py-2.5 text-sm font-extrabold text-white shadow-sm active:scale-95"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span>이벤트 상담 · 견적 문의하기</span>
        </Link>
      </div>
    </div>
  );
}

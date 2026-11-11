"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Check,
  Film,
  Camera,
  Info,
  X,
} from "lucide-react";
import { PORTFOLIOS, PortfolioItem } from "@/lib/site-data";
import { CharacterVisual } from "@/components/CharacterVisual";

const PORTFOLIO_CATEGORIES = [
  "전체",
  "매장 오픈",
  "브랜드 프로모션",
  "축제·지역 행사",
  "기업 행사",
  "특별 이벤트",
] as const;

export function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolios =
    selectedCategory === "전체"
      ? PORTFOLIOS
      : PORTFOLIOS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* 행사 유형 필터 및 안내 */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="포트폴리오 행사 유형 필터"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            const count =
              cat === "전체"
                ? PORTFOLIOS.length
                : PORTFOLIOS.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-white border border-slate-200 text-brand-charcoal hover:bg-slate-100"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-1.5 text-xs ${
                    active ? "text-brand-yellow" : "text-brand-muted"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-brand-muted">
          <Info className="h-3.5 w-3.5 text-brand-orange shrink-0" />
          <span>업종별 구성을 설명하기 위한 샘플 연출 사례입니다.</span>
        </div>
      </div>

      {/* 사례 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.map((item) => (
          <article
            key={item.id}
            className="group rounded-card bg-white border border-slate-200/90 overflow-hidden shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative">
                <CharacterVisual
                  type={item.visualTheme.characterType}
                  className={`w-full h-52 bg-gradient-to-br ${item.visualTheme.bg}`}
                  badgeText={item.isSample ? "샘플 사례" : "실제 사례"}
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-bold text-brand-navy shadow-sm">
                  {item.mediaType === "SHORT_VIDEO" ? (
                    <>
                      <Film className="h-3 w-3 text-brand-orange" />
                      <span>숏폼·퍼포먼스</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-3 w-3 text-brand-navy" />
                      <span>현장 포토</span>
                    </>
                  )}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-brand-navy">
                    {item.category}
                  </span>
                  <span className="font-display font-bold text-brand-orange">
                    {item.packageUsed}
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-brand-navy leading-snug">
                  {item.title}
                </h2>

                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-brand-navy" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-brand-orange" />
                    {item.eventDate}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal leading-relaxed">
                  {item.summary}
                </p>

                <ul className="space-y-1 pt-2 border-t border-slate-100">
                  {item.activitiesProvided.map((act) => (
                    <li
                      key={act}
                      className="flex items-center gap-1.5 text-xs text-brand-muted"
                    >
                      <Check className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-5 pb-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className="flex-1 inline-flex min-h-[38px] items-center justify-center rounded-pill border border-slate-200 text-xs font-bold text-brand-navy hover:bg-slate-50 transition-colors"
              >
                상세 보기
              </button>
              <Link
                href={`/contact?eventType=${encodeURIComponent(item.category)}&package=${encodeURIComponent(item.packageUsed)}&character=${encodeURIComponent(item.charactersUsed.join(", "))}`}
                className="flex-1 inline-flex min-h-[38px] items-center justify-center gap-1 rounded-pill bg-brand-navy text-xs font-bold text-white hover:bg-brand-orange transition-colors"
              >
                <span>동일 구성 문의</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* 사례 상세 모달 */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <div className="relative w-full max-w-xl rounded-[24px] bg-white border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="relative">
              <CharacterVisual
                type={selectedItem.visualTheme.characterType}
                className={`w-full h-52 bg-gradient-to-br ${selectedItem.visualTheme.bg}`}
                badgeText={selectedItem.isSample ? "샘플 사례" : "실제 사례"}
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-brand-navy text-white flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="상세 창 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-brand-navy px-2.5 py-0.5 font-bold text-white">
                  {selectedItem.category}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-brand-orange">
                  {selectedItem.packageUsed}
                </span>
              </div>

              <h3
                id="portfolio-modal-title"
                className="text-xl font-extrabold text-brand-navy"
              >
                {selectedItem.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 rounded-xl bg-brand-offwhite border border-slate-200/80 p-3.5 text-xs">
                <div>
                  <span className="text-brand-muted block">장소</span>
                  <span className="font-bold text-brand-navy">{selectedItem.location}</span>
                </div>
                <div>
                  <span className="text-brand-muted block">캐릭터 구성</span>
                  <span className="font-bold text-brand-orange">
                    {selectedItem.charactersUsed.join(" + ")}
                  </span>
                </div>
              </div>

              <ul className="space-y-1.5">
                {selectedItem.activitiesProvided.map((act) => (
                  <li
                    key={act}
                    className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal"
                  >
                    <Check className="h-4 w-4 text-brand-orange shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex gap-2.5">
                <Link
                  href={`/contact?eventType=${encodeURIComponent(selectedItem.category)}&package=${encodeURIComponent(selectedItem.packageUsed)}&character=${encodeURIComponent(selectedItem.charactersUsed.join(", "))}`}
                  className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-pill bg-brand-orange px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#dc5624] transition-colors"
                >
                  <span>동일 구성 상담 신청</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-slate-200 px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-navy hover:bg-slate-50"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

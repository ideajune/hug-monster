"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { CHARACTERS, CharacterCategory } from "@/lib/site-data";
import { CharacterVisual } from "@/components/CharacterVisual";

const CATEGORIES: CharacterCategory[] = [
  "전체",
  "몬스터",
  "동물",
  "귀여운 캐릭터",
  "시즌 캐릭터",
  "기타",
];

export function CharactersDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>("전체");

  const filteredCharacters =
    selectedCategory === "전체"
      ? CHARACTERS
      : CHARACTERS.filter((char) => char.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* 카테고리 필터 탭 */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="캐릭터 유형 필터"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            const count =
              category === "전체"
                ? CHARACTERS.length
                : CHARACTERS.filter((c) => c.category === category).length;

            if (count === 0) return null;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[40px] rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-white border border-slate-200 text-brand-charcoal hover:bg-slate-100"
                }`}
              >
                <span>{category}</span>
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
          <span>교체 가능 샘플 캐릭터 비주얼</span>
        </div>
      </div>

      {/* 캐릭터 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <article
            key={char.id}
            className="group rounded-card bg-white border border-slate-200/90 overflow-hidden shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div>
              <Link href={`/characters/${char.slug}`} className="block">
                <CharacterVisual
                  type={char.visualTheme.characterType}
                  className={`w-full h-64 bg-gradient-to-br ${char.visualTheme.bgGradient}`}
                  badgeText="샘플 비주얼"
                />
              </Link>

              <div className="p-6 space-y-3.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-brand-navy px-2.5 py-0.5 font-bold text-white">
                      {char.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-semibold text-brand-muted">
                      {char.supplyType}
                    </span>
                  </div>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                      char.availabilityStatus === "예약 가능"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    ● {char.availabilityStatus}
                  </span>
                </div>

                <div>
                  <p className="font-display text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                    {char.englishName}
                  </p>
                  <Link href={`/characters/${char.slug}`}>
                    <h2 className="text-xl font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors mt-0.5">
                      {char.name}
                    </h2>
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal leading-relaxed">
                  {char.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {char.moodTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-brand-charcoal"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex flex-wrap gap-x-3 gap-y-1">
                  {char.recommendedEvents.map((ev) => (
                    <span
                      key={ev}
                      className="inline-flex items-center gap-1 text-xs text-brand-muted font-medium"
                    >
                      <Check className="h-3 w-3 text-brand-orange shrink-0" />
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex items-center gap-2">
              <Link
                href={`/characters/${char.slug}`}
                className="flex-1 inline-flex min-h-[42px] items-center justify-center rounded-pill border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-brand-navy hover:bg-slate-50 transition-colors"
              >
                상세 보기
              </Link>
              <Link
                href={`/contact?character=${encodeURIComponent(char.name)}`}
                className="flex-1 inline-flex min-h-[42px] items-center justify-center rounded-pill bg-brand-navy px-4 py-2 text-xs font-bold text-white hover:bg-brand-orange transition-colors"
              >
                이 캐릭터로 상담
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* 맞춤 캐릭터 조달 배너 */}
      <div className="rounded-card bg-brand-navy text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="font-display text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
            50:50 HYBRID SOURCING
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold">
            원하시는 특정 동물·시즌 캐릭터가 있으신가요?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            자체 보유분 외 파트너 조달 네트워크를 통해 행사 콘셉트에 맞는 캐릭터를 섭외해 드립니다.
          </p>
        </div>
        <Link
          href="/contact?character=맞춤 캐릭터 조달 문의"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-pill bg-brand-orange px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#dc5624] transition-colors"
        >
          <span>맞춤 캐릭터 문의</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { CHARACTERS, PORTFOLIOS } from "@/lib/site-data";
import { CharacterVisual } from "@/components/CharacterVisual";
import { CtaBanner } from "@/components/CtaBanner";

export async function generateStaticParams() {
  return CHARACTERS.map((char) => ({
    slug: char.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = CHARACTERS.find((c) => c.slug === slug);
  if (!character) {
    return { title: "캐릭터를 찾을 수 없습니다" };
  }
  return {
    title: `${character.name} — 캐릭터 상세 및 섭외`,
    description: character.summary,
  };
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = CHARACTERS.find((c) => c.slug === slug);

  if (!character) {
    notFound();
  }

  const relatedPortfolios = PORTFOLIOS.filter((pf) =>
    pf.charactersUsed.some((name) => name.includes(character.name.split(" ")[0]))
  );

  const otherCharacters = CHARACTERS.filter((c) => c.slug !== character.slug).slice(0, 3);

  return (
    <div>
      {/* 캐릭터 상세 상단 */}
      <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-container space-y-6">
          <Link
            href="/characters"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-muted hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>캐릭터 목록</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 좌측 비주얼 */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-slate-200 bg-brand-offwhite p-4 shadow-card">
                <CharacterVisual
                  type={character.visualTheme.characterType}
                  className={`w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br ${character.visualTheme.bgGradient}`}
                  badgeText="샘플 비주얼"
                />
                <div className="mt-3 flex items-center justify-between px-2 text-xs text-brand-muted">
                  <span>구분: {character.supplyType}</span>
                  <span>{character.sizeSpec}</span>
                </div>
              </div>
            </div>

            {/* 우측 요약 정보 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-brand-navy px-3 py-1 font-bold text-white">
                  {character.category}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-brand-charcoal">
                  {character.supplyType}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700">
                  ● {character.availabilityStatus}
                </span>
              </div>

              <div>
                <p className="font-display text-xs font-bold text-brand-muted uppercase tracking-wider">
                  {character.englishName}
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-1">
                  {character.name}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-brand-charcoal leading-relaxed">
                {character.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {character.moodTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-brand-navy"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="rounded-2xl bg-brand-offwhite border border-slate-200/80 p-4 space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                    주요 특징
                  </h2>
                  <ul className="space-y-1.5">
                    {character.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-brand-charcoal">
                        <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-brand-offwhite border border-slate-200/80 p-4 space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy">
                    현장 퍼포먼스
                  </h2>
                  <ul className="space-y-1.5">
                    {character.performances.map((perf) => (
                      <li key={perf} className="flex items-start gap-2 text-xs sm:text-sm text-brand-charcoal">
                        <Check className="h-4 w-4 text-brand-navy shrink-0 mt-0.5" />
                        <span>{perf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?character=${encodeURIComponent(character.name)}`}
                  className="flex-1 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-7 py-3 text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#dc5624] transition-all"
                >
                  <span>이 캐릭터로 상담하기</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/package"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-pill border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:bg-slate-50 transition-colors"
                >
                  <span>패키지 가격 확인</span>
                </Link>
              </div>

              <p className="text-xs text-brand-muted flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-orange shrink-0" />
                <span>전문 연기자 배정 · 5대 현장 안전 수칙 준수</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 관련 사례 */}
      {relatedPortfolios.length > 0 && (
        <section className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-container space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
              관련 연출 사례
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedPortfolios.map((pf) => (
                <div
                  key={pf.id}
                  className="rounded-card bg-white border border-slate-200/90 p-5 shadow-card flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-orange">{pf.category}</span>
                      <span className="text-brand-muted">{pf.packageUsed}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-brand-navy">{pf.title}</h3>
                    <p className="text-xs text-brand-muted">{pf.summary}</p>
                  </div>
                  <Link
                    href={`/contact?character=${encodeURIComponent(character.name)}&package=${encodeURIComponent(pf.packageUsed)}`}
                    className="inline-flex min-h-[38px] items-center justify-center gap-1 rounded-pill border border-slate-200 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    <span>동일 구성 문의</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2인 조합 추천 */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200/80 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-container space-y-6">
          <div>
            <span className="font-display text-xs font-bold text-brand-orange uppercase">
              2-CHARACTER SYNERGY
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy mt-1">
              BUSINESS(2인) 패키지 추천 조합
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherCharacters.map((other) => (
              <div
                key={other.id}
                className="rounded-card bg-brand-offwhite border border-slate-200/80 overflow-hidden flex flex-col justify-between"
              >
                <CharacterVisual
                  type={other.visualTheme.characterType}
                  className={`w-full h-44 bg-gradient-to-br ${other.visualTheme.bgGradient}`}
                />
                <div className="p-4 bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-orange">{other.category}</span>
                    <span className="text-brand-muted">{other.supplyType}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-brand-navy">{other.name}</h3>
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={`/characters/${other.slug}`}
                      className="flex-1 inline-flex min-h-[36px] items-center justify-center rounded-pill border border-slate-200 text-xs font-bold text-brand-navy hover:bg-slate-50"
                    >
                      상세
                    </Link>
                    <Link
                      href={`/contact?package=BUSINESS&character=${encodeURIComponent(`${character.name} + ${other.name}`)}`}
                      className="flex-1 inline-flex min-h-[36px] items-center justify-center rounded-pill bg-brand-navy text-xs font-bold text-white hover:bg-brand-orange"
                    >
                      2인 조합 문의
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        variant="navy"
        title={`${character.name} 섭외 가능 일정을 확인해 보세요.`}
        description="희망 날짜와 장소를 남겨주시면 빠르게 가용 여부를 안내해 드립니다."
        buttonText="일정 및 견적 문의"
        href={`/contact?character=${encodeURIComponent(character.name)}`}
      />
    </div>
  );
}

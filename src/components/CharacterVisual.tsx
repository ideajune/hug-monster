"use client";

import React, { useState } from "react";

export type MascotVisualType =
  | "hero"
  | "about"
  | "hugmon"
  | "dino"
  | "bear"
  | "bunny"
  | "rudolph"
  | "lion";

interface CharacterVisualProps {
  type: MascotVisualType;
  className?: string;
  showSampleBadge?: boolean;
  badgeText?: string;
}

const PHOTO_MAP: Record<
  MascotVisualType,
  { src: string; alt: string; objectPosition: string }
> = {
  hero: {
    src: "/images/characters/hero-group.jpg?v=2",
    alt: "야외 행사 현장에서 인형탈 캐릭터들이 밝게 인사하는 모습",
    objectPosition: "50% 22%",
  },
  about: {
    src: "/images/characters/about-group.jpg?v=2",
    alt: "브랜드 프로모션 거리에서 다양한 인형탈 캐릭터들이 함께 인사하는 모습",
    objectPosition: "50% 22%",
  },
  hugmon: {
    src: "/images/characters/hugmon.jpg",
    alt: "허그몬 시그니처 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 24%",
  },
  dino: {
    src: "/images/characters/dino.jpg",
    alt: "다이노 그린 공룡 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 20%",
  },
  bear: {
    src: "/images/characters/bear.jpg",
    alt: "허니 베어 곰 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 20%",
  },
  bunny: {
    src: "/images/characters/bunny.jpg",
    alt: "피치 버니 토끼 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 16%",
  },
  rudolph: {
    src: "/images/characters/rudolph.jpg",
    alt: "시즌 루돌프 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 24%",
  },
  lion: {
    src: "/images/characters/lion.jpg",
    alt: "써니 라이온 사자 인형탈 캐릭터 현장 사진",
    objectPosition: "50% 16%",
  },
};

export function CharacterVisual({
  type,
  className = "w-full h-64",
  showSampleBadge = true,
  badgeText = "현장 인형탈 포토",
}: CharacterVisualProps) {
  const [fallback, setFallback] = useState(false);
  const photo = PHOTO_MAP[type] || PHOTO_MAP.hero;
  const imgSrc = fallback ? PHOTO_MAP.hero.src : photo.src;

  return (
    <div
      className={`relative overflow-hidden select-none bg-slate-100 ${className}`}
    >
      {/* 리얼 인형탈 현장 사진 (얼굴·상반신 중심 포커싱으로 잘림 방지) */}
      <img
        src={imgSrc}
        alt={photo.alt}
        loading="lazy"
        onError={() => {
          if (!fallback) setFallback(true);
        }}
        style={{ objectPosition: photo.objectPosition }}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 하단 미세 그라데이션 (가독성 보강) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

      {/* 절제된 미니멀 배지 */}
      {showSampleBadge && (
        <span className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-slate-900/75 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          {badgeText}
        </span>
      )}
    </div>
  );
}

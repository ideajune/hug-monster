import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CharacterVisual } from "@/components/CharacterVisual";

export default function NotFound() {
  return (
    <div className="py-16 md:py-24 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-xl rounded-[28px] bg-white border-2 border-brand-navy p-8 sm:p-12 shadow-card text-center space-y-6">
        <div className="mx-auto w-48">
          <CharacterVisual
            type="hugmon"
            className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#FFF3B0] to-[#FFD84D]"
            showSampleBadge={false}
          />
        </div>
        <div className="space-y-2">
          <span className="font-display text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            404 PAGE NOT FOUND
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            찾으시는 페이지를 발견하지 못했어요
          </h1>
          <p className="text-sm text-brand-charcoal">
            주소가 변경되었거나 삭제된 페이지입니다. 아래 버튼을 통해 홈이나 상담 페이지로 이동해 주세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:bg-brand-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>홈으로 돌아가기</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-6 py-3 text-sm font-extrabold text-white hover:bg-[#e8772c]"
          >
            <Sparkles className="h-4 w-4" />
            <span>이벤트 상담 문의하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

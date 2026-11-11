"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, ArrowUp } from "lucide-react";

export function FloatingHomeButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={pathname === "/" ? "맨 위로 이동" : "홈으로 바로가기"}
      className={`fixed right-4 bottom-20 md:right-8 md:bottom-8 z-40 inline-flex items-center justify-center gap-1 rounded-full bg-brand-navy/95 backdrop-blur-md border border-white/15 px-3.5 py-3 text-white shadow-lg hover:bg-brand-orange active:scale-95 transition-all duration-200 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <Home className="h-4 w-4 text-brand-yellow shrink-0" />
      <ArrowUp className="h-3.5 w-3.5 text-slate-300 shrink-0" />
    </button>
  );
}

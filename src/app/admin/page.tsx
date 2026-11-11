"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Database,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import type {
  ConnectionDiagnostics,
  InquiryRecord,
  InquiryStatus,
} from "@/lib/inquiry-store";

const STATUS_OPTIONS: InquiryStatus[] = ["신규", "상담 중", "계약 완료", "종료"];

export default function AdminPage() {
  const [passcode, setPasscode] = useState("hugmonster2026");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [diagnostics, setDiagnostics] = useState<ConnectionDiagnostics | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("전체");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDiagnosticsOnly = useCallback(async () => {
    try {
      const res = await fetch("/api/inquiries?diagnostics=1");
      const data = await res.json();
      if (data.diagnostics) {
        setDiagnostics(data.diagnostics);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchDiagnosticsOnly();
  }, [fetchDiagnosticsOnly]);

  const loadInquiries = useCallback(
    async (codeToUse: string) => {
      setLoading(true);
      setAuthError(null);
      try {
        const res = await fetch("/api/inquiries", {
          headers: { "x-admin-passcode": codeToUse },
        });
        const data = await res.json();

        if (!res.ok || !data.ok) {
          setAuthenticated(false);
          setAuthError(data.error || "관리자 인증에 실패했습니다.");
          if (data.diagnostics) setDiagnostics(data.diagnostics);
          setLoading(false);
          return;
        }

        setAuthenticated(true);
        setInquiries(data.records || []);
        setDiagnostics(data.diagnostics || null);
        setWarning(data.errorWarning || null);
      } catch (err) {
        setAuthError(
          err instanceof Error ? err.message : "문의 목록 조회 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loadInquiries(passcode);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.record) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredInquiries =
    statusFilter === "전체"
      ? inquiries
      : inquiries.filter((item) => item.status === statusFilter);

  return (
    <div className="py-12 md:py-16 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-container space-y-8">
        {/* 상단 타이틀 바 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-navy/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-display font-bold text-brand-orange uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>HUG MONSTER ADMIN CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-navy">
              관리자 문의 내역 및 시스템 연결 관리
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>홈페이지로 돌아가기</span>
          </Link>
        </div>

        {/* 데이터베이스 및 외부 서비스 연결 상태 진단 패널 (마스터 프롬프트 6번·12번 준수) */}
        {diagnostics && (
          <div
            className={`rounded-card border-2 p-6 sm:p-7 space-y-4 ${
              diagnostics.supabaseConfigured
                ? "bg-emerald-50/70 border-emerald-600/30"
                : "bg-brand-yellow/25 border-brand-navy"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Database className="h-6 w-6 text-brand-navy shrink-0" />
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-brand-navy">
                    데이터베이스 및 외부 서비스 연결 상태
                  </h2>
                  <p className="text-xs text-brand-charcoal">
                    실제 환경변수 설정 여부를 실시간으로 점검하여 투명하게 표시합니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                    diagnostics.supabaseConfigured
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-navy text-brand-yellow"
                  }`}
                >
                  {diagnostics.supabaseConfigured
                    ? "● Supabase 클라우드 DB 연결됨"
                    : "● Supabase 미설정 (로컬 파일 DB 폴백 작동 중)"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    diagnostics.gaConfigured
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-white border border-brand-navy/15 text-brand-muted"
                  }`}
                >
                  {diagnostics.gaConfigured ? "GA4 연결됨" : "GA4 측정 ID 미설정"}
                </span>
              </div>
            </div>

            {!diagnostics.supabaseConfigured && (
              <div className="rounded-2xl bg-white border border-brand-navy/15 p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2 text-brand-navy font-bold">
                  <AlertTriangle className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>
                    현재 Supabase 환경변수({diagnostics.missingEnvVars.join(", ")})가 설정되지 않아, 문의 데이터가 서버 내{" "}
                    <code className="font-mono bg-brand-lightgray px-1.5 py-0.5 rounded">
                      data/inquiries.json
                    </code>{" "}
                    파일에 저장·조회되고 있습니다.
                  </span>
                </div>
                <div className="space-y-1 text-xs text-brand-charcoal pl-6">
                  <p className="font-bold text-brand-navy">Supabase 실제 연결 방법:</p>
                  {diagnostics.setupGuide.map((step) => (
                    <p key={step}>{step}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 관리자 인증 화면 (ADM-01) */}
        {!authenticated ? (
          <form
            onSubmit={handleLogin}
            className="max-w-md mx-auto rounded-card bg-white border-2 border-brand-navy p-7 sm:p-8 shadow-card space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-navy text-brand-yellow flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-brand-navy">
                  관리자 인증 (ADM-01)
                </h2>
                <p className="text-xs text-brand-muted">
                  문의 데이터를 열람하려면 관리자 패스코드를 입력하세요.
                </p>
              </div>
            </div>

            {authError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-bold text-red-600">
                {authError}
              </div>
            )}

            <div>
              <label
                htmlFor="admin_passcode"
                className="block text-xs font-extrabold text-brand-navy mb-1.5"
              >
                관리자 패스코드
              </label>
              <input
                id="admin_passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full min-h-[46px] rounded-xl border border-brand-navy/20 bg-brand-offwhite px-4 py-2.5 text-sm font-mono"
                placeholder="관리자 패스코드 입력"
              />
              <p className="text-[11px] text-brand-muted mt-1.5">
                * 초기 테스트 편의를 위해 기본 패스코드(<code className="font-mono">hugmonster2026</code>)가 자동 입력되어 있습니다. 운영 배포 시 <code className="font-mono">.env.local</code>의 <code className="font-mono">ADMIN_PASSCODE</code>를 변경하세요.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-pill bg-brand-navy px-6 py-3 text-sm font-extrabold text-white hover:bg-brand-orange transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{loading ? "확인 중..." : "문의 내역 열람하기"}</span>
            </button>
          </form>
        ) : (
          /* 문의 내역 대시보드 (ADM-02, ADM-03) */
          <div className="space-y-6">
            {warning && (
              <div className="rounded-xl bg-amber-50 border border-amber-300 p-4 text-xs font-semibold text-amber-900">
                {warning}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["전체", ...STATUS_OPTIONS].map((status) => {
                  const active = statusFilter === status;
                  const count =
                    status === "전체"
                      ? inquiries.length
                      : inquiries.filter((i) => i.status === status).length;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`min-h-[40px] rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                        active
                          ? "bg-brand-navy text-brand-yellow"
                          : "bg-white border border-brand-navy/15 text-brand-charcoal hover:bg-brand-yellow/25"
                      }`}
                    >
                      {status} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadInquiries(passcode)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-pill border border-brand-navy/20 bg-white px-4 py-2 text-xs font-bold text-brand-navy hover:bg-brand-lightgray"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>새로고침</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-pill bg-brand-orange px-4 py-2 text-xs font-bold text-white hover:bg-[#e8772c]"
                >
                  <span>+ 신규 문의 테스트 등록</span>
                </Link>
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="rounded-card bg-white border border-brand-navy/10 p-12 text-center text-sm text-brand-muted">
                해당 상태의 문의 내역이 없습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-card bg-white border border-brand-navy/15 p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-navy/10 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.is_sample ? (
                          <span className="rounded-full bg-brand-lightgray px-2.5 py-0.5 text-[11px] font-bold text-brand-muted">
                            샘플 데이터
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            실제 접수 문의
                          </span>
                        )}
                        <span className="rounded-full bg-brand-yellow/40 px-3 py-0.5 text-xs font-extrabold text-brand-navy">
                          {item.event_type}
                        </span>
                        {item.package_type && (
                          <span className="rounded-full bg-brand-navy px-3 py-0.5 text-xs font-bold text-brand-yellow">
                            {item.package_type}
                          </span>
                        )}
                        <span className="text-xs text-brand-muted">
                          접수일: {new Date(item.created_at).toLocaleString("ko-KR")}
                        </span>
                      </div>

                      {/* 상태 변경 드롭다운 (ADM-03) */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`status-${item.id}`}
                          className="text-xs font-bold text-brand-muted"
                        >
                          진행 상태:
                        </label>
                        <select
                          id={`status-${item.id}`}
                          disabled={updatingId === item.id}
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as InquiryStatus)
                          }
                          className="rounded-full border-2 border-brand-navy bg-brand-offwhite px-3 py-1 text-xs font-extrabold text-brand-navy"
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* 고객 및 연락처 */}
                      <div className="md:col-span-4 space-y-2">
                        <h3 className="text-lg font-extrabold text-brand-navy">
                          {item.contact_name}
                        </h3>
                        {item.company_name && (
                          <p className="text-xs font-semibold text-brand-muted">
                            업체명: {item.company_name}
                          </p>
                        )}
                        <div className="space-y-1 text-xs pt-1">
                          <a
                            href={`tel:${item.phone}`}
                            className="flex items-center gap-1.5 font-bold text-brand-navy hover:text-brand-orange"
                          >
                            <Phone className="h-3.5 w-3.5 text-brand-orange" />
                            <span>{item.phone}</span>
                          </a>
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="flex items-center gap-1.5 text-brand-charcoal hover:text-brand-orange"
                            >
                              <Mail className="h-3.5 w-3.5 text-brand-navy" />
                              <span>{item.email}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* 행사 세부 정보 */}
                      <div className="md:col-span-8 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl bg-brand-offwhite border border-brand-navy/10 p-3.5 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                            <span>
                              <strong>희망일:</strong> {item.event_date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-brand-navy shrink-0" />
                            <span>
                              <strong>시간:</strong> {item.event_duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                            <span>
                              <strong>장소:</strong> {item.event_location}
                            </span>
                          </div>
                        </div>

                        {(item.preferred_character || item.budget) && (
                          <div className="flex flex-wrap gap-4 text-xs text-brand-charcoal">
                            {item.preferred_character && (
                              <span>
                                <strong>희망 캐릭터:</strong> {item.preferred_character}
                              </span>
                            )}
                            {item.budget && (
                              <span>
                                <strong>예상 예산:</strong> {item.budget}
                              </span>
                            )}
                          </div>
                        )}

                        {item.message && (
                          <div className="rounded-xl bg-brand-lightgray/60 p-3.5 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
                            {item.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

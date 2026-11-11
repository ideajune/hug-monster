"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Database,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { CHARACTERS, PACKAGES, SERVICES } from "@/lib/site-data";

interface FieldErrors {
  contact_name?: string;
  phone?: string;
  email?: string;
  event_type?: string;
  event_date?: string;
  event_location?: string;
  event_duration?: string;
  privacy_consent?: string;
}

export function ContactForm() {
  const searchParams = useSearchParams();

  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [packageType, setPackageType] = useState("");
  const [preferredCharacter, setPreferredCharacter] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<{
    id: string;
    contact_name: string;
    storage_source?: "supabase" | "local_file";
    supabaseConfigured: boolean;
  } | null>(null);

  // URL 쿼리 파라미터(character, package, eventType) 자동 반영 (CHA-05, SER-04)
  useEffect(() => {
    const qChar = searchParams.get("character");
    const qPkg = searchParams.get("package");
    const qEvent = searchParams.get("eventType");

    if (qChar) setPreferredCharacter(qChar);
    if (qPkg) {
      if (qPkg.toUpperCase().includes("STARTER")) {
        setPackageType("STARTER (199,000원)");
        if (!eventDuration) setEventDuration("2시간 (STARTER 기본)");
      } else if (qPkg.toUpperCase().includes("BUSINESS")) {
        setPackageType("BUSINESS (349,000원 · 추천)");
        if (!eventDuration) setEventDuration("3시간 (BUSINESS 기본)");
      } else if (qPkg.toUpperCase().includes("PREMIUM")) {
        setPackageType("PREMIUM (별도 견적)");
      } else {
        setPackageType(qPkg);
      }
    }
    if (qEvent) setEventType(qEvent);
  }, [searchParams, eventDuration]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!contactName.trim()) {
      errors.contact_name = "업체명 또는 담당자 성함을 입력해 주세요.";
    }
    if (!phone.trim()) {
      errors.phone = "연락 받으실 전화번호를 입력해 주세요.";
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(phone.trim())) {
      errors.phone = "유효한 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "올바른 이메일 주소를 입력해 주세요.";
    }
    if (!eventType.trim()) {
      errors.event_type = "행사 유형을 선택해 주세요.";
    }
    if (!eventDate.trim()) {
      errors.event_date = "행사 희망 날짜를 선택해 주세요.";
    }
    if (!eventLocation.trim()) {
      errors.event_location = "행사 장소(지역 또는 주소)를 입력해 주세요.";
    }
    if (!eventDuration.trim()) {
      errors.event_duration = "예상 행사 시간을 선택 또는 입력해 주세요.";
    }
    if (!privacyConsent) {
      errors.privacy_consent = "상담 진행을 위해 개인정보 수집 및 이용에 동의해 주세요.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_name: contactName,
          company_name: companyName,
          phone,
          email,
          event_type: eventType,
          event_date: eventDate,
          event_location: eventLocation,
          event_duration: eventDuration,
          package_type: packageType,
          preferred_character: preferredCharacter,
          budget,
          message,
          privacy_consent: privacyConsent,
          honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitError(data.error || "문의 접수 중 오류가 발생했습니다.");
        setSubmitting(false);
        return;
      }

      // GA4 전환 이벤트 전송 (prd.md 10-5)
      if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag("event", "generate_lead", {
          event_category: "inquiry",
          event_label: packageType || eventType,
        });
      }

      setSubmittedRecord({
        id: data.record.id,
        contact_name: data.record.contact_name,
        storage_source: data.record.storage_source,
        supabaseConfigured: Boolean(data.diagnostics?.supabaseConfigured),
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setContactName("");
    setCompanyName("");
    setPhone("");
    setEmail("");
    setEventType("");
    setEventDate("");
    setEventLocation("");
    setEventDuration("");
    setPackageType("");
    setPreferredCharacter("");
    setBudget("");
    setMessage("");
    setPrivacyConsent(false);
    setFieldErrors({});
  };

  // 제출 완료 화면 (CON-04)
  if (submittedRecord) {
    return (
      <div className="rounded-[28px] bg-white border border-brand-navy/10 p-8 sm:p-12 shadow-card text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-white">
          <CheckCircle2 className="h-9 w-9 text-brand-orange" />
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full bg-brand-navy px-3.5 py-1 text-xs font-display font-bold text-white">
            INQUIRY RECEIVED
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            {submittedRecord.contact_name}님, 문의가 접수되었습니다.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted max-w-md mx-auto">
            일정·캐릭터 가용성 확인 후 빠르게 연락드리겠습니다.
          </p>
        </div>

        {/* 데이터베이스 저장 상태 투명 안내 */}
        <div className="max-w-lg mx-auto rounded-2xl bg-brand-offwhite border border-brand-navy/10 p-4 text-left space-y-1.5 text-xs">
          <div className="flex items-center justify-between font-bold text-brand-navy">
            <span className="flex items-center gap-1.5">
              <Database className="h-4 w-4 text-brand-orange" />
              저장 상태
            </span>
            <span className="rounded-full bg-brand-navy text-white px-2.5 py-0.5 text-[11px]">
              {submittedRecord.supabaseConfigured
                ? "Supabase DB 저장 완료"
                : "로컬 DB (data/inquiries.json) 저장 완료"}
            </span>
          </div>
          <p className="text-brand-muted">
            접수 번호: <code className="font-mono text-brand-navy">{submittedRecord.id}</code>
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/admin"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:bg-brand-orange transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>관리자 페이지 확인</span>
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border border-brand-navy/20 bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:bg-brand-lightgray transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>추가 문의 작성</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] bg-white border border-brand-navy/10 p-6 sm:p-10 shadow-card space-y-6"
    >
      <div className="border-b border-brand-navy/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
            행사 상담 및 견적 요청서
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            <span className="text-brand-orange font-bold">*</span> 필수 입력 항목
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-offwhite border border-brand-navy/10 px-3 py-1 text-xs font-bold text-brand-navy self-start sm:self-auto">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
          영업일 당일 회신
        </span>
      </div>

      {/* 스팸 방지 허니팟 (화면 숨김) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Website</label>
        <input
          id="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-2.5 text-sm text-red-700"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. 고객 기본 정보 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact_name"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            업체명 또는 담당자명 <span className="text-brand-orange">*</span>
          </label>
          <input
            id="contact_name"
            type="text"
            required
            placeholder="예: 캡틴 파스타 강남점 / 홍길동 점장"
            value={contactName}
            onChange={(e) => {
              setContactName(e.target.value);
              if (fieldErrors.contact_name) {
                setFieldErrors((prev) => ({ ...prev, contact_name: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:outline-none ${
              fieldErrors.contact_name
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          />
          {fieldErrors.contact_name && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.contact_name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            연락처 (휴대폰 또는 유선) <span className="text-brand-orange">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="예: 010-1234-5678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (fieldErrors.phone) {
                setFieldErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:outline-none ${
              fieldErrors.phone
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          />
          {fieldErrors.phone && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.phone}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            이메일 <span className="text-xs font-normal text-brand-muted">(선택 · 견적서 수신용)</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="예: manager@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:outline-none ${
              fieldErrors.email
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="event_type"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            행사 유형 <span className="text-brand-orange">*</span>
          </label>
          <select
            id="event_type"
            required
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              if (fieldErrors.event_type) {
                setFieldErrors((prev) => ({ ...prev, event_type: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal focus:outline-none ${
              fieldErrors.event_type
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          >
            <option value="">행사 유형을 선택해 주세요</option>
            {SERVICES.map((svc) => (
              <option key={svc.id} value={svc.title}>
                {svc.title}
              </option>
            ))}
            <option value="병원·학원 친화 캠페인">병원·학원 친화 캠페인</option>
            <option value="기타 맞춤 이벤트">기타 맞춤 이벤트</option>
          </select>
          {fieldErrors.event_type && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.event_type}</span>
            </p>
          )}
        </div>
      </div>

      {/* 2. 행사 일정 및 장소 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        <div>
          <label
            htmlFor="event_date"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            행사 희망 날짜 <span className="text-brand-orange">*</span>
          </label>
          <input
            id="event_date"
            type="date"
            required
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
              if (fieldErrors.event_date) {
                setFieldErrors((prev) => ({ ...prev, event_date: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal focus:outline-none ${
              fieldErrors.event_date
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          />
          {fieldErrors.event_date && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.event_date}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="event_location"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            행사 장소 (지역/상권) <span className="text-brand-orange">*</span>
          </label>
          <input
            id="event_location"
            type="text"
            required
            placeholder="예: 서울 강남구 역삼역 인근"
            value={eventLocation}
            onChange={(e) => {
              setEventLocation(e.target.value);
              if (fieldErrors.event_location) {
                setFieldErrors((prev) => ({ ...prev, event_location: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:outline-none ${
              fieldErrors.event_location
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          />
          {fieldErrors.event_location && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.event_location}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="event_duration"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            예상 행사 시간 <span className="text-brand-orange">*</span>
          </label>
          <select
            id="event_duration"
            required
            value={eventDuration}
            onChange={(e) => {
              setEventDuration(e.target.value);
              if (fieldErrors.event_duration) {
                setFieldErrors((prev) => ({ ...prev, event_duration: undefined }));
              }
            }}
            className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-brand-charcoal focus:outline-none ${
              fieldErrors.event_duration
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/20 bg-brand-offwhite focus:border-brand-navy"
            }`}
          >
            <option value="">예상 시간을 선택해 주세요</option>
            <option value="2시간 (STARTER 기본)">2시간 (STARTER 기본)</option>
            <option value="3시간 (BUSINESS 기본)">3시간 (BUSINESS 기본)</option>
            <option value="4시간 이상 (반일 운영)">4시간 이상 (반일 운영)</option>
            <option value="종일 또는 다회차 행사">종일 또는 다회차 행사</option>
            <option value="상담 후 결정">상담 후 결정</option>
          </select>
          {fieldErrors.event_duration && (
            <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.event_duration}</span>
            </p>
          )}
        </div>
      </div>

      {/* 3. 선택 항목: 희망 패키지 / 캐릭터 / 예산 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        <div>
          <label
            htmlFor="package_type"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            희망 패키지 <span className="text-xs font-normal text-brand-muted">(선택)</span>
          </label>
          <select
            id="package_type"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-brand-navy/20 bg-brand-offwhite px-4 py-3 text-sm text-brand-charcoal focus:border-brand-navy focus:outline-none"
          >
            <option value="">상담 후 결정</option>
            {PACKAGES.map((pkg) => (
              <option key={pkg.id} value={`${pkg.name} (${pkg.priceText})`}>
                {pkg.name} — {pkg.priceText} ({pkg.characterCount}, {pkg.duration})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="preferred_character"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            희망 캐릭터 <span className="text-xs font-normal text-brand-muted">(선택)</span>
          </label>
          <input
            id="preferred_character"
            type="text"
            list="character-options"
            placeholder="선택 또는 직접 입력"
            value={preferredCharacter}
            onChange={(e) => setPreferredCharacter(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-brand-navy/20 bg-brand-offwhite px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:border-brand-navy focus:outline-none"
          />
          <datalist id="character-options">
            {CHARACTERS.map((char) => (
              <option key={char.id} value={char.name} />
            ))}
            <option value="허그몬 + 다이노 그린 (2인 조합)" />
            <option value="상담 시 추천 희망" />
          </datalist>
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-extrabold text-brand-navy mb-1.5"
          >
            예상 예산 범위 <span className="text-xs font-normal text-brand-muted">(선택)</span>
          </label>
          <input
            id="budget"
            type="text"
            placeholder="예: 20만원~35만원 / 별도 협의"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-brand-navy/20 bg-brand-offwhite px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:border-brand-navy focus:outline-none"
          />
        </div>
      </div>

      {/* 4. 문의 내용 */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-extrabold text-brand-navy mb-1.5"
        >
          세부 문의 및 요청사항 <span className="text-xs font-normal text-brand-muted">(선택)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="홍보하고 싶은 핵심 메시지(예: 오픈 기념 20% 할인), 희망 시간대(예: 12시~15시), 추가 옵션 요청사항 등을 자유롭게 적어주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-brand-navy/20 bg-brand-offwhite p-4 text-sm text-brand-charcoal placeholder:text-brand-muted/60 focus:border-brand-navy focus:outline-none"
        />
      </div>

      {/* 5. 개인정보 수집 및 이용 동의 (CON-03) */}
      <div className="rounded-2xl bg-brand-lightgray/70 border border-brand-navy/10 p-4 sm:p-5 space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => {
              setPrivacyConsent(e.target.checked);
              if (fieldErrors.privacy_consent) {
                setFieldErrors((prev) => ({ ...prev, privacy_consent: undefined }));
              }
            }}
            className="mt-1 h-5 w-5 rounded border-brand-navy text-brand-orange focus:ring-brand-orange"
          />
          <span className="text-xs sm:text-sm text-brand-charcoal leading-relaxed">
            <strong className="text-brand-navy">[필수] 개인정보 수집 및 이용에 동의합니다.</strong>{" "}
            수집 항목: 담당자명/업체명, 연락처, 이메일, 행사 문의 정보 · 수집 목적: 이벤트 상담 및 견적 안내 · 보유 기간: 상담 완료 후 1년 (또는 파기 요청 시 즉시 파기).{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-brand-orange font-bold underline underline-offset-2"
            >
              개인정보 처리방침 전문 보기
            </Link>
          </span>
        </label>
        {fieldErrors.privacy_consent && (
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1 pl-8">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{fieldErrors.privacy_consent}</span>
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-pill bg-brand-orange px-8 py-4 text-base sm:text-lg font-extrabold text-white shadow-md hover:bg-[#e8772c] disabled:opacity-60 transition-all"
      >
        <Send className="h-5 w-5" />
        <span>{submitting ? "문의 내용을 저장하고 있습니다..." : "무료 상담 및 견적 문의 제출하기"}</span>
      </button>
    </form>
  );
}

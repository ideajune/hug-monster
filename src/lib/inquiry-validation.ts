export const PHONE_REGEX = /^[0-9+\-\s()]{8,20}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InquiryFormInput {
  contact_name: string;
  company_name?: string;
  phone: string;
  email?: string;
  event_type: string;
  event_date: string;
  event_location: string;
  event_duration: string;
  package_type?: string;
  preferred_character?: string;
  budget?: string;
  message?: string;
  privacy_consent: boolean;
}

export interface InquiryFieldErrors {
  contact_name?: string;
  phone?: string;
  email?: string;
  event_type?: string;
  event_date?: string;
  event_location?: string;
  event_duration?: string;
  privacy_consent?: string;
}

export function validateInquiryFields(input: InquiryFormInput): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};

  if (!input.contact_name.trim()) {
    errors.contact_name = "업체명 또는 담당자 성함을 입력해 주세요.";
  }

  const trimmedPhone = input.phone.trim();
  if (!trimmedPhone) {
    errors.phone = "연락 받으실 전화번호를 입력해 주세요.";
  } else if (!PHONE_REGEX.test(trimmedPhone)) {
    errors.phone = "유효한 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)";
  }

  const trimmedEmail = (input.email || "").trim();
  if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "올바른 이메일 주소를 입력해 주세요.";
  }

  if (!input.event_type.trim()) {
    errors.event_type = "행사 유형을 선택해 주세요.";
  }

  if (!input.event_date.trim()) {
    errors.event_date = "행사 희망 날짜를 선택해 주세요.";
  }

  if (!input.event_location.trim()) {
    errors.event_location = "행사 장소(지역 또는 주소)를 입력해 주세요.";
  }

  if (!input.event_duration.trim()) {
    errors.event_duration = "예상 행사 시간을 선택 또는 입력해 주세요.";
  }

  if (!input.privacy_consent) {
    errors.privacy_consent = "상담 진행을 위해 개인정보 수집 및 이용에 동의해 주세요.";
  }

  return errors;
}

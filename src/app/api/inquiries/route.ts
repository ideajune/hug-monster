import { NextRequest, NextResponse } from "next/server";
import {
  createInquiry,
  getConnectionDiagnostics,
  listInquiries,
} from "@/lib/inquiry-store";

function isAuthorizedAdmin(req: NextRequest): boolean {
  const headerPass = req.headers.get("x-admin-passcode") || "";
  const expectedPass = process.env.ADMIN_PASSCODE || "hugmonster2026";
  return headerPass === expectedPass;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("diagnostics") === "1") {
    return NextResponse.json({
      ok: true,
      diagnostics: getConnectionDiagnostics(),
    });
  }

  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      {
        ok: false,
        error: "관리자 인증이 필요합니다. 올바른 관리자 패스코드를 입력해 주세요.",
        diagnostics: getConnectionDiagnostics(),
      },
      { status: 401 }
    );
  }

  try {
    const result = await listInquiries();
    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "문의 목록을 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 스팸 방지 허니팟 검증 (CON-07)
    if (body.honeypot && String(body.honeypot).trim() !== "") {
      return NextResponse.json(
        { ok: false, error: "비정상적인 제출 요청이 감지되었습니다." },
        { status: 400 }
      );
    }

    const contact_name = String(body.contact_name || "").trim();
    const company_name = String(body.company_name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const event_type = String(body.event_type || "").trim();
    const event_date = String(body.event_date || "").trim();
    const event_location = String(body.event_location || "").trim();
    const event_duration = String(body.event_duration || "").trim();
    const package_type = String(body.package_type || "").trim();
    const preferred_character = String(body.preferred_character || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();
    const privacy_consent = Boolean(body.privacy_consent);

    // 필수값 검증 (CON-02, CON-03)
    const missingFields: string[] = [];
    if (!contact_name) missingFields.push("업체명 또는 담당자명");
    if (!phone) missingFields.push("연락처");
    if (!event_type) missingFields.push("행사 유형");
    if (!event_date) missingFields.push("희망 날짜");
    if (!event_location) missingFields.push("행사 장소");
    if (!event_duration) missingFields.push("예상 행사 시간");
    if (!privacy_consent) missingFields.push("개인정보 수집 및 이용 동의");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: `필수 항목을 확인해 주세요: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          ok: false,
          error: "유효한 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)",
        },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "이메일 형식이 올바르지 않습니다.",
        },
        { status: 400 }
      );
    }

    const { record, diagnostics } = await createInquiry({
      contact_name,
      company_name,
      phone,
      email,
      event_type,
      event_date,
      event_location,
      event_duration,
      package_type,
      preferred_character,
      budget,
      message,
      privacy_consent,
    });

    return NextResponse.json({
      ok: true,
      record,
      diagnostics,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "문의 저장 중 서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { createInquiry, listInquiries } from "@/lib/inquiry-store";
import { validateInquiryFields } from "@/lib/inquiry-validation";

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        ok: false,
        error: auth.errorMessage || "관리자 인증이 필요합니다.",
      },
      { status: auth.statusCode || 401 }
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

    const input = {
      contact_name: String(body.contact_name || "").trim(),
      company_name: String(body.company_name || "").trim(),
      phone: String(body.phone || "").trim(),
      email: String(body.email || "").trim(),
      event_type: String(body.event_type || "").trim(),
      event_date: String(body.event_date || "").trim(),
      event_location: String(body.event_location || "").trim(),
      event_duration: String(body.event_duration || "").trim(),
      package_type: String(body.package_type || "").trim(),
      preferred_character: String(body.preferred_character || "").trim(),
      budget: String(body.budget || "").trim(),
      message: String(body.message || "").trim(),
      privacy_consent: Boolean(body.privacy_consent),
    };

    // 공통 유효성 검증 수행
    const fieldErrors = validateInquiryFields(input);
    const firstError = Object.values(fieldErrors)[0];
    if (firstError) {
      return NextResponse.json(
        { ok: false, error: firstError, fieldErrors },
        { status: 400 }
      );
    }

    const { record } = await createInquiry(input);

    return NextResponse.json({
      ok: true,
      record: {
        id: record.id,
        contact_name: record.contact_name,
      },
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

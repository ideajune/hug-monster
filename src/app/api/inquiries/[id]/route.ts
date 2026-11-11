import { NextRequest, NextResponse } from "next/server";
import { InquiryStatus, updateInquiryStatus } from "@/lib/inquiry-store";

const ALLOWED_STATUSES: InquiryStatus[] = ["신규", "상담 중", "계약 완료", "종료"];

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const headerPass = req.headers.get("x-admin-passcode") || "";
  const expectedPass = process.env.ADMIN_PASSCODE || "hugmonster2026";
  if (headerPass !== expectedPass) {
    return NextResponse.json(
      { ok: false, error: "관리자 인증 권한이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await req.json();
    const status = body.status as InquiryStatus;

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { ok: false, error: "유효하지 않은 상태 값입니다." },
        { status: 400 }
      );
    }

    const result = await updateInquiryStatus(id, status);
    if (!result.record) {
      return NextResponse.json(
        { ok: false, error: "해당 문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "상태 업데이트 실패",
      },
      { status: 500 }
    );
  }
}

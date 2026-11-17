import crypto from "crypto";
import { NextRequest } from "next/server";

export interface AdminAuthResult {
  authorized: boolean;
  errorMessage?: string;
  statusCode?: number;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyAdminRequest(req: NextRequest): AdminAuthResult {
  const headerPass = (req.headers.get("x-admin-passcode") || "").trim();
  const configuredPass = (process.env.ADMIN_PASSCODE || "").trim();

  // 프로덕션 배포 환경에서는 환경변수 ADMIN_PASSCODE 미설정 시 기본 비밀번호 폴백을 허용하지 않음
  const expectedPass =
    configuredPass || (process.env.NODE_ENV !== "production" ? "hugmonster2026" : "");

  if (!expectedPass) {
    return {
      authorized: false,
      errorMessage:
        "서버에 ADMIN_PASSCODE 환경변수가 설정되지 않았습니다. 배포 환경변수에 관리자 패스코드를 등록해 주세요.",
      statusCode: 503,
    };
  }

  if (!headerPass || !safeEqual(headerPass, expectedPass)) {
    return {
      authorized: false,
      errorMessage: "관리자 패스코드가 올바르지 않습니다.",
      statusCode: 401,
    };
  }

  return { authorized: true };
}

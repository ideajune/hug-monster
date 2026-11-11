import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export type InquiryStatus = "신규" | "상담 중" | "계약 완료" | "종료";

export interface InquiryRecord {
  id: string;
  contact_name: string;
  company_name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  event_location: string;
  event_duration: string;
  package_type: string;
  preferred_character: string;
  budget: string;
  message: string;
  privacy_consent: boolean;
  status: InquiryStatus;
  created_at: string;
  is_sample?: boolean;
  storage_source?: "supabase" | "local_file";
}

export interface ConnectionDiagnostics {
  mode: "supabase" | "local_file_fallback";
  supabaseConfigured: boolean;
  missingEnvVars: string[];
  gaConfigured: boolean;
  adminPasscodeCustom: boolean;
  setupGuide: string[];
}

const LOCAL_DB_DIR = path.join(process.cwd(), "data");
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, "inquiries.json");

function isRealEnvValue(val: string | undefined): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (
    trimmed === "" ||
    trimmed.includes("your-project-id") ||
    trimmed.includes("your-supabase") ||
    trimmed === "G-XXXXXXXXXX"
  ) {
    return false;
  }
  return true;
}

export function getConnectionDiagnostics(): ConnectionDiagnostics {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const missingEnvVars: string[] = [];
  if (!isRealEnvValue(url)) missingEnvVars.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!isRealEnvValue(anonKey)) missingEnvVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!isRealEnvValue(serviceKey)) missingEnvVars.push("SUPABASE_SERVICE_ROLE_KEY");

  const supabaseConfigured = isRealEnvValue(url) && (isRealEnvValue(serviceKey) || isRealEnvValue(anonKey));

  return {
    mode: supabaseConfigured ? "supabase" : "local_file_fallback",
    supabaseConfigured,
    missingEnvVars,
    gaConfigured: isRealEnvValue(gaId),
    adminPasscodeCustom: Boolean(process.env.ADMIN_PASSCODE && process.env.ADMIN_PASSCODE !== "hugmonster2026"),
    setupGuide: [
      "1. 루트 경로의 .env.example 파일을 복사하여 .env.local 파일을 생성합니다.",
      "2. Supabase 프로젝트 대시보드 → Settings → API에서 Project URL과 anon / service_role 키를 복사해 입력합니다.",
      "3. Supabase SQL Editor에서 supabase/schema.sql 스크립트를 실행하여 inquiries 등 테이블을 생성합니다.",
      "4. 개발 서버(npm run dev)를 재시작하거나 Vercel 환경변수에 등록하면 즉시 Supabase 클라우드 DB 모드로 전환됩니다.",
    ],
  };
}

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

const INITIAL_SAMPLE_INQUIRIES: InquiryRecord[] = [
  {
    id: "sample-inq-001",
    contact_name: "김민수 점장 (샘플 데이터)",
    company_name: "브런치카페 선샤인 역삼점",
    phone: "010-1234-5678",
    email: "sunshine@example.com",
    event_type: "매장 오픈 이벤트",
    event_date: "2026-11-25",
    event_location: "서울 강남구 역삼역 3번 출구 인근",
    event_duration: "3시간 (11:30~14:30)",
    package_type: "BUSINESS (349,000원)",
    preferred_character: "허그몬 (HUGMON) + 다이노 그린 (DINO)",
    budget: "350,000원",
    message: "[샘플 문의 데이터] 신규 오픈 첫날 점심시간 직장인 대상 오픈 할인 쿠폰 배포 및 매장 앞 포토타임 문의드립니다.",
    privacy_consent: true,
    status: "상담 중",
    created_at: "2026-11-09T10:30:00.000Z",
    is_sample: true,
    storage_source: "local_file",
  },
  {
    id: "sample-inq-002",
    contact_name: "박지영 원장 (샘플 데이터)",
    company_name: "미소가득 어린이치과",
    phone: "010-9876-5432",
    email: "smilekids@example.com",
    event_type: "병원·학원 캠페인",
    event_date: "2026-12-05",
    event_location: "경기 성남시 분당구 정자동",
    event_duration: "2시간 (10:30~12:30)",
    package_type: "STARTER (199,000원)",
    preferred_character: "허니 베어 (HONEY BEAR)",
    budget: "200,000원",
    message: "[샘플 문의 데이터] 토요일 오전 내원 어린이들과 병원 입구에서 인사 및 포토타임을 진행하고 싶습니다.",
    privacy_consent: true,
    status: "신규",
    created_at: "2026-11-10T02:15:00.000Z",
    is_sample: true,
    storage_source: "local_file",
  },
];

async function readLocalInquiries(): Promise<InquiryRecord[]> {
  try {
    await fs.mkdir(LOCAL_DB_DIR, { recursive: true });
    const raw = await fs.readFile(LOCAL_DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_INQUIRIES;
  } catch {
    await fs.mkdir(LOCAL_DB_DIR, { recursive: true });
    await fs.writeFile(LOCAL_DB_FILE, JSON.stringify(INITIAL_SAMPLE_INQUIRIES, null, 2), "utf-8");
    return INITIAL_SAMPLE_INQUIRIES;
  }
}

async function writeLocalInquiries(records: InquiryRecord[]): Promise<void> {
  await fs.mkdir(LOCAL_DB_DIR, { recursive: true });
  await fs.writeFile(LOCAL_DB_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export async function createInquiry(
  input: Omit<InquiryRecord, "id" | "status" | "created_at" | "storage_source">
): Promise<{ record: InquiryRecord; diagnostics: ConnectionDiagnostics }> {
  const diagnostics = getConnectionDiagnostics();

  if (diagnostics.supabaseConfigured) {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          contact_name: input.contact_name,
          company_name: input.company_name || "",
          phone: input.phone,
          email: input.email || "",
          event_type: input.event_type,
          event_date: input.event_date,
          event_location: input.event_location,
          event_duration: input.event_duration,
          package_type: input.package_type || "",
          preferred_character: input.preferred_character || "",
          budget: input.budget || "",
          message: input.message || "",
          privacy_consent: input.privacy_consent,
          status: "신규",
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase 저장 오류: ${error.message}`);
    }

    return {
      record: { ...(data as InquiryRecord), is_sample: false, storage_source: "supabase" },
      diagnostics,
    };
  }

  // Supabase 환경변수 미설정 시 로컬 서버 파일(data/inquiries.json)에 실제 저장
  const current = await readLocalInquiries();
  const newRecord: InquiryRecord = {
    id: crypto.randomUUID(),
    ...input,
    status: "신규",
    created_at: new Date().toISOString(),
    is_sample: false,
    storage_source: "local_file",
  };
  const updated = [newRecord, ...current];
  await writeLocalInquiries(updated);

  return { record: newRecord, diagnostics };
}

export async function listInquiries(): Promise<{
  records: InquiryRecord[];
  diagnostics: ConnectionDiagnostics;
  errorWarning?: string;
}> {
  const diagnostics = getConnectionDiagnostics();

  if (diagnostics.supabaseConfigured) {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        const fallback = await readLocalInquiries();
        return {
          records: fallback,
          diagnostics,
          errorWarning: `Supabase 조회 오류(${error.message})가 발생하여 로컬 저장소 데이터를 표시합니다.`,
        };
      }

      return {
        records: (data || []).map((row) => ({
          ...(row as InquiryRecord),
          is_sample: false,
          storage_source: "supabase",
        })),
        diagnostics,
      };
    } catch (err) {
      const fallback = await readLocalInquiries();
      return {
        records: fallback,
        diagnostics,
        errorWarning: err instanceof Error ? err.message : "Supabase 연결 실패",
      };
    }
  }

  const records = await readLocalInquiries();
  return { records, diagnostics };
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<{ record: InquiryRecord | null; diagnostics: ConnectionDiagnostics }> {
  const diagnostics = getConnectionDiagnostics();

  if (diagnostics.supabaseConfigured) {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase 상태 업데이트 오류: ${error.message}`);
    }

    return { record: data as InquiryRecord, diagnostics };
  }

  const records = await readLocalInquiries();
  const idx = records.findIndex((item) => item.id === id);
  if (idx === -1) {
    return { record: null, diagnostics };
  }
  records[idx] = { ...records[idx], status };
  await writeLocalInquiries(records);
  return { record: records[idx], diagnostics };
}

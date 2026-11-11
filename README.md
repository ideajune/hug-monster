# HUG MONSTER (허그몬스터) 상업용 공식 웹사이트

> **"사람들은 광고를 피하지만, 즐거운 경험은 스스로 공유합니다. (Make People Smile, Make Brands Memorable.)"**

원작 도서 《HUG MONSTER》 및 프로젝트 기획서(`prd.md`), 디자인 시스템(`design.md`)을 기반으로 구축된 **캐릭터 기반 체험형 이벤트 마케팅 서비스 공식 웹사이트**입니다.

---

## 1. 로컬 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 및 실행
npm run build
npm run start
```

---

## 2. 환경변수 및 Supabase 연결 설정

루트 경로의 `.env.example`을 복사하여 `.env.local` 파일을 생성한 뒤 아래 항목을 입력합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_PASSCODE=hugmonster2026
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://hugmonster.kr
```

1. **Supabase 테이블 생성:** Supabase 대시보드 → SQL Editor에서 [`supabase/schema.sql`](./supabase/schema.sql) 전체 내용을 실행합니다.
2. **투명한 연결 폴백 모드:** `.env.local`에 Supabase 환경변수가 설정되기 전에는 웹사이트가 연결된 것처럼 가장하지 않고, 관리자 페이지(`/admin`)와 문의 완료 화면에 **"Supabase 미연결 (로컬 파일 DB `data/inquiries.json` 폴백 작동 중)"** 상태를 명확히 표시하며 로컬 파일에 문의를 실제 저장합니다.
3. 환경변수 입력 후 서버를 재시작하면 별도 코드 수정 없이 즉시 **Supabase 클라우드 DB 모드**로 전환됩니다.

---

## 3. Vercel 배포 방법

1. GitHub/GitLab/Bitbucket 저장소에 프로젝트를 푸시합니다.
2. [Vercel](https://vercel.com)에서 **New Project**로 저장소를 가져옵니다.
3. **Environment Variables** 설정에 `.env.example`의 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSCODE`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_SITE_URL`)를 등록합니다.
4. **Deploy** 버튼을 클릭하면 자동 빌드 및 배포가 완료됩니다.

-- ==========================================================
-- HUG MONSTER Supabase Database Schema (prd.md Section 11 기준)
-- ==========================================================

create extension if not exists "pgcrypto";

-- 1. 문의 내역 테이블 (inquiries)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  company_name text,
  phone text not null,
  email text,
  event_type text not null,
  event_date text not null,
  event_location text not null,
  event_duration text not null,
  package_type text,
  preferred_character text,
  budget text,
  message text,
  privacy_consent boolean not null default false,
  status text not null default '신규' check (status in ('신규', '상담 중', '계약 완료', '종료')),
  created_at timestamptz not null default now()
);

-- 2. 캐릭터 테이블 (characters)
create table if not exists public.characters (
  id text primary key,
  slug text unique not null,
  name text not null,
  english_name text not null,
  category text not null,
  supply_type text not null default '자체 확보',
  summary text not null,
  description text not null,
  features jsonb not null default '[]'::jsonb,
  recommended_events jsonb not null default '[]'::jsonb,
  performances jsonb not null default '[]'::jsonb,
  image_url text,
  availability_status text not null default '예약 가능',
  display_order integer not null default 1,
  is_sample boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. 서비스 테이블 (services)
create table if not exists public.services (
  id text primary key,
  slug text unique not null,
  title text not null,
  english_title text not null,
  description text not null,
  target_customer text not null,
  activities jsonb not null default '[]'::jsonb,
  image_url text,
  display_order integer not null default 1
);

-- 4. 패키지 테이블 (packages)
create table if not exists public.packages (
  id text primary key,
  name text not null,
  price integer,
  price_label text not null,
  character_count text not null,
  event_duration text not null,
  included_features jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  is_active boolean not null default true
);

-- 5. 포트폴리오 테이블 (portfolios)
create table if not exists public.portfolios (
  id text primary key,
  title text not null,
  event_type text not null,
  event_date text not null,
  location text not null,
  description text not null,
  media_urls jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  is_sample boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS (Row Level Security) 활성화
alter table public.inquiries enable row level security;
alter table public.characters enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.portfolios enable row level security;

-- 공개 조회 정책 (캐릭터, 서비스, 패키지, 포트폴리오)
create policy "Public read characters" on public.characters for select using (true);
create policy "Public read services" on public.services for select using (true);
create policy "Public read packages" on public.packages for select using (true);
create policy "Public read portfolios" on public.portfolios for select using (is_published = true);

-- 문의 등록 정책 (누구나 문의 접수 가능, 조회/수정은 서버/관리자 권한만 가능)
create policy "Public insert inquiries" on public.inquiries for insert with check (privacy_consent = true);

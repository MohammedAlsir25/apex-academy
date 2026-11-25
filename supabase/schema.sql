-- Apex Academy Hardened Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor to set up profiles, enrollments, milestones, certificates,
-- automatic OAuth/Email profile provisioning, strict per-action RLS, and zero-PII public verification.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Learner' check (char_length(full_name) between 1 and 120),
  headline text not null default 'Capstone Builder' check (char_length(headline) between 1 and 160),
  role text not null default 'learner' check (role in ('learner', 'admin')),
  notification_preferences jsonb not null default '{"welcome": true, "completion": true, "weeklyStreak": true}'::jsonb,
  study_streak integer not null default 1 check (study_streak >= 0 and study_streak <= 36500),
  last_active_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists role text not null default 'learner'
  check (role in ('learner', 'admin'));

alter table public.profiles
  add column if not exists notification_preferences jsonb not null default '{"welcome": true, "completion": true, "weeklyStreak": true}'::jsonb;

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (char_length(course_id) between 2 and 80),
  current_module_index integer not null default 0 check (current_module_index >= 0 and current_module_index <= 100),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.milestone_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (char_length(course_id) between 2 and 80),
  module_id text not null check (char_length(module_id) between 2 and 80),
  artifact_payload jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, course_id, module_id)
);

create table if not exists public.capstone_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (char_length(course_id) between 2 and 80),
  course_title text check (course_title is null or char_length(course_title) <= 180),
  track text check (track is null or char_length(track) <= 120),
  verification_code text not null unique check (verification_code ~ '^[A-Za-z0-9-]{6,64}$'),
  learner_name text not null check (char_length(learner_name) between 1 and 120),
  capstone_title text not null check (char_length(capstone_title) between 1 and 200),
  capstone_summary text not null check (char_length(capstone_summary) between 1 and 2000),
  artifact_url text check (artifact_url is null or artifact_url = '' or artifact_url ~* '^https?://'),
  rubric_score integer not null check (rubric_score between 0 and 100),
  rubric_breakdown jsonb not null default '[]'::jsonb,
  skills_verified jsonb not null default '[]'::jsonb,
  instructor_name text,
  instructor_role text,
  instructor_org text,
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- Enable Row-Level Security on all user tables
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.milestone_progress enable row level security;
alter table public.capstone_certificates enable row level security;

-- Drop legacy broad policies if upgrading an existing database
drop policy if exists "Users manage own profile" on public.profiles;
drop policy if exists "Users manage own enrollments" on public.enrollments;
drop policy if exists "Users manage own milestones" on public.milestone_progress;
drop policy if exists "Users manage own certificates" on public.capstone_certificates;

drop policy if exists "Profiles select own" on public.profiles;
drop policy if exists "Profiles insert own" on public.profiles;
drop policy if exists "Profiles update own" on public.profiles;

-- Explicit per-operation RLS policies for profiles (blocks client-side role escalation)
create policy "Profiles select own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Profiles insert own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id and role = 'learner');
create policy "Profiles update own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

-- Explicit per-operation RLS policies for enrollments
create policy "Enrollments select own" on public.enrollments
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Enrollments insert own" on public.enrollments
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Enrollments update own" on public.enrollments
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Enrollments delete own" on public.enrollments
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Explicit per-operation RLS policies for milestone_progress
create policy "Milestones select own" on public.milestone_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Milestones insert own" on public.milestone_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Milestones update own" on public.milestone_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Explicit per-operation RLS policies for capstone_certificates (never allow tampering with issued score/code)
create policy "Certificates select own" on public.capstone_certificates
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Certificates insert own" on public.capstone_certificates
  for insert to authenticated with check ((select auth.uid()) = user_id and rubric_score >= 80);

-- Auto-create learner profile row on Google, GitHub, or Email signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  resolved_name text;
begin
  resolved_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'user_name'), ''),
    split_part(coalesce(new.email, 'Learner'), '@', 1),
    'Learner'
  );

  insert into public.profiles (id, full_name, headline)
  values (new.id, left(resolved_name, 120), 'Capstone Builder')
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Scoped zero-PII public certificate verification RPC (exposes only credential facts, never user_id or email)
create or replace function public.verify_certificate_by_code(p_code text)
returns table (
  course_id text,
  course_title text,
  track text,
  verification_code text,
  learner_name text,
  capstone_title text,
  capstone_summary text,
  artifact_url text,
  rubric_score integer,
  skills_verified jsonb,
  instructor_name text,
  instructor_role text,
  instructor_org text,
  issued_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    c.course_id,
    c.course_title,
    c.track,
    c.verification_code,
    c.learner_name,
    c.capstone_title,
    c.capstone_summary,
    c.artifact_url,
    c.rubric_score,
    c.skills_verified,
    c.instructor_name,
    c.instructor_role,
    c.instructor_org,
    c.issued_at
  from public.capstone_certificates c
  where upper(c.verification_code) = upper(trim(p_code))
  limit 1;
$$;

revoke all on function public.verify_certificate_by_code(text) from public;
grant execute on function public.verify_certificate_by_code(text) to anon, authenticated;

-- Transactional email delivery log & idempotency registry
create table if not exists public.email_notifications_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('welcome', 'course_completion', 'weekly_streak')),
  course_id text,
  recipient_masked text not null check (char_length(recipient_masked) <= 180),
  provider text not null check (provider in ('resend', 'postmark', 'preview')),
  status text not null check (status in ('sent', 'simulated', 'skipped', 'failed')),
  subject text not null check (char_length(subject) <= 240),
  external_message_id text,
  error_detail text,
  idempotency_key text unique,
  created_at timestamptz not null default now()
);

alter table public.email_notifications_log enable row level security;

drop policy if exists "Email log select own or admin" on public.email_notifications_log;
drop policy if exists "Email log insert own" on public.email_notifications_log;

create policy "Email log select own or admin" on public.email_notifications_log
  for select to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'admin'
    )
  );

create policy "Email log insert own" on public.email_notifications_log
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

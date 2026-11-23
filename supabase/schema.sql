-- Apex Academy Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor to persist learner enrollments, milestones, notes, capstones, and certificates.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Learner',
  headline text not null default 'Capstone Builder',
  study_streak integer not null default 1,
  last_active_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  current_module_index integer not null default 0,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.milestone_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  module_id text not null,
  artifact_payload jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, course_id, module_id)
);

create table if not exists public.capstone_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  course_title text,
  track text,
  verification_code text not null unique,
  learner_name text not null,
  capstone_title text not null,
  capstone_summary text not null,
  artifact_url text,
  rubric_score integer not null,
  rubric_breakdown jsonb not null default '[]'::jsonb,
  skills_verified jsonb not null default '[]'::jsonb,
  instructor_name text,
  instructor_role text,
  instructor_org text,
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.milestone_progress enable row level security;
alter table public.capstone_certificates enable row level security;

create policy "Users manage own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage own enrollments" on public.enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own milestones" on public.milestone_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own certificates" on public.capstone_certificates
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

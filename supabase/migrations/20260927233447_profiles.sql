-- One profile per user (anonymous or not). Template for every user table:
-- user_id column, RLS enabled, policies scoped to auth.uid(), no business logic.

create table public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'One row per user. Created by the app (ensureProfile), removed with the auth user.';

alter table public.profiles enable row level security;

-- Anonymous users sign in with the authenticated role, so these cover them too.
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- No delete policy: profiles are removed by the cascade when the account is deleted.

-- Least privilege: anon gets nothing; authenticated gets only what the policies allow.
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;
grant select, insert, update on public.profiles to authenticated;

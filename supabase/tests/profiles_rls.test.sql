-- RLS tests for public.profiles. Pattern to copy for every user table.
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(11);

-- Two users, created as the superuser.
insert into auth.users (id, aud, role, is_anonymous)
values
  ('11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', true),
  ('22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', true);
insert into public.profiles (user_id) values ('22222222-2222-2222-2222-222222222222');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.profiles'::regclass),
  'RLS is enabled on profiles'
);

-- Act as user A.
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","is_anonymous":true}', true);

select lives_ok(
  $$ insert into public.profiles (user_id) values ('11111111-1111-1111-1111-111111111111') $$,
  'a user can create their own profile'
);

select results_eq(
  $$ select user_id from public.profiles $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid) $$,
  'a user reads only their own profile'
);

select is_empty(
  $$ select 1 from public.profiles where user_id = '22222222-2222-2222-2222-222222222222' $$,
  'a user cannot read another user''s profile'
);

select throws_ok(
  $$ insert into public.profiles (user_id) values ('22222222-2222-2222-2222-222222222222') $$,
  '42501',
  null,
  'a user cannot create a profile for another user'
);

select lives_ok(
  $$ update public.profiles set updated_at = now() where user_id = '11111111-1111-1111-1111-111111111111' $$,
  'a user can update their own profile'
);

select is_empty(
  $$ update public.profiles set updated_at = now() where user_id = '22222222-2222-2222-2222-222222222222' returning 1 $$,
  'a user cannot update another user''s profile'
);

select throws_ok(
  $$ delete from public.profiles where user_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501',
  null,
  'a user cannot delete their own profile through the API'
);

-- Without a session (anon role): nothing is visible.
reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select throws_ok(
  $$ select 1 from public.profiles $$,
  '42501',
  null,
  'a request without a session cannot read profiles'
);

-- Account deletion (superuser) removes the profile.
reset role;
select is(
  (select count(*)::int from public.profiles where user_id = '11111111-1111-1111-1111-111111111111'),
  1,
  'user A has exactly one profile before deletion'
);
delete from auth.users where id = '11111111-1111-1111-1111-111111111111';
select is_empty(
  $$ select 1 from public.profiles where user_id = '11111111-1111-1111-1111-111111111111' $$,
  'deleting the auth user deletes the profile'
);

select * from finish();
rollback;

# Design

## Context

Greenfield repository: only `docs/`, `openspec/` and `.claude/` exist. The ignore
and attributes files are committed without their leading dot, so git ignores
neither. Local machine: Windows 11, Node 22, pnpm 9.15, Docker Desktop available;
no Deno or Supabase CLI yet. The founder has an individual Apple Developer account.
All native builds run on EAS (no local Android or iOS toolchain). See proposal.md
for motivation and scope.

## Goals / Non-Goals

**Goals:**
- Every later change starts from settled conventions: where logic lives, how
  packages are shared with Deno, how tables and RLS are tested, how strings and
  colors are consumed.
- Prove the risky integrations end to end in S1 (engine source in a deployed Edge
  Function, anonymous session, RLS, Sentry on a device), not in S4.
- Keep the change to about half of the S1 week.

**Non-Goals:**
- Any product screen, navigation shell or business rule.
- Production environment, automatic deployment, analytics.

## Target structure

```
yingo/
+-- .gitignore, .gitattributes
+-- package.json            workspaces, root scripts, "packageManager": "pnpm@9.x"
+-- pnpm-workspace.yaml     apps/*, packages/*
+-- .npmrc                  node-linker=hoisted
+-- tsconfig.base.json      strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes
+-- eslint.config.js, .prettierrc
+-- apps/mobile/
|   +-- app.config.ts       APP_VARIANT -> identifier suffix and app name
|   +-- eas.json            development (dev client), preview (internal)
|   +-- src/app/            Expo Router: _layout.tsx, index.tsx (status screen)
|   +-- src/data/           supabase client, session storage, mappers, profile.ts,
|   |                       database.types.ts (generated)
|   +-- src/features/       empty
|   +-- src/stores/         Zustand: session store
|   +-- src/theme/          palette.ts (private), tokens.ts, fonts.ts
|   +-- src/monitoring/     sentry.ts (init + scrubber)
+-- packages/engine/        src/index.ts, tests/
+-- packages/i18n/          src/fr.ts (catalog, as const), src/index.ts (t), tests/
+-- supabase/
|   +-- config.toml         anonymous sign-ins enabled
|   +-- migrations/<ts>_profiles.sql
|   +-- tests/profiles_rls.test.sql
|   +-- functions/engine-version/{index.ts, deno.json}
+-- .github/workflows/ci.yml
```

## Where the logic lives

| Logic | Location | Why |
|---|---|---|
| Engine version, later all plan/action rules | `packages/engine` (pure TS) | Runs identically on the phone (offline, PLN-05) and in Edge Functions (D-001) |
| French text, plurals | `packages/i18n` | Needed by the app and by server pushes; same sharing path as the engine |
| Anonymous sign-in, `ensureProfile()`, row mapping | App data layer | Single access path; no business logic in PL/pgSQL |
| Access control | Database (RLS policies) | Enforced server-side whatever the client does |
| Version smoke endpoint | Edge Function `engine-version` | Proves the Deno import path before real server jobs depend on it |
| Crash scrubbing | App (`beforeSend`) | Data must be removed before it leaves the device |

## Decisions

### 1. pnpm workspaces with `node-linker=hoisted`, no build orchestrator
A flat `node_modules` is the layout React Native and Metro tooling handle most
reliably; pnpm still gives `workspace:*` links and fast installs. `packageManager`
pins the version for EAS and CI (corepack).
*Alternatives:* npm workspaces (slower, no workspace protocol); pnpm isolated
(symlink edge cases with native modules on Windows); Turborepo or Nx (no value for
one app and two packages).

### 2. Dev clients built on EAS only
No Android SDK or Xcode locally; Metro runs on Windows and the dev client connects
to it. A dev client is rebuilt only when a native module is added, so this change
installs every native module it needs up front (secure store, fonts, Sentry,
localization, Reanimated and SVG from the template).
*Alternative:* local Android builds, rejected (Windows path-length failures, setup
time).

### 3. Sharing packages with Deno: import the source
`supabase/functions/engine-version/deno.json` maps `@yingo/engine` and
`@yingo/i18n` to `../../../packages/<name>/src/index.ts`. The app resolves them as
workspace packages through Metro. Package source rules:
- ESM only; relative imports carry the `.ts` extension
  (`allowImportingTsExtensions`, `noEmit`);
- no `dependencies` in `package.json`;
- ESLint `no-restricted-imports` bans `react*`, `expo*`, `@supabase/*`, `node:*`;
  `no-restricted-globals`/`no-restricted-syntax` ban `Date.now`, argument-less
  `new Date()`, `Math.random`, `process`, `Deno`.

CI runs `deno check` on both entry points.
*Fallback (switch if the deployed function cannot resolve out-of-tree files):* an
esbuild step emits each package as one ESM file into
`supabase/functions/_shared/<name>/`, committed, with a CI check that regenerating
produces no diff.
*Alternatives:* publishing to JSR/npm (version churn for one developer); symlinks
(unreliable on Windows and in deploy bundling).

### 4. Engine returns keys; `packages/i18n` renders text
Engine outputs carry `{ key, params }`; callers render with `t()`. The catalog is `fr.ts` (an `as const` object rather than JSON, so placeholder types are literal and Deno needs no JSON import attributes); it is
nested by feature; the key type is derived from the catalog so unknown keys and missing
parameters fail type-checking. Plurals use `Intl.PluralRules('fr')` (available in
Hermes and Deno) with `one`/`other` sub-keys. JSX literals are banned with
`i18next/no-literal-string` (lint only, no i18next runtime).
*Alternative:* i18next with type generation, heavier and a dependency on both
sides; keys stay compatible if we switch later.

### 5. Theme: private palette, semantic tokens
`palette.ts` is not exported from `src/theme/index.ts`; a lint rule forbids
importing it elsewhere. Tokens: `brand`, `action`, `victory`, `progress`, `gain`,
`celebration`, `text`, `textMuted`, `background`, `surface`, `alert` (`#D02A1E`,
added to `docs/brand.md`). Text pairs are listed in `tokens.ts` and a unit test
checks each against 4.5:1. Fonts load with `expo-font` and
`@expo-google-fonts/{fredoka,nunito}` while the splash screen stays visible.
`userInterfaceStyle: "light"`.

### 6. Supabase: local stack, one remote EU dev project
`supabase start` (Docker) for development and CI; `supabase db push` and
`supabase functions deploy` are run by hand against the dev project (EU region).
Anonymous sign-ins are enabled; the built-in rate limits are kept for now.

### 7. `profiles` migration and RLS
```sql
create table public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy profiles_select_own on public.profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy profiles_insert_own on public.profiles
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- no delete policy: deletion goes through auth.users cascade (account-and-gdpr)
```
`updated_at` is set by the data layer on update (no trigger: no PL/pgSQL).
Anonymous users carry the `authenticated` role, so the policies cover them.
pgTAP tests (`supabase/tests/profiles_rls.test.sql`): own read, other user's read
empty, insert for another user rejected, delete affects no rows, `anon` role sees
nothing, cascade on auth user delete. Every future table copies this migration + test
pattern.
*Alternative:* trigger on `auth.users` creating the profile, rejected (privileged
PL/pgSQL; the app-side upsert is idempotent).

### 8. Data layer and session
- `src/data/supabase.ts` creates the only client, with a storage adapter that
  encrypts the session with AES (random key stored in `expo-secure-store`, ciphertext
  in AsyncStorage). This is the pattern Supabase documents for Expo; SecureStore
  alone hits its ~2 KB value limit.
- `ensureProfile()`: `upsert({ user_id }, { onConflict: 'user_id', ignoreDuplicates: true })`.
- Mappers convert rows to domain types; `database.types.ts` comes from
  `supabase gen types typescript --local`.
- Network errors are mapped to an `OfflineError` class (D-002).
- Startup sequence in `_layout.tsx`:
```
 fonts loaded + Sentry init
        |
 existing session? --yes--> ensureProfile() (skipped silently if offline) --> ready
        | no
 network? --no--> offline message, retry on reconnect (NetInfo)
        | yes
 signInAnonymously() --> ensureProfile() --> ready
```

### 9. Sentry
`@sentry/react-native` with its Expo config plugin, DSN from an EU (`de`) project.
`sendDefaultPii: false`; `beforeSend` and `beforeBreadcrumb` drop `request.data`,
`request.cookies`, `extra`, breadcrumb `data` for `http`/`fetch`/`console`, and user
IP. Source maps upload during EAS builds (auth token as an EAS secret). A unit test
feeds a synthetic event with an amount and a creditor name through the scrubber.

### 10. App identity
`app.config.ts` reads `APP_VARIANT` (`development` | `preview` | `production`);
non-production variants append `.dev` to the bundle identifier and package name and
suffix the app name. The base identifier is a placeholder until the founder
provides it; a task blocks the first EAS build on it. Minimum Android version is the
Expo SDK default.

### 11. CI
`.github/workflows/ci.yml`, triggered on `push` and `pull_request`:
- `checks`: pnpm install (frozen lockfile), lint, `tsc --noEmit` per workspace,
  Vitest (engine, i18n, theme contrast, data mappers, Sentry scrubber), `deno check`
  on the two package entry points (`denoland/setup-deno`).
- `database`: `supabase/setup-cli`, `supabase start`, `supabase db reset`,
  `supabase test db`, regenerate types and `git diff --exit-code`.
No secrets required.

### 12. Test device policy (D-007)
Manual checks run on the founder's Android phone and iPhone through the dev client.
No reference model is recorded; low-end 3D performance is handled by
`3d-map-spike` (runtime fps guard with automatic 2D fallback).

## Offline behavior

- First launch without network: no session can be created; the status screen shows
  the catalog's offline message and retries when connectivity returns.
- Later launches offline: the stored session is used; `ensureProfile()` is skipped
  and retried at the next online start; the engine version line works (bundled); the
  server version line shows "hors ligne".
- No read cache in this change (D-002 cache arrives with the first user data).

## Risks / Trade-offs

- [Deploy bundler does not include files outside `supabase/functions/`] → Detected
  by the `engine-version` deploy in this change; switch to the fallback in decision 3.
- [Hoisting allows phantom dependencies] → `import/no-extraneous-dependencies` lint rule.
- [EAS free tier queue slows the first dev client, eating into the spike's days] →
  Start the first EAS build as early as possible in the change; all native modules
  installed before it.
- [Identifier not provided in time] → Only blocks the EAS build tasks; everything
  else proceeds.
- [Encrypted session adds a crypto dependency] → Small, well-known adapter; covered
  by a restart test on device.
- [Crash reporting without consent could be judged non-compliant] → Scrubbing by
  default; question on the lawyer agenda; Sentry can be gated behind consent later
  without structural change.
- [Anonymous sign-ins can be abused] → Built-in rate limits now; CAPTCHA to revisit
  before the beta.

## Migration Plan

Greenfield: nothing to migrate. Deploy order for the dev project: link the project,
`supabase db push`, `supabase functions deploy engine-version`, then build the dev
clients. Rollback is dropping the dev project's `profiles` table; there are no users.

## Open Questions

- Final bundle identifier (founder input; gates the EAS build tasks only).
- Lawyer: crash reporting under legitimate interest; company versus individual
  publisher.

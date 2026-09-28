# Proposal

## Why

The repository holds only documentation. Before any feature (onboarding, debts,
plan engine) can be built, Yingo needs a working monorepo: an Expo app running on
real phones through development builds, a pure TypeScript engine package that both
the app and Deno Edge Functions can import (D-001), a Supabase EU backend with
anonymous sessions and row-level security, and CI that holds the quality bar for a
solo developer with no peer review. This is milestone **S1**, and it must stay small
enough to leave 2-3 days of the week to the separate `3d-map-spike` change.

## What Changes

- Rename the undotted `gitignore` and `gitattributes` files so git actually applies
  them (they are currently inert).
- pnpm workspaces (`node-linker=hoisted`, pinned through `packageManager`), no
  Turborepo; shared strict `tsconfig.base.json`, ESLint and Prettier.
- `apps/mobile`: Expo (latest stable SDK, New Architecture), Expo Router, Zustand,
  strict TypeScript; `app.config.ts` with an `APP_VARIANT` and a `.dev` identifier
  suffix; `eas.json` with `development` and `preview` profiles. iOS and Android
  development clients are built on EAS only.
- A single **dev-only status screen** (no tab bar): anonymous session, profile
  ensured, engine version in the app versus the server, Sentry test button.
- Theme: semantic tokens over the brand palette, Fredoka and Nunito, `colors.alert`
  as the only red, light mode only, text-safe contrast pairs.
- `packages/engine`: empty engine exporting `ENGINE_VERSION`, with Vitest, and
  portability rules (ESM, explicit `.ts` imports, zero runtime dependencies, no hidden
  clock/randomness/environment, returns keys never French text).
- `packages/i18n`: `fr.json` and a typed `t()` shared by the app and Edge Functions.
- Supabase: local Docker stack plus one remote EU **dev** project; anonymous auth;
  first migration creating `profiles` with RLS and pgTAP tests.
- `apps/mobile/src/data`: the single data-access layer (only importer of
  `@supabase/*`), generated DB types, encrypted session storage, `ensureProfile()`.
- `engine-version` Edge Function importing the engine source, proving the
  app/Deno sharing path end to end.
- Sentry in the first development client (EU region, scrubbing by default).
- GitHub Actions CI: `checks` job (lint, typecheck, Vitest, `deno check`) and
  `database` job (local stack, migrations, pgTAP, type-drift check). No deploys.
- Docs: `docs/brand.md` gains the alert red and a contrast rule; `docs/decisions.md`
  gains D-007 (no reference device, 3D performance protected by an automatic 2D
  fallback); the `config.yaml` tasks rule refers to "the Android test device".

## Capabilities

### New Capabilities
- `engine-package`: portability and purity contract of `packages/engine`, its version, and its use from the app and a Deno Edge Function.
- `localization`: shared French string catalog, typed lookup, plurals, and the ban on hard-coded UI strings.
- `theme`: semantic color and typography tokens, alert-only red, contrast rules.
- `anonymous-session`: anonymous sign-in at launch, encrypted session persistence, first launch without network.
- `user-profile`: the `profiles` table, its creation through `ensureProfile()`, and its row-level security.
- `data-access-layer`: the single boundary to Supabase, row mapping and generated types.
- `error-monitoring`: crash reporting with privacy scrubbing.
- `continuous-integration`: the checks every push must pass.

### Modified Capabilities
- None (no existing specs).

## Requirements, milestone and decisions

- **Milestone**: S1 (setup half; the 3D half is `3d-map-spike`).
- **No functional requirement is completed.** Groundwork for: ONB-01 (anonymous
  session), ONB-05 (profile deleted by cascade with the account), PLN-05 (engine runs
  offline on the phone), SEC-02 (data model ready for export, no financial data in
  logs), PRD section 8 security (RLS on every table), language (externalized strings)
  and accessibility (contrast).
- **Decisions relied on**: D-001 (engine shared with Deno, engine version stored),
  D-002 (writes need the network: first launch offline), D-005 (brand board screens
  are drafts: no tab bar yet), D-006 (security is P0).

## Out of scope

| Item | Where it goes |
|---|---|
| 3D scene, fps measurement, runtime 2D fallback, rewording the S1 exit criterion | `3d-map-spike` |
| Tab bar, onboarding screens, debt inventory | onboarding and debt changes (S2-S3) |
| Offline read cache (D-002), network status helper | first change that reads user data |
| Time zone column, push tokens, Monday job | `weekly-plan` (S4) |
| Account linking (ONB-04), account deletion (ONB-05), app lock (SEC-01), export (SEC-02) | `account-and-gdpr` |
| PostHog and analytics consent | the change that adds consent |
| Production Supabase project, automatic deploys, `jest-expo` | around S10 / first component tests |
| Any plan or action engine rule | `plan-engine`, `action-engine` |

## Legal and non-negotiable rules touched

- **GDPR / EU hosting**: Supabase and Sentry are both in EU regions; Sentry scrubs
  request bodies and breadcrumb data and sends no PII. **Lawyer (S1 meeting)**: is
  crash reporting without consent covered by legitimate interest?
- **"Debts are never shown in red"**: enforced in the theme API (no raw red, no
  `colors.debt`, `colors.alert` reserved for real alerts).
- **No financial data in logs**: Sentry scrubbing is on by default.
- **Publisher (outside this change, flagged)**: Apple guideline 5.1.1(ix) expects
  finance apps handling sensitive data to be published by a legal entity; new
  personal Google Play accounts need a 12-tester, 14-day closed test before
  production, which does not fit a beta in S11 and submission in S12. Recommended:
  start the company, D-U-N-S and organization store accounts now. Added to the
  lawyer agenda (company versus individual publisher).

## Pending input

- **Final bundle identifier** (reverse-DNS on a domain the founder owns, identical on
  both platforms). It is permanent once published, so setting it is a gate before the
  first EAS build.

## Impact

- New: `apps/mobile/`, `packages/engine/`, `packages/i18n/`, `supabase/`,
  `.github/workflows/ci.yml`, root workspace configuration.
- Changed: `gitignore` and `gitattributes` (renamed), `docs/brand.md`,
  `docs/decisions.md`, `openspec/config.yaml` (tasks rule wording).
- External: Supabase EU dev project, EAS project, Sentry EU project, Apple device
  registration.
- Local tooling: Docker Desktop and the Supabase CLI; Deno is only needed in CI.

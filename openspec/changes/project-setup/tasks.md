# Tasks

## 1. Repository foundations

- [x] 1.1 Rename `gitignore` to `.gitignore` and `gitattributes` to `.gitattributes` with `git mv`; verify `git check-ignore node_modules/x .env` reports both as ignored
- [x] 1.2 Add root `package.json` (`packageManager` pinned pnpm 9.x, root scripts `lint`, `typecheck`, `test`), `pnpm-workspace.yaml` (`apps/*`, `packages/*`) and `.npmrc` (`node-linker=hoisted`); verify `pnpm install` succeeds and creates a flat `node_modules`
- [x] 1.3 Add `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), Prettier config and a flat ESLint config with `import/no-extraneous-dependencies`; verify `pnpm lint` and `pnpm typecheck` run clean on the empty workspace
- [x] 1.4 Add D-007 to `docs/decisions.md` (no reference device; manual checks on the founder's Android and iPhone; low-end 3D performance handled by `3d-map-spike` with an automatic 2D fallback) and change the `openspec/config.yaml` tasks rule to "the Android test device"; verify `openspec validate project-setup` still passes

## 2. Engine package

- [x] 2.1 Create `packages/engine` (`@yingo/engine`, no `dependencies`, ESM, `allowImportingTsExtensions` + `noEmit`) exporting `ENGINE_VERSION = "0.1.0"` from `src/index.ts`; verify `pnpm --filter @yingo/engine typecheck` passes
- [x] 2.2 Add Vitest to the engine with `tests/version.test.ts` asserting `ENGINE_VERSION` is a semver string; verify `pnpm --filter @yingo/engine test` passes
- [x] 2.3 Add engine lint rules: banned imports (`react*`, `expo*`, `@supabase/*`, `node:*`), banned `Date.now`, argument-less `new Date()`, `Math.random`, `process`, `Deno`, and a check that `package.json` has no `dependencies`; verify each rule fails on a temporary violating line, then remove the line
- [x] 2.4 Document the engine contract (portability rules, keys-not-text, minor bump when output can change) in `packages/engine/README.md`; verify it matches the `engine-package` spec

## 3. Localization package

- [x] 3.1 Create `packages/i18n` (`@yingo/i18n`, same source rules as the engine) with `src/fr.ts` (catalog, `as const`) holding the initial strings (app name, offline message, status screen labels, "hors ligne"), all in informal "tu"; verify typecheck passes
- [x] 3.2 Implement typed `t(key, params)` with interpolation and `Intl.PluralRules('fr')` plurals; verify Vitest tests cover interpolation, 0 -> singular, 1 -> singular, 2 -> plural, and `@ts-expect-error` cases for an unknown key and a missing parameter
- [x] 3.3 Install Deno locally or rely on CI, and verify `deno check packages/engine/src/index.ts packages/i18n/src/index.ts` passes

## 4. Supabase: local stack, profiles and RLS

- [x] 4.1 Install the Supabase CLI, run `supabase init`, enable anonymous sign-ins in `supabase/config.toml`; verify `supabase start` runs on Docker Desktop
- [x] 4.2 Write the `profiles` migration (table, RLS enabled, select/insert/update-own policies, no delete policy, cascade from `auth.users`) as in design decision 7; verify `supabase db reset` applies it cleanly
- [x] 4.3 Write `supabase/tests/profiles_rls.test.sql` (pgTAP): own read, other user's read returns nothing, insert for another user rejected, delete removes nothing, `anon` role sees nothing, deleting the auth user deletes the profile; verify `supabase test db` passes
- [ ] 4.4 Create the remote Supabase dev project in an EU region, enable anonymous sign-ins, link it and run `supabase db push`; verify the `profiles` table and its policies appear in the dashboard

## 5. Mobile app skeleton and theme

- [x] 5.1 Create `apps/mobile` with the latest stable Expo SDK template (Expo Router, TypeScript, New Architecture) extending `tsconfig.base.json`, with `src/app`, `src/data`, `src/features`, `src/stores`, `src/theme`, `src/monitoring`; verify `pnpm --filter mobile typecheck` passes and Metro starts
- [x] 5.2 Add `app.config.ts` with `APP_VARIANT` handling (`.dev` suffix and app name suffix for non-production), a placeholder base identifier, `userInterfaceStyle: "light"`, and `eas.json` with `development` and `preview` profiles; verify `npx expo config` prints the `.dev` identifier with `APP_VARIANT=development`
- [x] 5.3 Install every native module this change needs (`expo-secure-store`, `@react-native-async-storage/async-storage`, `expo-font`, `@expo-google-fonts/fredoka`, `@expo-google-fonts/nunito`, `@react-native-community/netinfo`, `@sentry/react-native`, `expo-crypto` (built-in AES-GCM)) via `npx expo install`; verify `npx expo-doctor` reports no issues
- [x] 5.4 Wire `@yingo/engine` and `@yingo/i18n` as `workspace:*` dependencies of the app; verify a temporary import of `ENGINE_VERSION` and `t()` bundles in Metro
- [x] 5.5 Implement `src/theme` (private `palette.ts`, semantic `tokens.ts` with `alert: #D02A1E`, text pairs, type scale, spacing, radii, `fonts.ts`) and a lint rule forbidding `palette.ts` imports outside the theme; verify a Vitest test checks every text pair is at least 4.5:1
- [x] 5.6 Add `colors.alert` (`#D02A1E`) and the contrast rule (Soleil and Lagon never as text on a light background; text-safe pairs) to `docs/brand.md`; verify the values match `tokens.ts`
- [x] 5.7 Enable `i18next/no-literal-string` for JSX in the app; verify a temporary `<Text>Bonjour</Text>` fails lint

## 6. Data-access layer and anonymous session

- [x] 6.1 Implement `src/data/supabase.ts` with the encrypted storage adapter (AES key in SecureStore, ciphertext in AsyncStorage), env from `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and add `.env.example`; verify a Vitest test round-trips a value through the adapter with SecureStore and AsyncStorage mocked and that the stored value is not plain text
- [x] 6.2 Add the lint rule restricting `@supabase/*` imports to `src/data/`; verify a temporary import from `src/features` fails lint
- [x] 6.3 Generate `src/data/database.types.ts` with `supabase gen types typescript --local` and add a root script for it; verify the file contains `profiles`
- [x] 6.4 Implement the profile mapper, `ensureProfile()` (idempotent upsert) and `getProfile()`, plus `OfflineError` mapping for network failures; verify Vitest tests cover snake_case -> camelCase mapping and offline error mapping
- [ ] 6.5 Implement the Zustand session store and the startup sequence in `src/app/_layout.tsx` (fonts, existing session or anonymous sign-in, `ensureProfile()`, offline message and retry on reconnect); verify against the local stack in a dev client or Metro that a new anonymous user and exactly one profile are created

## 7. Error monitoring

- [ ] 7.1 Create a Sentry project in the EU (`de`) region, add the Expo config plugin and `src/monitoring/sentry.ts` (`sendDefaultPii: false`, `beforeSend` and `beforeBreadcrumb` scrubbers), store the auth token as an EAS secret; verify a Vitest test shows a synthetic event with an amount and creditor name leaves the scrubber without them
- [x] 7.2 Confirm no analytics SDK is installed; verify `pnpm why posthog-react-native` finds nothing

## 8. Engine sharing with Deno

- [x] 8.1 Create `supabase/functions/engine-version` (`deno.json` import map to `../../../packages/engine/src/index.ts` and `../../../packages/i18n/src/index.ts`) returning `{ engineVersion }`; verify `supabase functions serve` returns `0.1.0` locally
- [ ] 8.2 Deploy `engine-version` to the EU dev project; verify the deployed URL returns `0.1.0`. If the deploy cannot resolve the out-of-tree source, switch to the fallback in design decision 3 (esbuild bundle into `supabase/functions/_shared/`, with a drift check) and verify again

## 9. Status screen

- [ ] 9.1 Build `src/app/index.tsx` (dev only): "yingo" in Fredoka, palette swatches, session line (anonymous, shortened uid), profile line, engine version app vs server (or "hors ligne"), Sentry test button, all text from `fr.json`; verify lint and typecheck pass and the screen renders in Metro

## 10. Continuous integration

- [ ] 10.1 Add the `checks` job to `.github/workflows/ci.yml` (pnpm install with frozen lockfile, lint, typecheck, Vitest, `deno check` on both packages) on push and pull_request; verify it passes on GitHub
- [ ] 10.2 Add the `database` job (Supabase CLI, `supabase start`, `db reset`, `test db`, type regeneration with `git diff --exit-code`); verify it passes, then verify it fails on a throwaway branch where the select policy is loosened

## 11. Development builds and final checks

- [ ] 11.1 **Gate:** get the final base identifier from the founder and set it in `app.config.ts`; verify `npx expo config` shows it with the `.dev` suffix
- [ ] 11.2 Configure EAS (`eas init`, register the iPhone with `eas device:create`) and build `development` clients for Android and iOS; verify both builds finish and install
- [ ] 11.3 Manual check on the Android test device and the iPhone against the dev project: first launch offline shows the offline message then recovers online; a new anonymous user and one profile exist; restart keeps the same uid; app and server engine versions match; the Sentry test error appears in the EU project with a readable stack trace and no personal data; fonts and colors render in light mode with the phone in dark mode

# @yingo/engine

Plan and action engines for Yingo: pure, deterministic TypeScript shared by the
mobile app (offline recomputation, PLN-05) and the Supabase Edge Functions (weekly
plan job), per D-001.

## Contract

The same source runs in Hermes (app) and Deno (Edge Functions), unbundled. So:

- **ESM only; relative imports carry the `.ts` extension** (`./plan.ts`), as Deno
  requires.
- **No imports from outside the package** and **no runtime `dependencies`** in
  `package.json`. No React, Expo, Supabase, Node or Deno APIs.
- **Deterministic.** No `Date.now()`, no argument-less `new Date()`, no
  `Math.random()`, no `process.env`. The current date and the user's time zone are
  inputs.
- **Returns keys, never text.** Anything a user will read is returned as
  `{ key, params }` (amounts as integer cents) and rendered by `@yingo/i18n`. A
  wording change must never change the engine version.
- **Versioned.** `ENGINE_VERSION` (semver) is stored with every weekly plan. Bump
  the **minor** version whenever any output for the same input can change.

Lint (`pnpm lint`) and CI (`deno check`) enforce these rules.

## Tests

`pnpm --filter @yingo/engine test` (Vitest). Tests live in `tests/`; expected
values are derived by hand from `docs/prd.md` section 7 and `docs/decisions.md`,
never copied from the engine's output.

# Spec Delta

## Purpose

Defines the contract of the shared engine package: pure, deterministic, versioned code that runs unchanged on the phone and in server functions (D-001).

## ADDED Requirements

### Requirement: Engine runs in both the app and the server runtime
The engine package SHALL be importable, from the same source, by the mobile app and by a Deno-based Edge Function, without a Node-only API, a React or Expo API, a Supabase API or a Deno API.

#### Scenario: Same version on both sides
- **WHEN** the app displays the engine version it bundles and calls the `engine-version` Edge Function deployed from the same commit
- **THEN** both report the same `ENGINE_VERSION` value

#### Scenario: Portability check fails on a runtime-specific import
- **WHEN** engine source imports a module that is not part of the engine package (for example `react`, `expo`, `@supabase/supabase-js` or a `node:` module)
- **THEN** CI fails before the change can be considered green

### Requirement: Engine has no runtime dependencies
The engine package SHALL declare no runtime dependencies.

#### Scenario: A dependency is added
- **WHEN** a runtime dependency is added to the engine package manifest
- **THEN** the lint or CI check fails

### Requirement: Engine is deterministic
Engine functions SHALL NOT read the current time, a random source, environment variables or any global mutable state; the current date and the user's time zone SHALL be passed in as inputs.

#### Scenario: Hidden clock use is rejected
- **WHEN** engine source calls `Date.now()`, `new Date()` without arguments, `Math.random()` or reads `process.env`
- **THEN** the lint check fails

### Requirement: Engine returns keys, never user-facing text
Engine outputs meant for display SHALL be message keys with parameters (amounts in integer cents), never French text, so that wording changes never change the engine version.

#### Scenario: Engine output is language-free
- **WHEN** an engine function returns something the user will read
- **THEN** it contains a message key and parameters, and the text is produced by the localization capability

### Requirement: Engine version is exposed and follows a bump rule
The engine SHALL export an `ENGINE_VERSION` semantic version string. The minor version SHALL be bumped whenever any output for the same input can change.

#### Scenario: Initial version
- **WHEN** the package is first created
- **THEN** `ENGINE_VERSION` is `0.1.0`

### Requirement: Engine has a unit test runner
The engine package SHALL have a unit test runner executed locally and in CI, with test files under `packages/engine/tests/`.

#### Scenario: Empty engine test suite passes
- **WHEN** the test command runs on the initial package
- **THEN** at least one test asserting the `ENGINE_VERSION` format passes

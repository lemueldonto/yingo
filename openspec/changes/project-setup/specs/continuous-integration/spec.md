# Spec Delta

## Purpose

Defines the automated checks every push must pass, which replace peer review for a solo developer.

## ADDED Requirements

### Requirement: Checks run on every push
CI SHALL run on every push to any branch and on every pull request.

#### Scenario: Push to a branch
- **WHEN** a commit is pushed
- **THEN** CI runs all checks and reports a status on that commit

### Requirement: Code checks
CI SHALL fail when linting, type-checking of any workspace, the unit tests, or the Deno type check of the shared packages (engine and localization) fail.

#### Scenario: Failing unit test
- **WHEN** a unit test fails
- **THEN** CI fails

#### Scenario: Shared package not valid for Deno
- **WHEN** a shared package no longer type-checks under Deno
- **THEN** CI fails

### Requirement: Database checks
CI SHALL apply all migrations to a fresh local database, run the row-level security tests, and fail on any error or on out-of-date generated types.

#### Scenario: Broken migration
- **WHEN** a migration fails to apply on a fresh database
- **THEN** CI fails

#### Scenario: RLS regression
- **WHEN** a policy change lets a user read another user's row
- **THEN** the RLS tests fail and CI fails

### Requirement: CI never deploys in this phase
CI SHALL NOT deploy migrations, functions or app builds, and SHALL NOT require production credentials.

#### Scenario: Green CI on main
- **WHEN** CI passes on `main`
- **THEN** nothing is deployed

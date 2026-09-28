# Spec Delta

## Purpose

Stores one profile per user, created by the app and protected by row-level security, as the template every later user table follows.

## ADDED Requirements

### Requirement: One profile per user
Each user, anonymous or not, SHALL have exactly one profile identified by `user_id`, holding only `user_id`, `created_at` and `updated_at` (UTC).

#### Scenario: Profile after first launch
- **WHEN** a new anonymous session is created
- **THEN** exactly one profile exists for that user

### Requirement: Profile creation is idempotent
Ensuring a profile SHALL be safe to repeat: calling it again, or after a partial failure, SHALL NOT create a second row or fail.

#### Scenario: Called twice
- **WHEN** the app ensures the profile twice for the same user
- **THEN** there is still exactly one profile

#### Scenario: Previous attempt interrupted
- **WHEN** the session was created but the app stopped before the profile was created
- **THEN** the next launch creates the profile

### Requirement: Row-level security on profiles
Row-level security SHALL be enabled on the profiles table. A user SHALL be able to read, create and update only the profile whose `user_id` is their own. No client SHALL be able to delete a profile.

#### Scenario: Reading another user's profile
- **WHEN** user A queries the profile of user B
- **THEN** no row is returned

#### Scenario: Creating a profile for someone else
- **WHEN** user A inserts a profile with user B's `user_id`
- **THEN** the insert is rejected

#### Scenario: Client delete
- **WHEN** a user tries to delete their own profile through the API
- **THEN** no row is deleted

#### Scenario: Unauthenticated access
- **WHEN** a request without a session queries profiles
- **THEN** no row is returned

### Requirement: Profile removed with the account
Deleting a user account SHALL delete its profile.

#### Scenario: Account deleted
- **WHEN** the auth user is deleted
- **THEN** its profile no longer exists

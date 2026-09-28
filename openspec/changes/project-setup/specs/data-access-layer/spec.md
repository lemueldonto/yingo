# Spec Delta

## Purpose

Makes one layer of the app the only path to the backend, so storage choices, offline caching and a future Go backend can change without touching features.

## ADDED Requirements

### Requirement: Single access path to the backend
Only the data-access layer SHALL import the backend client library. Features and stores SHALL call the data-access layer.

#### Scenario: Backend import in a feature
- **WHEN** a file outside the data-access layer imports the backend client
- **THEN** the lint check fails

### Requirement: Domain objects at the boundary
The data-access layer SHALL return domain objects with camelCase fields, amounts in integer cents and dates as UTC values; database row shapes SHALL NOT leak to features.

#### Scenario: Profile read
- **WHEN** a feature reads the profile
- **THEN** it receives `userId`, `createdAt` and `updatedAt`, not `user_id`, `created_at` or `updated_at`

### Requirement: Database types match migrations
The typed description of the database used by the data-access layer SHALL be generated from the migrations, and CI SHALL fail when it is out of date.

#### Scenario: Migration changed without regenerating types
- **WHEN** a migration changes a table and the generated types are not updated
- **THEN** CI fails

### Requirement: Writes require the network
Writes through the data-access layer SHALL fail with a distinguishable offline error when there is no network, so features can show the friendly offline message (D-002).

#### Scenario: Write while offline
- **WHEN** a write is attempted with no network
- **THEN** the caller receives an offline error, not a generic failure

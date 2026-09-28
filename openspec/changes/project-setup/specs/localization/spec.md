# Spec Delta

## Purpose

Keeps every user-facing French string in one shared catalog, used by the app and by server functions, so that no text is hard-coded and the app can be translated later.

## ADDED Requirements

### Requirement: Single shared French catalog
All user-facing strings SHALL live in one French catalog shared by the mobile app and the Edge Functions.

#### Scenario: Server and app use the same catalog
- **WHEN** an Edge Function and the app look up the same key
- **THEN** they get the same French text

### Requirement: Typed lookup with interpolation
String lookup SHALL take a key and optional parameters, interpolate the parameters, and reject unknown keys at type-check time.

#### Scenario: Unknown key
- **WHEN** code looks up a key that does not exist in the catalog
- **THEN** type-checking fails

#### Scenario: Missing parameter
- **WHEN** a string contains a placeholder and the caller does not provide that parameter
- **THEN** type-checking fails

### Requirement: French plural rules
Strings that depend on a count SHALL follow French plural rules, where 0 and 1 take the singular form.

#### Scenario: Zero takes the singular
- **WHEN** a pluralized string is looked up with a count of 0
- **THEN** the singular form is returned (for example "0 dette", not "0 dettes")

#### Scenario: Two takes the plural
- **WHEN** the same string is looked up with a count of 2
- **THEN** the plural form is returned

### Requirement: No hard-coded UI strings
The mobile app SHALL NOT contain string literals rendered as user-facing text outside the catalog.

#### Scenario: Literal text in a screen
- **WHEN** a component renders a string literal as text
- **THEN** the lint check fails

### Requirement: Informal French tone
Catalog strings SHALL use informal "tu" and no financial jargon.

#### Scenario: Initial strings
- **WHEN** the initial catalog is reviewed
- **THEN** every string addresses the user with "tu"

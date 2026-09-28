# Spec Delta

## Purpose

Reports crashes to an EU-hosted service so quality can be measured, without ever sending amounts, creditor names or personal data.

## ADDED Requirements

### Requirement: Crashes are reported to an EU region
Unhandled errors in the app SHALL be reported to a crash reporting service hosted in the EU, with readable stack traces for release builds.

#### Scenario: Test error
- **WHEN** the test error is triggered from the status screen
- **THEN** it appears in the EU crash reporting project with a readable stack trace

### Requirement: No financial or personal data in reports
Crash reports SHALL NOT contain request or response bodies, breadcrumb payloads, amounts, creditor names, IP addresses or any personal data; data is removed on the device before sending.

#### Scenario: Error with sensitive context
- **WHEN** an error is raised with an amount or a creditor name in its breadcrumbs or request data
- **THEN** the report sent contains neither

### Requirement: No product analytics in this change
The app SHALL NOT send product analytics events until the analytics consent flow exists.

#### Scenario: Status screen use
- **WHEN** the user uses the app
- **THEN** no analytics event is sent

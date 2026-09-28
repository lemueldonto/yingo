# Spec Delta

## Purpose

Gives every person who opens the app a private anonymous session without asking for an account (groundwork for ONB-01), and keeps that session safe on the device.

## ADDED Requirements

### Requirement: Anonymous session at first launch
On first launch, the app SHALL create an anonymous session without asking the user for any identity information.

#### Scenario: First launch online
- **WHEN** the app is opened for the first time with network access
- **THEN** an anonymous session is created and the user sees no sign-up screen

### Requirement: Session persists across restarts
The session SHALL survive app restarts and SHALL NOT create a new anonymous user when one already exists on the device.

#### Scenario: Restart
- **WHEN** the app is closed and reopened
- **THEN** the same user identifier is used as before

### Requirement: Session stored encrypted
Session tokens SHALL be stored on the device encrypted with a key held in the platform secure storage (Keychain or Keystore), never in plain text.

#### Scenario: Inspecting app storage
- **WHEN** the app's regular storage is read without the secure key
- **THEN** the session tokens are not readable

### Requirement: First launch without network
When no session exists and the network is unavailable, the app SHALL show a friendly offline message from the catalog and retry once the network is back, without crashing and without leaving a partial session.

#### Scenario: First launch offline
- **WHEN** the app is opened for the first time with no network
- **THEN** it shows the offline message, and when the network returns it creates the session and continues

#### Scenario: Offline with an existing session
- **WHEN** the app is opened offline and a session already exists on the device
- **THEN** it starts normally with that session

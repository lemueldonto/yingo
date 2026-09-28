// Sentry's wrapper around the Expo Metro config (adds debug IDs for source maps).
// Monorepo resolution is automatic since SDK 52.
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

module.exports = getSentryExpoConfig(__dirname);

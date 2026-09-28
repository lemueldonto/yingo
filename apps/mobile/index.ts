// Crash reporting must start before anything else can throw.
import './src/monitoring/sentry';

// Register the Expo Router entry last.
import 'expo-router/entry';

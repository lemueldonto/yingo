import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Permanent store identifier (iOS bundle ID and Android package name).
 * PLACEHOLDER: must be replaced with the founder's reverse-DNS identifier before the
 * first EAS build (task 11.1). It can never change once the app is published.
 */
const BASE_IDENTIFIER = 'com.placeholder.yingo';

type Variant = 'development' | 'preview' | 'production';

const variant: Variant = (() => {
  const value = process.env.APP_VARIANT ?? 'development';
  if (value === 'development' || value === 'preview' || value === 'production') return value;
  throw new Error(`Unknown APP_VARIANT: ${value}`);
})();

const isProduction = variant === 'production';
const identifier = isProduction ? BASE_IDENTIFIER : `${BASE_IDENTIFIER}.dev`;
const name = isProduction ? 'yingo' : 'yingo (dev)';

// Nuage, from docs/brand.md
const background = '#F5F6FF';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  slug: 'yingo',
  scheme: 'yingo',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    bundleIdentifier: identifier,
    supportsTablet: false,
  },
  android: {
    package: identifier,
    adaptiveIcon: {
      backgroundColor: background,
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    'expo-router',
    'expo-status-bar',
    [
      'expo-splash-screen',
      { image: './assets/splash-icon.png', imageWidth: 160, backgroundColor: background },
    ],
    'expo-secure-store',
    'expo-font',
    [
      '@sentry/react-native',
      {
        // EU data region (GDPR). Organization and project come from EAS env vars.
        url: 'https://de.sentry.io/',
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
    ],
  ],
  extra: {
    variant,
  },
});

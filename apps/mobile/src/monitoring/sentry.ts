import * as Sentry from '@sentry/react-native';

import { scrubBreadcrumb, scrubEvent } from './scrub';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

// No DSN (local development without Sentry): crash reporting stays off.
Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  // EU project (de.sentry.io); no personal data, no IP, no request bodies.
  sendDefaultPii: false,
  attachScreenshot: false,
  attachViewHierarchy: false,
  beforeSend: (event) => scrubEvent(event),
  beforeBreadcrumb: (breadcrumb) => scrubBreadcrumb(breadcrumb),
});

export { Sentry };

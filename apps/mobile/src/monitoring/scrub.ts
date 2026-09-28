/**
 * Removes anything that could carry amounts, creditor names or personal data before a
 * crash report leaves the device. Kept free of Sentry imports so it is unit-testable.
 */

interface ScrubbableEvent {
  request?: {
    url?: string;
    data?: unknown;
    cookies?: unknown;
    query_string?: unknown;
    headers?: unknown;
  };
  user?: unknown;
  extra?: unknown;
  contexts?: Record<string, unknown>;
  breadcrumbs?: ScrubbableBreadcrumb[];
  server_name?: string;
}

interface ScrubbableBreadcrumb {
  category?: string;
  message?: string;
  data?: unknown;
}

// Technical contexts only; everything else (app state, custom contexts) is dropped.
const ALLOWED_CONTEXTS = new Set([
  'app',
  'device',
  'os',
  'runtime',
  'react_native_context',
  'trace',
]);

function stripQuery(url: string): string {
  const index = url.search(/[?#]/);
  return index === -1 ? url : url.slice(0, index);
}

export function scrubBreadcrumb<B extends ScrubbableBreadcrumb>(breadcrumb: B): B | null {
  // Console output may contain anything the code logged: never send it.
  if (breadcrumb.category === 'console') return null;
  const scrubbed = { ...breadcrumb };
  delete scrubbed.data;
  return scrubbed;
}

export function scrubEvent<E extends ScrubbableEvent>(event: E): E {
  const scrubbed: E = { ...event };

  if (scrubbed.request) {
    const { url } = scrubbed.request;
    scrubbed.request = url === undefined ? {} : { url: stripQuery(url) };
  }

  delete scrubbed.user;
  delete scrubbed.extra;
  delete scrubbed.server_name;

  if (scrubbed.contexts) {
    scrubbed.contexts = Object.fromEntries(
      Object.entries(scrubbed.contexts).filter(([name]) => ALLOWED_CONTEXTS.has(name)),
    );
  }

  if (scrubbed.breadcrumbs) {
    scrubbed.breadcrumbs = scrubbed.breadcrumbs
      .map((breadcrumb) => scrubBreadcrumb(breadcrumb))
      .filter((breadcrumb): breadcrumb is ScrubbableBreadcrumb => breadcrumb !== null);
  }

  return scrubbed;
}

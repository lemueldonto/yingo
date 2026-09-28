/** Raised when a request cannot reach the server (D-002: writes need the network). */
export class OfflineError extends Error {
  constructor(cause?: unknown) {
    super('offline', { cause });
    this.name = 'OfflineError';
  }
}

/** Any other backend failure. Carries no user data, only the backend's code. */
export class DataError extends Error {
  readonly code: string | undefined;

  constructor(code: string | undefined, cause?: unknown) {
    super(code ? `data error ${code}` : 'data error', { cause });
    this.name = 'DataError';
    this.code = code;
  }
}

const NETWORK_MESSAGES = [
  'Network request failed',
  'Failed to fetch',
  'fetch failed',
  'Load failed',
];

function isNetworkFailure(error: { name?: string; message?: string }): boolean {
  if (error.name === 'AuthRetryableFetchError' || error.name === 'FunctionsFetchError') {
    return true;
  }
  const message = error.message ?? '';
  return NETWORK_MESSAGES.some((fragment) => message.includes(fragment));
}

/** Maps a Supabase error (auth, database or functions) to OfflineError or DataError. */
export function toDataError(error: unknown): OfflineError | DataError {
  if (error instanceof OfflineError || error instanceof DataError) return error;
  const candidate = (typeof error === 'object' && error !== null ? error : {}) as {
    name?: string;
    message?: string;
    code?: string;
  };
  if (isNetworkFailure(candidate)) return new OfflineError(error);
  return new DataError(candidate.code, error);
}

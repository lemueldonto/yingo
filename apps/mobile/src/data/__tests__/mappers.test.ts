import { describe, expect, it } from 'vitest';

import { DataError, OfflineError, toDataError } from '../errors';
import { toProfile } from '../mappers';

describe('toProfile', () => {
  it('maps snake_case columns to camelCase UTC dates', () => {
    const profile = toProfile({
      user_id: '11111111-1111-1111-1111-111111111111',
      created_at: '2026-09-28T08:00:00+00:00',
      updated_at: '2026-09-28T09:30:00+00:00',
    });
    expect(profile).toEqual({
      userId: '11111111-1111-1111-1111-111111111111',
      createdAt: new Date(Date.UTC(2026, 8, 28, 8, 0, 0)),
      updatedAt: new Date(Date.UTC(2026, 8, 28, 9, 30, 0)),
    });
    expect(profile).not.toHaveProperty('user_id');
  });
});

describe('toDataError', () => {
  it('maps an auth network failure to OfflineError', () => {
    const error = Object.assign(new Error('Network request failed'), {
      name: 'AuthRetryableFetchError',
    });
    expect(toDataError(error)).toBeInstanceOf(OfflineError);
  });

  it('maps a database fetch failure to OfflineError', () => {
    expect(toDataError({ message: 'TypeError: Network request failed', code: '' })).toBeInstanceOf(
      OfflineError,
    );
  });

  it('maps a functions fetch failure to OfflineError', () => {
    const error = Object.assign(new Error('Failed to send a request'), {
      name: 'FunctionsFetchError',
    });
    expect(toDataError(error)).toBeInstanceOf(OfflineError);
  });

  it('keeps the backend code for other failures', () => {
    const result = toDataError({ message: 'permission denied', code: '42501' });
    expect(result).toBeInstanceOf(DataError);
    expect((result as DataError).code).toBe('42501');
  });

  it('handles a missing error object', () => {
    expect(toDataError(null)).toBeInstanceOf(DataError);
  });
});

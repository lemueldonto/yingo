import { describe, expect, it } from 'vitest';

import { t } from '../src/index.ts';

describe('t', () => {
  it('returns a plain string', () => {
    expect(t('common.appName')).toBe('yingo');
  });

  it('interpolates parameters', () => {
    expect(t('status.engineVersions', { app: '0.1.0', server: '0.1.0' })).toBe(
      'app 0.1.0 · serveur 0.1.0',
    );
  });

  it('uses the singular for 0 (French rule)', () => {
    expect(t('debts.count', { count: 0 })).toBe('0 dette');
  });

  it('uses the singular for 1', () => {
    expect(t('debts.count', { count: 1 })).toBe('1 dette');
  });

  it('uses the plural for 2', () => {
    expect(t('debts.count', { count: 2 })).toBe('2 dettes');
  });

  it('rejects unknown keys and missing parameters at type-check time', () => {
    // These lines only exist for the type checker; each must be a type error.
    const typeErrors = () => {
      // @ts-expect-error unknown key
      t('common.doesNotExist');
      // @ts-expect-error missing parameter
      t('status.sessionAnonymous');
      // @ts-expect-error missing one of two parameters
      t('status.engineVersions', { app: '0.1.0' });
      // @ts-expect-error plural without count
      t('debts.count');
    };
    expect(typeErrors).toBeTypeOf('function');
  });
});

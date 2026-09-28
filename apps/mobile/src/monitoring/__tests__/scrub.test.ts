import { describe, expect, it } from 'vitest';

import { scrubBreadcrumb, scrubEvent } from '../scrub';

// A synthetic event carrying the kind of data that must never leave the device.
const sensitiveEvent = {
  message: 'Something broke',
  request: {
    url: 'https://example.supabase.co/rest/v1/debts?creditor=eq.Cofidis&balance=eq.184500',
    data: { creditor: 'Cofidis', balance: 184500 },
    cookies: { session: 'abc' },
    headers: { authorization: 'Bearer secret' },
  },
  user: { id: 'u1', ip_address: '203.0.113.7', email: 'ines@example.com' },
  extra: { monthlyIncome: 175000 },
  server_name: 'device-name',
  contexts: {
    os: { name: 'Android' },
    device: { model: 'Galaxy' },
    debtState: { creditor: 'Cofidis', balance: 184500 },
  },
  breadcrumbs: [
    {
      category: 'fetch',
      message: 'GET /debts',
      data: { url: '/debts?creditor=Cofidis', body: '184500' },
    },
    { category: 'console', message: 'balance 184500 for Cofidis' },
    { category: 'navigation', data: { from: '/', to: '/debts' } },
  ],
};

describe('scrubEvent', () => {
  const scrubbed = scrubEvent(structuredClone(sensitiveEvent));
  const serialized = JSON.stringify(scrubbed);

  it('removes amounts and creditor names everywhere', () => {
    expect(serialized).not.toContain('184500');
    expect(serialized).not.toContain('175000');
    expect(serialized).not.toContain('Cofidis');
  });

  it('removes personal data, IP and credentials', () => {
    expect(serialized).not.toContain('203.0.113.7');
    expect(serialized).not.toContain('ines@example.com');
    expect(serialized).not.toContain('secret');
    expect(scrubbed).not.toHaveProperty('user');
    expect(scrubbed).not.toHaveProperty('server_name');
  });

  it('keeps what is needed to debug a crash', () => {
    expect(scrubbed.message).toBe('Something broke');
    expect(scrubbed.request).toEqual({ url: 'https://example.supabase.co/rest/v1/debts' });
    expect(scrubbed.contexts).toEqual({ os: { name: 'Android' }, device: { model: 'Galaxy' } });
    expect(scrubbed.breadcrumbs).toEqual([
      { category: 'fetch', message: 'GET /debts' },
      { category: 'navigation' },
    ]);
  });
});

describe('scrubBreadcrumb', () => {
  it('drops console breadcrumbs', () => {
    expect(scrubBreadcrumb({ category: 'console', message: 'balance 184500' })).toBeNull();
  });

  it('drops breadcrumb data', () => {
    expect(scrubBreadcrumb({ category: 'xhr', data: { body: '184500' } })).toEqual({
      category: 'xhr',
    });
  });
});

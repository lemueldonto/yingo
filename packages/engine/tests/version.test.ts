import { describe, expect, it } from 'vitest';

import { ENGINE_VERSION } from '../src/index.ts';

describe('ENGINE_VERSION', () => {
  it('is a semantic version string', () => {
    expect(ENGINE_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

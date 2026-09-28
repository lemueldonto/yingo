import { defineConfig } from 'vitest/config';

// Pure TypeScript units only (theme, data mappers, monitoring scrubber).
// Component tests will use jest-expo when the first one is needed.
export default defineConfig({
  test: {
    include: ['src/**/__tests__/**/*.test.ts'],
  },
});

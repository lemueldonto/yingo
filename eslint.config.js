// @ts-check
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const paletteImport = {
  regex: 'theme/palette$',
  message: 'Use semantic tokens from src/theme, not the raw palette.',
};

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**',
      '**/coverage/**',
      'apps/mobile/android/**',
      'apps/mobile/ios/**',
      'supabase/functions/**',
      '**/database.types.ts',
      '**/expo-env.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['*.{js,mjs}', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    plugins: { 'import-x': importX },
    rules: {
      // Hoisted node_modules make undeclared imports resolve; catch them here.
      'import-x/no-extraneous-dependencies': 'error',
    },
  },
  {
    // Shared packages run unchanged in the app (Hermes) and in Edge Functions (Deno):
    // no imports outside the package, no hidden clock, randomness or environment.
    files: ['packages/*/src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^[^.]',
              message: 'Shared packages may only import their own files (relative paths).',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'process', message: 'No environment access in shared packages.' },
        { name: 'Deno', message: 'No Deno API in shared packages.' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='Date'][callee.property.name='now']",
          message: 'Pass the current date in as an input.',
        },
        {
          selector: "NewExpression[callee.name='Date'][arguments.length=0]",
          message: 'Pass the current date in as an input.',
        },
        {
          selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']",
          message: 'Engines are deterministic: no randomness.',
        },
      ],
    },
  },
  {
    files: ['apps/mobile/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@supabase/*'],
              message: 'Only apps/mobile/src/data may talk to Supabase (single data-access layer).',
            },
            paletteImport,
          ],
        },
      ],
    },
  },
  {
    files: ['apps/mobile/src/data/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [paletteImport] }],
    },
  },
  {
    files: ['apps/mobile/src/theme/**/*.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    // All UI text comes from @yingo/i18n, never string literals in JSX.
    files: ['apps/mobile/src/**/*.tsx'],
    plugins: { i18next },
    rules: {
      'i18next/no-literal-string': ['error', { mode: 'jsx-text-only' }],
    },
  },
  {
    files: ['apps/mobile/*.{js,ts}'],
    languageOptions: { globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  prettier,
);

import globals from 'globals';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,

  /* =========================
   * TypeScript + React
   * ========================= */
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      /* React */
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',

      /* Hooks */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* Fast refresh */
      'react-refresh/only-export-components': 'warn',

      /* A11y — мінімум */
      'jsx-a11y/label-has-associated-control': 'warn',

      /* General */
      'no-console': 'warn',
      'no-alert': 'warn',

      /* Prettier */
      'prettier/prettier': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  /* =========================
   * JavaScript files
   * ========================= */
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'no-undef': 'error',
    },
  },

  /* =========================
   * Config / scripts
   * ========================= */
  {
    files: ['**/*.config.{js,ts}', 'scripts/**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  /* =========================
   * Ignore
   * ========================= */
  {
    ignores: ['dist', 'node_modules', 'public', '**/*.d.ts'],
  },
];

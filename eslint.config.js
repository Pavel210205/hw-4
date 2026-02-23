import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  root: true,
  ignorePatterns: ['**/dist', '**/build', '**/public', '**/*.cjs', '**/node_modules'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        eslint.configs.recommended,
        'plugin:@typescript-eslint/recommended',
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        'eol-last': ['error', 'always'],
        'prettier/prettier': 'error',
        'no-console': 'error',
        'linebreak-style': ['error', 'unix'],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'object', 'parent', 'sibling', 'index'],
            alphabetize: {
              order: 'asc',
            },
            'newlines-between': 'always',
          },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/no-unknown-property': 'error',
        'react/self-closing-comp': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
});

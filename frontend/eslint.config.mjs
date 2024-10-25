import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: [
      '**/dist',
      '**/public',
      '**/.next',
      '**/styled-system',
      '**/node_modules',
      '**/assets',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:jsx-a11y/recommended',
      'prettier',
      'plugin:import/recommended',
    ),
  ),
  {
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      next: {
        rootDir: '/frontend/*',
      },
    },
    rules: {
      'import/named': 'off',
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**/**',
              group: 'parent',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'ignore',
        },
      ],
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default config;

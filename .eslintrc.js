module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
    commonjs: true,
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
};

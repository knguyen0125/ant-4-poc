module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-unused-vars': 1,
    '@typescript-eslint/space-before-function-paren': 0,
    'import/prefer-default-export': 1,
    'no-underscore-dangle': 1,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-param-reassign': 1,
    'react/jsx-wrap-multilines': 0,
  },
  ignorePatterns: ['node_modules', 'mock'],
};

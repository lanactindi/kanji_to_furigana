module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    browser: true,
    webextensions: true,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-globals': [
      'error',
      {
        name: 'fit',
        message: 'Do not commit focused tests.',
      },
      {
        name: 'fdescribe',
        message: 'Do not commit focused tests.',
      },
    ],
  },
};

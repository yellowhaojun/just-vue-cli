const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    env: {
      es6: true
    },
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  rules: {
    camelcase: 0,
    semi: 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    'generator-star-spacing': 0,
    'no-new': 0,
    'no-debugger': isProd ? 2 : 0,
    'no-console': isProd ? 2 : 0
  }
}

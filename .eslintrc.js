module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off', // Desativa exigência de PropTypes
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 

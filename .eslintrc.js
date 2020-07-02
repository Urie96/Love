module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 0,
    indent: ['off', 2],
    'no-debugger': 'off'
  }
}

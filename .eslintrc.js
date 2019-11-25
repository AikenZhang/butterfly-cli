module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    'plugin:vue/base'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-tabs': 'off',
    // disallow control characters in regular expressions
    'no-control-regex': 'off',
    // disallow empty character classes in regular expressions
    'no-empty-character-class': 'off',
    //	disallow invalid regular expression strings in RegExp constructors
    'no-invalid-regexp': 'off',
    // disallow multiple spaces in regular expressions
    'no-regex-spaces': 'off',
    // disallow template literal placeholder syntax in regular strings
    'no-template-curly-in-string': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  }
}

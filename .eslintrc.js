module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['standard', 'prettier/standard'],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'standard/no-callback-literal': 0
  },
  'overrides': [
    {
      files: ['packages/dls-color-palette/**/*.spec.js'],
      env: {
        es6: true,
        jest: true
      }
    }
  ]
}

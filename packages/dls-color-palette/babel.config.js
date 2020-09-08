/**
 * @file    babel config
 * @date    2020-09-04 14:30:48
 */

const isTestEnv = process.env.BABEL_ENV === 'test'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      !isTestEnv && {
        'modules': false
      }
    ].filter(Boolean)
  ]
}

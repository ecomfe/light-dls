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

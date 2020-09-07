/**
 * @file    jest config
 * @date    2020-09-04 17:56:09
 */
module.exports = {
  moduleFileExtensions: [
    'js'
  ],
  roots: ['<rootDir>'],
  testMatch: ['**/test/**/(*.)+spec.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js}'
  ]
}

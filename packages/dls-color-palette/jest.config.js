module.exports = {
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>'],
  testMatch: ['**/test/**/(*.)+spec.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverageFrom: ['src/**/*.{js}']
}

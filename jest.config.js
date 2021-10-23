module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules'],
  collectCoverage: true,
  collectCoverageFrom: ['src/useCases/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
};

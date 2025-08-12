const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // support @ alias if used
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}

module.exports = createJestConfig(customJestConfig);

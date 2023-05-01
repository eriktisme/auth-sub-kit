import { Config } from 'jest'

export const baseJestCdkConfig: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/lib'],
  testMatch: ['**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.cdk.json',
    },
  },
}

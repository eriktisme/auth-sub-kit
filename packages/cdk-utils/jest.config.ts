import { baseJestCdkConfig } from '../../jest.cdk.config'

export default {
  ...baseJestCdkConfig,
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}

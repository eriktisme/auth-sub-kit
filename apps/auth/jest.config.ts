import { baseJestCdkConfig } from '../../jest.cdk.config'

export default {
  ...baseJestCdkConfig,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}

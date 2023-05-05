import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: ['./apps/api/schema.graphql', './apps/api/_aws.graphql'],
  // documents: './src/**/data/**/*.ts',
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    './apps/api/src/appsync.ts': {
      plugins: ['typescript'],
      config: {
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
}

export default config

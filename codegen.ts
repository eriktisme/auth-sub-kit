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
    './apps/client/src/appsync.ts': {
      plugins: ['typescript'],
      config: {
        useTypeImports: true,
        skipTypename: false,
        preResolveTypes: true,
        dedupeOperationSuffix: true,
      },
    },
  },
}

export default config

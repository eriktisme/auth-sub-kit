import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { NodeHttpHandler } from '@aws-sdk/node-http-handler'

export const buildDynamoDBClient = (): DynamoDBDocumentClient =>
  DynamoDBDocumentClient.from(
    new DynamoDBClient({
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 3000,
      }),
      apiVersion: '2012-10-08',
      maxAttempts: 3,
      region: 'eu-west-1',
    }),
    {
      marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
      },
    }
  )

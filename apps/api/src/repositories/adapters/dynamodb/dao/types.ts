import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { NativeAttributeValue } from '@aws-sdk/util-dynamodb'

export interface DynamoDBDaoDeps {
  table: string
  client: DynamoDBDocumentClient
  defaultQueryLimit?: number
}

export interface ConditionalOptions {
  conditionExpression?: string
  attributeNames?: Record<string, string>
  attributeValues?: Record<string, NativeAttributeValue>
}

export type PutOptions = ConditionalOptions

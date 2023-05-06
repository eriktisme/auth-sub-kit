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

interface BaseInput {
  index?: string
  limit?: number
  exclusiveStartKey?: string
}

export type ScanInput = BaseInput & {
  attributeNames?: Record<string, string>
  attributeValues?: Record<string, NativeAttributeValue>
  consistentRead?: boolean
}

export interface QueryParams extends BaseInput {
  scanIndexForward?: boolean
  keyConditionExpression?: string
  expressionNames?: Record<string, string>
  expressionValues?: Record<string, NativeAttributeValue>
  consistentRead?: boolean
}

export interface GetItemOptions {
  consistentRead: boolean
}

import { PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import {
  DynamoDBDaoDeps,
  PutOptions,
  QueryParams,
  QueryResponse,
  ScanInput,
} from './types'

export class DynamoDBDao<
  TModel extends Record<string, any>,
  TKeySchema extends Record<string, any>
> {
  constructor(protected deps: DynamoDBDaoDeps) {
    //
  }

  async put(data: TModel, options: PutOptions = {}): Promise<TModel> {
    await this.deps.client.send(
      new PutCommand({
        TableName: this.deps.table,
        ConditionExpression: options.conditionExpression,
        Item: data,
        ExpressionAttributeNames: options.attributeNames,
        ExpressionAttributeValues: options.attributeValues,
      })
    )

    return data
  }

  async scan(input: ScanInput = {}): Promise<TModel[]> {
    const { Items } = await this.deps.client.send(
      new ScanCommand({
        TableName: this.deps.table,
        ExpressionAttributeNames: input.attributeNames,
        ExpressionAttributeValues: input.attributeValues,
        ConsistentRead: input.consistentRead,
      })
    )

    return Items as TModel[]
  }

  async query(params: QueryParams): Promise<TModel[]> {
    const { Items } = await this.deps.client.send(
      new QueryCommand({
        TableName: this.deps.table,
        IndexName: params.index,
        Limit: params.limit ?? this.deps.defaultQueryLimit,
        ScanIndexForward: params.scanIndexForward,
        KeyConditionExpression: params.keyConditionExpression,
        ExpressionAttributeNames: params.expressionNames,
        ExpressionAttributeValues: params.expressionValues,
        ConsistentRead: params.consistentRead,
      })
    )

    return Items as TModel[]
  }
}

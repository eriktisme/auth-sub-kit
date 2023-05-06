import {
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'
import {
  DynamoDBDaoDeps,
  GetItemOptions,
  PutOptions,
  QueryParams,
  ScanInput,
} from './types'

export class DynamoDBDao<
  TModel extends Record<string, any>,
  TKeySchema extends Record<string, any>
> {
  constructor(protected deps: DynamoDBDaoDeps) {
    //
  }

  async get(key: TKeySchema, options?: GetItemOptions): Promise<TModel | null> {
    const { Item } = await this.deps.client.send(
      new GetCommand({
        TableName: this.deps.table,
        Key: key,
        ConsistentRead: options?.consistentRead,
      })
    )

    return Item as TModel
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
}

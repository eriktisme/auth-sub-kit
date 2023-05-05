import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBDaoDeps, PutOptions } from './types'

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
}

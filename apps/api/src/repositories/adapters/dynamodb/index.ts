import { DynamoDBProductsRepository } from './products'
import { PriceKey, PriceModel, ProductKey, ProductModel } from './models'
import { config } from '../../../config'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDBPricesRepository } from './prices'
import { DynamoDBDao } from './dao'

export * from './models'
export * from './prices'
export * from './products'

export function buildDynamoDBProductsRepository(
  client: DynamoDBDocumentClient
) {
  return new DynamoDBProductsRepository(
    new DynamoDBDao<ProductModel, ProductKey>({
      table: `${config.prefix}.AuthSubKitStripeProducts`,
      client,
    })
  )
}

export function buildDynamoDBPricesRepository(client: DynamoDBDocumentClient) {
  return new DynamoDBPricesRepository(
    new DynamoDBDao<PriceModel, PriceKey>({
      table: `${config.prefix}.AuthSubKitStripePrices`,
      client,
    })
  )
}

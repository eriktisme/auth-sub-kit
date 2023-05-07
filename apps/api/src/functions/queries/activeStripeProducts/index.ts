import { buildHandler } from './handler'
import { PricesService, ProductsService } from '../../../services'
import {
  buildDynamoDBPricesRepository,
  buildDynamoDBProductsRepository,
} from '../../../repositories'
import { buildDynamoDBClient } from '../../../utils'

const dynamoDBClient = buildDynamoDBClient()

export const handler = async () =>
  buildHandler({
    pricesService: new PricesService({
      pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
    }),
    productsService: new ProductsService({
      productsRepository: buildDynamoDBProductsRepository(dynamoDBClient),
    }),
  })

import { buildHandler } from './handler'
import { ProductsService } from '../../../services'
import {
  buildDynamoDBPricesRepository,
  buildDynamoDBProductsRepository,
} from '../../../repositories'
import { buildDynamoDBClient } from '../../../utils'

const dynamoDBClient = buildDynamoDBClient()

export const handler = async (event) =>
  buildHandler(
    {
      productsService: new ProductsService({
        productsRepository: buildDynamoDBProductsRepository(dynamoDBClient),
        pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
      }),
    },
    event
  )

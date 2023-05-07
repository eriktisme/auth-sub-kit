import { buildHandler } from './handler'
import { PricesService, ProductsService } from '../../../../services'
import {
  buildDynamoDBPricesRepository,
  buildDynamoDBProductsRepository,
} from '../../../../repositories'
import { buildDynamoDBClient } from '../../../../utils'
import { HandlerEvent } from './types'

const dynamoDBClient = buildDynamoDBClient()

export const handler = async (event: HandlerEvent) =>
  buildHandler(
    {
      pricesService: new PricesService({
        pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
      }),
      productsService: new ProductsService({
        productsRepository: buildDynamoDBProductsRepository(dynamoDBClient),
      }),
    },
    event
  )

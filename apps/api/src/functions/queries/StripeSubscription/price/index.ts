import { buildHandler } from './handler'
import { buildDynamoDBPricesRepository } from '../../../../repositories'
import { PricesService } from '../../../../services'
import { buildDynamoDBClient } from '../../../../utils'
import { HandlerEvent } from './types'

const dynamoDBClient = buildDynamoDBClient()

export const handler = async (event: HandlerEvent) =>
  buildHandler(
    {
      pricesService: new PricesService({
        pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
      }),
    },
    event
  )

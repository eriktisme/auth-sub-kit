import { buildHandler } from './handler'
import { SubscriptionsService } from '../../../services'
import { buildDynamoDBClient } from '../../../utils'
import { buildDynamoDBSubscriptionsRepository } from '../../../repositories'
import { AppSyncResolverEvent } from 'aws-lambda'

const dynamoDBClient = buildDynamoDBClient()

export const handler = async (event: AppSyncResolverEvent<{}>) =>
  buildHandler(
    {
      subscriptionsService: new SubscriptionsService({
        subscriptionsRepository:
          buildDynamoDBSubscriptionsRepository(dynamoDBClient),
      }),
    },
    event
  )

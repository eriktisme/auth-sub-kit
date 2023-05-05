import { buildHandler } from './handler'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import { config } from '../../../config'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { ProductsService } from '../../../services'
import {
  buildDynamoDBPricesRepository,
  buildDynamoDBProductsRepository,
} from '../../../repositories'
import { buildDynamoDBClient } from '../../../utils'

const secretManager = new SecretsManagerClient({
  //
})

const stripeWebhookToken = await secretManager.send(
  new GetSecretValueCommand({
    SecretId: config.stripeWebhookTokenId,
  })
)

const dynamoDBClient = buildDynamoDBClient()

export const handler = async (event: APIGatewayProxyEventV2) =>
  buildHandler(
    {
      productsService: new ProductsService({
        productsRepository: buildDynamoDBProductsRepository(dynamoDBClient),
        pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
      }),
      stripeWebhookToken: stripeWebhookToken.SecretString!,
    },
    event
  )

import { buildHandler } from './handler'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import { config } from '../../../config'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  CustomersService,
  PricesService,
  ProductsService,
  SubscriptionsService,
} from '../../../services'
import {
  buildDynamoDBCustomersRepository,
  buildDynamoDBPricesRepository,
  buildDynamoDBProductsRepository,
  buildDynamoDBSubscriptionsRepository,
  buildStripeCustomersRepository,
} from '../../../repositories'
import { buildDynamoDBClient } from '../../../utils'
import Stripe from 'stripe'

const secretManager = new SecretsManagerClient({
  //
})

const [stripeWebhookToken, stripeApiToken] = await Promise.all([
  secretManager.send(
    new GetSecretValueCommand({
      SecretId: config.stripeWebhookTokenId,
    })
  ),
  secretManager.send(
    new GetSecretValueCommand({
      SecretId: config.stripeApiToken,
    })
  ),
])

const dynamoDBClient = buildDynamoDBClient()

const stripe = new Stripe(stripeApiToken.SecretString!, {
  apiVersion: '2022-11-15',
})

export const handler = async (event: APIGatewayProxyEventV2) =>
  buildHandler(
    {
      customersService: new CustomersService({
        internalCustomersRepository:
          buildDynamoDBCustomersRepository(dynamoDBClient),
        externalCustomersRepository: buildStripeCustomersRepository(stripe),
      }),
      subscriptionsService: new SubscriptionsService({
        subscriptionsRepository:
          buildDynamoDBSubscriptionsRepository(dynamoDBClient),
      }),
      pricesService: new PricesService({
        pricesRepository: buildDynamoDBPricesRepository(dynamoDBClient),
      }),
      productsService: new ProductsService({
        productsRepository: buildDynamoDBProductsRepository(dynamoDBClient),
      }),
      stripeWebhookToken: stripeWebhookToken.SecretString!,
      stripe,
    },
    event
  )

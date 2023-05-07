import { buildHandler } from './handler'
import {
  CheckoutService,
  CustomersService,
  SubscriptionsService,
} from '../../../services'
import {
  buildDynamoDBCustomersRepository,
  buildDynamoDBSubscriptionsRepository,
  buildStripeCheckoutRepository,
  buildStripeCustomersRepository,
} from '../../../repositories'
import Stripe from 'stripe'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import { config } from '../../../config'
import { buildDynamoDBClient } from '../../../utils'
import { HandlerEvent } from './types'

const secretManager = new SecretsManagerClient({
  //
})

const stripeApiToken = await secretManager.send(
  new GetSecretValueCommand({
    SecretId: config.stripeApiToken,
  })
)

const dynamoDBClient = buildDynamoDBClient()

const stripe = new Stripe(stripeApiToken.SecretString!, {
  apiVersion: '2022-11-15',
})

export const handler = async (event: HandlerEvent) =>
  buildHandler(
    {
      customersService: new CustomersService({
        internalCustomersRepository:
          buildDynamoDBCustomersRepository(dynamoDBClient),
        externalCustomersRepository: buildStripeCustomersRepository(stripe),
      }),
      checkoutService: new CheckoutService({
        checkoutRepository: buildStripeCheckoutRepository(stripe),
      }),
      subscriptionsService: new SubscriptionsService({
        subscriptionsRepository:
          buildDynamoDBSubscriptionsRepository(dynamoDBClient),
      }),
    },
    event
  )

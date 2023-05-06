import { buildHandler } from './handler'
import { CheckoutService, CustomersService } from '../../../services'
import {
  buildDynamoDBCustomersRepository,
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

const secretManager = new SecretsManagerClient({
  //
})

const stripeApiToken = await secretManager.send(
  new GetSecretValueCommand({
    SecretId: config.stripeApiToken,
  })
)

const dynamoDBClient = buildDynamoDBClient()

const stripe = new Stripe(stripeApiToken.SecretString, {
  apiVersion: '2022-11-15',
})

export const handler = async (event) =>
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
    },
    event
  )
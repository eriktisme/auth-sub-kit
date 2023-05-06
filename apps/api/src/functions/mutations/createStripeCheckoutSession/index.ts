import { buildHandler } from './handler'
import { CheckoutService } from '../../../services'
import { buildStripeCheckoutRepository } from '../../../repositories'
import Stripe from 'stripe'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import { config } from '../../../config'

const secretManager = new SecretsManagerClient({
  //
})

const stripeApiToken = await secretManager.send(
  new GetSecretValueCommand({
    SecretId: config.stripeApiToken,
  })
)

export const handler = async (event) =>
  buildHandler(
    {
      checkoutService: new CheckoutService({
        checkoutRepository: buildStripeCheckoutRepository(
          new Stripe(stripeApiToken.SecretString, {
            apiVersion: '2022-11-15',
          })
        ),
      }),
    },
    event
  )

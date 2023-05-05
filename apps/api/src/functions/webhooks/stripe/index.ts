import { buildHandler } from './handler'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import { config } from '../../../config'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { ProductsService } from '../../../services'

const secretManager = new SecretsManagerClient({
  //
})

const stripeWebhookToken = await secretManager.send(
  new GetSecretValueCommand({
    SecretId: config.stripeWebhookTokenId,
  })
)

export const handler = async (event: APIGatewayProxyEventV2) =>
  buildHandler(
    {
      productsService: new ProductsService({
        //
      }),
      stripeWebhookToken: stripeWebhookToken.SecretString!,
    },
    event
  )

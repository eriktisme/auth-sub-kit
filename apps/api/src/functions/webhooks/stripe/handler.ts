import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda'
import Stripe from 'stripe'
import { HandlerDeps } from './types'

export const buildHandler = async (
  deps: HandlerDeps,
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  let statusCode = 200

  try {
    const stripeEvent: Stripe.Event = new Stripe('', {
      apiVersion: '2022-11-15',
    }).webhooks.constructEvent(
      event.body!,
      event.headers['stripe-signature']!,
      deps.stripeWebhookToken
    )

    // TODO: Dispatch event
    console.log(JSON.stringify(stripeEvent, null, 2))
  } catch (err) {
    console.error('Failed to construct stripe event', {
      err,
    })

    statusCode = 500
  }

  return {
    body: JSON.stringify({
      //
    }),
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
  }
}

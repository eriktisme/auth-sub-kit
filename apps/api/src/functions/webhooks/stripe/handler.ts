import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda'
import Stripe from 'stripe'
import { HandlerDeps } from './types'
import { StripeProductSchema, StripeProductEventSchema } from '../../../domain'

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

    switch (stripeEvent.type) {
      case 'product.created':
      case 'product.updated':
        const product = stripeEvent.data.object as Stripe.Product

        await deps.productsService.upsert(
          StripeProductSchema.parse({
            active: product.active,
            name: product.name,
            description: product.description ?? undefined,
            productId: product.id,
            image: product.images?.[0] ?? undefined,
            metadata: product.metadata,
          })
        )

        break
      case 'price.created':
      case 'price.updated':
        const price = stripeEvent.data.object as Stripe.Price

        await deps.productsService.upsertPrice(
          StripeProductEventSchema.parse({
            productId: price.product as string,
            description: price.nickname ?? undefined,
            interval: price.recurring?.interval ?? undefined,
            intervalCount: price.recurring?.interval_count ?? undefined,
            metadata: price.metadata,
            active: price.active,
            currency: price.currency,
            priceId: price.id,
            type: price.type,
            unitAmount: price.unit_amount ?? undefined,
            trialPeriodDays: price.recurring?.trial_period_days ?? undefined,
          })
        )

        break
    }
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

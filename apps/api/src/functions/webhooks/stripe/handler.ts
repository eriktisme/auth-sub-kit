import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda'
import Stripe from 'stripe'
import { HandlerDeps } from './types'
import {
  StripeProductSchema,
  StripePriceSchema,
  StripeSubscriptionSchema,
} from '../../../domain'

export const buildHandler = async (
  deps: HandlerDeps,
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  let statusCode = 200

  try {
    const stripeEvent: Stripe.Event = deps.stripe.webhooks.constructEvent(
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
          StripePriceSchema.parse({
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
      case 'checkout.session.completed':
        const checkout = stripeEvent.data.object as Stripe.Checkout

        const subscription = await deps.stripe.subscriptions.retrieve(
          checkout.subscription
        )

        const customer = await deps.customersService.get(
          checkout.customer_details.email
        )

        await deps.subscriptionsService.upsert(
          StripeSubscriptionSchema.parse({
            cancelAtPeriodEnd: subscription.cancel_at_period_end
              ? new Date(subscription.cancel_at_period_end * 1000).toISOString()
              : undefined,
            canceledAt: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000).toISOString()
              : undefined,
            currentPeriodEnd: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : undefined,
            endedAt: subscription.ended_at
              ? new Date(subscription.ended_at * 1000).toISOString()
              : undefined,
            productId: subscription.customer,
            status: subscription.status,
            subscriptionId: subscription.id,
            userId: customer.userId,
          })
        )
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

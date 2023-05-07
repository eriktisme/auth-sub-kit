import { AppSyncIdentityCognito } from 'aws-lambda'
import { CreateStripeCheckoutSessionResponse } from '../../../appsync'
import { HandlerDeps, HandlerEvent } from './types'

export const buildHandler = async (
  deps: HandlerDeps,
  event: HandlerEvent
): Promise<CreateStripeCheckoutSessionResponse> => {
  const identity = event.identity as AppSyncIdentityCognito

  const subscription = await deps.subscriptionsService.get(identity.sub)

  const { customerId } = await deps.customersService.createOrRetrieve({
    email: identity.claims['email'],
    userId: identity.sub,
  })

  if (subscription && subscription.priceId === event.arguments.input.price.id) {
    const { url } = await deps.checkoutService.createBillingPortalSession({
      customerId,
    })

    return {
      __typename: 'StripeBillingPortalSession',
      url,
    }
  }

  const { sessionId } = await deps.checkoutService.createSession({
    customerId,
    metadata: {},
    priceId: event.arguments.input.price.id,
    quantity: event.arguments.input.quantity ?? 1,
  })

  return {
    __typename: 'StripeCheckoutSession',
    sessionId,
  }
}

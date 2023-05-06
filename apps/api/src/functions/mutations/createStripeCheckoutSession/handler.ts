import { AppSyncResolverEvent, AppSyncIdentityCognito } from 'aws-lambda'
import {
  CreateStripeCheckoutSessionInput,
  CreateStripeCheckoutSessionResponse,
} from '../../../appsync'
import { HandlerDeps } from './types'

export const buildHandler = async (
  deps: HandlerDeps,
  event: AppSyncResolverEvent<{
    input: CreateStripeCheckoutSessionInput
  }>
): Promise<CreateStripeCheckoutSessionResponse> => {
  const identity = event.identity as AppSyncIdentityCognito

  const { customerId } = await deps.customersService.createOrRetrieve({
    email: identity.claims['email'],
    userId: identity.sub,
  })

  const { sessionId } = await deps.checkoutService.createSession({
    customerId,
    metadata: {},
    priceId: event.arguments.input.price.id,
    quantity: event.arguments.input.quantity ?? 1,
  })

  return {
    sessionId,
  }
}
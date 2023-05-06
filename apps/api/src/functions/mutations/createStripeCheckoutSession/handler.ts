import { AppSyncResolverEvent } from 'aws-lambda'
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
  // TODO: Create customer

  const { sessionId } = await deps.checkoutService.createSession({
    customerId: '',
    metadata: {},
    priceId: event.arguments.input.price.id,
    quantity: event.arguments.input.quantity ?? 1,
  })

  return {
    sessionId,
  }
}

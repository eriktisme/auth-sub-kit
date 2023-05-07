import { AppSyncIdentityCognito, AppSyncResolverEvent } from 'aws-lambda'
import { StripeSubscription } from '../../../appsync'
import { HandlerDeps } from './types'

export const buildHandler = async (
  deps: HandlerDeps,
  event: AppSyncResolverEvent<{}>
): Promise<Omit<StripeSubscription, 'product' | 'price'> | null> => {
  const subscription = await deps.subscriptionsService.get(
    (event.identity as AppSyncIdentityCognito).sub
  )

  if (!subscription) {
    return null
  }

  return {
    ...subscription,
    id: subscription.subscriptionId,
  }
}

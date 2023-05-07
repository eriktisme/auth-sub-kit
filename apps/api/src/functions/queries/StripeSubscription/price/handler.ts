import { AppSyncResolverEvent } from 'aws-lambda'
import { HandlerDeps, HandlerEvent } from './types'
import { StripePrice } from '../../../../appsync'

export const buildHandler = async (
  deps: HandlerDeps,
  event: HandlerEvent
): Promise<StripePrice> => {
  const price = await deps.pricesService.get(event.arguments.priceId)

  return {
    active: price.active,
    currency: price.currency,
    description: price.description,
    id: price.priceId,
    interval: price.interval,
    intervalCount: price.intervalCount,
    trialPeriodDays: price.trialPeriodDays,
    type: price.type,
    unitAmount: price.unitAmount,
  }
}

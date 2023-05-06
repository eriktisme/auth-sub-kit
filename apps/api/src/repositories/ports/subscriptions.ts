import { StripeSubscription } from '../../domain'

export type UpsertSubscriptionArgs = StripeSubscription

export interface SubscriptionsRepository {
  upsert(args: UpsertSubscriptionArgs): Promise<StripeSubscription>
}

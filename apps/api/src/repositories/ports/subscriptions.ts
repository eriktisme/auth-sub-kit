import { StripeSubscription } from '../../domain'

export type UpsertSubscriptionArgs = StripeSubscription

export interface SubscriptionsRepository {
  get(userId: string): Promise<StripeSubscription | null>
  upsert(args: UpsertSubscriptionArgs): Promise<StripeSubscription>
}

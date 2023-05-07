import { SubscriptionsRepository, UpsertSubscriptionArgs } from '../../ports'
import { DynamoDBDao } from './dao'
import { SubscriptionKey, SubscriptionModel } from './models'
import { StripeSubscription } from '../../../domain'

export class DynamoDBSubscriptionsRepository
  implements SubscriptionsRepository
{
  constructor(protected dao: DynamoDBDao<SubscriptionModel, SubscriptionKey>) {
    //
  }

  async get(userId: string): Promise<StripeSubscription | null> {
    return this.dao.get({
      userId,
    })
  }

  async upsert(args: UpsertSubscriptionArgs): Promise<StripeSubscription> {
    await this.dao.put(args)

    return args
  }
}

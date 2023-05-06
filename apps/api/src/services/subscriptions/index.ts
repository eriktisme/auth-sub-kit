import { StripeSubscription } from '../../domain'
import { SubscriptionsRepository } from '../../repositories'

interface SubscriptionsServiceDeps {
  subscriptionsRepository: SubscriptionsRepository
}

type UpsertSubscriptionArgs = StripeSubscription

export class SubscriptionsService {
  constructor(protected deps: SubscriptionsServiceDeps) {
    //
  }

  async upsert(args: UpsertSubscriptionArgs): Promise<void> {
    await this.deps.subscriptionsRepository.upsert(args)
  }
}

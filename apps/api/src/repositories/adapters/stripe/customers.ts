import { CustomersRepository, StoreCustomerArgs } from '../../ports'
import Stripe from 'stripe'
import { StripeCustomer } from '../../../domain'

export class StripeCustomersRepository
  implements Pick<CustomersRepository, 'store'>
{
  constructor(protected client: Stripe) {
    //
  }

  async store(args: StoreCustomerArgs): Promise<StripeCustomer> {
    const customer = await this.client.customers.create({
      email: args.email,
      metadata: {
        userId: args.userId,
        email: args.email,
      },
    })

    return {
      customerId: customer.id,
      email: args.email,
      userId: args.userId,
    }
  }
}

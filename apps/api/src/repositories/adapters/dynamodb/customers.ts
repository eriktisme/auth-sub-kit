import { CustomersRepository, StoreCustomerArgs } from '../../ports'
import { DynamoDBDao } from './dao'
import { CustomerKey, CustomerModel } from './models'
import { StripeCustomer } from '../../../domain'

export class DynamoDBCustomersRepository implements CustomersRepository {
  constructor(protected dao: DynamoDBDao<CustomerModel, CustomerKey>) {
    //
  }

  async get(id: string): Promise<StripeCustomer | null> {
    return this.dao.get({
      userId: id,
    })
  }

  async store(args: StoreCustomerArgs): Promise<StripeCustomer> {
    const data = {
      ...args,
      customerId: args.customerId!,
    }

    await this.dao.put(data)

    return data
  }
}

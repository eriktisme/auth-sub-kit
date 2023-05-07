import { CustomersRepository, StoreCustomerArgs } from '../../ports'
import { DynamoDBDao } from './dao'
import { CustomerKey, CustomerModel } from './models'
import { StripeCustomer } from '../../../domain'

export class DynamoDBCustomersRepository implements CustomersRepository {
  constructor(protected dao: DynamoDBDao<CustomerModel, CustomerKey>) {
    //
  }

  async findByUserId(id: string): Promise<StripeCustomer | null> {
    return this.dao.get({
      userId: id,
    })
  }

  async findByEmail(email: string): Promise<StripeCustomer> {
    const customer = await this.dao.query({
      index: 'email',
      keyConditionExpression: `email = :email`,
      expressionValues: {
        ':email': email,
      },
    })

    return customer[0]!
  }

  async get(customerId: string): Promise<StripeCustomer> {
    const customer = await this.dao.query({
      index: 'customer',
      keyConditionExpression: `customerId = :customerId`,
      expressionValues: {
        ':customerId': customerId,
      },
    })

    return customer[0]!
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

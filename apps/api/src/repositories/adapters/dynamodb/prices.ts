import { PricesRepository } from '../../ports'
import { PriceKey, PriceModel } from './models'
import { StripePrice, StripeProduct } from '../../../domain'
import { DynamoDBDao } from './dao'

export class DynamoDBPricesRepository implements PricesRepository {
  constructor(protected dao: DynamoDBDao<PriceModel, PriceKey>) {
    //
  }

  async getActiveByProduct(product: string): Promise<StripePrice[]> {
    return this.dao.query({
      index: 'product',
      keyConditionExpression: `productId = :productId`,
      expressionValues: {
        ':productId': product,
      },
    })
  }

  async upsert(args: StripePrice): Promise<StripePrice> {
    await this.dao.put(args)

    return args
  }
}

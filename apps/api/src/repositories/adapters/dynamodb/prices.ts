import { PricesRepository } from '../../ports'
import { PriceKey, PriceModel } from './models'
import { StripePrice } from '../../../domain'
import { DynamoDBDao } from './dao'

export class DynamoDBPricesRepository implements PricesRepository {
  constructor(protected dao: DynamoDBDao<PriceModel, PriceKey>) {
    //
  }

  async get(priceId: string): Promise<StripePrice> {
    const price = await this.dao.query({
      index: 'price',
      keyConditionExpression: `priceId = :priceId`,
      expressionValues: {
        ':priceId': priceId,
      },
    })

    return price[0]
  }

  async findByProductId(productId: string): Promise<StripePrice[]> {
    return this.dao.query({
      index: 'product',
      keyConditionExpression: `productId = :productId`,
      expressionValues: {
        ':productId': productId,
      },
    })
  }

  async upsert(args: StripePrice): Promise<StripePrice> {
    await this.dao.put(args)

    return args
  }
}

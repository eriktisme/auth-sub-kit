import { PricesRepository } from '../../ports'
import { PriceKey, PriceModel } from './models'
import { StripePrice } from '../../../domain'
import { DynamoDBDao } from './dao'

export class DynamoDBPricesRepository implements PricesRepository {
  constructor(protected dao: DynamoDBDao<PriceModel, PriceKey>) {
    //
  }

  async upsert(args: StripePrice): Promise<StripePrice> {
    await this.dao.put(args)

    return args
  }
}

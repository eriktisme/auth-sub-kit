import { ProductsRepository } from '../../ports'
import { ProductKey, ProductModel } from './models'
import { StripeProduct } from '../../../domain'
import { DynamoDBDao } from './dao'

export class DynamoDBProductsRepository implements ProductsRepository {
  constructor(protected dao: DynamoDBDao<ProductModel, ProductKey>) {
    //
  }

  async upsert(args: StripeProduct): Promise<StripeProduct> {
    await this.dao.put(args)

    return args
  }
}

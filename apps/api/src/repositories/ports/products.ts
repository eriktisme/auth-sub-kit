import { StripeProduct } from '../../domain'

export interface ProductsRepository {
  upsert(args: StripeProduct): Promise<StripeProduct>
}

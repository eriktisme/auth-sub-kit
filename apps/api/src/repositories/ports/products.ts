import { StripeProduct } from '../../domain'

export interface ProductsRepository {
  getActive(): Promise<StripeProduct[]>

  upsert(args: StripeProduct): Promise<StripeProduct>
}

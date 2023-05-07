import { StripeProduct } from '../../domain'

export interface ProductsRepository {
  get(productId: string): Promise<StripeProduct>
  getActive(): Promise<StripeProduct[]>
  upsert(args: StripeProduct): Promise<StripeProduct>
}

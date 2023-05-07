import { StripePrice } from '../../domain'

export interface PricesRepository {
  findByProductId(productId: string): Promise<StripePrice[]>
  get(priceId: string): Promise<StripePrice>
  upsert(args: StripePrice): Promise<StripePrice>
}

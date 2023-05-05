import { StripePrice, StripeProduct } from '../../domain'

export interface PricesRepository {
  getActiveByProduct(product: string): Promise<StripePrice[]>

  upsert(args: StripePrice): Promise<StripePrice>
}

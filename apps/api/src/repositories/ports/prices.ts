import { StripePrice } from '../../domain'

export interface PricesRepository {
  upsert(args: StripePrice): Promise<StripePrice>
}

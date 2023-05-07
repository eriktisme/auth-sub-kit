import { PricesRepository } from '../../repositories'
import { StripePrice } from '../../domain'

interface PricesServiceDeps {
  pricesRepository: PricesRepository
}

export class PricesService {
  constructor(protected deps: PricesServiceDeps) {
    //
  }

  async get(priceId: string): Promise<StripePrice> {
    return this.deps.pricesRepository.get(priceId)
  }

  async findPricesForProduct(productId: string): Promise<StripePrice[]> {
    return this.deps.pricesRepository.findByProductId(productId)
  }

  async upsert(args: StripePrice): Promise<void> {
    await this.deps.pricesRepository.upsert(args)
  }
}

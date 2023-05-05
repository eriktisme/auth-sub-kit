import { StripeProduct, StripePrice } from '../../domain'
import { PricesRepository, ProductsRepository } from '../../repositories'

interface ProductsServiceDeps {
  productsRepository: ProductsRepository
  pricesRepository: PricesRepository
}

export class ProductsService {
  constructor(protected deps: ProductsServiceDeps) {
    //
  }

  async upsert(args: StripeProduct): Promise<void> {
    await this.deps.productsRepository.upsert(args)
  }

  async upsertPrice(args: StripePrice): Promise<void> {
    await this.deps.pricesRepository.upsert(args)
  }

  async getActiveProducts(): Promise<StripeProduct[]> {
    return this.deps.productsRepository.getActive()
  }

  async getProductWithActivePrices(product: string): Promise<StripePrice[]> {
    return this.deps.pricesRepository.getActiveByProduct(product)
  }
}

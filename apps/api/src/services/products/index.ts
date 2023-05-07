import { StripeProduct } from '../../domain'
import { ProductsRepository } from '../../repositories'

interface ProductsServiceDeps {
  productsRepository: ProductsRepository
}

export class ProductsService {
  constructor(protected deps: ProductsServiceDeps) {
    //
  }

  async get(productId: string): Promise<StripeProduct> {
    return this.deps.productsRepository.get(productId)
  }

  async getActiveProducts(): Promise<StripeProduct[]> {
    return this.deps.productsRepository.getActive()
  }

  async upsert(args: StripeProduct): Promise<void> {
    await this.deps.productsRepository.upsert(args)
  }
}

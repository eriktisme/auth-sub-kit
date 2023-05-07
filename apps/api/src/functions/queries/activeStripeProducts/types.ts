import { PricesService, ProductsService } from '../../../services'

export interface HandlerDeps {
  pricesService: PricesService
  productsService: ProductsService
}

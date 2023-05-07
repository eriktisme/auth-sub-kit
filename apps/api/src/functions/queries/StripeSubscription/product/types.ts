import { PricesService, ProductsService } from '../../../../services'
import { AppSyncResolverEvent } from 'aws-lambda'

export type HandlerEvent = AppSyncResolverEvent<{
  productId: string
}>

export interface HandlerDeps {
  pricesService: PricesService
  productsService: ProductsService
}

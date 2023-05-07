import { PricesService } from '../../../../services'
import { AppSyncResolverEvent } from 'aws-lambda'

export type HandlerEvent = AppSyncResolverEvent<{
  priceId: string
}>

export interface HandlerDeps {
  pricesService: PricesService
}

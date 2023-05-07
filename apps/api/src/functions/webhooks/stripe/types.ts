import {
  CustomersService,
  PricesService,
  ProductsService,
  SubscriptionsService,
} from '../../../services'
import Stripe from 'stripe'

export interface HandlerDeps {
  customersService: CustomersService
  pricesService: PricesService
  productsService: ProductsService
  subscriptionsService: SubscriptionsService
  stripe: Stripe
  stripeWebhookToken: string
}

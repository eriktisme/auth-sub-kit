import {
  CustomersService,
  ProductsService,
  SubscriptionsService,
} from '../../../services'
import Stripe from 'stripe'

export interface HandlerDeps {
  customersService: CustomersService
  productsService: ProductsService
  subscriptionsService: SubscriptionsService
  stripe: Stripe
  stripeWebhookToken: string
}

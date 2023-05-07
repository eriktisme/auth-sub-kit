import {
  CheckoutService,
  CustomersService,
  SubscriptionsService,
} from '../../../services'
import { AppSyncResolverEvent } from 'aws-lambda'
import { CreateStripeCheckoutSessionInput } from '../../../appsync'

export type HandlerEvent = AppSyncResolverEvent<{
  input: CreateStripeCheckoutSessionInput
}>

export interface HandlerDeps {
  checkoutService: CheckoutService
  customersService: CustomersService
  subscriptionsService: SubscriptionsService
}

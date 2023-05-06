import { CheckoutService, CustomersService } from '../../../services'

export interface HandlerDeps {
  checkoutService: CheckoutService
  customersService: CustomersService
}

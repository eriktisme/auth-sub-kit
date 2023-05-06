import { StripeCustomer } from '../../domain'

export interface StoreCustomerArgs {
  customerId?: string
  email: string
  userId: string
}

export interface CustomersRepository {
  get(id: string): Promise<StripeCustomer | null>
  getByEmail(email: string): Promise<StripeCustomer>
  store(args: StoreCustomerArgs): Promise<StripeCustomer>
}

import { StripeCustomer } from '../../domain'

export interface StoreCustomerArgs {
  customerId?: string
  email: string
  userId: string
}

export interface CustomersRepository {
  findByEmail(email: string): Promise<StripeCustomer>
  findByUserId(id: string): Promise<StripeCustomer | null>
  get(id: string): Promise<StripeCustomer>
  store(args: StoreCustomerArgs): Promise<StripeCustomer>
}

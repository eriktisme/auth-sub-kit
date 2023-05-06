import Stripe from 'stripe'
import { StripeCheckoutRepository } from './checkout'
import { StripeCustomersRepository } from './customers'

export function buildStripeCheckoutRepository(client: Stripe) {
  return new StripeCheckoutRepository(client)
}

export function buildStripeCustomersRepository(client: Stripe) {
  return new StripeCustomersRepository(client)
}

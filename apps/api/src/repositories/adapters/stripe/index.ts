import Stripe from 'stripe'
import { StripeCheckoutRepository } from './checkout'

export function buildStripeCheckoutRepository(client: Stripe) {
  return new StripeCheckoutRepository(client)
}

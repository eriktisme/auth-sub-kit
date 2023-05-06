import {
  CheckoutRepository,
  CreateSessionArgs,
  CreateSessionResult,
} from '../../ports'
import Stripe from 'stripe'
import { config } from '../../../config'

export class StripeCheckoutRepository implements CheckoutRepository {
  constructor(protected client: Stripe) {
    //
  }

  async createSession(args: CreateSessionArgs): Promise<CreateSessionResult> {
    const session = await this.client.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: args.customerId,
      line_items: [
        {
          price: args.priceId,
          quantity: args.quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata: args.metadata,
      },
      success_url: `https://${config.domain}/account`,
      cancel_url: `https://${config.domain}/account`,
    })

    return {
      sessionId: session.id,
    }
  }
}

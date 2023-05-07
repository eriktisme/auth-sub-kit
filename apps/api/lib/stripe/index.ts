import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { ActiveProducts } from './active-products'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
import { CreateCheckoutSession } from './create-checkout-session'
import { ActiveSubscription } from './active-subscription'
import { Subscription } from './subscription'

interface StripeProps {
  api: GraphqlApi
  domain: string
  prefix: string
  stripeApiToken: Secret
}

export class Stripe extends Construct {
  constructor(scope: Construct, props: StripeProps) {
    super(scope, 'stripe')

    new ActiveProducts(this, props)

    new ActiveSubscription(this, props)

    new CreateCheckoutSession(this, {
      ...props,
      stripeApiToken: props.stripeApiToken,
    })

    new Subscription(this, props)
  }
}

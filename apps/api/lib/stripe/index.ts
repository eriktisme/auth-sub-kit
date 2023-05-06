import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { ActiveProducts } from './active-products'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
import { CreateCheckoutSession } from './create-checkout-session'

interface StripeProps {
  api: GraphqlApi
  domain: string
  prefix: string
}

export class Stripe extends Construct {
  constructor(scope: Construct, props: StripeProps) {
    super(scope, 'stripe')
    const stripeApiToken = new Secret(this, 'stripe-api-token', {
      secretName: `${props.prefix}.AuthSubKitStripeApiToken`,
    })

    new ActiveProducts(this, props)

    new CreateCheckoutSession(this, {
      ...props,
      stripeApiToken,
    })
  }
}

import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { ActiveProducts } from './active-products'

interface StripeProps {
  api: GraphqlApi
  prefix: string
}

export class Stripe extends Construct {
  constructor(scope: Construct, props: StripeProps) {
    super(scope, 'stripe')

    new ActiveProducts(this, props)
  }
}

import { Construct } from 'constructs'
import { StripeWebhook } from './stripe'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'

interface WebhooksProps {
  prefix: string
  stripeApiToken: Secret
}

export class Webhooks extends Construct {
  constructor(scope: Construct, props: WebhooksProps) {
    super(scope, 'webhooks')

    new StripeWebhook(this, props)
  }
}

import { Construct } from 'constructs'
import { StripeWebhook } from './stripe'

interface WebhooksProps {
  prefix: string
}

export class Webhooks extends Construct {
  constructor(scope: Construct, props: WebhooksProps) {
    super(scope, 'webhooks')

    new StripeWebhook(this, props)
  }
}

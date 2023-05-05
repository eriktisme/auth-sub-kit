import { Construct } from 'constructs'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
import { NodejsLambda } from '@auth-sub-kit/cdk-utils'
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import {
  HttpApi,
  HttpMethod,
  HttpRoute,
  HttpRouteKey,
} from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'

interface StripeWebhookProps {
  prefix: string
}

export class StripeWebhook extends Construct {
  constructor(scope: Construct, props: StripeWebhookProps) {
    super(scope, 'stripe-webhook')

    const stripeWebhookToken = new Secret(this, 'stripe-webhook-token', {
      secretName: `${props.prefix}.AuthSubKitStripeWebhookToken`,
    })

    const handler = new NodejsLambda(this, 'handler', {
      entry: './src/functions/webhooks/stripe/index.ts',
      environment: {
        STRIPE_WEBHOOK_TOKEN_ID: stripeWebhookToken.secretName,
      },
    })

    stripeWebhookToken.grantRead(handler)

    handler.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

    const httpApi = new HttpApi(this, 'api', {
      apiName: `${props.prefix}-auth-sub-kit-stripe-webhook`,
    })

    const integration = new HttpLambdaIntegration('integration', handler)

    new HttpRoute(this, 'route', {
      httpApi,
      integration,
      routeKey: HttpRouteKey.with('/stripe/webhook', HttpMethod.POST),
    })
  }
}

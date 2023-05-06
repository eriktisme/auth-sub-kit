import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  AuthorizationType,
  GraphqlApi,
  SchemaFile,
} from 'aws-cdk-lib/aws-appsync'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Webhooks } from './webhooks'
import { Stripe } from './stripe'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'

interface AppStackProps extends StackProps {
  domain: string
  prefix: string
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props)

    const userPool = UserPool.fromUserPoolId(
      this,
      'cognito-user-pool',
      StringParameter.fromStringParameterName(
        this,
        'cognito-user-pool-id',
        `${props.prefix}.AuthSubKitUserPoolId`
      ).stringValue
    )

    const api = new GraphqlApi(this, 'api', {
      name: `${props.prefix}-auth-sub-kit-api`,
      schema: SchemaFile.fromAsset('./schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.IAM,
          },
        ],
      },
    })

    const stripeApiToken = new Secret(this, 'stripe-api-token', {
      secretName: `${props.prefix}.AuthSubKitStripeApiSecretToken`,
    })

    new Webhooks(this, {
      prefix: props.prefix,
      stripeApiToken,
    })

    new Stripe(this, {
      api,
      domain: props.domain,
      prefix: props.prefix,
      stripeApiToken,
    })
  }
}

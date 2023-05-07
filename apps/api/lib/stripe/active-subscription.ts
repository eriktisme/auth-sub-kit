import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { NodejsLambda, AppsyncResolver } from '@auth-sub-kit/cdk-utils'

interface ActiveSubscriptionProps {
  prefix: string
  api: GraphqlApi
}

export class ActiveSubscription extends Construct {
  constructor(scope: Construct, props: ActiveSubscriptionProps) {
    const id = 'active-subscription'

    super(scope, id)

    const handler = new NodejsLambda(this, `${id}-handler`, {
      entry: './src/functions/queries/activeStripeSubscription/index.ts',
      environment: {
        PREFIX: props.prefix,
      },
    })

    handler.grantDynamoDBTableReadAccess(
      props.prefix,
      'AuthSubKitStripeSubscriptions'
    )

    new AppsyncResolver(this, id, {
      api: props.api,
      handler,
      resolver: {
        typeName: 'Query',
        fieldName: 'activeStripeSubscription',
      },
    })
  }
}

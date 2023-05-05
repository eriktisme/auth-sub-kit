import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { NodejsLambda, AppsyncResolver } from '@auth-sub-kit/cdk-utils'

interface ActiveProductsProps {
  prefix: string
  api: GraphqlApi
}

export class ActiveProducts extends Construct {
  constructor(scope: Construct, props: ActiveProductsProps) {
    const id = 'active-products'

    super(scope, id)

    const handler = new NodejsLambda(this, `${id}-handler`, {
      entry: './src/functions/queries/activeStripeProducts/index.ts',
      environment: {
        PREFIX: props.prefix,
      },
    })

    handler.grantDynamoDBTableReadAccess(
      props.prefix,
      'AuthSubKitStripeProducts'
    )
    handler.grantDynamoDBTableReadAccess(props.prefix, 'AuthSubKitStripePrices')

    new AppsyncResolver(this, id, {
      api: props.api,
      handler,
      resolver: {
        typeName: 'Query',
        fieldName: 'activeStripeProducts',
      },
    })
  }
}

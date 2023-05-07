import { Construct } from 'constructs'
import { GraphqlApi, MappingTemplate } from 'aws-cdk-lib/aws-appsync'
import { AppsyncResolver, NodejsLambda } from '@auth-sub-kit/cdk-utils'

interface SubscriptionProps {
  api: GraphqlApi
  prefix: string
}

export class Subscription extends Construct {
  constructor(scope: Construct, props: SubscriptionProps) {
    const id = 'stripe-subscription'

    super(scope, id)

    const productHandler = new NodejsLambda(this, `${id}-product-handler`, {
      entry: './src/functions/queries/StripeSubscription/product/index.ts',
      environment: {
        PREFIX: props.prefix,
      },
    })

    productHandler.grantDynamoDBTableReadAccess(
      props.prefix,
      'AuthSubKitStripeProducts'
    )

    productHandler.grantDynamoDBTableReadAccess(
      props.prefix,
      'AuthSubKitStripePrices'
    )

    new AppsyncResolver(this, `${id}-product-resolver`, {
      api: props.api,
      handler: productHandler,
      resolver: {
        typeName: 'StripeSubscription',
        fieldName: 'product',
        requestMappingTemplate: MappingTemplate.fromFile(
          './resolvers/StripeSubscription.product.request'
        ),
      },
    })

    const priceHandler = new NodejsLambda(this, `${id}-price-handler`, {
      entry: './src/functions/queries/StripeSubscription/price/index.ts',
      environment: {
        PREFIX: props.prefix,
      },
    })

    priceHandler.grantDynamoDBTableReadAccess(
      props.prefix,
      'AuthSubKitStripePrices'
    )

    new AppsyncResolver(this, `${id}-price-resolver`, {
      api: props.api,
      handler: priceHandler,
      resolver: {
        typeName: 'StripeSubscription',
        fieldName: 'price',
        requestMappingTemplate: MappingTemplate.fromFile(
          './resolvers/StripeSubscription.price.request'
        ),
      },
    })
  }
}

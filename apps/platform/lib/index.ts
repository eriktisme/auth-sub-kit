import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { EventBus } from 'aws-cdk-lib/aws-events'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Table } from '@auth-sub-kit/cdk-utils'
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb'

interface PlatformStackProps extends StackProps {
  prefix: string
}

export class PlatformStack extends Stack {
  constructor(scope: Construct, id: string, props: PlatformStackProps) {
    super(scope, id, props)

    const bus = new EventBus(this, 'platform-event-bus', {
      eventBusName: `${props.prefix}.AuthSubKitPlatformEventBus`,
    })

    new StringParameter(this, 'platform-event-bus-name', {
      parameterName: `${props.prefix}.AuthSubKitPlatformEventBusName`,
      stringValue: bus.eventBusName,
    })

    new Table(this, 'platform-stripe-products', {
      tableName: `${props.prefix}.AuthSubKitStripeProducts`,
      hashKey: {
        name: 'productId',
        type: AttributeType.STRING,
      },
    })

    new Table(this, 'platform-stripe-prices', {
      tableName: `${props.prefix}.AuthSubKitStripePrices`,
      hashKey: {
        name: 'priceId',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'productId',
        type: AttributeType.STRING,
      },
      gsi: [
        {
          name: 'product',
          hashKey: {
            name: 'productId',
            type: AttributeType.STRING,
          },
        },
      ],
    })
  }
}

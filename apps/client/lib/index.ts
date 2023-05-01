import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Network } from './network'
import { Distribution } from './distribution'

interface AppStackProps extends StackProps {
  domain: string
  prefix: string
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props)

    const network = new Network(this, 'network', {
      domain: props.domain,
    })

    new Distribution(this, 'distribution', {
      certificate: network.certificate,
      domain: props.domain,
      hostedZone: network.hostedZone,
      prefix: props.prefix,
    })
  }
}

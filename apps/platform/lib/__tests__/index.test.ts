import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { PlatformStack } from '../index'

const stack = new PlatformStack(new App(), 'platform-stack', {
  prefix: 'prod',
})

const template = Template.fromStack(stack)

describe('PlatformStack', () => {
  it('should configure event bus', () => {
    template.hasResourceProperties('AWS::Events::EventBus', {
      //
    })
  })

  it('should configure stripe products table', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: 'prod.AuthSubKitStripeProducts',
    })
  })

  it('should configure stripe products table', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: 'prod.AuthSubKitStripePrices',
    })
  })
})

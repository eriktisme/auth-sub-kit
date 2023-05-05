import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { PlatformStack } from '../index'

const stack = new PlatformStack(new App(), 'platform-stack', {
  prefix: 'prod',
})

const template = Template.fromStack(stack)

describe.skip('PlatformStack', () => {
  //
})

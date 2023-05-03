import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { ApiStack } from '../index'

const stack = new ApiStack(new App(), 'api-stack', {
  domain: 'auth-sub-kit.dev',
  prefix: 'prod',
})

const template = Template.fromStack(stack)

describe('ApiStack', () => {
  it('should configure appsync', () => {
    template.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      //
    })
  })
})

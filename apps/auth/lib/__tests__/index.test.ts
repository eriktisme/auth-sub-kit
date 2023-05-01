import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { AuthStack } from '../index'

const stack = new AuthStack(new App(), 'auth-stack', {
  domain: 'auth-sub-kit.dev',
  google: {
    clientId: '',
    clientSecret: '',
  },
  prefix: 'prod',
})

const template = Template.fromStack(stack)

describe('AuthStack', () => {
  it('should configure cognito user pool', () => {
    template.hasResourceProperties('AWS::Cognito::UserPool', {})
  })

  it('should configure cognito user pool domain', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolDomain', {})
  })

  it('should configure cognito user pool client', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolClient', {})
  })

  it('should configure cognito user pool google provider', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolIdentityProvider', {
      ProviderName: 'Google',
      ProviderType: 'Google',
      AttributeMapping: {
        email: 'email',
        family_name: 'family_name',
        given_name: 'given_name',
        picture: 'picture',
      },
    })
  })
})

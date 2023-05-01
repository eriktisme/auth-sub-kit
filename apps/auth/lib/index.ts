import { RemovalPolicy, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  ProviderAttribute,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolDomain,
  UserPoolIdentityProviderGoogle,
} from 'aws-cdk-lib/aws-cognito'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'

interface GoogleClientProps {
  clientId: string
  clientSecret: string
}

interface AppStackProps extends StackProps {
  domain: string
  google: GoogleClientProps
  prefix: string
}

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props)

    const userPool = new UserPool(this, 'cognito-user-pool', {
      autoVerify: {
        email: true,
      },
      lambdaTriggers: {
        //
      },
      removalPolicy: RemovalPolicy.DESTROY,
      signInAliases: {
        email: true,
      },
      userPoolName: `${props.prefix}-auth-sub-kit`,
    })

    new StringParameter(this, 'cognito-user-pool-id', {
      parameterName: `${props.prefix}.AuthSubKitUserPoolId`,
      stringValue: userPool.userPoolId,
    })

    new UserPoolDomain(this, 'cognito-user-pool-domain', {
      userPool,
      cognitoDomain: {
        domainPrefix: `${props.prefix}-auth-sub-kit`,
      },
    })

    new UserPoolClient(this, 'cognito-user-pool-client', {
      userPool,
      supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
      oAuth: {
        callbackUrls: [`https://${props.domain}/start`],
        logoutUrls: [`htttps://${props.domain}`],
      },
    })

    new UserPoolIdentityProviderGoogle(
      this,
      'cognito-user-pool-google-provider',
      {
        userPool,
        clientId: props.google.clientId,
        clientSecretValue: SecretValue.unsafePlainText(
          props.google.clientSecret
        ),
        scopes: ['profile', 'email', 'openid'],
        attributeMapping: {
          email: ProviderAttribute.GOOGLE_EMAIL,
          givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
          familyName: ProviderAttribute.GOOGLE_FAMILY_NAME,
          profilePicture: ProviderAttribute.GOOGLE_PICTURE,
        },
      }
    )
  }
}

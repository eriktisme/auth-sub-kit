import { RemovalPolicy, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  Mfa,
  ProviderAttribute,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolDomain,
  UserPoolIdentityProviderGoogle,
} from 'aws-cdk-lib/aws-cognito'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { NodejsLambda } from '@auth-sub-kit/cdk-utils'

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

    const preSignUp = new NodejsLambda(this, 'cognito-pre-sign-up-trigger', {
      entry: './src/triggers/preSignUp/index.ts',
    })

    const createAuthChallenge = new NodejsLambda(
      this,
      'cognito-create-auth-challenge-trigger',
      {
        entry: './src/triggers/createAuthChallenge/index.ts',
      }
    )

    const defineAuthChallenge = new NodejsLambda(
      this,
      'cognito-define-auth-challenge-trigger',
      {
        entry: './src/triggers/defineAuthChallenge/index.ts',
      }
    )

    const verifyAuthChallengeResponse = new NodejsLambda(
      this,
      'cognito-verify-auth-challenge-trigger',
      {
        entry: './src/triggers/verifyAuthChallenge/index.ts',
      }
    )

    const userPool = new UserPool(this, 'cognito-user-pool', {
      keepOriginal: {
        email: true,
      },
      lambdaTriggers: {
        createAuthChallenge,
        defineAuthChallenge,
        preSignUp,
        verifyAuthChallengeResponse,
      },
      mfa: Mfa.OFF,
      removalPolicy: RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
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

import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  AuthorizationType,
  GraphqlApi,
  SchemaFile,
} from 'aws-cdk-lib/aws-appsync'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'

interface AppStackProps extends StackProps {
  domain: string
  prefix: string
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props)

    const userPool = UserPool.fromUserPoolId(
      this,
      'cognito-user-pool',
      StringParameter.fromStringParameterName(
        this,
        'cognito-user-pool-id',
        `${props.prefix}.AuthSubKitUserPoolId`
      ).stringValue
    )

    const api = new GraphqlApi(this, 'api', {
      name: `${props.prefix}-auth-sub-kit-api`,
      schema: SchemaFile.fromAsset('./schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
    })

    new StringParameter(this, 'api-id', {
      parameterName: `${props.prefix}.AuthSubKitApiId`,
      stringValue: api.apiId,
    })
  }
}

import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  AuthorizationType,
  GraphqlApi,
  SchemaFile,
} from 'aws-cdk-lib/aws-appsync'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

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
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.IAM,
          },
        ],
      },
    })

    const handler = new NodejsFunction(this, 'test-handler', {
      entry: './src/functions/queries/test/index.ts',
      runtime: Runtime.NODEJS_18_X,
    })

    const testDS = api.addLambdaDataSource('testDS', handler)

    testDS.createResolver('test-resolver', {
      typeName: 'Query',
      fieldName: 'test',
    })
  }
}

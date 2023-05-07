import {
  NodejsFunction,
  NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Duration } from 'aws-cdk-lib'
import { Table } from 'aws-cdk-lib/aws-dynamodb'

export class NodejsLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, {
      ...props,
      logRetention: props?.logRetention ?? RetentionDays.ONE_WEEK,
      architecture: Architecture.ARM_64,
      memorySize: props?.memorySize ?? 256,
      timeout: props?.timeout ?? Duration.seconds(5),
      runtime: Runtime.NODEJS_18_X,
      awsSdkConnectionReuse: true,
      bundling: props?.bundling ?? {
        minify: true,
        target: 'ESNext',
        format: OutputFormat.ESM,
        keepNames: true,
        sourceMap: true,
        sourcesContent: false,
        banner: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
      },
    })
  }

  grantDynamoDBTableReadWriteAccess(prefix: string, ...tableNames: string[]) {
    for (const tableName of tableNames) {
      const table = Table.fromTableAttributes(
        this,
        `${this.functionName}-table-${tableName}`,
        {
          tableName: `${prefix}.${tableName}`,
          grantIndexPermissions: true,
        }
      )

      table.grantReadWriteData(this)
    }

    return this
  }

  grantDynamoDBTableReadAccess(prefix: string, ...tableNames: string[]) {
    for (const tableName of tableNames) {
      const table = Table.fromTableAttributes(
        this,
        `${this.functionName}-table-${tableName}`,
        {
          tableName: `${prefix}.${tableName}`,
          grantIndexPermissions: true,
        }
      )

      table.grantReadData(this)
    }

    return this
  }
}

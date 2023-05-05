import { Construct } from 'constructs'
import { BaseResolverProps, GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

interface AppsyncResolverProps {
  api: GraphqlApi
  handler: NodejsFunction
  resolver: BaseResolverProps
}

export class AppsyncResolver extends Construct {
  constructor(scope: Construct, id: string, props: AppsyncResolverProps) {
    super(scope, id)

    const dataSource = props.api.addLambdaDataSource(
      `${this.buildDataSourceName(id)}DataSource`,
      props.handler
    )

    dataSource.createResolver(`${id}-resolver`, props.resolver)
  }

  protected buildDataSourceName(id: string): string {
    return id
      .split('-')
      .reduce(
        (res, word, i) =>
          i === 0
            ? word.toLowerCase()
            : `${res}${word.charAt(0).toUpperCase()}${word
                .substr(1)
                .toLowerCase()}`,
        ''
      )
  }
}

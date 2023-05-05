import { Construct } from 'constructs'
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  StreamViewType,
  Table as DynamoDBTable,
  TableClass,
} from 'aws-cdk-lib/aws-dynamodb'
import { RemovalPolicy } from 'aws-cdk-lib'

interface Key {
  name: string
  type: AttributeType
}

interface GlobalSecondaryIndex {
  name: string
  hashKey: Key
  sortKey?: Key
  nonKeyAttributes?: string[]
  projectionType?: ProjectionType
}

interface BuildTableProps {
  tableName: string
  hashKey: Key
  sortKey?: Key
  gsi?: GlobalSecondaryIndex[]
  replicationRegions?: string[]
}

interface GlobalSecondaryIndexProps {
  gsi: GlobalSecondaryIndex
}

export class Table extends Construct {
  table: DynamoDBTable

  constructor(scope: Construct, id: string, props: BuildTableProps) {
    super(scope, id)

    const { replicationRegions = [] } = props

    this.table = new DynamoDBTable(scope, `${id}-table`, {
      tableName: props.tableName,
      partitionKey: props.hashKey,
      sortKey: props.sortKey,
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
      pointInTimeRecovery: true,
      removalPolicy: RemovalPolicy.DESTROY,
      tableClass: TableClass.STANDARD,
      replicationRegions,
    })

    props.gsi?.forEach((gsi) => {
      this.createGlobalIndex({
        gsi,
      })
    })
  }

  protected createGlobalIndex({ gsi }: GlobalSecondaryIndexProps) {
    const { name, hashKey, sortKey, nonKeyAttributes, projectionType } = gsi

    this.table.addGlobalSecondaryIndex({
      indexName: name,
      partitionKey: hashKey,
      sortKey,
      nonKeyAttributes,
      projectionType,
    })
  }
}

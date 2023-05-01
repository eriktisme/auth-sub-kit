import { Construct } from 'constructs'
import {
  AaaaRecord,
  ARecord,
  PublicHostedZone,
  RecordTarget,
} from 'aws-cdk-lib/aws-route53'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import {
  AllowedMethods,
  CachePolicy,
  Distribution as CloudFrontDistribution,
  HttpVersion,
  OriginRequestPolicy,
  PriceClass,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { Duration, IgnoreMode } from 'aws-cdk-lib'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { Service, Source } from '@aws-cdk/aws-apprunner-alpha'
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets'

interface DistributionProps {
  certificate: Certificate
  domain: string
  hostedZone: PublicHostedZone
  prefix: string
}

export class Distribution extends Construct {
  constructor(scope: Construct, id: string, props: DistributionProps) {
    super(scope, id)

    const service = new Service(this, 'service', {
      serviceName: `${props.prefix}-auth-sub-kit-app`,
      source: Source.fromAsset({
        imageConfiguration: {
          port: 3000,
        },
        asset: new DockerImageAsset(this, 'asset', {
          directory: './',
          ignoreMode: IgnoreMode.DOCKER,
          platform: Platform.LINUX_AMD64,
        }),
      }),
    })

    const distribution = new CloudFrontDistribution(
      this,
      'cloudfront-distribution',
      {
        domainNames: [props.domain],
        certificate: props.certificate,
        enabled: true,
        enableIpv6: true,
        httpVersion: HttpVersion.HTTP2_AND_3,
        minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
        priceClass: PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        defaultBehavior: {
          origin: new HttpOrigin(service.serviceUrl, {
            connectionAttempts: 3,
            connectionTimeout: Duration.seconds(3),
          }),
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: CachePolicy.CACHING_DISABLED,
          originRequestPolicy: OriginRequestPolicy.USER_AGENT_REFERER_HEADERS,
          compress: true,
        },
        additionalBehaviors: {
          //
        },
      }
    )

    new ARecord(this, 'a-record', {
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      recordName: props.domain,
    })

    new AaaaRecord(this, 'aaaa-record', {
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      recordName: props.domain,
    })
  }
}

import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { AppStack } from '../index'

const stack = new AppStack(new App(), 'app-stack', {
  domain: 'mealgpt.xyz',
  prefix: 'prod',
})

const template = Template.fromStack(stack)

describe('AppStack', () => {
  it('should configure hosted zone', () => {
    template.hasResourceProperties('AWS::Route53::HostedZone', {
      Name: 'mealgpt.xyz.',
    })

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Type: 'A',
      HostedZoneId: { Ref: 'networkhostedzoneC9E85F68' },
      Name: 'mealgpt.xyz.',
    })

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Type: 'AAAA',
      HostedZoneId: { Ref: 'networkhostedzoneC9E85F68' },
      Name: 'mealgpt.xyz.',
    })
  })

  it('should configure certificate', () => {
    template.hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'mealgpt.xyz',
    })
  })

  it('should configure redirect', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName: 'mealgpt.xyz',
          Protocol: 'https',
        },
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
  })

  it('should configure app runner service', () => {
    template.hasResourceProperties('AWS::AppRunner::Service', {
      SourceConfiguration: {
        ImageRepository: {
          ImageConfiguration: { Port: '3000' },
        },
      },
    })
  })

  it('should configure distribution', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['mealgpt.xyz'],
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
        ViewerCertificate: {
          AcmCertificateArn: { Ref: 'networkcertificate64441299' },
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only',
        },
        DefaultCacheBehavior: {
          AllowedMethods: ['GET', 'HEAD'],
          Compress: true,
          ViewerProtocolPolicy: 'redirect-to-https',
        },
      },
    })
  })
})

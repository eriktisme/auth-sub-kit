import { Construct } from 'constructs'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager'
import { HttpsRedirect } from 'aws-cdk-lib/aws-route53-patterns'

interface NetworkProps {
  domain: string
}

export class Network extends Construct {
  hostedZone: PublicHostedZone
  certificate: Certificate

  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id)

    this.hostedZone = new PublicHostedZone(this, 'hosted-zone', {
      zoneName: props.domain,
      comment: `This hosted zone is used to serve ${props.domain}`,
    })

    this.certificate = new Certificate(this, 'certificate', {
      domainName: props.domain,
      subjectAlternativeNames: [`www.${props.domain}`],
      validation: CertificateValidation.fromDns(this.hostedZone),
    })

    new HttpsRedirect(this, 'redirect', {
      recordNames: [`www.${props.domain}`],
      targetDomain: props.domain,
      zone: this.hostedZone,
      certificate: this.certificate,
    })
  }
}

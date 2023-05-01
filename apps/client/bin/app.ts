#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { AppStack } from '../lib'

const app = new App()

const prefix = app.node.tryGetContext('prefix') || 'prod'
const domain = getDomain(app.node.tryGetContext('domain') || '', prefix)

new AppStack(app, `${prefix}-auth-sub-kit-app`, {
  domain,
  env: {
    region: 'us-east-1',
  },
  prefix,
  tags: {
    environment: prefix,
    project: 'auth-sub-kit',
  },
})

function getDomain(domain: string, prefix: string) {
  let result = `${prefix}.envs.${domain}`

  if (['staging', 'prod'].includes(prefix)) {
    result = domain
  }

  return result
}

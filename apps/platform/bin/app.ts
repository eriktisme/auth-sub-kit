#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { PlatformStack } from '../lib'

const app = new App()

const prefix = app.node.tryGetContext('prefix') || 'prod'

new PlatformStack(app, `${prefix}-auth-sub-kit-platform`, {
  env: {
    region: 'eu-west-1',
  },
  prefix,
  tags: {
    environment: prefix,
    project: 'auth-sub-kit',
  },
})

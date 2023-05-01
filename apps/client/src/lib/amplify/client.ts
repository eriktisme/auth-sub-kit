'use client'

import { API, Auth } from 'aws-amplify'
import { config } from './config'
import { environmentVariables } from '@/env'

Auth.configure({
  ...config,
})

API.configure({
  ...config,
  API: {
    graphql_endpoint: environmentVariables.API,
    graphql_headers: async () => {
      const currentSession = await Auth.currentSession()

      return { Authorization: currentSession.getIdToken().getJwtToken() }
    },
  },
})

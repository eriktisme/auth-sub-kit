import { cookies } from 'next/headers'
import { withSSRContext } from 'aws-amplify'
import { config } from './config'
import { environmentVariables } from '@/env'

const serialize = (c: any) => {
  const attrs = [
    'path' in c && c.path && `Path=${c.path}`,
    'expires' in c && c.expires && `Expires=${c.expires.toUTCString()}`,
    'maxAge' in c && c.maxAge && `Max-Age=${c.maxAge}`,
    'domain' in c && c.domain && `Domain=${c.domain}`,
    'secure' in c && c.secure && 'Secure',
    'httpOnly' in c && c.httpOnly && 'HttpOnly',
    'sameSite' in c && c.sameSite && `SameSite=${c.sameSite}`,
  ].filter(Boolean)

  return `${c.name}=${c.value ? decodeURIComponent(c.value) : ''}; ${
    attrs.join('; ') + (attrs.length > 0 ? '; ' : '')
  }`
}

const serializeMultiple = (cookies: any[]) => {
  return cookies.map(serialize).join('')
}

// https://github.com/aws-amplify/amplify-js/issues/11074#issuecomment-1494772935
export const getAmplifyWithSSRContext = () => {
  const cookie = cookies()

  const SSR = withSSRContext({
    req: { headers: { cookie: serializeMultiple(cookie.getAll()) } },
  })

  SSR.configure({
    ...config,
    API: {
      graphql_endpoint: environmentVariables.API,
      graphql_headers: async () => {
        const currentSession = await SSR.Auth.currentSession()

        return { Authorization: currentSession.getIdToken().getJwtToken() }
      },
    },
  })

  return SSR
}

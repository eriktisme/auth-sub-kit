import { environmentVariables } from '@/env'

export const config = {
  Auth: {
    region: 'eu-west-1',
    userPoolId: environmentVariables.COGNITO_USER_POOL_ID,
    userPoolWebClientId: environmentVariables.COGNITO_USER_POOL_CLIENT_ID,
    mandatorySignIn: true,
    oauth: {
      domain: environmentVariables.COGNITO_USER_POOL_DOMAIN,
      scope: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
      redirectSignIn: `${environmentVariables.COGNITO_REDIRECT_URL}/start`,
      redirectSignOut: environmentVariables.COGNITO_REDIRECT_URL,
      clientId: environmentVariables.COGNITO_USER_POOL_CLIENT_ID,
      responseType: 'code',
    },
  },
  ssr: true,
}

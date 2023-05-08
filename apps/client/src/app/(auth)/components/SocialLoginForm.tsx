'use client'

import '@/lib/amplify/client'
import { Auth } from 'aws-amplify'
import { Button } from '@/components'

export const SocialLoginForm = () => {
  const signIn = async () => {
    await Auth.federatedSignIn({
      customProvider: 'Google',
    })
  }

  return (
    <div className="mt-10">
      <Button onClick={signIn} className="w-full justify-center">
        Continue with Google
      </Button>
    </div>
  )
}

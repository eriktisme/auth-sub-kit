'use client'

import { Amplify, Auth } from 'aws-amplify'
import { AmplifyConfig } from '@/lib'

Amplify.configure(AmplifyConfig)

export const SocialLoginForm = () => {
  const signIn = async () => {
    await Auth.federatedSignIn({
      customProvider: 'Google',
    })
  }

  return (
    <div>
      <button
        type="button"
        onClick={signIn}
        className="rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm"
      >
        Log in with Google
      </button>
    </div>
  )
}

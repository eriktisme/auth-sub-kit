'use client'

import { Button, Card, CardBody, TextInputField } from '@/components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SocialLoginForm } from '../../components/SocialLoginForm'
import { Auth } from 'aws-amplify'
import { useState } from 'react'
import { VerifyChallengeForm } from './VerifyChallengeForm'
import { config } from '@/lib/amplify/config'

const LoginFormSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof LoginFormSchema>

Auth.configure({
  ...config.Auth,
  authenticationFlowType: 'CUSTOM_AUTH',
})

export const LoginForm = () => {
  const { handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(LoginFormSchema),
  })

  const [user, setUser] = useState<any>()
  const [showVerifyChallengeForm, setShowVerifyChallengeForm] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async (data: FormData) => {
    setSubmitting(true)

    Auth.signIn(data.email)
      .then((user) => {
        setUser(user)
        setShowVerifyChallengeForm(true)
      })
      .catch((err) => {
        if (err.name === 'UserNotFoundException') {
          // TODO: Handle this case securely
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Card>
      <CardBody className="pt-5 sm:pt-6">
        {showVerifyChallengeForm ? (
          <VerifyChallengeForm
            hideVerifyChallengeForm={() => setShowVerifyChallengeForm(false)}
            user={user}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextInputField {...register('email')} label="Email address" />
            <div>
              <Button isLoading={submitting} className="w-full justify-center">
                Log in with email
              </Button>
            </div>
          </form>
        )}
        <div>
          <div className="relative mt-10 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-6 flex-shrink font-medium leading-6 text-gray-900">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
        </div>
        <SocialLoginForm />
      </CardBody>
    </Card>
  )
}

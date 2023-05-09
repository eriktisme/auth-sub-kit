'use client'

import '@/lib/amplify/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInputField } from '@/components'
import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/navigation'
import { config } from '@/lib/amplify/config'

const VerifyChallengeFormSchema = z.object({
  code: z.string().min(0),
})

type FormData = z.infer<typeof VerifyChallengeFormSchema>

interface VerifyChallengeFormProps {
  user: any
  hideVerifyChallengeForm: () => void
}

Auth.configure({
  ...config.Auth,
  authenticationFlowType: 'CUSTOM_AUTH',
})

export const VerifyChallengeForm = (props: VerifyChallengeFormProps) => {
  const router = useRouter()

  const { handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(VerifyChallengeFormSchema),
  })

  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async (data: FormData) => {
    setSubmitting(true)

    Auth.sendCustomChallengeAnswer(props.user, data.code)
      .then(async (user) => {
        console.log(user)

        // TODO: Figure out why user session is not found
      })
      .catch((err) => {
        if (
          ['InvalidLambdaResponseException', 'NotAuthorizedException'].includes(
            err.name
          )
        ) {
          props.hideVerifyChallengeForm()
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInputField {...register('code')} label="Security code" />
      <div>
        <Button isLoading={submitting} className="w-full justify-center">
          Log in
        </Button>
      </div>
    </form>
  )
}

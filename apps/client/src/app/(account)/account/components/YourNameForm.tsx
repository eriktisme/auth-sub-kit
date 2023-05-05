'use client'

import '@/lib/amplify/client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextInputField,
} from '@/components'
import { User } from '@/domain'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Auth } from 'aws-amplify'
import { useState } from 'react'

interface YourNameFormProps {
  user: User
}

const YourNameFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})

type FormData = z.infer<typeof YourNameFormSchema>

export const YourNameForm = ({ user }: YourNameFormProps) => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(YourNameFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  const [busy, setBusy] = useState(false)
  const onSubmit = async (data: FormData) => {
    setBusy(true)

    const user = await Auth.currentAuthenticatedUser()

    await Auth.updateUserAttributes(user, {
      given_name: data.firstName,
      family_name: data.lastName,
    })

    setBusy(false)

    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          heading="Your name"
          description="Please enter your full name, or a display name you are comfortable with."
        />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInputField
              label="First name"
              {...register('firstName')}
              isInvalid={!errors?.firstName}
              error={errors?.firstName?.message}
            />
            <TextInputField
              label="Last name"
              {...register('lastName')}
              isInvalid={!errors?.lastName}
              error={errors?.lastName?.message}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button isLoading={busy} type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

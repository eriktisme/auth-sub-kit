import '@/lib/amplify/client'
import { getAmplifyWithSSRContext } from '@/lib/amplify'
import { getCurrentUser } from '@/lib'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../../public/logo.svg'
import { site } from '@/config'
import { Metadata } from 'next'
import { SignUpForm } from './components'

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create your account',
}

export default async function Page() {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (currentUser) {
    redirect('/dashboard')

    return
  }

  return (
    <>
      <div className="flex flex-1 flex-col justify-center bg-white px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm lg:w-96">
          <Image className="-ml-5 h-[5rem] w-auto" src={logo} alt={site.name} />
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter your email below to create your account
          </p>
          <SignUpForm />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block"></div>
    </>
  )
}

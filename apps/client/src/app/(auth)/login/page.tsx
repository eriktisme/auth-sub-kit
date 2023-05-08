import '@/lib/amplify/client'
import { Metadata } from 'next'
import Image from 'next/image'
import logo from '../../../../public/logo.svg'
import { getAmplifyWithSSRContext } from '@/lib/amplify/ssr'
import { getCurrentUser } from '@/lib'
import { redirect } from 'next/navigation'
import { site } from '@/config'
import { LoginForm } from './components'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function Page() {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (currentUser) {
    redirect('/dashboard')

    return
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-[5rem] w-auto"
          src={logo}
          alt={`${site.name} Logo`}
        />
        <h2 className="mb-10 mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
        <LoginForm />
        <div className="mt-10 text-center">
          <Link href="/register">
            <span className="text-gray-500">Don't have an account?</span>{' '}
            <span className="underline underline-offset-4">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

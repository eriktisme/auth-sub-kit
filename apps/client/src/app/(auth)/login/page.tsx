import { Metadata } from 'next'
import Image from 'next/image'
import logo from '../../../../public/logo.svg'
import { SocialLoginForm } from './components/SocialLoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-[5rem] w-auto"
          src={logo}
          alt="Auth Sub Kit Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
        <div className="mt-10 text-center">
          <SocialLoginForm />
        </div>
      </div>
    </div>
  )
}

'use client'

import '@/lib/amplify/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Auth } from 'aws-amplify'

interface SearchParams {
  code: string
  state: string
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams() as unknown as SearchParams

  const isAuthenticated = async () => {
    try {
      await Auth.currentAuthenticatedUser()

      router.push('/dashboard')
    } catch (e) {
      router.push('/login')
    }
  }

  useEffect(() => {
    if (searchParams.code) {
      return
    }

    isAuthenticated()
  }, [searchParams.code, searchParams.state])

  return null
}

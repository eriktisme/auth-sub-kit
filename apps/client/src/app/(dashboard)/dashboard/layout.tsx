import '@/lib/amplify/client'
import { ReactNode } from 'react'
import { getAmplifyWithSSRContext } from '@/lib/amplify/ssr'
import { getCurrentUser } from '@/lib'
import { notFound } from 'next/navigation'
import { MainHeader, SiteFooter } from '@/components'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const SSR = getAmplifyWithSSRContext()

  const currentUser = await getCurrentUser(SSR.Auth)

  if (!currentUser) {
    return notFound()
  }

  return (
    <div className="flex min-h-full flex-col space-y-6">
      <MainHeader user={currentUser} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 lg:px-8">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}

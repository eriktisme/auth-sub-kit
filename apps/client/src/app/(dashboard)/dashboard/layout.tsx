import '@/lib/amplify/client'
import { ReactNode } from 'react'
import { getAmplifyWithSSRContext } from '@/lib'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import { MainNav, UserAccountNav } from '@/components'

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
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <MainNav
            items={[
              { href: '/dashboard', title: 'Dashboard' },
              { href: '#', title: 'Test' },
            ]}
          />
          <UserAccountNav user={currentUser} />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl px-4 lg:px-8">
        {children}
      </div>
    </div>
  )
}

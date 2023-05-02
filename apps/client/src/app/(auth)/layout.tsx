import { ReactNode, Suspense } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Suspense fallback={null}>
      <div className="flex min-h-full flex-1">{children}</div>
    </Suspense>
  )
}

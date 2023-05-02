import { ReactNode, Suspense } from 'react'

interface StartLayoutProps {
  children?: ReactNode
}

export default function StartLayout({ children }: StartLayoutProps) {
  return <Suspense fallback={null}>{children}</Suspense>
}

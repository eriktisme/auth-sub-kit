import { ReactNode } from 'react'

interface StartLayoutProps {
  children?: ReactNode
}

export default function StartLayout({ children }: StartLayoutProps) {
  return <>{children}</>
}

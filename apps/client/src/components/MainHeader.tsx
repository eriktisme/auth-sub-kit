import { User } from '@/domain'
import { MainNav } from './MainNav'
import { UserAccountNav } from './UserAccountNav'

interface MainHeaderProps {
  user: User
}

export const MainHeader = ({ user }: MainHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <MainNav
          items={[
            { href: '/dashboard', title: 'Dashboard' },
            { href: '#', title: 'Test' },
          ]}
        />
        <UserAccountNav user={user} />
      </div>
    </header>
  )
}

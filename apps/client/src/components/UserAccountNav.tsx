'use client'

import '@/lib/amplify/client'
import { User } from '@/domain'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Avatar } from '@/components/Avatar'
import Link from 'next/link'
import { Auth } from 'aws-amplify'

interface UserAccountNavProps {
  user: User
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
  const signOut = async () => {
    await Auth.signOut()
  }

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex">
          <span className="sr-only">Open user menu</span>
          <Avatar
            src={user.photo}
            name={`${user.firstName} ${user.lastName}`}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item key="settings">
            {({ active }) => (
              <Link
                href="/account"
                className={[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2  text-gray-700',
                ].join(' ')}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item key="sign-out">
            {({ active }) => (
              <button
                type="button"
                onClick={signOut}
                className={[
                  active ? 'bg-gray-100' : '',
                  'block w-full px-4 py-2 text-left text-gray-700',
                ].join(' ')}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

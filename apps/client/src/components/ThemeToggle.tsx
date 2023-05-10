'use client'

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { useBrowserLayoutEffect } from '@/hooks'

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const update = () => {
  if (
    window.localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const ThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>()
  const initial = useRef(true)

  useBrowserLayoutEffect(() => {
    let theme = localStorage.theme
    if (theme === 'light' || theme === 'dark') {
      setSelectedTheme(theme)
    }
  }, [])

  useBrowserLayoutEffect(() => {
    if (selectedTheme === Theme.LIGHT || selectedTheme === Theme.DARK) {
      localStorage.theme = selectedTheme
    }

    if (initial.current) {
      initial.current = false
    } else {
      update()
    }
  }, [selectedTheme])

  const toggleTheme = () => {
    if (selectedTheme === Theme.LIGHT) {
      setSelectedTheme(Theme.DARK)
    } else {
      setSelectedTheme(Theme.LIGHT)
    }
  }

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="rounded-full px-3 py-2 text-slate-700 transition hover:bg-blue-100 hover:text-slate-900 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300 md:inline-flex"
      >
        <span className="dark:hidden">
          <SunIcon className="h-5 w-5" />
        </span>
        <span className="hidden dark:inline dark:text-teal-500">
          <MoonIcon className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}

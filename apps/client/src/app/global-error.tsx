'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    if (error.message === 'No current user') {
      return
    }

    console.error('An error occurred', error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  )
}

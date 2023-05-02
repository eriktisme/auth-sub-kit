'use client'

import { useEffect } from 'react'
import { captureUnderscoreErrorException } from '@sentry/nextjs'

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

    captureUnderscoreErrorException({
      err: error,
    })
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  )
}

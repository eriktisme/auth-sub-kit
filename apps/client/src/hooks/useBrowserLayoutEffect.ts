import { useEffect, useLayoutEffect } from 'react'

export const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

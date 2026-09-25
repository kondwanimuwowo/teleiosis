'use client'

import { useEffect, useRef } from 'react'

/** Records when a form mounted, for the server-side minimum-fill-time check.
 *  Read `loadedAt.current` when building the submit payload. */
export function useFormTiming() {
  const loadedAt = useRef<number>(0)
  useEffect(() => { loadedAt.current = Date.now() }, [])
  return loadedAt
}

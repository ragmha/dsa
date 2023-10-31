import { useRef, useEffect } from 'react'
/**
 * useIsMounted
 *
 * Checking if a component is mounted before setting state
 */

export function useIsMounted(): () => boolean {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return () => isMountedRef.current
}

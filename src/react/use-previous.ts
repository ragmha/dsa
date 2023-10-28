import { useRef, useEffect } from 'react'
/**
 * A hook usePrevious() to return the previous value, with initial value of `undefined.
 *
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

import { useEffect, useRef } from 'react'

type Callback = () => void

/**
 * useTimeout(callback, delay)
 * Conditions:
  1. It should reset the timer if delay changes
  2. DO NOT reset the timer if only callback changes
 */
export function useTimeout(callback: Callback, delay: number) {
  const callbackRef = useRef<Callback>(callback)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    function set() {
      timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }

    function clear() {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }

    set()

    return clear
  }, [delay])
}

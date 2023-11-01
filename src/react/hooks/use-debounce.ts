import { useState, useEffect } from 'react'
/**
 * useDebounce()
 *
 * Used for a frequently changing value that needs to be debounced.
 * 
 * For e.g
 
function App() {
    const [value, setValue] = useState(...)
    // this value changes frequently, 
    const debouncedValue = useDebounce(value, 1000)
    // now it is debounced
    }
 * 
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

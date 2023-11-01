import { useRef, useCallback } from 'react'
/**
 * useClickOutside
 *
 * Used to detect clicks outside of a given element.
 * 
 * E.g
 * 
 const Component = () => {
    const ref = useClickOutside(() => {
    alert('clicked outside')
  });
  return <div ref={ref}>..</div>
 }
 */

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const currentRef = useRef<T | null>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        currentRef.current &&
        !currentRef.current.contains(e.target as Node)
      ) {
        callback()
      }
    },
    [callback]
  )

  const callbackRef = useCallback(
    (node: T) => {
      if (currentRef.current) {
        document.removeEventListener('click', handleClick)
      }

      if (node) {
        document.addEventListener('click', handleClick)
      }

      currentRef.current = node
    },
    [handleClick]
  )

  return callbackRef
}

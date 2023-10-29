import { Ref, useRef, useState, useCallback } from 'react'
/**
 * useFocus()
 *
 * Used to focus an element on mount.
 * CSS pseudo-class `:focus-within`
 * could be used to allow conditional rendering in parent element on the focus state of descendant elements.
 * 
 * For e.g

function App() {
  const [ref, isFocused] = useFocus()
  return <div>
    <input ref={ref}/>
    {isFocused && <p>focused</p>}
  </div>
}
 */

// It returns a ref and a boolean value.
export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [focusedValue, setFocusedValue] = useState(false)
  const elementRef = useRef<T | null>(null)

  const handler = useCallback(
    (e: FocusEvent) => setFocusedValue(e.type === 'focus'),
    []
  )

  const callbackRef = useCallback((node: T | null) => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('focus', handler)
      elementRef.current.removeEventListener('blur', handler)
    }

    elementRef.current = node

    if (elementRef.current) {
      elementRef.current.addEventListener('focus', handler)
      elementRef.current.addEventListener('blur', handler)
    }
  }, [])

  return [callbackRef, focusedValue]
}

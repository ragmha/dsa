import { Ref, useCallback, useState, useRef } from 'react'
/**
 * A hook to determine conditional rendering based on hover state of some element.
 *
 *  For e.g
 * 
    function App() {
    const [ref, isHovered] = useHover()
    return <div ref={ref}>{isHovered ? 'hovered' : 'not hovered'}</div>
    }
 */

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [value, setValue] = useState<boolean>(false)
  const elementRef = useRef<T | null>(null)

  const handleMouse = useCallback((event: MouseEvent) => {
    setValue(event.type === 'mouseenter')
  }, [])

  const callbackRef = useCallback((node: T | null) => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('mouseenter', handleMouse)
      elementRef.current.removeEventListener('mouseleave', handleMouse)
    }

    elementRef.current = node

    if (elementRef.current) {
      elementRef.current.addEventListener('mouseenter', handleMouse)
      elementRef.current.addEventListener('mouseleave', handleMouse)
    }
  }, [])

  return [callbackRef, value]
}

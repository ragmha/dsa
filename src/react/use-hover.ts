import { Ref, useCallback, useState, useRef, useEffect } from 'react'
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
  const elementRef = useRef<T>(null)

  const handleMouse = useCallback((event: MouseEvent) => {
    setValue(event.type === 'mouseenter')
  }, [])

  useEffect(() => {
    // Set false on mount, in case the component is re-rendered
    setValue(false)

    const node = elementRef.current

    if (!node) return

    node.addEventListener('mouseenter', handleMouse)
    node.addEventListener('mouseleave', handleMouse)

    return () => {
      node.removeEventListener('mouseenter', handleMouse)
      node.removeEventListener('mouseleave', handleMouse)
    }
  }, [elementRef.current])

  return [elementRef, value]
}

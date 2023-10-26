/**
 * useIsFirstRender()
 * Hook that returns true if the component is being rendered for the first time.
 */

import { useRef, useEffect } from 'react'

export function useIsFirstRender(): boolean {
  const isFirstRenderRef = useRef<boolean>(true)

  useEffect(() => {
    isFirstRenderRef.current = false
  }, [])

  return isFirstRenderRef.current
}

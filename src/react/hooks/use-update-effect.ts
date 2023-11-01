import { EffectCallback, useRef, useEffect, DependencyList } from 'react'
/**
 * useUpdateEffect
 *
 * Works similar to useEffect except that it skips running the callback after first render
 */

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current) {
      return effect()
    } else {
      mountedRef.current = true
    }
  }, deps)
}

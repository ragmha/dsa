import { EffectCallback, useEffect, useRef } from 'react'
/**
 * useEffectOnce()
 *
 * Running the Effect only Once
 *
 */
export function useEffectOnce(effect: EffectCallback) {
  const ref = useRef(effect)
  return useEffect(ref.current, [])
}

import { useState, useCallback } from 'react'
/**
 * useArray hook
 *
 * When array is used in React state, we need to deal with actions such as push and remove.
 *
 * For e.g
 *
 * const {value, push, removeByIndex} = useArray([1, 2, 3])
 */

type UseArrayActions<T> = {
  push: (item: T) => void
  removeByIndex: (index: number) => void
}

export function useArray<T>(
  initialValue: T[]
): { value: T[] } & UseArrayActions<T> {
  const [state, setState] = useState(initialValue)

  const push = useCallback(
    (item: T) => setState((prevState) => [...prevState, item]),
    []
  )

  const removeByIndex = useCallback(
    (index: number) =>
      setState((prevState) => prevState.filter((_, i) => i !== index)),
    []
  )

  return {
    value: state,
    push,
    removeByIndex,
  }
}

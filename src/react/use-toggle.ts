import { useCallback, useState } from 'react'

/**
 * useToggle hook
 * 
 * Common in switches and checkboxes
 * 
 * E.g 
 * 
 * function App() {
  const [on, toggle] = useToggle()
    return (
        <div>
        {on ? 'The button is on' : 'The button is off'}
        <button onClick={toggle}>Toggle</button>
        </div>
    )
 }
 *
 */
export function useToggle(on: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(on)
  const handleToggle = useCallback(() => setValue((prev) => !prev), [])

  return [value, handleToggle]
}

import { useCallback, useState } from 'react'
/**
 * PhoneNumberInput component
 * 
 * Create a PhoneNumberInput component.

    1. only accepts numerical digits
    2. format the number automatically as (123)456-7890 by:
     * adding the parenthesis when the 4th digit is entered
     *  also adding - before 7th digit

Check:
What if user removes some digits in the middle, does caret jumps to the end in your approach?
 * 
 */

export function PhoneNumberInput() {
  const [value, setValue] = useState('')

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value.replace(/\D/g, '')
    let formattedValue = ''

    if (currentValue.length > 10) {
      return
    } else if (currentValue.length > 6) {
      formattedValue = `(${currentValue.slice(0, 3)})${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6)}`
    } else if (currentValue.length > 3) {
      formattedValue = `(${currentValue.slice(0, 3)})${currentValue.slice(3)}`
    } else {
      formattedValue = currentValue
    }

    setValue(formattedValue)
  }, [])

  return <input value={value} onChange={onChange} />
}

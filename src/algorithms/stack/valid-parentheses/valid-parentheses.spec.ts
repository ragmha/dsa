import { isValid } from './valid-parentheses'

describe('Valid parentheses', () => {
  it('is valid', () => {
    expect(isValid('()')).toBe(true)
    expect(isValid('()[]{}')).toBe(true)
    expect(isValid('{[]}')).toBe(true)
  })

  it('is invalid', () => {
    expect(isValid('(]')).toBe(false)
    expect(isValid('([)]')).toBe(false)
  })
})

import { isValid, isValid2 } from './valid-parentheses'

describe('Valid parentheses', () => {
  it('is valid', () => {
    expect(isValid('()')).toBe(true)
    expect(isValid('()[]{}')).toBe(true)
    expect(isValid('{[]}')).toBe(true)

    expect(isValid2('()')).toBe(true)
    expect(isValid2('()[]{}')).toBe(true)
    expect(isValid2('{[]}')).toBe(true)
  })

  it('is invalid', () => {
    expect(isValid('(]')).toBe(false)
    expect(isValid('([)]')).toBe(false)

    expect(isValid2('(]')).toBe(false)
    expect(isValid2('([)]')).toBe(false)
  })
})

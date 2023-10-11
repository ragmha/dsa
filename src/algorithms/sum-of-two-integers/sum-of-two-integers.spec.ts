import { getSum } from './sum-of-two-integers'

describe('SumOfTwoIntegers', () => {
  it('should return the sum of two integers', () => {
    expect(getSum(1, 2)).toBe(3)
    expect(getSum(2, 3)).toBe(5)
    expect(getSum(3, 0)).toBe(3)
  })

  it('should return the sum of two negative integers', () => {
    expect(getSum(-1, -2)).toBe(-3)
    expect(getSum(-2, -3)).toBe(-5)
    expect(getSum(-3, 0)).toBe(-3)
  })
})

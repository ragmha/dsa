import { arrayManipulation } from './array-manipulation'

describe('Array Manipulation', () => {
  it('should return max value', () => {
    expect(
      arrayManipulation(5, [
        [1, 2, 100],
        [2, 5, 100],
        [3, 4, 100],
      ])
    ).toBe(200)

    expect(
      arrayManipulation(10, [
        [1, 5, 3],
        [4, 8, 7],
        [6, 9, 1],
      ])
    ).toBe(10)
  })

  it('should return 0', () => {
    expect(arrayManipulation(1, [])).toBe(0)
    expect(arrayManipulation(1, [[1, 1, 0]])).toBe(0)
  })
})

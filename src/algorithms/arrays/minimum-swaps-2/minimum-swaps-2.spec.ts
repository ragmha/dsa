import { minimumSwaps } from './minimum-swaps-2'

describe('Minmum Swaps 2', () => {
  it('should return minimum number of swaps to sort the array', () => {
    expect(minimumSwaps([4, 3, 1, 2])).toBe(3)
    expect(minimumSwaps([1, 3, 5, 2, 4, 6, 7])).toBe(3)
  })

  it('should return 0 if array is already sorted', () => {
    expect(minimumSwaps([1, 2, 3, 4])).toBe(0)
  })
})

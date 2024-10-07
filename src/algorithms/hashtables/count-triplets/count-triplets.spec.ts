import { countTriplets } from './count-triplets'

describe('Count triplets', () => {
  it('should return the number of triplets', () => {
    expect(countTriplets([1, 2, 2, 4], 2)).toBe(2)
    expect(countTriplets([1, 3, 9, 9, 27, 81], 3)).toBe(6)
    expect(countTriplets([1, 5, 5, 25, 125], 5)).toBe(4)
    expect(countTriplets([1, 1, 1, 1, 1], 1)).toBe(10)
  })

  it('should return 0 if there are no triplets', () => {
    expect(countTriplets([1, 2, 3], 1)).toBe(0)
  })
})

import { minimumBribes } from './new-year-chaos'

describe('New Year Chaos', () => {
  it('should return 3 bribes', () => {
    expect(minimumBribes([2, 1, 5, 3, 4])).toEqual(3)
  })

  it('should return 7 bribes', () => {
    expect(minimumBribes([1, 2, 5, 3, 7, 8, 6, 4])).toEqual(7)
  })

  it('should return "Too chaotic"', () => {
    expect(minimumBribes([2, 5, 1, 3, 4])).toEqual('Too chaotic')
    expect(minimumBribes([5, 1, 2, 3, 7, 8, 6, 4])).toEqual('Too chaotic')
  })
})

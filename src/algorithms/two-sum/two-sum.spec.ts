describe('twoSum', () => {
  it('should return indices of the two numbers such that they add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
  })

  it('should return empty array if no solution', () => {
    expect(twoSum([3, 2, 4], 7)).toEqual([])
  })
})

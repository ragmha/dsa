describe('makeAnagram', () => {
  it('should return the minimum number of character deletions required to make a and b anagrams', () => {
    expect(makeAnagram('cde', 'dcf')).toBe(2)
    expect(makeAnagram('abcdf', 'adbce')).toBe(4)
  })

  it('should return 0 if a and b are anagrams', () => {
    expect(makeAnagram('abc', 'abc')).toBe(0)
  })
})

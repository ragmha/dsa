import { isAnagram, isAnagram2 } from './valid-anagram'

describe('isAnagram', () => {
  it('should return true if t is an anagram of s, and false otherwise', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true)
    expect(isAnagram2('anagram', 'nagaram')).toBe(true)

    expect(isAnagram('rat', 'car')).toBe(false)
    expect(isAnagram2('rat', 'car')).toBe(false)
  })

  it('should return false if s and t have different lengths', () => {
    expect(isAnagram('a', 'ab')).toBe(false)
    expect(isAnagram2('a', 'ab')).toBe(false)
  })
})

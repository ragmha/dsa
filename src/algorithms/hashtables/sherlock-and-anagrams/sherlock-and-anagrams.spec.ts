import {
  sherlockAndAnagrams,
  sherlockAndAnagrams2,
} from './sherlock-and-anagrams'

describe('Sherlock and Anagrams', () => {
  it('should return correct number of anagram pairs for "mom"', () => {
    expect(sherlockAndAnagrams('mom')).toBe(2)
    expect(sherlockAndAnagrams2('mom')).toBe(2)
  })

  it('should return the correct number of anagram pairs for "abba"', () => {
    expect(sherlockAndAnagrams('abba')).toBe(4)
    expect(sherlockAndAnagrams2('abba')).toBe(4)
  })

  it('should return 0 for no anagrams', () => {
    expect(sherlockAndAnagrams('abcd')).toBe(0)
    expect(sherlockAndAnagrams2('abcd')).toBe(0)
  })
})

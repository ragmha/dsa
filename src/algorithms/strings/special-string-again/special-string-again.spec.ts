import { substrCount } from './special-string-again'

describe('Special String Again', () => {
  it('should handle single character string', () => {
    expect(substrCount(1, 'a')).toBe(1)
  })

  it('should count all substrings when all characters are the same', () => {
    expect(substrCount(4, 'aaaa')).toBe(10)
  })

  it('should count symmetrical substrings like aba', () => {
    expect(substrCount(3, 'aba')).toBe(4)
  })

  it('should count a complex pattern', () => {
    expect(substrCount(7, 'abcbaba')).toBe(10)
  })

  it('should handle empty string', () => {
    expect(substrCount(0, '')).toBe(0)
  })

  it('should handle all different characters', () => {
    expect(substrCount(5, 'abcde')).toBe(5)
  })

  it('should handle repeating and symmetric', () => {
    expect(substrCount(8, 'aabbaabb')).toBe(12)
  })
})

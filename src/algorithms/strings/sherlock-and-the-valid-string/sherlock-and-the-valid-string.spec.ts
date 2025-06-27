import { isValid } from './sherlock-and-the-valid-string.'

describe('isValid Sherlock', () => {
  it("should return 'YES' for string with equal frequencies", () => {
    expect(isValid('aabbcc')).toBe('YES')
  })

  it("should return 'YES' when one character can be removed to equalize frequencies", () => {
    expect(isValid('aabbc')).toBe('YES')
  })

  it("should return 'NO' when more than one removal is needed", () => {
    expect(isValid('aabbcd')).toBe('NO')
  })

  it("should return 'YES' when only one character has freq=1", () => {
    expect(isValid('aaabbbcccd')).toBe('YES')
  })

  it("should return 'NO' when no valid removal can equalize frequencies", () => {
    expect(isValid('aabbccddeefghi')).toBe('NO')
  })

  it("should return 'YES' for a string with all same character", () => {
    expect(isValid('aaaa')).toBe('YES')
  })

  it("should return 'YES' for a single character", () => {
    expect(isValid('z')).toBe('YES')
  })
})

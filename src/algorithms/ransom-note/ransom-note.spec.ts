import { canConstruct } from './ransom-note'

describe('Ransom Note', () => {
  it('should return true if ransomNote is constructed from magazine', () => {
    expect(canConstruct('aa', 'aab')).toBe(true)
  })

  it('should return false if ransomNote is not constructed from magazine', () => {
    expect(canConstruct('a', 'b')).toBe(false)
  })
})

import { alternatingCharacters } from './alternating-characters'

describe('Alternating characters', () => {
  test.each([
    { input: 'AAABBBAABB', expected: 6 },
    { input: 'AABBAABB', expected: 4 },
    { input: 'ABABABAA', expected: 1 },
    { input: 'AAABBB', expected: 4 },
  ])(
    'should return the minimum number of required deletions for $input',
    ({ input, expected }) => {
      expect(alternatingCharacters(input)).toEqual(expected)
    }
  )

  it('should handle empty strings', () => {
    expect(alternatingCharacters('')).toEqual(0)
  })

  it('should handle single-character strings', () => {
    expect(alternatingCharacters('A')).toEqual(0)
  })
})

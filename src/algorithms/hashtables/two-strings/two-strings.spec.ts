import { twoStrings } from './two-strings'

describe('Two Strings', () => {
  it('should return "YES"', () => {
    const s1 = 'hello'
    const s2 = 'world'
    const result = twoStrings(s1, s2)

    expect(result).toEqual('YES')
  })

  it('should return "NO"', () => {
    const s1 = 'hi'
    const s2 = 'world'

    const result = twoStrings(s1, s2)

    expect(result).toEqual('NO')
  })
})

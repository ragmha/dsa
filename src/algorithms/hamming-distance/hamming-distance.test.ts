import { hammingDistance } from './hamming-distance'

describe('Hamming-Distance', () => {
  it('should throw an error when trying to compare the strings of different length', () => {
    const compareDifferentStringLength = () => hammingDistance('a', 'abc')

    expect(compareDifferentStringLength).toThrowError()
  })

  it('should calculate difference between 2 strings', () => {
    expect(hammingDistance('a', 'a')).toBe(0)
    expect(hammingDistance('a', 'b')).toBe(1)
    expect(hammingDistance('abc', 'add')).toBe(2)
    expect(hammingDistance('karolin', 'kathrin')).toBe(3)
    expect(hammingDistance('karolin', 'kerstin')).toBe(3)
    expect(hammingDistance('1011101', '1001001')).toBe(2)
    expect(hammingDistance('2173896', '2233796')).toBe(3)
  })
})

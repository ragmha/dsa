import { jumpSearch } from './jump-search'

describe('jumpSearch', () => {
  it('should search for an element in sorted array', () => {
    expect(jumpSearch([], 1)).toBe(-1)
    expect(jumpSearch([1], 2)).toBe(-1)
    expect(jumpSearch([1], 1)).toBe(0)
    expect(jumpSearch([1, 2], 1)).toBe(0)
    expect(jumpSearch([1, 1, 1], 1)).toBe(0)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 2)).toBe(1)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 0)).toBe(-1)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 5)).toBe(2)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 10)).toBe(3)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 30)).toBe(7)
    expect(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 48)).toBe(8)
  })

  it('should search objet in sorted array', () => {
    const sortedArrayObjects: Array<{ key: number; value: string }> = [
      { key: 1, value: 'value1' },
      { key: 2, value: 'value2' },
      { key: 3, value: 'value3' },
    ]

    const comparator = (a: { key: number }, b: { key: number }) => {
      if (a.key === b.key) return 0
      return a.key < b.key ? -1 : 1
    }

    expect(jumpSearch([], { key: 1 }, comparator)).toBe(-1)
    expect(jumpSearch(sortedArrayObjects, { key: 4 }, comparator)).toBe(-1)
    expect(jumpSearch(sortedArrayObjects, { key: 1 }, comparator)).toBe(0)
    expect(jumpSearch(sortedArrayObjects, { key: 2 }, comparator)).toBe(1)
    expect(jumpSearch(sortedArrayObjects, { key: 3 }, comparator)).toBe(2)
  })
})

import { rotateLeft, rotateLeft2 } from './left-rotation'

describe('Left Rotation', () => {
  it('should rotate the array', () => {
    expect(rotateLeft([1, 2, 3, 4, 5], 4)).toEqual(
      expect.arrayContaining([5, 1, 2, 3, 4])
    )

    expect(rotateLeft2([1, 2, 3, 4, 5], 4)).toEqual(
      expect.arrayContaining([5, 1, 2, 3, 4])
    )

    expect(rotateLeft([1, 2, 3, 4, 5], 2)).toEqual(
      expect.arrayContaining([3, 4, 5, 1, 2])
    )

    expect(rotateLeft2([1, 2, 3, 4, 5], 2)).toEqual(
      expect.arrayContaining([3, 4, 5, 1, 2])
    )
  })

  it('should not rotate the array', () => {
    expect(rotateLeft([1, 2, 3, 4, 5], 0)).toEqual(
      expect.arrayContaining([1, 2, 3, 4, 5])
    )

    expect(rotateLeft2([1, 2, 3, 4, 5], 0)).toEqual(
      expect.arrayContaining([1, 2, 3, 4, 5])
    )

    expect(rotateLeft([1, 2, 3, 4, 5], 5)).toEqual(
      expect.arrayContaining([1, 2, 3, 4, 5])
    )

    expect(rotateLeft2([1, 2, 3, 4, 5], 5)).toEqual(
      expect.arrayContaining([1, 2, 3, 4, 5])
    )
  })
})

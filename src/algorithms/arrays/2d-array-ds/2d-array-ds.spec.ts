import { hourglassSum } from './2d-array-ds'

describe('2dArrayDS', () => {
  it('should return the largest (maximum) hourglass sum found in arr', () => {
    expect(
      hourglassSum([
        [1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 2, 4, 4, 0],
        [0, 0, 0, 2, 0, 0],
        [0, 0, 1, 2, 4, 0],
      ])
    ).toBe(19)

    expect(
      hourglassSum([
        [-1, -1, 0, -9, -2, -2],
        [-2, -1, -6, -8, -2, -5],
        [-1, -1, -1, -2, -3, -4],
        [-1, -9, -2, -4, -4, -5],
        [-7, -3, -3, -2, -9, -9],
        [-1, -3, -1, -2, -4, -5],
      ])
    ).toBe(-6)
  })

  it('should return infinity if the hourglass sum is negative', () => {
    expect(hourglassSum([[-1, -1, 0, -9, -2, -2]])).toBe(-Infinity)
    expect(hourglassSum([[]])).toBe(-Infinity)
  })
})

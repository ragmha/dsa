import {
  solveNQueens,
  solveNQueens2,
  solveNQueens3,
  solveNQueens4,
} from './n-queens'

describe('solveNQueens', () => {
  it('should return an empty array for size 1', () => {
    const result = solveNQueens(1)
    const result2 = solveNQueens2(1)
    const result3 = solveNQueens3(1)
    const result4 = solveNQueens4(1)

    const solution = [['Q']]

    expect(result).toEqual(solution)
    expect(result2).toEqual(solution)
    expect(result3).toEqual(solution)
    expect(result4).toEqual(solution)
  })
  it('should return an empty array for size 2', () => {
    const result = solveNQueens(2)
    const result2 = solveNQueens2(2)
    const result3 = solveNQueens3(2)
    const result4 = solveNQueens4(2)

    const solution: string[][] = []

    expect(result).toEqual(solution)
    expect(result2).toEqual(solution)
    expect(result3).toEqual(solution)
    expect(result4).toEqual(solution)
  })

  it('should return valid solution for size 4', () => {
    const result = solveNQueens(4)
    const result2 = solveNQueens2(4)
    const result3 = solveNQueens2(4)
    const result4 = solveNQueens4(4)

    const solution = [
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..'],
    ]

    expect(result).toEqual(solution)
    expect(result2).toEqual(solution)
    expect(result3).toEqual(solution)
    expect(result4).toEqual(solution)
  })

  it('should return valid solution for size 8', () => {
    const result = solveNQueens(8)
    const result2 = solveNQueens2(8)
    const result3 = solveNQueens3(8)
    const result4 = solveNQueens4(8)

    const solution = [
      [
        'Q.......',
        '....Q...',
        '.......Q',
        '.....Q..',
        '..Q.....',
        '......Q.',
        '.Q......',
        '...Q....',
      ],
      [
        'Q.......',
        '.....Q..',
        '.......Q',
        '..Q.....',
        '......Q.',
        '...Q....',
        '.Q......',
        '....Q...',
      ],
      [
        'Q.......',
        '......Q.',
        '...Q....',
        '.....Q..',
        '.......Q',
        '.Q......',
        '....Q...',
        '..Q.....',
      ],
      [
        'Q.......',
        '......Q.',
        '....Q...',
        '.......Q',
        '.Q......',
        '...Q....',
        '.....Q..',
        '..Q.....',
      ],
      [
        '.Q......',
        '...Q....',
        '.....Q..',
        '.......Q',
        '..Q.....',
        'Q.......',
        '......Q.',
        '....Q...',
      ],
      [
        '.Q......',
        '....Q...',
        '......Q.',
        'Q.......',
        '..Q.....',
        '.......Q',
        '.....Q..',
        '...Q....',
      ],
      [
        '.Q......',
        '....Q...',
        '......Q.',
        '...Q....',
        'Q.......',
        '.......Q',
        '.....Q..',
        '..Q.....',
      ],
      [
        '.Q......',
        '.....Q..',
        'Q.......',
        '......Q.',
        '...Q....',
        '.......Q',
        '..Q.....',
        '....Q...',
      ],
      [
        '.Q......',
        '.....Q..',
        '.......Q',
        '..Q.....',
        'Q.......',
        '...Q....',
        '......Q.',
        '....Q...',
      ],
      [
        '.Q......',
        '......Q.',
        '..Q.....',
        '.....Q..',
        '.......Q',
        '....Q...',
        'Q.......',
        '...Q....',
      ],
      [
        '.Q......',
        '......Q.',
        '....Q...',
        '.......Q',
        'Q.......',
        '...Q....',
        '.....Q..',
        '..Q.....',
      ],
      [
        '.Q......',
        '.......Q',
        '.....Q..',
        'Q.......',
        '..Q.....',
        '....Q...',
        '......Q.',
        '...Q....',
      ],
      [
        '..Q.....',
        'Q.......',
        '......Q.',
        '....Q...',
        '.......Q',
        '.Q......',
        '...Q....',
        '.....Q..',
      ],
      [
        '..Q.....',
        '....Q...',
        '.Q......',
        '.......Q',
        'Q.......',
        '......Q.',
        '...Q....',
        '.....Q..',
      ],
      [
        '..Q.....',
        '....Q...',
        '.Q......',
        '.......Q',
        '.....Q..',
        '...Q....',
        '......Q.',
        'Q.......',
      ],
      [
        '..Q.....',
        '....Q...',
        '......Q.',
        'Q.......',
        '...Q....',
        '.Q......',
        '.......Q',
        '.....Q..',
      ],
      [
        '..Q.....',
        '....Q...',
        '.......Q',
        '...Q....',
        'Q.......',
        '......Q.',
        '.Q......',
        '.....Q..',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.Q......',
        '....Q...',
        '.......Q',
        'Q.......',
        '......Q.',
        '...Q....',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.Q......',
        '......Q.',
        'Q.......',
        '...Q....',
        '.......Q',
        '....Q...',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.Q......',
        '......Q.',
        '....Q...',
        'Q.......',
        '.......Q',
        '...Q....',
      ],
      [
        '..Q.....',
        '.....Q..',
        '...Q....',
        'Q.......',
        '.......Q',
        '....Q...',
        '......Q.',
        '.Q......',
      ],
      [
        '..Q.....',
        '.....Q..',
        '...Q....',
        '.Q......',
        '.......Q',
        '....Q...',
        '......Q.',
        'Q.......',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.......Q',
        'Q.......',
        '...Q....',
        '......Q.',
        '....Q...',
        '.Q......',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.......Q',
        'Q.......',
        '....Q...',
        '......Q.',
        '.Q......',
        '...Q....',
      ],
      [
        '..Q.....',
        '.....Q..',
        '.......Q',
        '.Q......',
        '...Q....',
        'Q.......',
        '......Q.',
        '....Q...',
      ],
      [
        '..Q.....',
        '......Q.',
        '.Q......',
        '.......Q',
        '....Q...',
        'Q.......',
        '...Q....',
        '.....Q..',
      ],
      [
        '..Q.....',
        '......Q.',
        '.Q......',
        '.......Q',
        '.....Q..',
        '...Q....',
        'Q.......',
        '....Q...',
      ],
      [
        '..Q.....',
        '.......Q',
        '...Q....',
        '......Q.',
        'Q.......',
        '.....Q..',
        '.Q......',
        '....Q...',
      ],
      [
        '...Q....',
        'Q.......',
        '....Q...',
        '.......Q',
        '.Q......',
        '......Q.',
        '..Q.....',
        '.....Q..',
      ],
      [
        '...Q....',
        'Q.......',
        '....Q...',
        '.......Q',
        '.....Q..',
        '..Q.....',
        '......Q.',
        '.Q......',
      ],
      [
        '...Q....',
        '.Q......',
        '....Q...',
        '.......Q',
        '.....Q..',
        'Q.......',
        '..Q.....',
        '......Q.',
      ],
      [
        '...Q....',
        '.Q......',
        '......Q.',
        '..Q.....',
        '.....Q..',
        '.......Q',
        'Q.......',
        '....Q...',
      ],
      [
        '...Q....',
        '.Q......',
        '......Q.',
        '..Q.....',
        '.....Q..',
        '.......Q',
        '....Q...',
        'Q.......',
      ],
      [
        '...Q....',
        '.Q......',
        '......Q.',
        '....Q...',
        'Q.......',
        '.......Q',
        '.....Q..',
        '..Q.....',
      ],
      [
        '...Q....',
        '.Q......',
        '.......Q',
        '....Q...',
        '......Q.',
        'Q.......',
        '..Q.....',
        '.....Q..',
      ],
      [
        '...Q....',
        '.Q......',
        '.......Q',
        '.....Q..',
        'Q.......',
        '..Q.....',
        '....Q...',
        '......Q.',
      ],
      [
        '...Q....',
        '.....Q..',
        'Q.......',
        '....Q...',
        '.Q......',
        '.......Q',
        '..Q.....',
        '......Q.',
      ],
      [
        '...Q....',
        '.....Q..',
        '.......Q',
        '.Q......',
        '......Q.',
        'Q.......',
        '..Q.....',
        '....Q...',
      ],
      [
        '...Q....',
        '.....Q..',
        '.......Q',
        '..Q.....',
        'Q.......',
        '......Q.',
        '....Q...',
        '.Q......',
      ],
      [
        '...Q....',
        '......Q.',
        'Q.......',
        '.......Q',
        '....Q...',
        '.Q......',
        '.....Q..',
        '..Q.....',
      ],
      [
        '...Q....',
        '......Q.',
        '..Q.....',
        '.......Q',
        '.Q......',
        '....Q...',
        'Q.......',
        '.....Q..',
      ],
      [
        '...Q....',
        '......Q.',
        '....Q...',
        '.Q......',
        '.....Q..',
        'Q.......',
        '..Q.....',
        '.......Q',
      ],
      [
        '...Q....',
        '......Q.',
        '....Q...',
        '..Q.....',
        'Q.......',
        '.....Q..',
        '.......Q',
        '.Q......',
      ],
      [
        '...Q....',
        '.......Q',
        'Q.......',
        '..Q.....',
        '.....Q..',
        '.Q......',
        '......Q.',
        '....Q...',
      ],
      [
        '...Q....',
        '.......Q',
        'Q.......',
        '....Q...',
        '......Q.',
        '.Q......',
        '.....Q..',
        '..Q.....',
      ],
      [
        '...Q....',
        '.......Q',
        '....Q...',
        '..Q.....',
        'Q.......',
        '......Q.',
        '.Q......',
        '.....Q..',
      ],
      [
        '....Q...',
        'Q.......',
        '...Q....',
        '.....Q..',
        '.......Q',
        '.Q......',
        '......Q.',
        '..Q.....',
      ],
      [
        '....Q...',
        'Q.......',
        '.......Q',
        '...Q....',
        '.Q......',
        '......Q.',
        '..Q.....',
        '.....Q..',
      ],
      [
        '....Q...',
        'Q.......',
        '.......Q',
        '.....Q..',
        '..Q.....',
        '......Q.',
        '.Q......',
        '...Q....',
      ],
      [
        '....Q...',
        '.Q......',
        '...Q....',
        '.....Q..',
        '.......Q',
        '..Q.....',
        'Q.......',
        '......Q.',
      ],
      [
        '....Q...',
        '.Q......',
        '...Q....',
        '......Q.',
        '..Q.....',
        '.......Q',
        '.....Q..',
        'Q.......',
      ],
      [
        '....Q...',
        '.Q......',
        '.....Q..',
        'Q.......',
        '......Q.',
        '...Q....',
        '.......Q',
        '..Q.....',
      ],
      [
        '....Q...',
        '.Q......',
        '.......Q',
        'Q.......',
        '...Q....',
        '......Q.',
        '..Q.....',
        '.....Q..',
      ],
      [
        '....Q...',
        '..Q.....',
        'Q.......',
        '.....Q..',
        '.......Q',
        '.Q......',
        '...Q....',
        '......Q.',
      ],
      [
        '....Q...',
        '..Q.....',
        'Q.......',
        '......Q.',
        '.Q......',
        '.......Q',
        '.....Q..',
        '...Q....',
      ],
      [
        '....Q...',
        '..Q.....',
        '.......Q',
        '...Q....',
        '......Q.',
        'Q.......',
        '.....Q..',
        '.Q......',
      ],
      [
        '....Q...',
        '......Q.',
        'Q.......',
        '..Q.....',
        '.......Q',
        '.....Q..',
        '...Q....',
        '.Q......',
      ],
      [
        '....Q...',
        '......Q.',
        'Q.......',
        '...Q....',
        '.Q......',
        '.......Q',
        '.....Q..',
        '..Q.....',
      ],
      [
        '....Q...',
        '......Q.',
        '.Q......',
        '...Q....',
        '.......Q',
        'Q.......',
        '..Q.....',
        '.....Q..',
      ],
      [
        '....Q...',
        '......Q.',
        '.Q......',
        '.....Q..',
        '..Q.....',
        'Q.......',
        '...Q....',
        '.......Q',
      ],
      [
        '....Q...',
        '......Q.',
        '.Q......',
        '.....Q..',
        '..Q.....',
        'Q.......',
        '.......Q',
        '...Q....',
      ],
      [
        '....Q...',
        '......Q.',
        '...Q....',
        'Q.......',
        '..Q.....',
        '.......Q',
        '.....Q..',
        '.Q......',
      ],
      [
        '....Q...',
        '.......Q',
        '...Q....',
        'Q.......',
        '..Q.....',
        '.....Q..',
        '.Q......',
        '......Q.',
      ],
      [
        '....Q...',
        '.......Q',
        '...Q....',
        'Q.......',
        '......Q.',
        '.Q......',
        '.....Q..',
        '..Q.....',
      ],
      [
        '.....Q..',
        'Q.......',
        '....Q...',
        '.Q......',
        '.......Q',
        '..Q.....',
        '......Q.',
        '...Q....',
      ],
      [
        '.....Q..',
        '.Q......',
        '......Q.',
        'Q.......',
        '..Q.....',
        '....Q...',
        '.......Q',
        '...Q....',
      ],
      [
        '.....Q..',
        '.Q......',
        '......Q.',
        'Q.......',
        '...Q....',
        '.......Q',
        '....Q...',
        '..Q.....',
      ],
      [
        '.....Q..',
        '..Q.....',
        'Q.......',
        '......Q.',
        '....Q...',
        '.......Q',
        '.Q......',
        '...Q....',
      ],
      [
        '.....Q..',
        '..Q.....',
        'Q.......',
        '.......Q',
        '...Q....',
        '.Q......',
        '......Q.',
        '....Q...',
      ],
      [
        '.....Q..',
        '..Q.....',
        'Q.......',
        '.......Q',
        '....Q...',
        '.Q......',
        '...Q....',
        '......Q.',
      ],
      [
        '.....Q..',
        '..Q.....',
        '....Q...',
        '......Q.',
        'Q.......',
        '...Q....',
        '.Q......',
        '.......Q',
      ],
      [
        '.....Q..',
        '..Q.....',
        '....Q...',
        '.......Q',
        'Q.......',
        '...Q....',
        '.Q......',
        '......Q.',
      ],
      [
        '.....Q..',
        '..Q.....',
        '......Q.',
        '.Q......',
        '...Q....',
        '.......Q',
        'Q.......',
        '....Q...',
      ],
      [
        '.....Q..',
        '..Q.....',
        '......Q.',
        '.Q......',
        '.......Q',
        '....Q...',
        'Q.......',
        '...Q....',
      ],
      [
        '.....Q..',
        '..Q.....',
        '......Q.',
        '...Q....',
        'Q.......',
        '.......Q',
        '.Q......',
        '....Q...',
      ],
      [
        '.....Q..',
        '...Q....',
        'Q.......',
        '....Q...',
        '.......Q',
        '.Q......',
        '......Q.',
        '..Q.....',
      ],
      [
        '.....Q..',
        '...Q....',
        '.Q......',
        '.......Q',
        '....Q...',
        '......Q.',
        'Q.......',
        '..Q.....',
      ],
      [
        '.....Q..',
        '...Q....',
        '......Q.',
        'Q.......',
        '..Q.....',
        '....Q...',
        '.Q......',
        '.......Q',
      ],
      [
        '.....Q..',
        '...Q....',
        '......Q.',
        'Q.......',
        '.......Q',
        '.Q......',
        '....Q...',
        '..Q.....',
      ],
      [
        '.....Q..',
        '.......Q',
        '.Q......',
        '...Q....',
        'Q.......',
        '......Q.',
        '....Q...',
        '..Q.....',
      ],
      [
        '......Q.',
        'Q.......',
        '..Q.....',
        '.......Q',
        '.....Q..',
        '...Q....',
        '.Q......',
        '....Q...',
      ],
      [
        '......Q.',
        '.Q......',
        '...Q....',
        'Q.......',
        '.......Q',
        '....Q...',
        '..Q.....',
        '.....Q..',
      ],
      [
        '......Q.',
        '.Q......',
        '.....Q..',
        '..Q.....',
        'Q.......',
        '...Q....',
        '.......Q',
        '....Q...',
      ],
      [
        '......Q.',
        '..Q.....',
        'Q.......',
        '.....Q..',
        '.......Q',
        '....Q...',
        '.Q......',
        '...Q....',
      ],
      [
        '......Q.',
        '..Q.....',
        '.......Q',
        '.Q......',
        '....Q...',
        'Q.......',
        '.....Q..',
        '...Q....',
      ],
      [
        '......Q.',
        '...Q....',
        '.Q......',
        '....Q...',
        '.......Q',
        'Q.......',
        '..Q.....',
        '.....Q..',
      ],
      [
        '......Q.',
        '...Q....',
        '.Q......',
        '.......Q',
        '.....Q..',
        'Q.......',
        '..Q.....',
        '....Q...',
      ],
      [
        '......Q.',
        '....Q...',
        '..Q.....',
        'Q.......',
        '.....Q..',
        '.......Q',
        '.Q......',
        '...Q....',
      ],
      [
        '.......Q',
        '.Q......',
        '...Q....',
        'Q.......',
        '......Q.',
        '....Q...',
        '..Q.....',
        '.....Q..',
      ],
      [
        '.......Q',
        '.Q......',
        '....Q...',
        '..Q.....',
        'Q.......',
        '......Q.',
        '...Q....',
        '.....Q..',
      ],
      [
        '.......Q',
        '..Q.....',
        'Q.......',
        '.....Q..',
        '.Q......',
        '....Q...',
        '......Q.',
        '...Q....',
      ],
      [
        '.......Q',
        '...Q....',
        'Q.......',
        '..Q.....',
        '.....Q..',
        '.Q......',
        '......Q.',
        '....Q...',
      ],
    ]

    expect(result).toEqual(solution)
    expect(result2).toEqual(solution)
    expect(result3).toEqual(solution)
    expect(result4).toEqual(solution)
  })
})

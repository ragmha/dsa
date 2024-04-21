/**
 *
 * N-Queens
 *
 * The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
 * Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
 * Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
 *
 *
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
 */

export function solveNQueens(n: number): string[][] {
  const board: number[][] = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill('0'))

  const solutions: string[][] = []

  solve(0)

  return solutions

  function solve(row: number): void {
    if (row === n) {
      const solution = board.map((row) =>
        row.map((cell) => (cell === 1 ? 'Q' : '.'))
      )

      solutions.push(solution.map((row) => row.join('')))
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 1
        solve(row + 1)
        board[row][col] = 0
      }
    }
  }

  function isSafe(row: number, col: number): boolean {
    // Check if there is a queen in the same column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false
    }

    // Check if there is a queen in the upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false
    }

    // Check if there is a queen in the upper right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false
    }

    return true
  }
}

export function solveNQueens2(n: number): string[][] {
  const solutions: string[][] = []

  function placeQueens(row: number, queens: number[]) {
    if (row === n) {
      solutions.push(generateSolution(queens))
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col, queens)) {
        placeQueens(row + 1, [...queens, col])
      }
    }
  }

  function isSafe(row: number, col: number, queens: number[]): boolean {
    return queens.every(
      (queenCol, queenRow) =>
        queenCol !== col && row - queenRow !== Math.abs(col - queenCol)
    )
  }

  function generateSolution(queens: number[]): string[] {
    return queens.map((queenCol) =>
      Array(n)
        .fill('.')
        .map((_, col) => (col === queenCol ? 'Q' : '.'))
        .join('')
    )
  }

  placeQueens(0, [])
  return solutions
}

export function solveNQueens3(n: number): string[][] {
  const solutions: string[][] = []
  const board: number[] = []

  const BOARD_ROW = Array(n).fill('.').join('')

  function printBoard(): string[] {
    return board.map(
      (col) => `${BOARD_ROW.slice(0, col)}Q${BOARD_ROW.slice(col + 1)}`
    )
  }

  function isSafe(c: number): boolean {
    for (let row = 0; row < board.length; row++) {
      const col = board[row]
      if (c === col) return false

      const diff = board.length - row

      if (c === col + diff || c === col - diff) return false
    }
    return true
  }

  function backTrack() {
    if (board.length === n) {
      solutions.push(printBoard())
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(col)) {
        board.push(col)
        backTrack()
        board.pop()
      }
    }
  }

  backTrack()
  return solutions
}

export function solveNQueens4(n: number): string[][] {
  const solutions: string[][] = []

  function isSafe(row: number, col: number, board: number[]): boolean {
    for (let prevRow = 0; prevRow < row; prevRow++) {
      if (
        board[prevRow] === col ||
        board[prevRow] - prevRow === col - row ||
        board[prevRow] + prevRow === col + row
      )
        return false
    }
    return true
  }

  function placeQueen(row: number, board: number[]): void {
    if (row === n) {
      solutions.push(
        board.map((col) => `${'.'.repeat(col)}Q${'.'.repeat(n - col - 1)}`)
      )
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col, board)) {
        board[row] = col
        placeQueen(row + 1, board)
      }
    }
  }

  placeQueen(0, Array(n).fill(0))

  return solutions
}

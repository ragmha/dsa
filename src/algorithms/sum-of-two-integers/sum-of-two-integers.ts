/**
 * Given two integers a and b, return the sum of the two integers without using the operators + and -.

Input: a = 1, b = 2
Output: 3
 */

export function getSum(a: number, b: number): number {
  let carry = 0

  while (b !== 0) {
    carry = a & b
    a = a ^ b
    b = carry << 1
  }

  return a
}

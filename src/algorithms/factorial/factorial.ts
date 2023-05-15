/**
 *  The factorial of a non-negative integer n, denoted by n!,
 *  is the product of all positive integers less than or equal to n.
 *
 *  5! = 5 * 4 * 3 * 2 * 1 = 120
 */
export function factorial(num: number): number {
  let result = 1

  for (let i = 2; i <= num; i++) {
    result *= i
  }

  return result
}

export function factorialRecursive(num: number): number {
  return num > 1 ? num * factorialRecursive(num - 1) : 1
}

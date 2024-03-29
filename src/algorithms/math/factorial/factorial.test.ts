import { factorial, factorialRecursive } from "./factorial"

describe("Factorial", () => {
  it("should calculate factorial", () => {
    expect(factorial(0)).toBe(1)
    expect(factorial(1)).toBe(1)
    expect(factorial(5)).toBe(120)
    expect(factorial(8)).toBe(40320)
    expect(factorial(10)).toBe(3628800)
  })

  it("should calculate factorial (recursively)", () => {
    expect(factorialRecursive(0)).toBe(1)
    expect(factorialRecursive(1)).toBe(1)
    expect(factorialRecursive(5)).toBe(120)
    expect(factorialRecursive(8)).toBe(40320)
    expect(factorialRecursive(10)).toBe(3628800)
  })
})

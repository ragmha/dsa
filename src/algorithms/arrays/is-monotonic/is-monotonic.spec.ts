import { isMonotonic, isMonotonic1 } from "./is-monotonic"

describe("Is Monotonic", () => {
  it("should return true", () => {
    expect(isMonotonic([1, 2, 2, 3])).toBe(true)
    expect(isMonotonic([6, 5, 4, 4])).toBe(true)

    expect(isMonotonic1([1, 2, 2, 3])).toBe(true)
    expect(isMonotonic1([6, 5, 4, 4])).toBe(true)
  })

  it("should return false", () => {
    expect(isMonotonic([1, 3, 2])).toBe(false)

    expect(isMonotonic1([1, 3, 2])).toBe(false)
  })
})

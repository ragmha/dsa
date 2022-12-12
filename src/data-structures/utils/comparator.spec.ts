import Comparator from "./comparator"

describe("Comparator", () => {
  it("should compare with default comparator function", () => {
    const comparator = new Comparator()

    expect(comparator.equal(0, 0)).toBe(true)
    expect(comparator.equal(0, 1)).toBe(false)
    expect(comparator.equal("a", "a")).toBe(true)
    expect(comparator.lessThan(1, 2)).toBe(true)
    expect(comparator.lessThan(-1, 2)).toBe(true)
    expect(comparator.lessThan("a", "b")).toBe(true)
  })
})

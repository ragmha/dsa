import { containsDuplicate, containsDuplicate1 } from "./contains-duplicate"

describe("Contains Duplicate", () => {
  it("should return true", () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true)
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true)

    expect(containsDuplicate1([1, 2, 3, 1])).toBe(true)
    expect(containsDuplicate1([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true)
  })

  it("should return false", () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false)

    expect(containsDuplicate1([1, 2, 3, 4])).toBe(false)
  })
})

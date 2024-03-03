/**
 * Given an integer array nums, return true
 * if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 */
export function containsDuplicate(nums: number[]): boolean {
  const hashMap: Map<number, boolean> = new Map()

  for (const number of nums) {
    if (hashMap.has(number)) {
      return true
    }

    hashMap.set(number, false)
  }

  return false
}

export function containsDuplicate1(nums: number[]): boolean {
  const numSet = new Set(nums)

  return nums.length !== numSet.size
}

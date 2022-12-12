/**
 * An array is monotonic if it is either monotone increasing or monotone decreasing.
 *
 * An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j].
 *
 * An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].
 *
 * Given an integer array nums, return true if the given array is monotonic, or false otherwise.
 */
export function isMonotonic(nums: number[]): boolean {
  return (
    nums.every((element, index) => index === 0 || element <= nums[index - 1]) ||
    nums.every((element, index) => index === 0 || element >= nums[index - 1])
  )
}

export function isMonotonic1(nums: number[]): boolean {
  let inc = true
  let dec = true

  for (let i = 0; i < nums.length - 1; i++) {
    // check if the number in the arr is not increasing
    if (nums[i] > nums[i + 1]) {
      inc = false
    }
  }

  for (let i = 0; i < nums.length - 1; i++) {
    // check if the number in the arr in not decreasing
    if (nums[i] < nums[i + 1]) {
      dec = false
    }
  }

  return inc || dec
}

"""
Is Monotonic

An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j].

An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.

"""

from typing import List


class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        return True if (nums == sorted(nums) or nums == sorted(nums, reverse=True)) else False


class AnotherSolution:
    def isMonotonic(self, nums: List[int]) -> bool:
        return all(nums[i] <= nums[i+1] for i in range(len(nums)-1)) or all(nums[i] >= nums[i+1] for i in range(len(nums)-1))

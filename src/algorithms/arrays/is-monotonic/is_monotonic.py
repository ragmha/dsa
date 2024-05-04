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
        if nums[-1] - nums[0] < 0:
            nums.reverse()

        for i in range(len(nums) - 1):
            if not (nums[i] <= nums[i + 1]):
                return False

        return True

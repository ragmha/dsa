def max_value(nums):
    if not nums:
        raise ValueError("Empty list has no maximum value")
    
    maximum = float('-inf')

    for num in nums:
        if num > maximum:
            maximum = num

    return maximum

from is_monotonic import Solution, AnotherSolution


def test_solution_isMonotonic():
    solution = Solution()
    assert solution.isMonotonic([1, 2, 2, 3])
    assert solution.isMonotonic([6, 5, 4, 4])
    assert not solution.isMonotonic([1, 3, 2])


def test_another_solution_isMonotonic():
    another_solution = AnotherSolution()
    assert another_solution.isMonotonic([1, 2, 2, 3])
    assert another_solution.isMonotonic([6, 5, 4, 4])
    assert not another_solution.isMonotonic([1, 3, 2])

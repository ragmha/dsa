import unittest
from is_monotonic import Solution, AnotherSolution


class TestIsMonotonic(unittest.TestCase):

    def setUp(self):
        self.solution = Solution()
        self.another_solution = AnotherSolution()

    def test_solution_isMonotonic(self):
        self.assertTrue(self.solution.isMonotonic([1, 2, 2, 3]))

        self.assertTrue(self.solution.isMonotonic([6, 5, 4, 4]))

        self.assertFalse(self.solution.isMonotonic([1, 3, 2]))

    def test_another_solution_isMonotonic(self):
        self.assertTrue(self.another_solution.isMonotonic([1, 2, 2, 3]))

        self.assertTrue(self.another_solution.isMonotonic([6, 5, 4, 4]))

        self.assertFalse(self.another_solution.isMonotonic([1, 3, 2]))


if __name__ == '__main__':
    unittest.main()

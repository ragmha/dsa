import unittest
from is_monotonic import Solution, AnotherSolution


class TestIsMonotonic(unittest.TestCase):

    def setUp(self):
        self.solution = Solution()
        self.anotherSolution = AnotherSolution()

    def test_solutionisMonotonic(self):
        self.assertTrue(self.solution.isMonotonic([1, 2, 2, 3]))

        self.assertTrue(self.solution.isMonotonic([6, 5, 4, 4]))

        self.assertFalse(self.solution.isMonotonic([1, 3, 2]))

    def test_AnothersolutionisMonotonic(self):
        self.assertTrue(self.anotherSolution.isMonotonic([1, 2, 2, 3]))

        self.assertTrue(self.anotherSolution.isMonotonic([6, 5, 4, 4]))

        self.assertFalse(self.anotherSolution.isMonotonic([1, 3, 2]))


if __name__ == '__main__':
    unittest.main()

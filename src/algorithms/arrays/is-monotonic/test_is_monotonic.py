import unittest
from is_monotonic import Solution


class TestIsMonotonic(unittest.TestCase):

    def setUp(self):
        self.solution = Solution()

    def test_isMonotonic(self):
        self.assertTrue(self.solution.isMonotonic([1, 2, 2, 3]))

        self.assertTrue(self.solution.isMonotonic([6, 5, 4, 4]))

        self.assertFalse(self.solution.isMonotonic([1, 3, 2]))


if __name__ == '__main__':
    unittest.main()

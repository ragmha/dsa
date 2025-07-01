import pytest
from max_value import max_value


def test_positive_numbers():
    assert max_value([3, 1, 7, 2, 5]) == 7

def test_negative_numbers():
    assert max_value([-10, -20, -3]) == -3
    

def test_single_element():
    assert max_value([42]) == 42

def test_all_zeros():
    assert max_value([0, 0, 0]) == 0

def test_all_same():
    assert max_value([5, 5, 5, 5]) == 5

def test_mixed_numbers():
    assert max_value([-1, 0, 3, -2]) == 3

def test_empty_list_raises():
    with pytest.raises(ValueError, match="Empty list has no maximum value"):
        max_value([])
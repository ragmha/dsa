/**
 * Given a 6 x 6 2D Array, arr:
 * 
 * 1 1 1 0 0 0
    0 1 0 0 0 0
    1 1 1 0 0 0
    0 0 0 0 0 0
    0 0 0 0 0 0
    0 0 0 0 0 0
    An hourglass in  is a subset of values with indices falling in this pattern in 's graphical representation:

    a b c
    d
    e f g
    There are  hourglasses in . An hourglass sum is the sum of an hourglass' values. Calculate the hourglass sum for every hourglass in , then print the maximum hourglass sum. The array will always be .

    Example


    -9 -9 -9  1 1 1 
    0 -9  0  4 3 2
    -9 -9 -9  1 2 3
    0  0  8  6 6 0
    0  0  0 -2 0 0
    0  0  1  2 4 0
    The  hourglass sums are:

    -63, -34, -9, 12, 
    -10,   0, 28, 23, 
    -27, -11, -2, 10, 
    9,  17, 25, 18
    The highest hourglass sum is  from the hourglass beginning at row , column :

    0 4 3
    1
    8 6 6
 */

export function hourglassSum(arr: number[][]): number {
  let maxSum = -Infinity

  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = 0; j < arr.length - 2; j++) {
      const sum =
        arr[i][j] +
        arr[i][j + 1] +
        arr[i][j + 2] +
        arr[1 + i][1 + j] +
        arr[2 + i][j] +
        arr[2 + i][1 + j] +
        arr[2 + i][2 + j]

      if (sum > maxSum) maxSum = sum
    }
  }

  return maxSum
}

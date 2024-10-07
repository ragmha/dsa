/**
 * Count Triplets
 *
 * Given an array, find the number of triplets of incides (i, j, k) such that the elements at those indeces are in geometric progression
 * for a given common ratio r and i < j < k
 *
 * arr = [1, 4, 16, 64] r = 4
 *
 * [1, 4, 16] and [4, 16, 64] at indices (0, 1, 2) and (1, 2, 3) return 2
 *
 *
 * */
export function countTriplets(arr: number[], r: number): number {
  let count = 0
  const map = new Map<number, number>()
  const pairs = new Map<number, number>()

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]

    if (map.has(num)) {
      count += map.get(num) || 0
    }

    if (pairs.has(num)) {
      const pair = pairs.get(num) || 0
      map.set(num * r, (map.get(num * r) || 0) + pair)
    }

    pairs.set(num * r, (pairs.get(num * r) || 0) + 1)
  }

  return count
}

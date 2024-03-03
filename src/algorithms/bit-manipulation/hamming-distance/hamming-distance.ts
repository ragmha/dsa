/**
 * The Hamming distance between two strings of equal length is the number of positions
 *  at whih the corresponding symbols are different
 *
 * E.g
 * "karolin" and "kathrin" is 3.
 * 2173896 and 2233796 is 3.
 *
 * @see https://en.wikipedia.org/wiki/Hamming_distance
 *
 */

export function hammingDistance(a: string, b: string) {
  if (a.length !== b.length) {
    throw new Error(`Strings must be of the same length`)
  }

  let distance = 0

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      distance += 1
    }
  }

  return distance
}

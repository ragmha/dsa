/**
 *
 * A string is said to be a special string if either of two conditions is met:
 * All of the characters are the same, e.g. aaa.
 * All characters except the middle one are the same, e.g. aadaa.
 *
 * A special substring is any substring of a string which meets one of those criteria.
 * Given a string, determine how many special substrings can be formed from it.
 *
 * Example:
 *
 * s = mnonopoo // => contains 12 special substrings
 *
 * {m, n, o, n, o, p, o, o, non, ono, opo, oo}
 *
 */
export function substrCount(n: number, s: string): number {
  let total = 0

  const groups: Array<{ char: string; length: number }> = []

  // Group the same characters
  let index = 0

  while (index < n) {
    const currentChar = s[index]
    let length = 1

    while (index + 1 < n && s[index + 1] === currentChar) {
      length++
      index++
    }

    groups.push({ char: currentChar, length })
    index++
  }

  // Count substrings from identical character groups
  for (const group of groups) {
    total += (group.length * (group.length + 1)) / 2
  }

  // Count symmetric patterns (E.g aba, aabaa)
  for (let k = 1; k < groups.length - 1; k++) {
    const left = groups[k - 1]
    const center = groups[k]
    const right = groups[k + 1]

    if (center.length === 1 && left.char === right.char) {
      total += Math.min(left.length, right.length)
    }
  }

  return total
}

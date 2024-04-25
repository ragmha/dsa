/**
 * Sherlock and Anagrams
 *
 * Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string.
 * Given a string, find the number of pairs of substrings of the string that are anagrams of each other.
 *
 * Example:
 *  s = mom
 *
 * The list of all anagrammatic pairs is [m,m], [mo,om] at positions 0 and 1 respectively.
 *
 * Constraints
 *
 * 1 <= q <= 100  at positions  respectively.
 *
 */

export function sherlockAndAnagrams(s: string): number {
  const substringCounts = new Map<string, number>()

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      let curr = [...s.slice(i, j)].sort().join('')

      if (substringCounts.has(curr)) {
        substringCounts.set(curr, substringCounts.get(curr)! + 1)
      } else {
        substringCounts.set(curr, 1)
      }
    }
  }

  return [...substringCounts.values()].reduce(
    (acc, curr) => acc + (curr * (curr - 1)) / 2,
    0
  )
}

export function sherlockAndAnagrams2(s: string): number {
  const generateSortedSubstrings = (_: unknown, i: number) =>
    Array.from({ length: s.length - i }, (_, j) =>
      s
        .slice(j, j + i + 1)
        .split('')
        .sort()
        .join('')
    )

  const sortedSubstringCounts = s
    .split('')
    .flatMap(generateSortedSubstrings)
    .reduce(
      (map, substr) => map.set(substr, (map.get(substr) || 0) + 1),
      new Map<string, number>()
    )

  return [...sortedSubstringCounts.values()].reduce(
    (acc, count) => acc + (count * (count - 1)) / 2,
    0
  )
}

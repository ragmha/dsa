/**
 * Two Strings
 *
 * Given two strings, determine if they share a common substring. A substring may be as small as one character.
 *
 * s1 = 'and'
 * s2 = 'art'
 *
 * The answer is "YES".
 *
 * s1 = 'be'
 * s2 = 'cat'
 *
 * The answer is "NO".
 *
 */
export function twoStrings(s1: string, s2: string): string {
  const s1Set = new Set(s1)

  for (let i = 0; i < s2.length; i++) {
    if (s1Set.has(s2[i])) return 'YES'
  }

  return 'NO'
}

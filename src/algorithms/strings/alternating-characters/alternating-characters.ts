/**
 * Given a string containing characters and only.
 * The task is to change it into a string such that there are no matching adjacent characters.
 * To do this, you are allowed to delete zero or more characters in the string.
 * Find the minimum number of required deletions.
 *
 * E.g
 * s = AABAAB // => 2 Deletions
 *
 */

export function alternatingCharacters(s: string): number {
  let deletions = 0

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      deletions++
    }
  }

  return deletions
}

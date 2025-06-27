/**
 *
 *  Sherlock considers a string to be valid if all characters of the string appear the same number of times.
 *  It is also valid if he can remove just  character at  index in the string, and the remaining characters will occur the same number of times.
 *  Given a string , determine if it is valid. If so, return YES, otherwise return NO.
 *
 *
 * Example:
 *  s = abc // => YES
 *
 * this is a valid string because frequencies are { a: 1, b: 1, c : 1}
 *
 *
 * s = abccc // => NO
 *
 * This string is not valid as we can only remove 1 occurrence of c. That leaves character frequencies of { a: 1, b: 1, c : 2}.
 *
 */

export function isValid(s: string): string {
  const charFrequency: Map<string, number> = new Map()

  for (const char of s) {
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1)
  }

  const frequencyCount: Map<number, number> = new Map()

  for (const freq of charFrequency.values()) {
    frequencyCount.set(freq, (frequencyCount.get(freq) || 0) + 1)
  }

  const frequencies = Array.from(frequencyCount.keys())

  if (frequencies.length === 1) return 'YES'

  if (frequencies.length === 2) {
    const [f1, f2] = frequencies
    const high = Math.max(f1, f2)
    const low = Math.min(f1, f2)

    const highCount = frequencyCount.get(high)
    const lowCount = frequencyCount.get(low)

    const oneCharHasFreqOne = low === 1 && lowCount === 1
    const oneCharHasExtra = high - low === 1 && highCount === 1

    if (oneCharHasFreqOne || oneCharHasExtra) {
      return 'YES'
    }
  }

  return 'NO'
}

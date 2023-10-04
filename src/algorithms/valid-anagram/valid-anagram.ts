/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
  
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

    Example 1:
    Input: s = "anagram", t = "nagaram"
    Output: true

    Example 2:
    Input: s = "rat", t = "car"
    Output: false
 */

export const isAnagram = (s: string, t: string): boolean => {
  if (s.length !== t.length) return false

  const sSorted = s.split('').sort().join('')
  const tSorted = t.split('').sort().join('')

  return sSorted === tSorted
}

export const isAnagram2 = (s: string, t: string): boolean => {
  if (s.length !== t.length) return false

  const sMap = new Map()
  const tMap = new Map()

  for (let i = 0; i < s.length; i++) {
    sMap.set(s[i], sMap.get(s[i]) + 1 || 1)
    tMap.set(t[i], tMap.get(t[i]) + 1 || 1)
  }

  for (let [key, value] of sMap) {
    if (tMap.get(key) !== value) return false
  }

  return true
}

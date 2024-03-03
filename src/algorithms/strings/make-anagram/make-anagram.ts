/**
 * A student is taking a cryptography class and has found anagrams to be very useful. 
 * Two strings are anagrams of each other if the first string's letters can be rearranged to form the second string. In other words, both strings must contain the same exact letters in the same exact frequency. 
 * For example, bacdc and dcbac are anagrams, but bacdc and dcbad are not.
The student decides on an encryption scheme that involves two large strings. The encryption is dependent on the minimum number of character deletions required to make the two strings anagrams. Determine this number.

Given two strings,  and , that may or may not be of the same length, determine the minimum number of character deletions required to make  and  anagrams. Any characters can be deleted from either of the strings.

Example
a = 'cde'
b = 'dcf'
Delete e from a and f from b so that the remaining strings are cd and dc which are anagrams. This takes 2 character deletions.
 */

function makeAnagram(a: string, b: string): number {
  const map = new Map()
  let count = 0

  for (let i = 0; i < a.length; i++) {
    map.set(a[i], map.get(a[i]) + 1 || 1)
  }

  for (let i = 0; i < b.length; i++) {
    if (map.has(b[i])) {
      map.set(b[i], map.get(b[i]) - 1)
    } else {
      count++
    }
  }

  for (let [, value] of map) {
    count += Math.abs(value)
  }

  return count
}

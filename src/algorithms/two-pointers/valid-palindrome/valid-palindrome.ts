/**
 * Valid Palindrome
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and
 * removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 */

export function isPalindrome(s: string): boolean {
  const phrase = s.toLowerCase().replace(/[^a-z0-9]/g, '')

  return phrase.split('').reverse().join('') === phrase
}

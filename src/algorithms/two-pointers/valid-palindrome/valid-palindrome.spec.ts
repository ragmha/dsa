import { isPalindrome } from './valid-palindrome'

describe('Valid Palindrome', () => {
  it('is a valid palindrome with mixed case and punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
  })

  it('is not a valid palindrome with different characters', () => {
    expect(isPalindrome('race a car')).toBe(false)
  })

  it('is a valid palindrome with only one character', () => {
    expect(isPalindrome(' ')).toBe(true)
  })

  it('is a valid palindrome with numbers and letters', () => {
    expect(isPalindrome('A man, 1234567654321 a canal: Panama')).toBe(true)
  })

  it('is not a valid palindrome with special characters', () => {
    expect(isPalindrome('Hello! How are you?')).toBe(false)
  })

  it('is a valid palindrome with special characters and numbers', () => {
    expect(isPalindrome('Was it a car or a cat I saw? 12321')).toBe(true)
  })

  it('is a valid palindrome with emoji', () => {
    expect(isPalindrome('😀 level 😀')).toBe(true)
  })
})

/**
 * Valid Parentheses
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

    An input string is valid if:

    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.

    Example 1:
    Input: s = "()"
    Output: true

    Example 2:
    Input: s = "()[]{}"
    Output: true
 *
 */
export function isValid(s: string): boolean {
  const stack: string[] = []

  for (const char of s) {
    if (char === '(') {
      stack.push(')')
    } else if (char === '[') {
      stack.push(']')
    } else if (char === '{') {
      stack.push('}')
    } else if (stack.pop() !== char) {
      return false
    }
  }

  return stack.length === 0
}

export function isValid2(s: string): boolean {
  const brackets: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    const current = s[i]

    if (['(', '[', '{'].includes(current)) {
      stack.push(current)
    } else if (stack.pop() !== brackets[current]) {
      return false
    }
  }

  return !stack.length
}

/**
 * Ransom Note
 *
 * Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
 * Each letter in magazine can only be used once in ransomNote.
 */

export function canConstruct(ransomNote: string, magazine: string): boolean {
  const magazineChars: Record<string, number> = {}

  for (const char of magazine) {
    magazineChars[char] = magazineChars[char] + 1 || 1
  }

  for (const char of ransomNote) {
    if (!magazineChars[char]) return false
    magazineChars[char]--
  }

  return true
}

export function canConstruct2(ransomNote: string, magazine: string): boolean {
  const magazineChars: Map<string, number> = new Map<string, number>()

  for (const char of magazine) {
    const count = magazineChars.get(char) ?? 0

    if (magazineChars.has(char)) {
      magazineChars.set(char, count + 1)
    } else {
      magazineChars.set(char, 1)
    }
  }

  for (const char of ransomNote) {
    const count = magazineChars.get(char) ?? 0

    if (magazineChars.get(char)) {
      magazineChars.set(char, count - 1)
    } else {
      return false
    }
  }

  return true
}

export function canConstruct3(ransomNote: string, magazine: string): boolean {
  for (let i = 0; i < ransomNote.length; i++) {
    if (magazine.includes(ransomNote[i])) {
      magazine = magazine.replace(ransomNote[i], '')
    } else {
      return false
    }
  }

  return true
}

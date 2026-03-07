const TRACK_ALIASES = new Map([
  ['algo', 'algorithms'],
  ['algorithm', 'algorithms'],
  ['algorithms', 'algorithms'],
  ['data-structure', 'data-structures'],
  ['data-structures', 'data-structures'],
  ['datastructure', 'data-structures'],
  ['datastructures', 'data-structures'],
  ['ds', 'data-structures'],
  ['structure', 'data-structures'],
  ['structures', 'data-structures'],
])

const LANGUAGE_ALIASES = new Map([
  ['py', 'python'],
  ['python', 'python'],
  ['ts', 'typescript'],
  ['typescript', 'typescript'],
])

const CATEGORY_ALIASES = new Map([
  ['arrays-hash-tables', 'arrays_hashtables'],
  ['arrays-hashtables', 'arrays_hashtables'],
  ['arrays-plus-hash-tables', 'arrays_hashtables'],
  ['backtracking', 'backtracking'],
])

export function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalizeTrackInput(value) {
  if (!value) {
    return null
  }

  const normalized = slugify(value)
  return TRACK_ALIASES.get(normalized) ?? null
}

export function normalizeLanguageInput(value) {
  if (!value) {
    return null
  }

  const normalized = slugify(value)
  return LANGUAGE_ALIASES.get(normalized) ?? null
}

export function normalizeCategoryInput(value) {
  if (!value) {
    return null
  }

  const normalized = slugify(value)
  return CATEGORY_ALIASES.get(normalized) ?? normalized
}

export function toSnakeCase(value) {
  return slugify(value).replace(/-/g, '_')
}

export function getPythonModuleName(value) {
  const snakeCase = toSnakeCase(value)

  if (/^\d/.test(snakeCase)) {
    return `problem_${snakeCase}`
  }

  return snakeCase
}

export function toCamelCase(value) {
  const words = slugify(value)
    .split('-')
    .filter(Boolean)

  return words
    .map((word, index) => {
      if (index === 0) {
        return word
      }

      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    })
    .join('')
}

export function toPascalCase(value) {
  const camelCase = toCamelCase(value)

  if (!camelCase) {
    return ''
  }

  return `${camelCase.charAt(0).toUpperCase()}${camelCase.slice(1)}`
}

export function toFunctionName(value) {
  const camelCase = toCamelCase(value)

  if (!camelCase) {
    return 'solveProblem'
  }

  if (/^\d/.test(camelCase)) {
    return `solve${camelCase.charAt(0).toUpperCase()}${camelCase.slice(1)}`
  }

  return camelCase
}

export function toClassName(value) {
  const pascalCase = toPascalCase(value)

  if (!pascalCase) {
    return 'DataStructure'
  }

  if (/^\d/.test(pascalCase)) {
    return `DataStructure${pascalCase}`
  }

  return pascalCase
}

export function toPythonFunctionName(value) {
  const snakeCase = toSnakeCase(value)

  if (!snakeCase) {
    return 'solve_problem'
  }

  if (/^\d/.test(snakeCase)) {
    return `solve_${snakeCase}`
  }

  return snakeCase
}

export function titleFromSlug(value) {
  return String(value ?? '')
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (!word) {
        return word
      }

      if (/^\d/.test(word)) {
        return word.toUpperCase()
      }

      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    })
    .join(' ')
}

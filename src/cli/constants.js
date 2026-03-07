import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function resolveOverride(envKey, fallbackPath) {
  const value = process.env[envKey]

  if (!value) {
    return fallbackPath
  }

  return path.isAbsolute(value) ? value : path.resolve(process.cwd(), value)
}

export const PROJECT_ROOT = resolveOverride(
  'DSA_CLI_ROOT',
  path.resolve(__dirname, '../..')
)

export const ALGORITHMS_DIR = resolveOverride(
  'DSA_CLI_ALGORITHMS_DIR',
  path.join(PROJECT_ROOT, 'src', 'algorithms')
)

export const DATA_STRUCTURES_DIR = resolveOverride(
  'DSA_CLI_DATA_STRUCTURES_DIR',
  path.join(PROJECT_ROOT, 'src', 'data-structures')
)

export const README_PATH = resolveOverride(
  'DSA_CLI_README_PATH',
  path.join(PROJECT_ROOT, 'readme.md')
)

export const CATALOG_PATH = resolveOverride(
  'DSA_CLI_CATALOG_PATH',
  path.join(PROJECT_ROOT, 'src', 'cli', 'problem-catalog.json')
)

export const SCAFFOLD_MARKER = '@dsa-cli-status scaffold'
export const DEFAULT_RECENT_LIMIT = 5
export const DEFAULT_NEXT_LIMIT = 5

export const IGNORED_DIRECTORY_NAMES = new Set([
  '.git',
  '.pytest_cache',
  '.venv',
  '__pycache__',
  'node_modules',
  'utils',
  'venv',
])

export const TRACKS = [
  { id: 'algorithms', title: 'Algorithms' },
  { id: 'data-structures', title: 'Data Structures' },
]

export const LANGUAGES = [
  { id: 'typescript', title: 'TypeScript' },
  { id: 'python', title: 'Python' },
]

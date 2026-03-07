import fs from 'fs'
import path from 'path'

import {
  ALGORITHMS_DIR,
  DATA_STRUCTURES_DIR,
  IGNORED_DIRECTORY_NAMES,
  PROJECT_ROOT,
  SCAFFOLD_MARKER,
} from './constants.js'
import {
  getPythonModuleName,
  titleFromSlug,
} from './normalize.js'

function isIgnoredDirectory(entryName) {
  return IGNORED_DIRECTORY_NAMES.has(entryName) || entryName.startsWith('.')
}

function listDirectories(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !isIgnoredDirectory(entry.name))
    .map((entry) => entry.name)
}

function listFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
}

function toProjectRelativePath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join('/')
}

function isTypeScriptTestFile(fileName) {
  return fileName.endsWith('.spec.ts') || fileName.endsWith('.test.ts')
}

function isPythonTestFile(fileName) {
  return fileName.startsWith('test_') && fileName.endsWith('.py')
}

function readImplementationStatus(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return 'missing'
  }

  const preview = fs.readFileSync(filePath, 'utf8')

  return preview.includes(SCAFFOLD_MARKER) ? 'scaffolded' : 'solved'
}

function getLatestUpdatedAt(paths) {
  const existingPaths = paths.filter((candidatePath) => candidatePath && fs.existsSync(candidatePath))

  if (existingPaths.length === 0) {
    return null
  }

  const latestTimestamp = existingPaths.reduce((latest, candidatePath) => {
    const modifiedAt = fs.statSync(candidatePath).mtimeMs
    return Math.max(latest, modifiedAt)
  }, 0)

  return new Date(latestTimestamp).toISOString()
}

function buildImplementation(language, solutionPath, testPath) {
  const updatedAt = getLatestUpdatedAt([solutionPath, testPath])

  return {
    language,
    solutionPath: toProjectRelativePath(solutionPath),
    testPath: testPath ? toProjectRelativePath(testPath) : null,
    status: readImplementationStatus(solutionPath),
    updatedAt,
  }
}

function scanAlgorithmProblem(categorySlug, problemSlug, problemDirectoryPath) {
  const files = listFiles(problemDirectoryPath)
  const implementations = []
  const pythonModuleName = getPythonModuleName(problemSlug)

  const typeScriptSolutionFileName =
    files.find((fileName) => fileName === `${problemSlug}.ts`) ??
    files.find((fileName) => fileName.endsWith('.ts') && !isTypeScriptTestFile(fileName))

  if (typeScriptSolutionFileName) {
    const typeScriptTestFileName =
      files.find((fileName) => fileName === `${problemSlug}.spec.ts`) ??
      files.find((fileName) => fileName === `${problemSlug}.test.ts`) ??
      files.find((fileName) => isTypeScriptTestFile(fileName))

    implementations.push(
      buildImplementation(
        'typescript',
        path.join(problemDirectoryPath, typeScriptSolutionFileName),
        typeScriptTestFileName
          ? path.join(problemDirectoryPath, typeScriptTestFileName)
          : null
      )
    )
  }

  const pythonSolutionFileName =
    files.find((fileName) => fileName === `${pythonModuleName}.py`) ??
    files.find((fileName) => fileName.endsWith('.py') && !isPythonTestFile(fileName))

  if (pythonSolutionFileName) {
    const pythonTestFileName =
      files.find((fileName) => fileName === `test_${pythonModuleName}.py`) ??
      files.find((fileName) => isPythonTestFile(fileName))

    implementations.push(
      buildImplementation(
        'python',
        path.join(problemDirectoryPath, pythonSolutionFileName),
        pythonTestFileName ? path.join(problemDirectoryPath, pythonTestFileName) : null
      )
    )
  }

  if (implementations.length === 0) {
    return null
  }

  const updatedAt = getLatestUpdatedAt(
    implementations.flatMap((implementation) => [
      implementation.solutionPath
        ? path.join(PROJECT_ROOT, implementation.solutionPath)
        : null,
      implementation.testPath ? path.join(PROJECT_ROOT, implementation.testPath) : null,
    ])
  )

  return {
    track: 'algorithms',
    categorySlug,
    title: titleFromSlug(problemSlug),
    slug: problemSlug,
    implementations,
    updatedAt,
  }
}

function scanDataStructure(structureSlug, structureDirectoryPath) {
  const rootFiles = listFiles(structureDirectoryPath)
  const implementations = []
  const pythonModuleName = getPythonModuleName(structureSlug)

  const typeScriptSolutionFileName =
    rootFiles.find((fileName) => fileName === `${structureSlug}.ts`) ??
    rootFiles.find((fileName) => fileName.endsWith('.ts') && !isTypeScriptTestFile(fileName)) ??
    null

  if (typeScriptSolutionFileName) {
    const testsDirectoryPath = path.join(structureDirectoryPath, '__tests__')
    const testFiles = listFiles(testsDirectoryPath)

    const typeScriptTestFileName =
      testFiles.find((fileName) => fileName === `${structureSlug}.spec.ts`) ??
      testFiles.find((fileName) => fileName === `${structureSlug}.test.ts`) ??
      testFiles.find((fileName) => isTypeScriptTestFile(fileName))

    implementations.push(
      buildImplementation(
        'typescript',
        path.join(structureDirectoryPath, typeScriptSolutionFileName),
        typeScriptTestFileName
          ? path.join(testsDirectoryPath, typeScriptTestFileName)
          : null
      )
    )
  }

  const pythonSolutionFileName =
    rootFiles.find((fileName) => fileName === `${pythonModuleName}.py`) ??
    rootFiles.find((fileName) => fileName.endsWith('.py') && !isPythonTestFile(fileName)) ??
    null

  if (pythonSolutionFileName) {
    const pythonTestFileName =
      rootFiles.find((fileName) => fileName === `test_${pythonModuleName}.py`) ??
      rootFiles.find((fileName) => isPythonTestFile(fileName))

    implementations.push(
      buildImplementation(
        'python',
        path.join(structureDirectoryPath, pythonSolutionFileName),
        pythonTestFileName ? path.join(structureDirectoryPath, pythonTestFileName) : null
      )
    )
  }

  if (implementations.length === 0) {
    return null
  }

  const updatedAt = getLatestUpdatedAt(
    implementations.flatMap((implementation) => [
      implementation.solutionPath
        ? path.join(PROJECT_ROOT, implementation.solutionPath)
        : null,
      implementation.testPath ? path.join(PROJECT_ROOT, implementation.testPath) : null,
    ])
  )

  return {
    track: 'data-structures',
    title: titleFromSlug(structureSlug),
    slug: structureSlug,
    implementations,
    updatedAt,
  }
}

export function scanRepository({
  algorithmsDir = ALGORITHMS_DIR,
  dataStructuresDir = DATA_STRUCTURES_DIR,
} = {}) {
  const algorithms = []

  for (const categorySlug of listDirectories(algorithmsDir)) {
    const categoryDirectoryPath = path.join(algorithmsDir, categorySlug)

    for (const problemSlug of listDirectories(categoryDirectoryPath)) {
      const problemDirectoryPath = path.join(categoryDirectoryPath, problemSlug)
      const scannedProblem = scanAlgorithmProblem(
        categorySlug,
        problemSlug,
        problemDirectoryPath
      )

      if (scannedProblem) {
        algorithms.push(scannedProblem)
      }
    }
  }

  const dataStructures = []

  for (const structureSlug of listDirectories(dataStructuresDir)) {
    const structureDirectoryPath = path.join(dataStructuresDir, structureSlug)
    const scannedStructure = scanDataStructure(structureSlug, structureDirectoryPath)

    if (scannedStructure) {
      dataStructures.push(scannedStructure)
    }
  }

  return {
    algorithms,
    dataStructures,
    scannedAt: new Date().toISOString(),
  }
}

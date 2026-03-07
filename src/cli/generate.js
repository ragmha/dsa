import fs from 'fs'
import path from 'path'

import {
  ALGORITHMS_DIR,
  DATA_STRUCTURES_DIR,
  LANGUAGES,
  PROJECT_ROOT,
  SCAFFOLD_MARKER,
  TRACKS,
} from './constants.js'
import {
  ensureAlgorithmItem,
  ensureDataStructureItem,
  findAlgorithmCategory,
  findAlgorithmItem,
  findDataStructureItem,
  saveCatalog,
} from './catalog.js'
import {
  getPythonModuleName,
  normalizeCategoryInput,
  normalizeLanguageInput,
  normalizeTrackInput,
  slugify,
  titleFromSlug,
} from './normalize.js'
import { createPrompter } from './prompts.js'
import { buildTemplateSet } from './templates.js'

function formatDisplayStatus(item) {
  if (item.status === 'solved') {
    return 'solved'
  }

  if (item.status === 'scaffolded') {
    return 'in progress'
  }

  return 'remaining'
}

function buildSolutionPaths(request) {
  if (request.track === 'algorithms') {
    const problemDirectoryPath = path.join(
      ALGORITHMS_DIR,
      request.categorySlug,
      request.itemSlug
    )

    if (request.language === 'typescript') {
      return {
        problemDirectoryPath,
        solutionPath: path.join(problemDirectoryPath, `${request.itemSlug}.ts`),
        testPath: path.join(problemDirectoryPath, `${request.itemSlug}.spec.ts`),
      }
    }

    const pythonModuleName = getPythonModuleName(request.itemSlug)

    return {
      problemDirectoryPath,
      solutionPath: path.join(problemDirectoryPath, `${pythonModuleName}.py`),
      testPath: path.join(problemDirectoryPath, `test_${pythonModuleName}.py`),
    }
  }

  const structureDirectoryPath = path.join(DATA_STRUCTURES_DIR, request.itemSlug)

  if (request.language === 'typescript') {
    return {
      problemDirectoryPath: structureDirectoryPath,
      solutionPath: path.join(structureDirectoryPath, `${request.itemSlug}.ts`),
      testPath: path.join(
        structureDirectoryPath,
        '__tests__',
        `${request.itemSlug}.spec.ts`
      ),
    }
  }

  const pythonModuleName = getPythonModuleName(request.itemSlug)

  return {
    problemDirectoryPath: structureDirectoryPath,
    solutionPath: path.join(structureDirectoryPath, `${pythonModuleName}.py`),
    testPath: path.join(structureDirectoryPath, `test_${pythonModuleName}.py`),
  }
}

function renderGenerationSummary(result) {
  const lines = [
    'Scaffold created successfully.',
    `- Solution: ${result.solutionPath}`,
    `- Test: ${result.testPath}`,
  ]

  if (result.createdCatalogEntry) {
    lines.push('- Catalog: added a new tracked item to src/cli/problem-catalog.json')
  }

  lines.push(
    `- Next step: remove the ${SCAFFOLD_MARKER} marker once the implementation is complete so the dashboard counts it as solved.`
  )

  return lines.join('\n')
}

function resolveAlgorithmSelectionByFlag(state, categorySlug, problemNameOrSlug) {
  const normalizedCategorySlug = normalizeCategoryInput(categorySlug)
  const category = state.algorithms.categories.find(
    (candidate) => candidate.slug === normalizedCategorySlug
  )

  if (!category) {
    return {
      categorySlug: normalizedCategorySlug,
      categoryTitle: titleFromSlug(normalizedCategorySlug),
      item: null,
    }
  }

  const itemSlug = slugify(problemNameOrSlug)
  const item = category.items.find((candidate) => candidate.slug === itemSlug) ?? null

  return {
    categorySlug: category.slug,
    categoryTitle: category.title,
    item,
  }
}

async function resolveAlgorithmRequest({ flags, state, prompter }) {
  let categorySlug = normalizeCategoryInput(flags.category)
  let categoryTitle = categorySlug ? titleFromSlug(categorySlug) : null

  if (!categorySlug) {
    const selectedCategory = await prompter.select(
      'Choose an algorithm category',
      [
        ...state.algorithms.categories.map((category) => ({
          label: `${category.title} (${category.summary.solved}/${category.summary.total} solved)`,
          value: { type: 'existing', category },
        })),
        {
          label: 'Create a custom category',
          value: { type: 'custom' },
        },
      ]
    )

    if (selectedCategory.type === 'custom') {
      categoryTitle = await prompter.ask('Category name')
      categorySlug = normalizeCategoryInput(categoryTitle)

      if (!categorySlug || !categoryTitle.trim()) {
        throw new Error('A non-empty category name is required.')
      }
    } else {
      categoryTitle = selectedCategory.category.title
      categorySlug = selectedCategory.category.slug
    }
  } else {
    const existingCategory = state.algorithms.categories.find(
      (candidate) => candidate.slug === categorySlug
    )

    if (existingCategory) {
      categoryTitle = existingCategory.title
    }
  }

  let selectedItem = null
  let itemTitle = flags.problem || flags.name || ''

  if (itemTitle) {
    const selection = resolveAlgorithmSelectionByFlag(state, categorySlug, itemTitle)
    categoryTitle = selection.categoryTitle
    selectedItem = selection.item
  } else {
    const category = state.algorithms.categories.find(
      (candidate) => candidate.slug === categorySlug
    )

    const selection = await prompter.select(
      `Choose a problem from ${categoryTitle}`,
      [
        ...(category?.items ?? []).map((item) => ({
          label: `${item.title} (${formatDisplayStatus(item)})`,
          value: { type: 'existing', item },
        })),
        {
          label: 'Create a custom problem',
          value: { type: 'custom' },
        },
      ]
    )

    if (selection.type === 'custom') {
      itemTitle = await prompter.ask('Problem name')
    } else {
      selectedItem = selection.item
      itemTitle = selectedItem.title
    }
  }

  return {
    categorySlug,
    categoryTitle,
    itemTitle: selectedItem?.title ?? itemTitle,
    selectedItem,
  }
}

async function resolveDataStructureRequest({ flags, state, prompter }) {
  let selectedItem = null
  let itemTitle = flags.problem || flags.name || ''

  if (itemTitle) {
    selectedItem =
      state.dataStructures.items.find(
        (candidate) => candidate.slug === slugify(itemTitle)
      ) ?? null
  } else {
    const selection = await prompter.select('Choose a data structure', [
      ...state.dataStructures.items.map((item) => ({
        label: `${item.title} (${formatDisplayStatus(item)})`,
        value: { type: 'existing', item },
      })),
      {
        label: 'Create a custom data structure',
        value: { type: 'custom' },
      },
    ])

    if (selection.type === 'custom') {
      itemTitle = await prompter.ask('Data structure name')
    } else {
      selectedItem = selection.item
      itemTitle = selectedItem.title
    }
  }

  return {
    itemTitle: selectedItem?.title ?? itemTitle,
    selectedItem,
  }
}

async function resolveLanguage(flags, prompter) {
  const normalizedLanguage = normalizeLanguageInput(flags.language)

  if (normalizedLanguage) {
    return normalizedLanguage
  }

  return prompter.select(
    'Choose a language',
    LANGUAGES.map((language) => ({
      label: language.title,
      value: language.id,
    }))
  )
}

export async function runGenerateCommand({ parsed, io, snapshot, prompter }) {
  const track = normalizeTrackInput(parsed.flags.track)
  const missingCategory =
    track === 'algorithms' && !normalizeCategoryInput(parsed.flags.category)
  const needsPrompting =
    !track ||
    !normalizeLanguageInput(parsed.flags.language) ||
    (!parsed.flags.problem && !parsed.flags.name) ||
    missingCategory

  let activePrompter = prompter
  let ownsPrompter = false

  if (!activePrompter && needsPrompting) {
    if (!io.input.isTTY && needsPrompting) {
      throw new Error(
        'Missing required generation flags. Provide --track, --language, and --problem (plus --category for algorithms), or run the CLI interactively.'
      )
    }

    activePrompter = createPrompter({ input: io.input, output: io.output })
    ownsPrompter = true
  }

  try {
    const resolvedTrack =
      track ??
      (await activePrompter.select(
        'Choose a track',
        TRACKS.map((option) => ({
          label: option.title,
          value: option.id,
        }))
      ))

    let request

    if (resolvedTrack === 'algorithms') {
      const algorithmRequest = await resolveAlgorithmRequest({
        flags: parsed.flags,
        state: snapshot.state,
        prompter: activePrompter,
      })

      request = {
        track: 'algorithms',
        categorySlug: algorithmRequest.categorySlug,
        categoryTitle: algorithmRequest.categoryTitle,
        itemTitle: algorithmRequest.itemTitle,
        itemSlug: slugify(algorithmRequest.itemTitle),
        language: await resolveLanguage(parsed.flags, activePrompter),
      }
    } else {
      const dataStructureRequest = await resolveDataStructureRequest({
        flags: parsed.flags,
        state: snapshot.state,
        prompter: activePrompter,
      })

      request = {
        track: 'data-structures',
        itemTitle: dataStructureRequest.itemTitle,
        itemSlug: slugify(dataStructureRequest.itemTitle),
        language: await resolveLanguage(parsed.flags, activePrompter),
      }
    }

    if (!request.itemSlug) {
      throw new Error('A problem or data-structure name is required to generate a scaffold.')
    }

    if (typeof request.itemTitle !== 'string' || request.itemTitle.trim().length === 0) {
      throw new Error('A non-empty problem or data-structure name is required.')
    }

    const paths = buildSolutionPaths(request)

    if (fs.existsSync(paths.solutionPath) || fs.existsSync(paths.testPath)) {
      throw new Error(
        `A ${request.language} scaffold already exists for ${request.itemTitle}. Refusing to overwrite existing work.`
      )
    }

    const templates = buildTemplateSet(request)
    const createdDirectories = [
      paths.problemDirectoryPath,
      path.dirname(paths.testPath),
    ]
    const createdFiles = []
    const nextCatalog = JSON.parse(JSON.stringify(snapshot.catalog))
    let createdCatalogEntry = false

    try {
      fs.mkdirSync(paths.problemDirectoryPath, { recursive: true })
      fs.mkdirSync(path.dirname(paths.testPath), { recursive: true })

      fs.writeFileSync(paths.solutionPath, templates.solution)
      createdFiles.push(paths.solutionPath)

      fs.writeFileSync(paths.testPath, templates.test)
      createdFiles.push(paths.testPath)

      if (request.track === 'algorithms') {
        const category = findAlgorithmCategory(nextCatalog, request.categorySlug)
        const existingItem = findAlgorithmItem(
          nextCatalog,
          request.categorySlug,
          request.itemSlug
        )

        if (!category || !existingItem) {
          createdCatalogEntry = true
        }

        ensureAlgorithmItem(nextCatalog, {
          categorySlug: request.categorySlug,
          categoryTitle: request.categoryTitle,
          title: request.itemTitle,
          tags: [request.categoryTitle],
        })
      } else {
        const existingItem = findDataStructureItem(nextCatalog, request.itemSlug)

        if (!existingItem) {
          createdCatalogEntry = true
        }

        ensureDataStructureItem(nextCatalog, {
          title: request.itemTitle,
        })
      }

      saveCatalog(nextCatalog)
    } catch (error) {
      createdFiles.reverse().forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.rmSync(filePath, { force: true })
        }
      })

      createdDirectories.reverse().forEach((directoryPath) => {
        if (fs.existsSync(directoryPath) && fs.readdirSync(directoryPath).length === 0) {
          fs.rmdirSync(directoryPath)
        }
      })

      throw error
    }

    return {
      message: renderGenerationSummary({
        solutionPath: path.relative(PROJECT_ROOT, paths.solutionPath),
        testPath: path.relative(PROJECT_ROOT, paths.testPath),
        createdCatalogEntry,
      }),
    }
  } finally {
    if (ownsPrompter) {
      activePrompter.close()
    }
  }
}

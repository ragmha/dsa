import fs from 'fs'
import path from 'path'

import { CATALOG_PATH } from './constants.js'
import {
  normalizeCategoryInput,
  normalizeTrackInput,
  slugify,
  titleFromSlug,
} from './normalize.js'

function assertNonEmptyString(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid CLI catalog: ${label} must be a non-empty string`)
  }
}

function assertCatalogShape(catalog) {
  if (!catalog?.tracks?.algorithms?.categories) {
    throw new Error('Invalid CLI catalog: missing algorithm categories')
  }

  if (!catalog?.tracks?.['data-structures']?.items) {
    throw new Error('Invalid CLI catalog: missing data-structure items')
  }

  if (!Array.isArray(catalog.tracks.algorithms.categories)) {
    throw new Error('Invalid CLI catalog: algorithm categories must be an array')
  }

  if (!Array.isArray(catalog.tracks['data-structures'].items)) {
    throw new Error('Invalid CLI catalog: data-structure items must be an array')
  }

  for (const category of catalog.tracks.algorithms.categories) {
    assertNonEmptyString(category.slug, 'algorithm category slug')
    assertNonEmptyString(category.title, 'algorithm category title')

    if (!Array.isArray(category.items)) {
      throw new Error(
        `Invalid CLI catalog: ${category.slug} items must be an array`
      )
    }

    for (const item of category.items) {
      assertNonEmptyString(item.slug, `${category.slug} item slug`)
      assertNonEmptyString(item.title, `${category.slug} item title`)
    }
  }

  for (const item of catalog.tracks['data-structures'].items) {
    assertNonEmptyString(item.slug, 'data-structure slug')
    assertNonEmptyString(item.title, 'data-structure title')
  }
}

export function loadCatalog(catalogPath = CATALOG_PATH) {
  if (!fs.existsSync(catalogPath)) {
    throw new Error(
      `Missing CLI catalog at ${catalogPath}. Recreate src/cli/problem-catalog.json before running the CLI.`
    )
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
  assertCatalogShape(catalog)
  return catalog
}

export function saveCatalog(catalog, catalogPath = CATALOG_PATH) {
  assertCatalogShape(catalog)
  fs.mkdirSync(path.dirname(catalogPath), { recursive: true })
  fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)
}

export function getAlgorithmCategories(catalog) {
  return catalog.tracks.algorithms.categories
}

export function getDataStructureItems(catalog) {
  return catalog.tracks['data-structures'].items
}

export function findAlgorithmCategory(catalog, categorySlug) {
  const normalizedCategorySlug = normalizeCategoryInput(categorySlug)

  return (
    getAlgorithmCategories(catalog).find(
      (category) => category.slug === normalizedCategorySlug
    ) ?? null
  )
}

export function ensureAlgorithmCategory(
  catalog,
  categorySlug,
  categoryTitle = titleFromSlug(categorySlug)
) {
  const existingCategory = findAlgorithmCategory(catalog, categorySlug)

  if (existingCategory) {
    return existingCategory
  }

  const category = {
    slug: normalizeCategoryInput(categorySlug),
    title: categoryTitle,
    items: [],
  }

  getAlgorithmCategories(catalog).push(category)
  return category
}

export function findAlgorithmItem(catalog, categorySlug, itemNameOrSlug) {
  const category = findAlgorithmCategory(catalog, categorySlug)

  if (!category) {
    return null
  }

  const itemSlug = slugify(itemNameOrSlug)

  return category.items.find((item) => item.slug === itemSlug) ?? null
}

export function ensureAlgorithmItem(catalog, { categorySlug, categoryTitle, title, tags }) {
  const category = ensureAlgorithmCategory(catalog, categorySlug, categoryTitle)
  const itemSlug = slugify(title)
  const existingItem = category.items.find((item) => item.slug === itemSlug)

  if (existingItem) {
    return existingItem
  }

  const item = {
    slug: itemSlug,
    title,
    tags: tags ?? [category.title],
  }

  category.items.push(item)
  return item
}

export function findDataStructureItem(catalog, itemNameOrSlug) {
  const itemSlug = slugify(itemNameOrSlug)

  return getDataStructureItems(catalog).find((item) => item.slug === itemSlug) ?? null
}

export function ensureDataStructureItem(catalog, { title }) {
  const existingItem = findDataStructureItem(catalog, title)

  if (existingItem) {
    return existingItem
  }

  const item = {
    slug: slugify(title),
    title,
  }

  getDataStructureItems(catalog).push(item)
  return item
}

export function countCatalogItems(catalog, track) {
  const normalizedTrack = normalizeTrackInput(track)

  if (normalizedTrack === 'algorithms') {
    return getAlgorithmCategories(catalog).reduce(
      (total, category) => total + category.items.length,
      0
    )
  }

  return getDataStructureItems(catalog).length
}

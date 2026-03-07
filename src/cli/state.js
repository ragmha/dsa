import {
  DEFAULT_NEXT_LIMIT,
  DEFAULT_RECENT_LIMIT,
  LANGUAGES,
  TRACKS,
} from './constants.js'
import {
  getAlgorithmCategories,
  getDataStructureItems,
} from './catalog.js'
import { titleFromSlug } from './normalize.js'

function determineItemStatus(implementations) {
  if (implementations.some((implementation) => implementation.status === 'solved')) {
    return 'solved'
  }

  if (implementations.some((implementation) => implementation.status === 'scaffolded')) {
    return 'scaffolded'
  }

  return 'remaining'
}

function compareByTitle(leftItem, rightItem) {
  return String(leftItem.title).localeCompare(String(rightItem.title))
}

function compareByUpdatedAt(leftItem, rightItem) {
  return new Date(rightItem.updatedAt ?? 0).getTime() - new Date(leftItem.updatedAt ?? 0).getTime()
}

function buildMergedItem(baseItem, scannedItem, extras = {}) {
  const implementations = scannedItem?.implementations ?? []
  const status = determineItemStatus(implementations)

  return {
    ...baseItem,
    implementations,
    languages: implementations.map((implementation) => implementation.language),
    status,
    updatedAt: scannedItem?.updatedAt ?? null,
    source: extras.source ?? 'catalog',
    track: extras.track,
    categorySlug: extras.categorySlug ?? null,
    categoryTitle: extras.categoryTitle ?? null,
  }
}

function summarizeItems(items) {
  return {
    total: items.length,
    solved: items.filter((item) => item.status === 'solved').length,
    scaffolded: items.filter((item) => item.status === 'scaffolded').length,
    remaining: items.filter((item) => item.status === 'remaining').length,
  }
}

function buildLanguageSummary(algorithmCategories, dataStructureItems) {
  const summary = LANGUAGES.map((language) => ({
    ...language,
    solved: 0,
    scaffolded: 0,
  }))

  const allItems = [
    ...algorithmCategories.flatMap((category) => category.items),
    ...dataStructureItems,
  ]

  for (const item of allItems) {
    for (const implementation of item.implementations) {
      const languageSummary = summary.find(
        (candidate) => candidate.id === implementation.language
      )

      if (!languageSummary) {
        continue
      }

      if (implementation.status === 'solved') {
        languageSummary.solved += 1
      }

      if (implementation.status === 'scaffolded') {
        languageSummary.scaffolded += 1
      }
    }
  }

  return summary
}

export function buildProjectState(catalog, scanResults) {
  const scannedAlgorithmsByKey = new Map(
    scanResults.algorithms.map((item) => [`${item.categorySlug}:${item.slug}`, item])
  )

  const algorithmCategories = getAlgorithmCategories(catalog).map((category) => {
    const items = category.items
      .map((item) => {
        const key = `${category.slug}:${item.slug}`

        return buildMergedItem(item, scannedAlgorithmsByKey.get(key), {
          source: 'catalog',
          track: 'algorithms',
          categorySlug: category.slug,
          categoryTitle: category.title,
        })
      })
      .sort(compareByTitle)

    return {
      ...category,
      items,
      summary: summarizeItems(items),
    }
  })

  const seenAlgorithmKeys = new Set(
    algorithmCategories.flatMap((category) =>
      category.items.map((item) => `${category.slug}:${item.slug}`)
    )
  )

  for (const scannedItem of scanResults.algorithms) {
    const key = `${scannedItem.categorySlug}:${scannedItem.slug}`

    if (seenAlgorithmKeys.has(key)) {
      continue
    }

    let targetCategory = algorithmCategories.find(
      (category) => category.slug === scannedItem.categorySlug
    )

    if (!targetCategory) {
      targetCategory = {
        slug: scannedItem.categorySlug,
        title: titleFromSlug(scannedItem.categorySlug),
        items: [],
        summary: {
          total: 0,
          solved: 0,
          scaffolded: 0,
          remaining: 0,
        },
        source: 'discovered',
      }

      algorithmCategories.push(targetCategory)
    }

    targetCategory.items.push(
      buildMergedItem(
        {
          slug: scannedItem.slug,
          title: scannedItem.title,
          tags: [targetCategory.title],
        },
        scannedItem,
        {
          source: 'discovered',
          track: 'algorithms',
          categorySlug: targetCategory.slug,
          categoryTitle: targetCategory.title,
        }
      )
    )

    targetCategory.items.sort(compareByTitle)
    targetCategory.summary = summarizeItems(targetCategory.items)
  }

  const algorithmSummary = summarizeItems(
    algorithmCategories.flatMap((category) => category.items)
  )

  const scannedDataStructuresBySlug = new Map(
    scanResults.dataStructures.map((item) => [item.slug, item])
  )

  const dataStructureItems = getDataStructureItems(catalog)
    .map((item) =>
      buildMergedItem(item, scannedDataStructuresBySlug.get(item.slug), {
        source: 'catalog',
        track: 'data-structures',
      })
    )
    .sort(compareByTitle)

  const seenDataStructures = new Set(dataStructureItems.map((item) => item.slug))

  for (const scannedItem of scanResults.dataStructures) {
    if (seenDataStructures.has(scannedItem.slug)) {
      continue
    }

    dataStructureItems.push(
      buildMergedItem(
        {
          slug: scannedItem.slug,
          title: scannedItem.title,
        },
        scannedItem,
        {
          source: 'discovered',
          track: 'data-structures',
        }
      )
    )
  }

  dataStructureItems.sort(compareByTitle)
  const dataStructureSummary = summarizeItems(dataStructureItems)

  const trackSummary = TRACKS.map((track) => {
    if (track.id === 'algorithms') {
      return {
        ...track,
        ...algorithmSummary,
      }
    }

    return {
      ...track,
      ...dataStructureSummary,
    }
  })

  const overall = trackSummary.reduce(
    (runningSummary, track) => ({
      total: runningSummary.total + track.total,
      solved: runningSummary.solved + track.solved,
      scaffolded: runningSummary.scaffolded + track.scaffolded,
      remaining: runningSummary.remaining + track.remaining,
    }),
    {
      total: 0,
      solved: 0,
      scaffolded: 0,
      remaining: 0,
    }
  )

  const languageSummary = buildLanguageSummary(
    algorithmCategories,
    dataStructureItems
  )

  const allItems = [
    ...algorithmCategories.flatMap((category) => category.items),
    ...dataStructureItems,
  ]

  const recentActivity = allItems
    .filter((item) => item.updatedAt)
    .sort(compareByUpdatedAt)
    .slice(0, DEFAULT_RECENT_LIMIT)

  const activeItems = allItems
    .filter((item) => item.status === 'scaffolded')
    .sort(compareByUpdatedAt)
    .slice(0, DEFAULT_NEXT_LIMIT)

  const nextItems = algorithmCategories
    .flatMap((category) => category.items)
    .filter((item) => item.status === 'remaining')
    .slice(0, DEFAULT_NEXT_LIMIT)

  const discoveredItems = allItems.filter((item) => item.source === 'discovered')

  return {
    generatedAt: new Date().toISOString(),
    overall,
    algorithms: {
      categories: algorithmCategories,
      ...algorithmSummary,
    },
    dataStructures: {
      items: dataStructureItems,
      ...dataStructureSummary,
    },
    tracks: trackSummary,
    languages: languageSummary,
    recentActivity,
    activeItems,
    nextItems,
    discoveredItems,
  }
}

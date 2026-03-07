import { colorize } from './colors.js'

function createProgressBar(solved, scaffolded, total, useColor) {
  const width = 16

  if (total === 0) {
    return colorize('░'.repeat(width), 'dim', useColor)
  }

  let solvedUnits = Math.round((solved / total) * width)
  let scaffoldedUnits = Math.round((scaffolded / total) * width)

  if (solvedUnits + scaffoldedUnits > width) {
    const overflow = solvedUnits + scaffoldedUnits - width
    scaffoldedUnits = Math.max(0, scaffoldedUnits - overflow)
  }

  const remainingUnits = Math.max(0, width - solvedUnits - scaffoldedUnits)

  return [
    colorize('█'.repeat(solvedUnits), 'green', useColor),
    colorize('▒'.repeat(scaffoldedUnits), 'yellow', useColor),
    colorize('░'.repeat(remainingUnits), 'dim', useColor),
  ].join('')
}

function renderHeader(title, useColor) {
  const line = '═'.repeat(60)
  return [
    colorize(`\n${line}`, 'cyan', useColor),
    colorize(`  ${title}`, 'cyan', useColor),
    colorize(line, 'cyan', useColor),
    '',
  ]
}

function renderSummary(title, summary, useColor) {
  return [
    colorize(title, 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
    `  ${colorize('Solved'.padEnd(12), 'green', useColor)} ${summary.solved} / ${summary.total}`,
    `  ${colorize('In progress'.padEnd(12), 'yellow', useColor)} ${summary.scaffolded}`,
    `  ${colorize('Remaining'.padEnd(12), 'red', useColor)} ${summary.remaining}`,
    '',
  ]
}

function renderCategoryProgress(state, useColor) {
  const lines = [
    colorize('Algorithm Categories', 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
  ]

  for (const category of state.algorithms.categories) {
    const { solved, scaffolded, remaining, total } = category.summary
    const bar = createProgressBar(solved, scaffolded, total, useColor)

    lines.push(
      `  ${colorize(category.slug.padEnd(24), 'yellow', useColor)} ${String(solved).padStart(2)}/${String(total).padEnd(2)} solved ${bar}  ${scaffolded} active / ${remaining} left`
    )
  }

  lines.push('')
  return lines
}

function renderLanguageCoverage(state, useColor) {
  const lines = [
    colorize('Language Coverage', 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
  ]

  for (const language of state.languages) {
    lines.push(
      `  ${colorize(language.title.padEnd(12), 'blue', useColor)} solved ${String(language.solved).padStart(2)}  active ${String(language.scaffolded).padStart(2)}`
    )
  }

  lines.push('')
  return lines
}

function renderActivityItems(title, items, useColor) {
  const lines = [
    colorize(title, 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
  ]

  if (items.length === 0) {
    lines.push(`  ${colorize('None yet', 'dim', useColor)}`)
    lines.push('')
    return lines
  }

  for (const item of items) {
    const statusIcon =
      item.status === 'solved'
        ? colorize('✓', 'green', useColor)
        : item.status === 'scaffolded'
          ? colorize('●', 'yellow', useColor)
          : colorize('○', 'dim', useColor)

    const trackLabel = item.track === 'algorithms' ? 'Algorithms' : 'Data Structures'
    const locationLabel = item.categoryTitle
      ? `${trackLabel} / ${item.categoryTitle}`
      : trackLabel
    const languageLabel = item.implementations
      .map((implementation) => implementation.language)
      .join(', ') || 'none'

    lines.push(
      `  ${statusIcon} ${colorize(item.title, 'cyan', useColor)} ${colorize(`(${locationLabel})`, 'dim', useColor)} [${languageLabel}]`
    )
  }

  lines.push('')
  return lines
}

function renderDataStructures(state, useColor) {
  const lines = [
    colorize('Data Structures', 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
  ]

  for (const item of state.dataStructures.items) {
    const statusColor = item.status === 'solved' ? 'green' : item.status === 'scaffolded' ? 'yellow' : 'red'
    const languages = item.implementations.map((implementation) => implementation.language).join(', ') || 'none'

    lines.push(
      `  ${colorize(item.title.padEnd(24), statusColor, useColor)} ${item.status.padEnd(10)} [${languages}]`
    )
  }

  lines.push('')
  return lines
}

function renderCatalogNotes(state, useColor) {
  const lines = [
    colorize('Catalog Notes', 'bright', useColor),
    colorize('─'.repeat(50), 'dim', useColor),
  ]

  if (state.discoveredItems.length === 0) {
    lines.push(`  ${colorize('Catalog and filesystem are in sync.', 'green', useColor)}`)
    lines.push('')
    return lines
  }

  lines.push(
    `  ${colorize(`${state.discoveredItems.length} discovered implementation(s) are not tracked in the catalog yet.`, 'yellow', useColor)}`
  )

  for (const item of state.discoveredItems.slice(0, 5)) {
    lines.push(`  - ${item.title} (${item.track})`)
  }

  lines.push('')
  return lines
}

export function renderDashboard(state, { useColor = true } = {}) {
  const lines = []

  lines.push(...renderHeader('DSA Workspace Dashboard', useColor))
  lines.push(...renderSummary('Overall', state.overall, useColor))
  lines.push(...renderSummary('Algorithms', state.algorithms, useColor))
  lines.push(...renderCategoryProgress(state, useColor))
  lines.push(...renderSummary('Data Structure Totals', state.dataStructures, useColor))
  lines.push(...renderDataStructures(state, useColor))
  lines.push(...renderLanguageCoverage(state, useColor))
  lines.push(...renderActivityItems('In Progress', state.activeItems, useColor))
  lines.push(...renderActivityItems('Next Up', state.nextItems, useColor))
  lines.push(...renderActivityItems('Recent Activity', state.recentActivity, useColor))
  lines.push(...renderCatalogNotes(state, useColor))

  return lines.join('\n').trimEnd()
}

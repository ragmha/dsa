import { loadCatalog } from './catalog.js'
import { renderDashboard } from './dashboard.js'
import { runGenerateCommand } from './generate.js'
import { createPrompter } from './prompts.js'
import { scanRepository } from './scanner.js'
import { buildProjectState } from './state.js'

function parseArguments(argv) {
  const flags = {}
  const positionals = []

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]

    if (argument === '--') {
      positionals.push(...argv.slice(index + 1))
      break
    }

    if (argument.startsWith('--')) {
      const [rawFlag, inlineValue] = argument.slice(2).split('=', 2)

      if (inlineValue !== undefined) {
        flags[rawFlag] = inlineValue
        continue
      }

      const nextArgument = argv[index + 1]

      if (nextArgument !== undefined && !nextArgument.startsWith('-')) {
        flags[rawFlag] = nextArgument
        index += 1
        continue
      }

      flags[rawFlag] = true
      continue
    }

    if (argument.startsWith('-') && argument.length > 1) {
      for (const shortFlag of argument.slice(1)) {
        if (shortFlag === 'h') {
          flags.help = true
        }

        if (shortFlag === 'j') {
          flags.json = true
        }
      }

      continue
    }

    positionals.push(argument)
  }

  return {
    command: positionals[0] ?? null,
    positionals: positionals.slice(1),
    flags,
  }
}

function useColor(output, flags) {
  return output.isTTY && !flags['no-color']
}

function loadSnapshot() {
  const catalog = loadCatalog()
  const scanResults = scanRepository()
  const state = buildProjectState(catalog, scanResults)

  return {
    catalog,
    scanResults,
    state,
  }
}

function renderHelp() {
  return `DSA CLI\n\nUsage:\n  dsa [command] [options]\n  node cli.js [command] [options]\n\nCommands:\n  dashboard, status         Show solved, in-progress, and remaining work\n  generate, new            Create starter files for an algorithm or data structure\n  help                     Show this help message\n\nDashboard options:\n  --json                   Print the dashboard data as JSON\n  --no-color               Disable ANSI colors\n\nGenerate options:\n  --track <algorithms|data-structures>\n  --category <slug>        Required for algorithm generation\n  --problem, --name <name> Problem or data-structure name\n  --language <typescript|python>\n\nExamples:\n  npm run cli -- dashboard\n  npm run cli -- generate --track algorithms --category arrays --problem "Common Child" --language typescript\n  npm run cli -- generate --track data-structures --problem "binary-tree" --language python\n`
}

async function runInteractive(io) {
  if (!io.input.isTTY) {
    io.output.write(`${renderHelp()}\n`)
    return 0
  }

  const prompter = createPrompter({ input: io.input, output: io.output })

  try {
    while (true) {
      const selectedAction = await prompter.select('What would you like to do?', [
        { label: 'View the dashboard', value: 'dashboard' },
        { label: 'Generate a new scaffold', value: 'generate' },
        { label: 'Exit', value: 'exit' },
      ])

      if (selectedAction === 'exit') {
        break
      }

      if (selectedAction === 'dashboard') {
        const snapshot = loadSnapshot()
        io.output.write(`\n${renderDashboard(snapshot.state, { useColor: useColor(io.output, {}) })}\n\n`)
        continue
      }

      const snapshot = loadSnapshot()
      const result = await runGenerateCommand({
        parsed: { command: 'generate', positionals: [], flags: {} },
        io,
        snapshot,
        prompter,
      })

      io.output.write(`\n${result.message}\n\n`)
    }
  } finally {
    prompter.close()
  }

  return 0
}

export async function runCli(argv = process.argv.slice(2), io = {}) {
  const resolvedIo = {
    input: io.input ?? process.stdin,
    output: io.output ?? process.stdout,
    error: io.error ?? process.stderr,
  }

  const parsed = parseArguments(argv)

  if (parsed.flags.help || ['help', '--help'].includes(parsed.command)) {
    resolvedIo.output.write(`${renderHelp()}\n`)
    return 0
  }

  if (!parsed.command) {
    return runInteractive(resolvedIo)
  }

  if (['dashboard', 'status'].includes(parsed.command)) {
    const snapshot = loadSnapshot()

    if (parsed.flags.json) {
      resolvedIo.output.write(`${JSON.stringify(snapshot.state, null, 2)}\n`)
      return 0
    }

    resolvedIo.output.write(
      `${renderDashboard(snapshot.state, {
        useColor: useColor(resolvedIo.output, parsed.flags),
      })}\n`
    )
    return 0
  }

  if (['generate', 'new'].includes(parsed.command)) {
    const snapshot = loadSnapshot()
    const result = await runGenerateCommand({
      parsed,
      io: resolvedIo,
      snapshot,
    })

    resolvedIo.output.write(`${result.message}\n`)
    return 0
  }

  throw new Error(`Unknown command: ${parsed.command}`)
}

#!/usr/bin/env node

import { runCli } from './src/cli/index.js'

function ignoreBrokenPipe(stream) {
  stream.on('error', (error) => {
    if (error?.code === 'EPIPE') {
      process.exit(0)
    }

    throw error
  })
}

ignoreBrokenPipe(process.stdout)
ignoreBrokenPipe(process.stderr)

try {
  await runCli(process.argv.slice(2))
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`CLI error: ${message}`)
  process.exitCode = 1
}

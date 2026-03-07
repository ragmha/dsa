import readline from 'readline/promises'

export function createPrompter({ input, output }) {
  const rl = readline.createInterface({ input, output })

  return {
    async ask(message, { defaultValue = '' } = {}) {
      const suffix = defaultValue ? ` (${defaultValue})` : ''
      const answer = await rl.question(`${message}${suffix}: `)
      return answer.trim() || defaultValue
    },

    async select(message, options) {
      if (!Array.isArray(options) || options.length === 0) {
        throw new Error(`No options are available for: ${message}`)
      }

      output.write(`\n${message}\n`)
      options.forEach((option, index) => {
        output.write(`  ${index + 1}. ${option.label}\n`)
      })

      while (true) {
        const answer = await rl.question(`Choose [1-${options.length}]: `)
        const selectedIndex = Number.parseInt(answer, 10)

        if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= options.length) {
          return options[selectedIndex - 1].value
        }

        output.write('Please enter one of the listed numbers.\n')
      }
    },

    async confirm(message, { defaultValue = true } = {}) {
      const hint = defaultValue ? 'Y/n' : 'y/N'

      while (true) {
        const answer = (await rl.question(`${message} [${hint}]: `)).trim().toLowerCase()

        if (!answer) {
          return defaultValue
        }

        if (['y', 'yes'].includes(answer)) {
          return true
        }

        if (['n', 'no'].includes(answer)) {
          return false
        }

        output.write('Please answer yes or no.\n')
      }
    },

    close() {
      rl.close()
    },
  }
}

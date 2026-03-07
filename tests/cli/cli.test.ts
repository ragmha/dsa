import fs from 'fs'
import os from 'os'
import path from 'path'
import { spawnSync } from 'child_process'

const repoRoot = path.resolve(__dirname, '../..')
const cliPath = path.join(repoRoot, 'cli.js')
const tempRoots: string[] = []

function writeFile(targetPath: string, content: string) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, content)
}

function createTempProject(catalog: unknown) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'dsa-cli-'))
  tempRoots.push(tempRoot)

  writeFile(path.join(tempRoot, 'readme.md'), '# temp project\n')
  writeFile(
    path.join(tempRoot, 'src', 'cli', 'problem-catalog.json'),
    `${JSON.stringify(catalog, null, 2)}\n`
  )
  fs.mkdirSync(path.join(tempRoot, 'src', 'algorithms'), { recursive: true })
  fs.mkdirSync(path.join(tempRoot, 'src', 'data-structures'), { recursive: true })

  return tempRoot
}

function runCli(tempRoot: string, args: string[]) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      DSA_CLI_ROOT: tempRoot,
      DSA_CLI_CATALOG_PATH: path.join(tempRoot, 'src', 'cli', 'problem-catalog.json'),
    },
    encoding: 'utf8',
  })
}

afterEach(() => {
  while (tempRoots.length > 0) {
    fs.rmSync(tempRoots.pop() as string, { recursive: true, force: true })
  }
})

describe('CLI integration', () => {
  it('renders dashboard JSON with solved, scaffolded, and remaining counts', () => {
    const tempRoot = createTempProject({
      version: 1,
      tracks: {
        algorithms: {
          title: 'Algorithms',
          categories: [
            {
              slug: 'arrays',
              title: 'Arrays',
              items: [
                { slug: 'solved-problem', title: 'Solved Problem', tags: ['Arrays'] },
                {
                  slug: 'in-progress-problem',
                  title: 'In Progress Problem',
                  tags: ['Arrays'],
                },
                {
                  slug: 'remaining-problem',
                  title: 'Remaining Problem',
                  tags: ['Arrays'],
                },
              ],
            },
          ],
        },
        'data-structures': {
          title: 'Data Structures',
          items: [{ slug: 'stack', title: 'Stack' }],
        },
      },
    })

    writeFile(
      path.join(
        tempRoot,
        'src',
        'algorithms',
        'arrays',
        'solved-problem',
        'solved-problem.ts'
      ),
      "export function solvedProblem() {\n  return 'done'\n}\n"
    )
    writeFile(
      path.join(
        tempRoot,
        'src',
        'algorithms',
        'arrays',
        'in-progress-problem',
        'in-progress-problem.ts'
      ),
      "/**\n * @dsa-cli-status scaffold\n */\nexport function inProgressProblem() {\n  throw new Error('Not implemented')\n}\n"
    )
    writeFile(
      path.join(tempRoot, 'src', 'data-structures', 'stack', 'stack.ts'),
      'export default class Stack {}\n'
    )

    const result = runCli(tempRoot, ['dashboard', '--json'])

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')

    const payload = JSON.parse(result.stdout)

    expect(payload.overall).toEqual({
      total: 4,
      solved: 2,
      scaffolded: 1,
      remaining: 1,
    })
    expect(payload.algorithms.solved).toBe(1)
    expect(payload.algorithms.scaffolded).toBe(1)
    expect(payload.algorithms.remaining).toBe(1)
    expect(payload.dataStructures.solved).toBe(1)
  })

  it('generates a TypeScript algorithm scaffold and tracks it in the catalog', () => {
    const tempRoot = createTempProject({
      version: 1,
      tracks: {
        algorithms: {
          title: 'Algorithms',
          categories: [{ slug: 'arrays', title: 'Arrays', items: [] }],
        },
        'data-structures': {
          title: 'Data Structures',
          items: [],
        },
      },
    })

    const result = runCli(tempRoot, [
      'generate',
      '--track',
      'algorithms',
      '--category',
      'arrays',
      '--problem',
      'Fresh Problem',
      '--language',
      'typescript',
    ])

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')
    expect(result.stdout).toContain('Scaffold created successfully.')

    const solutionPath = path.join(
      tempRoot,
      'src',
      'algorithms',
      'arrays',
      'fresh-problem',
      'fresh-problem.ts'
    )
    const testPath = path.join(
      tempRoot,
      'src',
      'algorithms',
      'arrays',
      'fresh-problem',
      'fresh-problem.spec.ts'
    )

    expect(fs.existsSync(solutionPath)).toBe(true)
    expect(fs.existsSync(testPath)).toBe(true)
    expect(fs.readFileSync(solutionPath, 'utf8')).toContain('@dsa-cli-status scaffold')

    const catalog = JSON.parse(
      fs.readFileSync(path.join(tempRoot, 'src', 'cli', 'problem-catalog.json'), 'utf8')
    )
    expect(catalog.tracks.algorithms.categories[0].items).toEqual([
      {
        slug: 'fresh-problem',
        title: 'Fresh Problem',
        tags: ['Arrays'],
      },
    ])
  })

  it('generates a Python data-structure scaffold and adds it to the catalog', () => {
    const tempRoot = createTempProject({
      version: 1,
      tracks: {
        algorithms: {
          title: 'Algorithms',
          categories: [],
        },
        'data-structures': {
          title: 'Data Structures',
          items: [],
        },
      },
    })

    const result = runCli(tempRoot, [
      'generate',
      '--track',
      'data-structures',
      '--problem',
      'Binary Tree',
      '--language',
      'python',
    ])

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')

    const solutionPath = path.join(
      tempRoot,
      'src',
      'data-structures',
      'binary-tree',
      'binary_tree.py'
    )
    const testPath = path.join(
      tempRoot,
      'src',
      'data-structures',
      'binary-tree',
      'test_binary_tree.py'
    )

    expect(fs.existsSync(solutionPath)).toBe(true)
    expect(fs.existsSync(testPath)).toBe(true)
    expect(fs.readFileSync(solutionPath, 'utf8')).toContain('@dsa-cli-status scaffold')

    const catalog = JSON.parse(
      fs.readFileSync(path.join(tempRoot, 'src', 'cli', 'problem-catalog.json'), 'utf8')
    )
    expect(catalog.tracks['data-structures'].items).toEqual([
      {
        slug: 'binary-tree',
        title: 'Binary Tree',
      },
    ])
  })
})

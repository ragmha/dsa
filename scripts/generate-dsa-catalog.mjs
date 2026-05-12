import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const readmePath = path.join(repoRoot, 'readme.md');
const outputPath = path.join(repoRoot, 'docs', 'dsa-catalog.json');
const repositoryBaseUrl = 'https://github.com/ragmha/dsa/blob/main';

const tagAliases = new Map([['Baktracking', 'Backtracking']]);

const normalizeWhitespace = (value) =>
  value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

const stripMarkdown = (value) =>
  normalizeWhitespace(value.replace(/`/g, '').replace(/&nbsp;/gi, ' '));

const slugify = (value) =>
  stripMarkdown(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseTableRows = (readme, heading) => {
  const start = readme.indexOf(heading);

  if (start === -1) {
    throw new Error(`Could not find ${heading} section in readme.md`);
  }

  const remaining = readme.slice(start).split('\n');
  const rows = [];

  for (const line of remaining) {
    if (!line.trim().startsWith('|')) {
      if (rows.length > 0) {
        break;
      }

      continue;
    }

    const cells = line
      .trim()
      .slice(1, -1)
      .split('|')
      .map((cell) => normalizeWhitespace(cell));

    const isHeader = cells.some((cell) => /^-+$/.test(cell.replace(/\s/g, '')));
    const hasNamedHeader = cells.includes('Name');

    if (!isHeader && !hasNamedHeader) {
      rows.push(cells);
    }
  }

  return rows;
};

const parseTags = (cell) => {
  const matches = [...cell.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  const rawTags = matches.length > 0 ? matches : cell.split(',');

  return rawTags
    .map(stripMarkdown)
    .filter(Boolean)
    .map((tag) => tagAliases.get(tag) ?? tag);
};

const parseLinks = (cell) =>
  [...cell.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => {
    const label = stripMarkdown(match[1]);
    const sourcePath = normalizeWhitespace(match[2]).replace(/^['"]|['"]$/g, '');
    const repositoryPath = sourcePath.replace(/^\.\//, '');

    return {
      label,
      sourcePath,
      href: `${repositoryBaseUrl}/${repositoryPath}`,
    };
  });

const toAlgorithmItems = (rows) =>
  rows.map(([nameCell, tagsCell, solutionCell = '']) => {
    const name = stripMarkdown(nameCell);
    const tags = parseTags(tagsCell);
    const links = parseLinks(solutionCell);

    return {
      id: `algorithm-${slugify(name)}`,
      name,
      tags,
      status: links.length > 0 ? 'implemented' : 'pending',
      links,
    };
  });

const toDataStructureItems = (rows) =>
  rows.map(([nameCell, solutionCell = '']) => {
    const name = stripMarkdown(nameCell);
    const links = parseLinks(solutionCell);

    return {
      id: `data-structure-${slugify(name)}`,
      name,
      status: links.length > 0 ? 'implemented' : 'pending',
      links,
    };
  });

const groupAlgorithmsByTag = (items) => {
  const categoriesByName = new Map();

  for (const item of items) {
    for (const tag of item.tags) {
      if (!categoriesByName.has(tag)) {
        categoriesByName.set(tag, []);
      }

      categoriesByName.get(tag).push(item);
    }
  }

  return [...categoriesByName.entries()]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([name, categoryItems]) => ({
      id: `category-${slugify(name)}`,
      name,
      total: categoryItems.length,
      implemented: categoryItems.filter((item) => item.status === 'implemented')
        .length,
      items: categoryItems.sort((first, second) => first.name.localeCompare(second.name)),
    }));
};

const summarize = (items) => ({
  total: items.length,
  implemented: items.filter((item) => item.status === 'implemented').length,
  pending: items.filter((item) => item.status === 'pending').length,
});

const readme = await readFile(readmePath, 'utf8');
const algorithmItems = toAlgorithmItems(parseTableRows(readme, '## Algorithms'));
const dataStructureItems = toDataStructureItems(
  parseTableRows(readme, '## Data-Structures'),
);

const catalog = {
  source: 'readme.md',
  repositoryBaseUrl,
  algorithms: {
    ...summarize(algorithmItems),
    categories: groupAlgorithmsByTag(algorithmItems),
    items: algorithmItems,
  },
  dataStructures: {
    ...summarize(dataStructureItems),
    items: dataStructureItems.sort((first, second) =>
      first.name.localeCompare(second.name),
    ),
  },
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(
  `Generated ${path.relative(repoRoot, outputPath)} with ` +
    `${catalog.algorithms.total} algorithms and ` +
    `${catalog.dataStructures.total} data structures.`,
);

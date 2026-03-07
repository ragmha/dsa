import { SCAFFOLD_MARKER } from './constants.js'
import {
  getPythonModuleName,
  toClassName,
  toFunctionName,
  toPythonFunctionName,
} from './normalize.js'

function buildAlgorithmTypeScriptTemplate({ itemTitle, categoryTitle, itemSlug }) {
  const functionName = toFunctionName(itemSlug)

  return {
    solution: `/**\n * ${SCAFFOLD_MARKER}\n * Problem: ${itemTitle}\n * Category: ${categoryTitle}\n *\n * Add the original prompt, constraints, and example cases here.\n * Remove the scaffold marker above when the solution is implemented.\n */\nexport function ${functionName}(...args: unknown[]): unknown {\n  throw new Error('Not implemented')\n}\n`,
    test: `import { ${functionName} } from './${itemSlug}'\n\ndescribe('${itemTitle}', () => {\n  it.skip('wires up the starter implementation', () => {\n    expect(typeof ${functionName}).toBe('function')\n  })\n\n  it.todo('replace this placeholder with the official sample case')\n})\n`,
  }
}

function buildAlgorithmPythonTemplate({ itemTitle, categoryTitle, itemSlug }) {
  const functionName = toPythonFunctionName(itemSlug)
  const moduleName = getPythonModuleName(itemSlug)

  return {
    solution: `\"\"\"\n${SCAFFOLD_MARKER}\nProblem: ${itemTitle}\nCategory: ${categoryTitle}\n\nAdd the original prompt, constraints, and example cases here.\nRemove the scaffold marker above when the solution is implemented.\n\"\"\"\n\n\ndef ${functionName}(*args):\n    raise NotImplementedError('Not implemented')\n`,
    test: `import pytest\nfrom ${moduleName} import ${functionName}\n\n\n@pytest.mark.skip(reason='Replace this placeholder with the official sample case')\ndef test_${functionName}_is_wired():\n    assert callable(${functionName})\n`,
  }
}

function buildDataStructureTypeScriptTemplate({ itemTitle, itemSlug }) {
  const className = toClassName(itemSlug)

  return {
    solution: `/**\n * ${SCAFFOLD_MARKER}\n * Data structure: ${itemTitle}\n *\n * Add notes about the API, invariants, and sample operations here.\n * Remove the scaffold marker above when the implementation is complete.\n */\nexport default class ${className}<T = unknown> {\n  constructor() {}\n}\n`,
    test: `import ${className} from '../${itemSlug}'\n\ndescribe('${itemTitle}', () => {\n  it.skip('creates a starter instance', () => {\n    expect(new ${className}()).toBeInstanceOf(${className})\n  })\n\n  it.todo('replace this placeholder with behavior-driven tests')\n})\n`,
  }
}

function buildDataStructurePythonTemplate({ itemTitle, itemSlug }) {
  const className = toClassName(itemSlug)
  const moduleName = getPythonModuleName(itemSlug)

  return {
    solution: `\"\"\"\n${SCAFFOLD_MARKER}\nData structure: ${itemTitle}\n\nAdd notes about the API, invariants, and sample operations here.\nRemove the scaffold marker above when the implementation is complete.\n\"\"\"\n\n\nclass ${className}:\n    def __init__(self):\n        raise NotImplementedError('Not implemented')\n`,
    test: `import pytest\nfrom ${moduleName} import ${className}\n\n\n@pytest.mark.skip(reason='Replace this placeholder with behavior-driven tests')\ndef test_${moduleName}_is_wired():\n    assert ${className} is not None\n`,
  }
}

export function buildTemplateSet(request) {
  if (request.track === 'algorithms' && request.language === 'typescript') {
    return buildAlgorithmTypeScriptTemplate(request)
  }

  if (request.track === 'algorithms' && request.language === 'python') {
    return buildAlgorithmPythonTemplate(request)
  }

  if (request.track === 'data-structures' && request.language === 'typescript') {
    return buildDataStructureTypeScriptTemplate(request)
  }

  return buildDataStructurePythonTemplate(request)
}

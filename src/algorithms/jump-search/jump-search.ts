/*
 * Similar to Binary Search for searching sorted arrays
 * Check Fewer Elements (than linear search) jumping ahead by fixed steps
 * Or Skipping some elements in place of searching all elements
 *
 * Time Complexity O(√n)
 * @see https://en.wikipedia.org/wiki/Jump_search
 */

import Comparator from '../../data-structures/utils/comparator'

export function jumpSearch(
  sortedArray: number[],
  seekElement: number,
  comparatorCallback?: Function
): number {
  const comparator = new Comparator(comparatorCallback)
  const arraySize = sortedArray.length

  if (!arraySize) {
    return -1
  }

  // Calculate optimal jump size
  // Total number of comparison in worst case be ((arraySize/jumpSize) + jumpSize -1)
  // Value of function  ((arraySize/jumpSize) + jumpSize -1) will be minimum
  // when jumpsize = √array.length
  const jumpSize = Math.floor(Math.sqrt(arraySize))

  // Find the block where the seekElement belongs to
  let blockStart = 0
  let blockEnd = jumpSize

  while (
    comparator.greaterThan(
      seekElement,
      sortedArray[Math.min(blockEnd, arraySize) - 1]
    )
  ) {
    // Jump to the next block
    blockStart = blockEnd
    blockEnd += jumpSize

    // If our next block is out of array then we couldn't find the element
    if (blockStart > arraySize) {
      return -1
    }
  }

  // Do linear search for seekElement is subArray starting from blockStart
  let currentIndex = blockStart
  while (currentIndex < Math.min(blockEnd, arraySize)) {
    if (comparator.equal(sortedArray[currentIndex], seekElement)) {
      return currentIndex
    }

    currentIndex += 1
  }

  return -1
}

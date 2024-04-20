import Comparator from '../utils/comparator'

export default class Heap<T> {
  public heapContainer: T[]
  public compare: Comparator<T>

  constructor(comparatorFunction?: Function) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instances directly')
    }

    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2
  }

  getParentIndex(childIndex: number) {
    /* Math.floor - Returns the greatest integer less than or equal to its numeric argument. */
    return Math.floor((childIndex - 1) / 2)
  }

  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0
  }

  hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  swap(indexOne: number, indexTwo: number) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  pool() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]

    this.heapContainer[0] = this.heapContainer.pop() as T
    this.heapifyDown()

    return item
  }

  add(item: T) {
    this.heapContainer.push(item)
    this.heapifyUp()
    return this
  }

  remove(item: T, comparator = this.compare) {
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      const indexToRemove = this.find(item, comparator).pop()!

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop()!

        const parentItem = this.parent(indexToRemove)

        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairsIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }

  find(item: T, comparator = this.compare) {
    const foundItemIndices = []

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  isEmpty() {
    return !this.heapContainer.length
  }

  toString() {
    return this.heapContainer.toString()
  }

  heapifyUp(customStartIndex = 0) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairsIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairsIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (
        this.pairsIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  pairsIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
    throw new Error(
      `You have to implement heap pair comparison method for ${firstElement} and ${secondElement} values`
    )
    return false
  }
}

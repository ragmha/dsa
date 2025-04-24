import Heap from './heap'

export default class MaxHeap<T> extends Heap<T> {
  pairsIsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement)
  }
}

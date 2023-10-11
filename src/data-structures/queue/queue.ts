import LinkedList from '../linked-list/linked-list'

export default class Queue<T> {
  constructor(public linkedList: LinkedList<T> = new LinkedList()) {}

  isEmpty(): boolean {
    return !this.linkedList.head
  }

  // Read the element at the front of the queue
  peek(): T | undefined | null {
    if (this.isEmpty()) {
      return null
    }

    return this.linkedList.head?.value
  }

  // Add element to the end of queue (the tail of the linked list)
  enqueue(value: T): void {
    this.linkedList.append(value)
  }

  // Remove the element at the front of queue (the head of the linked list)
  dequeue(): T | null {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  // String representation of the queue's linked list
  toString(callback?: (value: T) => string) {
    return this.linkedList.toString(callback)
  }
}

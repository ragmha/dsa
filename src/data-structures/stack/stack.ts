import LinkedList from '../linked-list/linked-list'

export default class Stack<T> {
  constructor(public linkedList: LinkedList<T> = new LinkedList()) {}

  isEmpty(): boolean {
    // Stack is empty if its linked list doesn't have a head
    return !this.linkedList.head
  }

  peek(): T | undefined | null {
    if (this.isEmpty()) {
      // If the linked is empty there is nothing to peek from
      return null
    }

    // Read the value from the start of linked list
    return this.linkedList.head?.value
  }

  push(value: T) {
    // Add the new value at the start of the linked list
    this.linkedList.prepend(value)
  }

  pop(): T | null {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  toArray(): T[] {
    return this.linkedList.toArray().map((linkListNode) => linkListNode.value)
  }

  toString(callback?: (value: T) => string): string {
    return this.linkedList.toString(callback)
  }
}

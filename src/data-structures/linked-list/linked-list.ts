import Comparator from '../utils/comparator'
import Node from './node'

export default class LinkedList<T> {
  public head: Node<T> | null
  public tail: Node<T> | null
  public compare: Comparator<T>

  constructor(comparatorFunction?: Function) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  prepend(value: T): LinkedList<T> {
    const newNode = new Node(value, this.head)
    this.head = newNode

    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  append(value: T): LinkedList<T> {
    const newNode = new Node(value)

    // Create a new node to head, if no head is available
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of the linked list
    if (this.tail) {
      this.tail.next = newNode
      this.tail = newNode
    }

    return this
  }

  insert(value: T, rawIndex: number): LinkedList<T> {
    const index = rawIndex < 0 ? 0 : rawIndex

    if (index === 0) {
      this.prepend(value)
    } else {
      let count = 1
      let currentNode = this.head
      const newNode = new Node(value)

      while (currentNode) {
        if (count === index) break
        currentNode = currentNode.next
        count += 1
      }

      if (currentNode) {
        newNode.next = currentNode.next
        currentNode.next = newNode
      } else {
        if (this.tail) {
          this.tail.next = newNode
          this.tail = newNode
        } else {
          this.head = newNode
          this.tail = newNode
        }
      }
    }

    return this
  }

  delete(value: T): Node<T> | null {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // If head is deleted, make the next head the new head
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // If next node must be deleted make the next node to be the next next one
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // Check if tail must be deleted
    if (this.tail && this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  find({
    value = undefined,
    callback = undefined,
  }: {
    value?: T | undefined
    callback?: Function | undefined
  }): Node<T> | null {
    if (!this.head) {
      return null
    }

    let currentNode: Node<T> | null = this.head

    while (currentNode) {
      // If callback is specified then try to find node via callback
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // If value is specified then try to compare by value
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  deleteTail(): Node<T> | null {
    const deleteTail = this.tail

    if (this.head === this.tail) {
      // there is only 1 node in linked list
      this.head = null
      this.tail = null

      return deleteTail
    }

    // If there are many nodes in the linked list
    // rewind to the last node and delete next link for the node before the last one
    let currentNode = this.head

    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deleteTail
  }

  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value))

    return this
  }

  toArray(): Node<T>[] {
    const nodes = []
    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString()
  }

  reverse(): LinkedList<T> {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store the next node
      nextNode = currNode.next

      // Change next node of the current node so it would link to the previous node
      currNode.next = prevNode

      // Move prevNode and currNode nodes one step forward
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail
    this.tail = this.head
    this.head = prevNode

    return this
  }
}

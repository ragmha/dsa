import Comparator from '../utils/comparator'
import DoubleNode from './double-node'

export default class DoublyLinkedList<T> {
  public head: DoubleNode<T> | null
  public tail: DoubleNode<T> | null
  public compare: Comparator<T>

  constructor(comparatorFuction?: Function) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFuction)
  }

  prepend(value: T): DoublyLinkedList<T> {
    // Make new node to be a head
    const newNode = new DoubleNode(value, this.head)

    // If there is a head, make the previous reference to be a new node ( new node)
    if (this.head) {
      this.head.previous = newNode
    }

    this.head = newNode

    // If there is no tail yet let's make new node a tail
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  append(value: T): DoublyLinkedList<T> {
    const newNode = new DoubleNode(value)

    // If there is no head yet let's make a new node a head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of linked list
    if (this.tail?.next) {
      this.tail.next = newNode
    }

    // Attach current tail to the new node's previous reference
    newNode.previous = this.tail

    // Set new node to be the tail of linked list
    this.tail = newNode

    return this
  }

  delete(value: T): DoubleNode<T> | null {
    if (!this.head) {
      return null
    }

    let deletedNode = null
    let currentNode: DoubleNode<T> | null = this.head

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode

        if (deletedNode === this.head) {
          //  If HEAD is going to be deleted Set head to second node, which will become new head.
          this.head = deletedNode.next

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null
          }

          // If all the nodes in list has same value that is passed as argument
          // then all nodes will get deleted, therefore tail needs to be updated.
          if (deletedNode === this.tail) {
            this.tail = null
          }
        } else if (deletedNode === this.tail) {
          //  If TAIL is going to be deleted Set tail to second last node, which will become new tail.
          this.tail = deletedNode.previous

          if (this.tail?.next) {
            this.tail.next = null
          }
        } else {
          // If MIDDLE node is going to be deleted
          const previousNode = deletedNode.previous
          const nextNode = deletedNode.next

          if (previousNode?.next) {
            previousNode.next = nextNode
          }

          if (nextNode?.previous) {
            nextNode.previous = previousNode
          }
        }
      }

      currentNode = currentNode.next
    }

    return deletedNode
  }

  find({
    value = undefined,
    callback = undefined,
  }: {
    value?: T
    callback?: Function
  }): DoubleNode<T> | null {
    if (!this.head) {
      return null
    }

    let currentNode: DoubleNode<T> | null = this.head

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  deleteTail(): DoubleNode<T> | null {
    if (!this.tail) {
      return null
    }

    const deleteHead = this.head

    if (this.head?.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deleteHead
  }

  deleteHead(): DoubleNode<T> | null {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  toArray(): DoubleNode<T>[] {
    const nodes = []

    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  fromArray(values: T[]): DoublyLinkedList<T> {
    values.forEach((value) => this.append(value))
    return this
  }

  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString()
  }

  reverse(): DoublyLinkedList<T> {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null

    while (currentNode) {
      nextNode = currentNode.next
      prevNode = currentNode.previous

      // Change next node of current node so it would link to previous node
      currentNode.next = prevNode
      currentNode.previous = nextNode

      // Mode prevNode and currNode nodes on step forward
      prevNode = currentNode
      currentNode = nextNode
    }

    // Reset head and tail
    this.tail = this.head
    this.head = prevNode

    return this
  }
}

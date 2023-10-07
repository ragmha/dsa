// Hash table size directly affects on the number of collisions

import LinkedList from '../linked-list/linked-list'
import Node from '../linked-list/node'

// Bigger Hash table size, lesser the collision
const defaultHashTableSize = 32

export default class HashTabl<T> {
  public buckets: LinkedList<{ key: string; value: T }>[]
  public keys: Record<string, number>

  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())

    // To keep track of all actual keys
    this.keys = {}
  }

  // Convert key strings to hash number
  hash(key: string): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    )

    // Reduce hash number so it would fit hash table size
    return hash % this.buckets?.length
  }

  set(key: string, value: T): void {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: (nodeValue: { key: string }) => nodeValue.key === key,
    })

    if (!node) {
      // Insert new node
      bucketLinkedList.append({ key, value })
    } else {
      // Update value of existing node
      node.value.value = value
    }
  }

  delete(key: string): Node<{ key: string; value: T }> | null {
    const keyHash = this.hash(key)
    delete this.keys[key]

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: (nodeValue: { key: string }) => nodeValue.key === key,
    })

    if (node) {
      return bucketLinkedList.delete(node.value)
    }

    return null
  }

  get(key: string): T | undefined {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: (nodeValue: { key: string }) => nodeValue.key === key,
    })

    return node ? node.value.value : undefined
  }

  has(key: string): boolean {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  getKeys() {
    return Object.keys(this.keys)
  }
  // Get List of all stored values in the hash table
  getValues() {
    return this.buckets.reduce((values: T[], bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value)
      return [...values, ...bucketValues]
    }, [])
  }
}

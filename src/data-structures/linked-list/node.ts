export default class Node<T> {
  public value: T
  public next: Node<T> | null = null

  constructor(value: T, next: Node<T> | null = null) {
    this.value = value
    this.next = next
  }

  toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

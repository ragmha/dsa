export default class DoubleNode<T> {
  constructor(
    public value: T,
    public next: DoubleNode<T> | null = null,
    public previous: DoubleNode<T> | null = null
  ) {}

  toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

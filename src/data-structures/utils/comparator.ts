export default class Comparator<T> {
  public compare: Function

  /**
   *
   * @param compareFunction {function(a: *, b: *)}
   */
  constructor(compareFunction?: Function) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers
   * refer: https://www.typescriptlang.org/docs/handbook/classes.html#static-properties
   */
  static defaultCompareFunction(
    a: string | number,
    b: string | number
  ): number {
    if (a === b) return 0
    return a < b ? -1 : 1
  }

  /**
   * Checks if two variables are equal.
   */
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * Checks if variable "a" is less than "b"
   */
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0
  }

  /**
   * Checks if variable "a" is greater than "b"
   */
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0
  }

  /**
   * Checks if variable "a" is less than or equal "b"
   */
  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * Checks if variable "a" is greater than or equal to "b"
   */
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * Reverses the comparison order
   */
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a: T, b: T) => compareOriginal(b, a)
  }
}

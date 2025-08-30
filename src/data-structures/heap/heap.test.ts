import Heap from './heap'

describe('Heap', () => {
  it('should not allow creating an instance directly', () => {
    const instantiateHeap = () => {
      const heap = new Heap()
      heap.add(1)
    }

    expect(instantiateHeap).toThrowError()
  })
})

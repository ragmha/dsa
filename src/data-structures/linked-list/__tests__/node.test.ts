import Node from '../node'

describe('Node', () => {
  it('should create list node with value', () => {
    const node = new Node(1)

    expect(node.value).toBe(1)
    expect(node.next).toBeNull()
  })

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new Node(nodeValue)

    expect(node.value.value).toBe(1)
    expect(node.value.key).toBe('test')
    expect(node.next).toBeNull()
  })

  it('should link nodes together', () => {
    const node2 = new Node(2)
    const node1 = new Node(1, node2)

    expect(node1.next).toBeDefined()
    expect(node2.next).toBeNull()
    expect(node1.value).toBe(1)
    expect(node1.next?.value).toBe(2)
  })

  it('should convert node to string', () => {
    const node = new Node(1)

    expect(node.toString()).toBe('1')

    node.value = 'hello world' as any

    expect(node.toString()).toBe('hello world')
  })

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new Node(nodeValue)
    const toStringCallback = (value: { value: string; key: string }) =>
      `value: ${value.value}, key: ${value.key}`

    expect(node.toString(toStringCallback as any)).toBe('value: 1, key: test')
  })
})

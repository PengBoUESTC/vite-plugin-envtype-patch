import { TypeConvert } from '../lib/index';

describe('nest test', () => {
  const typeConvert = new TypeConvert({ })
  test('nest test', () => {
    typeConvert.genSimpleType({
      a: 100,
      b: ''
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('nest test', () => {
    typeConvert.genSimpleType({
      a: 100,
      b: '',
      c: { d: false },
      e: [1, '', false, { f: { z: null }}]
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
})
import { TypeConvert } from '../lib/index';

describe('edge test', () => {
  const typeConvert = new TypeConvert({ once: false })
  test('once to be false', () => {
    typeConvert.genSimpleType({
      a: 100,
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).not.toBe('')
  })
  test('function type', () => {
    typeConvert.reset()
    typeConvert.genSimpleType({
      a: () => {},
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).not.toBe('')
  })
})
import { TypeConvert } from '../lib/index';

describe('base test', () => {
  const typeConvert = new TypeConvert({ })
  test('base number', () => {
    typeConvert.genSimpleType({
      a: 100,
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('base string', () => {
    typeConvert.genSimpleType({
      a: '100',
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('empty string', () => {
    typeConvert.genSimpleType({
      a: '',
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('base boolean', () => {
    typeConvert.genSimpleType({
      a: false,
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('base null', () => {
    typeConvert.genSimpleType({
      a: null,
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
  test('base undefind', () => {
    typeConvert.genSimpleType({
      a: undefined,
    })
    expect(`${typeConvert}`).toMatchSnapshot()
    expect(`${typeConvert}`).toBe("")
  })
})
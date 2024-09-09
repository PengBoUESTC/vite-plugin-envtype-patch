import { writeFile } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

import { type ResolvedConfig, type Plugin } from 'vite'

interface GenOptions {
  once?: boolean
  fuzzyType?: boolean
}
export interface PatchConfig {
  patchKey: string
  fileName: string
  genOptions: GenOptions
}

const toString = (ctx: any) => Object.prototype.toString.call(ctx)
const PrimitiveMap: Record<string, string> = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Undefined: 'undefined',
  Symbol: 'symbol',
  Null: 'null',
  BigInt: 'number',
}

const ReferenceType: Record<string, string> = {
  Array: 'Array',
  Object: 'object',
}

const DefaultType = 'any'

export class TypeConvert {
  private output: string
  public options: GenOptions

  constructor(options: GenOptions = {}) {
    this.output = ''
    this.options = options
  }

  toString() {
    const output = this.output
    const { once = true } = this.options
    if (once) {
      this.reset()
    }
    return output
  }

  print(s: string) {
    this.output = this.output + s
    return this
  }

  reset() {
    this.output = ''
    return this
  }
  genSimpleType(value: any, level = 1) {
    const { fuzzyType = true } = this.options
    const typeString = toString(value).slice(8, -1)
    const primitiveType = PrimitiveMap[typeString]
    if (primitiveType) {
      this.print(' ')
        .print(fuzzyType ? primitiveType : JSON.stringify(value))
        .print(',')
        .print('\n')
      return
    }

    const referenceType = ReferenceType[typeString]

    if (!referenceType) {
      this.print(' ').print(DefaultType).print('\n')
      return
    }

    if (referenceType === ReferenceType.Array) {
      this.print('[').print('\n')
      value.forEach((v: any) => {
        this.print('\t'.repeat(level)).genSimpleType(v, level + 1)
      })
      this.print('\t'.repeat(level - 1))
        .print(']')
        .print('\n')
      return
    }

    if (referenceType === ReferenceType.Object) {
      this.print('{').print('\n')
      Object.entries(value).forEach(([key, value]) => {
        this.print('\t'.repeat(level))
          .print(key)
          .print(':')
          .genSimpleType(value, level + 1)
      })
      this.print('\t'.repeat(level - 1))
        .print('}')
        .print('\n')
    }
  }
}

export const envTypePatch = (config?: Partial<PatchConfig>): Plugin => {
  const {
    patchKey = 'ImportMetaEnv',
    fileName = 'env.d.ts',
    genOptions,
  } = config || {}
  const targetPath = join(cwd(), fileName)

  return {
    name: 'vite-plugin-envtype-patch',
    apply: 'serve',
    configResolved(resolvedConfig: ResolvedConfig) {
      const { env } = resolvedConfig
      const typeConvert = new TypeConvert(genOptions)
      typeConvert
        .print(`/// <reference types="vite/client" /> \ninterface ${patchKey} `)
        .genSimpleType(env)

      writeFile(
        targetPath,
        `${typeConvert}`,
        {
          flag: 'w+',
        },
        (error) => {
          if (error) {
            console.error(`${targetPath} write failed`, error)
          }
        },
      )
    },
  }
}

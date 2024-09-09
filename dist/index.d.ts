import { type Plugin } from 'vite'
interface GenOptions {
  fuzzyType?: boolean
}
export interface PatchConfig {
  patchKey: string
  fileName: string
  genOptions: GenOptions
}
export declare class TypeConvert {
  private output
  options: GenOptions
  constructor(options?: GenOptions)
  toString(): string
  print(s: string): this
  reset(): this
  genSimpleType(value: any, level?: number): void
}
export declare const envTypePatch: (config?: Partial<PatchConfig>) => Plugin
export {}

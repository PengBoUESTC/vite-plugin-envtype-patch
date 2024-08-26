import { writeFile } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

import { type ResolvedConfig } from 'vite'
// @ts-ignore
import { generateIdentifierDeclarationFile } from 'dts-gen'

export interface PatchConfig {
  patchKey: string
  fileName: string
}

export const envTypePatch = (config?: Partial<PatchConfig>) => {
  const { patchKey = 'ImportMetaEnv', fileName = 'env.d.ts' } = config || {}
  const targetPath = join(cwd(), fileName)

  return  {
    name: 'vite-plugin-envtype-patch',
    configResolved(resolvedConfig: ResolvedConfig) {
      const { env } = resolvedConfig
      const envDts = generateIdentifierDeclarationFile(patchKey, env)

      writeFile(targetPath, `/// <reference types="vite/client" /> \n interface ${patchKey} ${envDts.split(`${patchKey}:`)[1]}`, {
        flag: 'w+'
      }, (error) => {
        if(error) {
          console.error(`${targetPath} write failed`, error)
        }
      })
    },
  }
}

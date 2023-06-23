#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'

import type { TsConfigJson } from 'type-fest'
import { loadJsonFile } from 'load-json-file'

console.log(' enable-absolute-paths')
console.log()

const updatedCompilerOptions = {
  baseUrl: './src',
  paths: {
    '~/*': ['./*'],
  },
}

try {
  const tsconfig = (await loadJsonFile('tsconfig.json')) as TsConfigJson

  const updatedTsconfig = {
    ...tsconfig,
    compilerOptions: {
      ...tsconfig.compilerOptions,
      paths: {
        ...(tsconfig.compilerOptions ? tsconfig.compilerOptions.paths : {}),
        ...updatedCompilerOptions.paths,
      },
      baseUrl: updatedCompilerOptions.baseUrl,
    },
  }

  await writeFile('tsconfig.json', JSON.stringify(updatedTsconfig))
  console.log(' success!')
} catch (error) {
  console.log(' failed to enable absolute paths')
}

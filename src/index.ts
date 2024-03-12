#!/usr/bin/env node

import writePrettyFile from 'write-pretty-file'
import typescriptPkg from 'typescript'
const { findConfigFile, sys, readConfigFile } = typescriptPkg

console.log(' enable-absolute-paths')
console.log()

const updatedCompilerOptions = {
  baseUrl: './src',
  paths: {
    '~/*': ['./*'],
  },
}

try {
  const tsconfigPath = findConfigFile(
    process.cwd(),
    sys.fileExists,
    'tsconfig.json',
  )

  if (!tsconfigPath) {
    throw new Error('No tsconfig path found!')
  }

  const { config: tsconfig } = readConfigFile(tsconfigPath, sys.readFile)

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

  await writePrettyFile('tsconfig.json', updatedTsconfig)
  console.log(' success!')
} catch (error) {
  console.log(' failed to enable absolute paths')
  throw error
}

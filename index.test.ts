import { test, expect } from 'vitest'
import { getBinPath } from 'get-bin-path'
import { temporaryDirectory } from 'tempy'
import { execa } from 'execa'
import typescriptPkg from 'typescript'
const { findConfigFile, sys, readConfigFile } = typescriptPkg
import writePrettyFile from 'write-pretty-file'

test('enable-absolute-paths', async () => {
  const binPath = await getBinPath()
  if (!binPath) {
    throw new Error('Bin path not found')
  }
  const directory = temporaryDirectory()
  await writePrettyFile(`${directory}/tsconfig.json`, {
    compilerOptions: {
      module: 'esnext',
    },
  })

  const { stdout } = await execa(binPath, [], {
    cwd: directory,
    env: {
      FORCE_COLOR: '2',
    },
  })

  const tsconfigPath = findConfigFile(
    directory,
    sys.fileExists,
    'tsconfig.json',
  )

  if (!tsconfigPath) {
    throw new Error('No tsconfig path found!')
  }

  const { config: updatedTsConfig } = readConfigFile(tsconfigPath, sys.readFile)

  expect(updatedTsConfig?.compilerOptions?.baseUrl).toBe('./src')
  expect(updatedTsConfig?.compilerOptions?.paths).toEqual({
    '~/*': ['./*'],
  })

  console.log('stdout', stdout)
  expect(stdout).toMatchSnapshot()
})

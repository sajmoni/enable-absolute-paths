import path from 'node:path'

import { test, expect } from 'vitest'
import { getBinPath } from 'get-bin-path'
import { temporaryDirectory } from 'tempy'
import { execa } from 'execa'
import { loadJsonFile } from 'load-json-file'
import type { TsConfigJson } from 'type-fest'
import { writeFile } from 'node:fs/promises'

test('enable-absolute-paths', async () => {
  const binPath = await getBinPath()
  if (!binPath) {
    throw new Error('Bin path not found')
  }
  const directory = temporaryDirectory()
  await writeFile(`${directory}/tsconfig.json`, JSON.stringify({}))

  const { stdout } = await execa(binPath, [], {
    cwd: directory,
    env: {
      // @ts-expect-error
      FORCE_COLOR: 2,
    },
  })

  const updatedTsConfig = (await loadJsonFile(
    path.join(directory, 'tsconfig.json'),
  )) as TsConfigJson

  expect(updatedTsConfig?.compilerOptions?.baseUrl).toBe('./src')
  expect(updatedTsConfig?.compilerOptions?.paths).toEqual({
    '~/*': ['./*'],
  })

  console.log('stdout', stdout)
  expect(stdout).toMatchSnapshot()
})

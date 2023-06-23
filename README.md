# enable-absolute-paths

> Enable absolute paths in a TypeScript project

Import files with `~/`. Assumes a `./src` folder.

`src/example.ts` -> `~/example`

## Usage

```sh
npx enable-absolute-paths@latest
```

## vite

If using `vite`, add this to your `vite.config.ts`

```ts
resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
```

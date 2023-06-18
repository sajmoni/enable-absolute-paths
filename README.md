# enable-absolute-paths

> Enable absolute paths in a TypeScript project

Import files with `~/`. Assumes a `./src` folder. This project might be turned into a cli in the future.

`src/example.ts` -> `~/example`

## tsconfig

```json
"baseUrl": "./src",
"paths": {
  "~/*": ["./*"],
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

# @stencil/unplugin crashes on load with TypeScript 7

`@stencil/unplugin@5.0.0-beta.19` declares `typescript: ">=5.0.0"` as a peer dependency, but importing it throws when the installed `typescript` is 7.x.

## Reproduce

```sh
bun install
bun run repro
```

## Output

```
typescript 7.0.2
.../node_modules/@stencil/unplugin/dist/index.mjs:246
const TYPE_FORMAT_FLAGS = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.InElementType;
                                             ^

TypeError: Cannot read properties of undefined (reading 'NoTruncation')
```

## Cause

TypeScript 7's root export is only `./lib/version.cjs`, so `ts.TypeFormatFlags` is undefined. `@stencil/core` resolves its own TypeScript 6 copy, while `@stencil/unplugin` resolves the project's TypeScript 7:

```
├─┬ @stencil/core@5.0.0-beta.19
│ └── typescript@6.0.3
├─┬ @stencil/unplugin@5.0.0-beta.19
│ └── typescript@7.0.2
└── typescript@7.0.2
```

# vite-plugin-envtype-patch

## Basic

gen dts file for import.meat.env;

Get all env values in `configResolved` hook, **zero** dependency.

```typescript
/// <reference types="vite/client" /> 
interface ImportMetaEnv  {
  VITE_XXX: string
  // and so on
};

```

## How to use

```typescript
import { envTypePatch } from 'vite-plugin-envtype-patch'

{
  plugins: [
    envTypePatch({})
  ]
}
```

## What's more

- convert simple type for `javascript` value
```typescript
import { TypeConvert } from 'vite-plugin-envtype-patch'

const typeConvert = new TypeConvert({ once: false })
typeConvert.genSimpleType({
  a: 100,
})

// call toString
const output = `${typeConvert}
```
# vite-plugin-envtype-patch

## Basic

gen dts file for import.meat.env;

Get all env values in `configResolved` hook, and gen dts by `dts-gen`.

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
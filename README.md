# GuitarHousehold

Keep track of your collection!


## How to use it?

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

npm install --save next react react-dom

## TypeScript

```
npm install --save-dev typescript
```

To enable TypeScript's features, install the type declaratons for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

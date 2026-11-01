# Sejm RP

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Zod + react-hook-form, env validation with `@t3-oss/env-nextjs` (`src/libs/Env.ts`)
- LogTape logging (optional Better Stack forwarding)
- Arcjet bot and attack protection (`src/proxy.ts`)
- oxlint / oxfmt (Ultracite), Knip, Lefthook, Commitlint, semantic-release

## Getting started

```shell
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Defaults live in `.env` and `.env.production`. Put secrets (e.g. `ARCJET_KEY`, Better Stack tokens) in `.env.local` / `.env.production.local`, which are not tracked by Git.

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the dev server |
| `build` / `build-local` | Production build |
| `start` | Run the production build |
| `lint` / `lint:fix` | Lint (type-aware) / autofix |
| `check:types` | TypeScript type check |
| `check:deps` | Unused files and dependencies (Knip) |
| `commit` | Interactive Conventional Commit prompt |

## License

MIT — based on [Next.js Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) by Ixartz.

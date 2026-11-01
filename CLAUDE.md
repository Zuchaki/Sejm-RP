# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project overview

Next.js Boilerplate, trimmed to its core: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, react-hook-form + Zod, LogTape logging, and Arcjet bot/attack protection. Auth (Clerk), database (Drizzle/PGlite/Postgres), i18n (next-intl/Crowdin), Sentry, PostHog, Checkly, Storybook, Playwright e2e, and Vitest have all been removed. There is no automated test suite in this repo.

## Commands

Only use the `bun run` scripts listed in AGENTS.md (`build-local`, `lint`, `check:types`, `check:deps`). Notes on each:

- `build-local` and `build` are both plain `next build`; `build-local` exists as the name CI/local tooling expects.
- `lint` / `check:types` / `check:deps` are oxlint (Ultracite preset, type-aware), `tsc --noEmit`, and Knip respectively.

## Architecture

**Routing**: plain App Router under `src/app/` — no dynamic locale segment. `src/app/layout.tsx` is the single root layout (renders `<html lang="pl">/<body>`); pages live directly under `src/app/`. `src/app/api/health/route.ts` is a healthcheck endpoint.

**Env validation**: all env vars are declared and validated in `src/libs/Env.ts` via `@t3-oss/env-nextjs` + Zod (`server`/`client`/`shared` groups). Code must import `Env` from there — never read `process.env` directly, except inside `src/proxy.ts` and `src/libs/Arcjet.ts`, which intentionally use `process.env` to keep the Edge middleware bundle small.

**Logging**: use `logger` from `src/libs/Logger.ts` (LogTape). It logs to console always, and additionally forwards to Better Stack when `NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN`/`NEXT_PUBLIC_BETTER_STACK_INGESTING_HOST` are set.

**Middleware**: `src/proxy.ts` runs Arcjet bot/shield protection on every request (skipped if `ARCJET_KEY` is unset). It's the only thing in the request pipeline.

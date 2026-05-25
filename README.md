# Teste — Foundational Web App

The no-regret foundation for Teste. Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui, deployed on Vercel Fluid Compute.

- **Repository:** https://github.com/andre-rocha-ca/teste-web (private)
- **Production:** auto-deployed from `main` via Vercel git integration.

> **Note on repo location.** The repository temporarily lives under the `andre-rocha-ca` personal GitHub account because Teste does not yet have a company-owned GitHub organization. Transfer to a Teste-owned org is tracked in [TES-10](/TES/issues/TES-10) and will happen once that org exists.

## Stack

- **Runtime:** Node.js 24 LTS (pinned via `.nvmrc` and `engines.node`).
- **Framework:** Next.js 15 (App Router).
- **Language:** TypeScript (strict).
- **Styling:** Tailwind CSS v4 + `tw-animate-css`.
- **UI primitives:** shadcn/ui (manual install — only the `Button` shipped so far).
- **Host:** Vercel (Fluid Compute, Node 24 runtime). Configured via `vercel.ts`.
- **Package manager:** pnpm 9 (pinned via `packageManager`).

## Prerequisites

- Node.js 24 LTS. With `nvm`:
  ```sh
  nvm install 24 && nvm use
  ```
- pnpm 9+. With Corepack:
  ```sh
  corepack enable && corepack prepare pnpm@9.15.0 --activate
  ```

## Local development

```sh
pnpm install
pnpm dev          # http://localhost:3000
```

## Production build

```sh
pnpm build        # builds for production
pnpm start        # serves the production build locally
```

## Other scripts

```sh
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
```

## Routes

| Path           | Purpose                                  |
| -------------- | ---------------------------------------- |
| `/`            | Stub landing page (server component).    |
| `/api/health`  | Health probe. Returns `{ "ok": true }`.  |

## Project layout

```
src/
  app/
    api/health/route.ts    # GET /api/health
    globals.css            # Tailwind v4 entrypoint + design tokens
    layout.tsx
    page.tsx               # Landing page
  components/ui/button.tsx # shadcn/ui Button
  lib/utils.ts             # cn() helper
vercel.ts                  # Vercel project config (TS, not JSON)
next.config.ts
tsconfig.json
```

## Deploy flow

CI/CD is Vercel-native — git is the source of truth:

1. **Branch** off `main` for any change.
2. **Open a PR** against `main` on GitHub.
3. Vercel posts a **preview deploy** URL on the PR — share it with reviewers (design, marketing, CEO) before merging.
4. **Merge to `main`** → Vercel auto-deploys to **production**.

Branch protection on `main` requires a PR — no direct pushes.

After every deploy, smoke-check `https://<deployment-url>/api/health` returns `{ "ok": true }`.

Emergency-only fallback: `vercel deploy --prod` from the CLI bypasses the PR flow. Avoid unless production is broken and a PR loop would make things worse.

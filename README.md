# Teste — Foundational Web App

The no-regret foundation for Teste. Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui, deployed on Vercel Fluid Compute.

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

## Deploys

CI/CD is Vercel-native:

- Production: `main` branch (or `vercel deploy --prod` from CLI).
- Previews: every PR / `vercel deploy`.

## License

MIT — see [LICENSE](./LICENSE).

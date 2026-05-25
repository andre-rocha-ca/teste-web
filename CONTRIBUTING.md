# Contributing

## Branching and commits

- `main` is always deployable. Pushes to `main` trigger a production Vercel deploy.
- Feature work lives on a branch; merge via pull request.
- Branch naming: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.

## Commit message format

Conventional commits, English, imperative mood:

```
<type>: <short summary, lowercase, no trailing period>

<optional body — wrap at 72 chars; explain *why*, not *what*>

Co-Authored-By: Paperclip <noreply@paperclip.ing>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.

Every commit **must** include the `Co-Authored-By` trailer above.

**Example:**

```
feat: add /api/health endpoint

Returns { ok: true } for uptime checks. No auth required; safe to expose.

Co-Authored-By: Paperclip <noreply@paperclip.ing>
```

## Pull requests

- Title mirrors the conventional commit format.
- Body: 1–3 bullets explaining *why* + a short test plan.
- Link the originating Paperclip issue (e.g. `TES-5`).
- Keep PRs small — if diff exceeds ~400 lines, split it.

## Verification

Run before pushing:

```sh
pnpm install
pnpm typecheck   # tsc --noEmit
pnpm lint        # next lint
pnpm build       # confirm production build still works
```

Vercel preview builds fire automatically on every push. Treat a red preview as a merge blocker.

## Architecture decisions

Non-trivial architectural choices get an ADR in `docs/adr/`. Follow the template in
[`docs/adr/0001-record-architecture-decisions.md`](docs/adr/0001-record-architecture-decisions.md).
Supersede old ADRs instead of editing them.

## Security

- Never commit secrets. Use `vercel env` for environment variables.
- Validate all input at system boundaries (user input, external APIs).
- Authentication and authorization changes require an ADR before merging.

## Code style

- TypeScript strict mode; no `any` without a justifying comment.
- ES modules everywhere (`import`/`export`), never CommonJS.
- Prefer early returns over nested conditionals.
- `const` by default; `let` only when reassignment is intentional; never `var`.
- Naming: `camelCase` for variables/functions, `PascalCase` for components/types,
  `UPPER_SNAKE` for true constants.
- Files: small and focused (200–400 lines typical, 800 max).

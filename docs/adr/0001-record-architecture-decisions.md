# ADR 0001: Record architecture decisions + initial stack choice

- **Status**: Accepted
- **Date**: 2026-05-25
- **Deciders**: CTO
- **Consulted**: CEO

---

## Context

We are starting a greenfield codebase with a one-person engineering team. Decisions made in
the first weeks — language, framework, hosting, ORM, deploy model — will be expensive to
reverse once product surface area exists. We need a lightweight, durable way to record *why*
each non-obvious choice was made so that future engineers can audit, challenge, or extend
those choices without relitigating from scratch.

We adopt Michael Nygard's Architecture Decision Record format: short, numbered Markdown
documents in `docs/adr/`. The format is minimal: Context → Decision → Consequences →
Alternatives. Every significant architectural decision gets one ADR. ADRs are **appended**
(old ones transition to `Superseded by ADR-XXXX`) so the audit trail survives.

This ADR (0001) serves double duty — it establishes the ADR practice **and** records the
foundational stack decision, both of which were made simultaneously on day one.

---

## Decision — ADR process

We will record architecture decisions as ADRs in `docs/adr/NNNN-short-title.md`.

### ADR template (copy for new decisions)

```markdown
# ADR NNNN: <short imperative title>

- **Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
- **Date**: YYYY-MM-DD
- **Deciders**: <names / roles>
- **Consulted**: <optional>

## Context
What is the issue? What forces are at play?

## Decision
The change we are making.

## Consequences
What becomes easier? What becomes harder?

## Alternatives considered
What else did we evaluate, and why did we pass?
```

---

## Decision — Initial product stack

Adopt the following stack:

| Layer | Choice | Rationale |
|---|---|---|
| Runtime | Node.js 24 LTS | Current LTS on Vercel; Node 18 is deprecated. |
| Language | TypeScript (strict) | Type safety + broadest talent pool for future hires. |
| Framework | Next.js 15 (App Router) | Server Components + streaming + colocated routing match Vercel's deploy model. |
| Hosting | Vercel | Zero-config Next.js, preview URLs per PR, Fluid Compute for full-Node functions with low cold starts. |
| Function runtime | Fluid Compute (default) | Reuses instances across concurrent requests; supports full Node.js. No Edge runtime — Edge has compatibility footguns we don't need yet. |
| Project config | `vercel.ts` via `@vercel/config` | Typed, dynamic configuration. `vercel.json` is the legacy path. |
| Package manager | pnpm 9 | Fast installs, strict dependency graph, deterministic lockfile. |
| Styling | Tailwind CSS v4 | Default in the Next.js ecosystem; integrates cleanly with shadcn/ui. |
| UI primitives | shadcn/ui | Owned components (not a runtime dep), Radix accessibility baseline, easy to restyle when a designer joins. |
| Database | **Deferred** | No persistence required yet. When needed: Vercel Marketplace (Neon or Supabase) + Prisma. New ADR at that point. |
| Auth | **Deferred** | Not required at scaffold time. Managed provider TBD; new ADR when needed. |
| AI integration | **Deferred** | When required: Vercel AI Gateway with AI SDK v6 `"provider/model"` strings to avoid provider lock-in. New ADR at that point. |
| CI beyond Vercel | **Deferred** | GitHub Actions added once there is something worth gating (tests, security scans). |

---

## Consequences

**Easier:**

- Single-command local dev (`pnpm dev`) and zero-config production deploys.
- Preview URL per PR is a free staging surface.
- Future hires arrive with Next.js/React familiarity on day one.
- Adding a database, auth, or AI layer is incremental, not a rewrite.

**Harder / risks:**

- Vendor dependency on Vercel's pricing and uptime; revisit if cost-of-revenue inverts.
- Next.js App Router is newer than Pages Router — we accept some upstream churn.
- Tailwind v4 is recent; minor tooling rough edges are possible.
- Repo currently under a personal GitHub account (`andre-rocha-ca`); tracked for transfer
  in TES-10 once a company org exists.

---

## Alternatives considered

- **SvelteKit / Nuxt on Vercel** — equally first-class, but React/Next has a deeper talent
  pool. Rejected on hiring optionality.
- **Remix on Vercel** — strong loader/action ergonomics, but App Router covers the same
  ground and Vercel's integration is tighter for Next.js.
- **Hono / Express on Vercel Functions** — right answer for a pure API product; we expect
  a web product so Next.js wins by handling both UI and API.
- **Self-hosted on AWS / Fly.io / Render** — cheaper at scale, far more expensive in
  operational time before product/market fit.
- **`vercel.json` instead of `vercel.ts`** — works today but is the legacy path; adopt the
  recommended form upfront.
- **Bundle a database in the scaffold** — unused infrastructure is a cost and maintenance
  item; defer until a feature actually needs it.
- **MUI / Chakra / Mantine** — larger packages, less ownership. shadcn/ui's
  "you own the components" model is better for a product whose visual language will change.

# AGENTS.md

## Project overview

This repository is the home of the **Card Show Vendor Operations Platform** — a planned SaaS for medium-to-large trading-card vendors who sell at card shows/conventions (inventory, fast price lookup, order building, offline-capable POS, online booth pickup, and buylist/trade-in). See [`docs/requirements/README.md`](./docs/requirements/README.md) for the full product context.

Two things live here today:
1. **Product documentation** under `docs/` (the current center of gravity — requirements, discovery, competitive research, architecture).
2. A small legacy **Jekyll/GitHub Pages** personal site at the repo root (`index.html`, `_layouts/`). It's unrelated to the SaaS but still builds; don't disturb it.

The SaaS application itself is only just beginning (a starter scaffold in `app/`, introduced via PR — see below).

## Repository map

- `docs/requirements/` — product requirements library (merged). Index at `docs/requirements/README.md`.
  - `00-product-overview.md`, `08`–`13` (AI, NFRs, MVP scope, user stories, risks, roadmap).
  - `features/01`–`07` — per-feature docs (inventory, pricing, orders, POS, events, customer, buylist).
  - `_feature-template.md` — copy this to add a new feature doc.
  - `discovery/` — customer-discovery kit (interview guide, screener, notes template, tracker, findings). *May be in an open PR, not yet merged.*
  - `competitive-review.md` — market competitive analysis. *May be in an open PR.*
- `docs/architecture/` — architecture decision records (ADRs) for the SaaS. *May be in an open PR.*
- `app/` — minimal offline-first Next.js scaffold for the SaaS. *May be in an open PR.*
- `index.html`, `_layouts/` — legacy Jekyll site (leave alone).

> Because several deliverables are developed as separate PRs, don't assume `docs/discovery`, `docs/architecture`, or `app/` exist on `master` — check the working tree / open PRs first.

## Documentation conventions

The requirements docs follow a consistent, intentional style (see `docs/requirements/README.md` for the authoritative version):

- **Requirement IDs**: every requirement has a stable ID with an area prefix — `INV` (inventory), `PRC` (pricing), `ORD` (orders), `POS` (checkout), `EVT` (events), `CX` (customer), `BUY` (buying/buylist). Never renumber existing IDs; only append.
- **Feature docs** use: a metadata table (priority/MVP/status/owner) → high-level requirements as a checklist with IDs → **Acceptance Criteria** (verifiable checkboxes grouped under `### <ID> — <title>`) → Open Questions → **Additional Details** (deeper content lives here to keep the top skimmable).
- **Acceptance criteria**: add as GFM checkboxes referencing the requirement ID; keep high level but testable. Add, don't overwrite existing seeded AC.
- **Competitive review**: score with the `0`–`3` rubric; leave unverified cells `?`; mark inferred-from-absence with `*`; cite every claim in the research log. Don't invent competitor facts.
- **Discovery**: recruit (screener) → log (tracker) → interview (guide) → capture (notes template → `notes/`) → synthesize (findings) → feed decisions back into requirements + MVP scope.

## Validating docs (do this before committing markdown)

Ruby/Jekyll (kramdown) is installed. Enable it, then render and link-check:

```bash
export PATH="$(ruby -e 'require "rubygems"; puts Gem.user_dir')/bin:$PATH"
kramdown --input GFM <file> > /dev/null   # must produce no warnings
```

Link-check pattern used previously: verify every relative `](./...md)` / `](../...md)` target file exists. A quick Python snippet walking `docs/requirements/**/*.md` works well. When adding a doc that links to files in a *different* open PR, either avoid the cross-link or accept it'll be broken until that PR merges.

## Working conventions (git / PR workflow)

- **Lightweight by default.** For simple adds/edits (requirements, AC, seed data, small UI), follow [`.cursor/skills/lightweight-changes/SKILL.md`](./.cursor/skills/lightweight-changes/SKILL.md) — skip screen recordings, browser demos, and parallel agents unless the user asks or it's a new end-to-end flow.
- **One logical change per branch/PR.** Docs deliverables here have each been their own PR (discovery, competitive review, acceptance criteria, architecture+app).
- **Branch naming**: `cursor/<descriptive-name>-7d43` (lowercase). Base off latest `master`.
- **PRs are draft by default.** Do **not** merge or mark ready unless explicitly asked — the human merges. The available `gh` CLI here is read-only; use the PR tool for create/update.
- **Avoid index-file merge conflicts**: when two open PRs would edit the same spot in `docs/requirements/README.md` (the index table), only one should touch it; fold the other's index link in after the first merges.
- **Isolated parallel work**: if running multiple agents in parallel, give them isolated git worktrees. Agents sharing `/workspace` will stomp each other's branch/HEAD (this happened once and required untangling commits).

## Tech direction (from ADR 0001)

Chosen direction for the SaaS (see `docs/architecture/0001-tech-stack.md` when present): TypeScript end-to-end; **Next.js (App Router) + React as an offline-first PWA** (service worker + IndexedDB outbox for queued orders); tRPC API; **PostgreSQL** (managed) via Drizzle; Postgres FTS + `pg_trgm` for search (graduating to Typesense/Meilisearch); managed auth with org-based multi-tenancy (`tenant_id` + RLS). The wedge is **offline-first show-day POS + online booth pickup** — capabilities incumbents (BinderPOS, Storepass, Crystal Commerce) don't combine.

## Cursor Cloud specific instructions

Services in this repo:

**Legacy Jekyll site** (repo root — no backend/DB, no `Gemfile`/`_config.yml`):
- Ruby is installed system-wide; Jekyll/Bundler are user gems, with the user gem `bin` added to `PATH` in `~/.bashrc`. If `jekyll` isn't found: `export PATH="$(ruby -e 'require \"rubygems\"; puts Gem.user_dir')/bin:$PATH"`.
- Run: `jekyll serve --host 0.0.0.0 --port 4000` (http://localhost:4000/, auto-regenerates). Build: `jekyll build`.
- No `_config.yml` → Jekyll prints `Configuration file: none` (expected, not an error).
- No automated tests or lint tooling. `_layouts/default.html` references CSS/pages that don't exist yet (`/css/main.css`, `/about`, etc.) → those 404 by design.

**SaaS app scaffold** (`app/`, if present — introduced in an app-scaffold PR):
- Node 22 is preinstalled. Run: `cd app && npm install` then `npm run dev` (http://localhost:3000). Checks: `npm run typecheck`, `npm run lint`, `npm run build`.
- The scaffold runs with **zero external services** (in-memory + local-store stubs, clearly labeled as swap-in points for real Postgres/auth). The offline "hello world" flow lives at `/pos` (search cached inventory → add to cart → complete order offline → queued locally → **Sync now** flushes the queue).

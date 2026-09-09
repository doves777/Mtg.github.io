---
name: session-lessons
description: >-
  Living session memory for this repo. ALWAYS read at the start of every
  session (before planning work) and ALWAYS update before finishing. Captures
  lessons learned, agent/skill/tool gotchas, and durable notes future sessions
  should reuse. Use when starting or ending any task, after a surprise, after a
  failed approach, or when discovering how a skill, tool, or workflow actually
  behaves here.
---

# Session lessons (living)

This file is the **shared memory** across agent sessions. `AGENTS.md` is the always-on project map. This skill is the running log of what we learned the hard way and how agent/skill machinery actually works in this repo.

## Always do this

### Start of session

1. Read **Standing lessons** and the last few **Session log** entries.
2. Apply them. Do not rediscover a gotcha that is already written here.
3. If this file and `AGENTS.md` disagree on a durable workflow rule, prefer `AGENTS.md` and note the conflict in the log.

### End of session (required before declaring done)

Do this even on small / docs-only work. Skip only if the session produced **zero** new information *and* you already confirmed standing lessons are current — still add a one-line log entry.

1. Ask: *what would a future agent waste time re-learning?*
2. Fold durable items into **Standing lessons** (dedupe; rewrite in present tense).
3. Prepend a **Session log** entry (newest first).
4. Commit and push the update **on the same branch/PR as the session's work**. Do not open a dedicated lessons-only PR when this session already has a PR.

## What to capture

- Surprises, failed approaches, and the fix that actually worked
- Workflow rules the user restated or that the run instructions overrode (`AGENTS.md`, Cloud branch suffix, PR tool vs `gh`)
- How a skill, MCP server, or tool behaved *in this repo* (auth needed, read-only, missing schema, etc.)
- Product facts that trip agents (MVP vs Later, don't touch the Jekyll site, requirement ID prefixes)
- Pointers to the canonical doc — not a copy of that doc

## What NOT to capture

- Full transcripts, token dumps, or step-by-step of a successful uneventful path
- Secrets, tokens, or personal data
- Speculative ideas that were not confirmed
- Duplicates of `AGENTS.md` or another skill — link instead, unless the lesson is "people keep missing this"
- One-off file paths that will be stale next week

## Maintenance

- Keep **Standing lessons** as the primary reference (roughly ≤ 40 bullets). Merge duplicates; delete anything superseded.
- Keep the **Session log** to the last **15** entries. When pruning, fold anything still true into Standing lessons, then delete the old entry.
- If a lesson belongs in a dedicated skill (e.g. a new repeatable workflow), add/update that skill and leave a one-line pointer here.

---

## Standing lessons

### Workflow

- Default to [lightweight-changes](../lightweight-changes/SKILL.md) for simple adds/edits. Skip screen recordings, browser demos, and parallel agents unless the user asks or the change is a new end-to-end flow.
- One logical change per branch/PR. Draft PRs; the human merges. Do not mark ready or merge unless asked.
- `gh` is **read-only** here. Create/update PRs with the PR tool (`ManagePullRequest`), not `gh pr create`.
- Branch names: `cursor/<descriptive-name>-<suffix>` (lowercase). `AGENTS.md` documents `-7d43` as the historical default; **Cloud runs often inject a different suffix** — follow the run's branch template when present.
- Parallel agents sharing `/workspace` will stomp each other's `HEAD`. Use isolated git worktrees if work must run in parallel.
- Avoid index-file merge conflicts: when two open PRs would edit the same spot in `docs/requirements/README.md`, only one should touch it; fold the other index link in after the first merges.
- Prefer amending an **open related PR's branch** over opening a new PR for the same area.

### Docs / requirements

- Requirement IDs are stable (`INV`, `PRC`, `ORD`, `POS`, `EVT`, `CX`, `BUY`, `SC`, `STF`). **Never renumber**; only append.
- Feature docs: metadata table → ID checklist → Acceptance Criteria → Open Questions → Additional Details. Add AC as GFM checkboxes; don't overwrite seeded AC.
- Validate markdown with kramdown GFM (no warnings) and check that relative `](./…md)` / `](../…md)` targets exist.
- Competitive review: score `0`–`3`; leave unverified cells `?`; mark inferred-from-absence with `*`; cite claims. Don't invent competitor facts.
- Store Credit (`SC`) and Storefront (`STF`) are marked **Later**, not MVP.

### App / POS

- SaaS app lives in `app/` (Next.js). Legacy Jekyll site at repo root is unrelated — **don't disturb** `index.html` / `_layouts/`.
- Convention POS is `/pos`; storefront stub is `/storefront`. Revive steps: `app/README.md`.
- Scaffold runs with zero external services by default (in-memory + local store). Optional Postgres: `DATABASE_URL` + [`docs/architecture/database-hosting.md`](../../../docs/architecture/database-hosting.md) (`db:push` / `db:seed` / `db:ping`). Prefer **Neon** pooled connection strings; Drizzle schema is in `app/src/data/db/`.
- Card art is from `cards.scryfall.io` for the MTG prototype (needs network once, then browser-cached).
- Small TS edits: `npm run typecheck` (and `lint` if you touched TSX). Skip full `build` + browser matrix unless proving a new flow.

### Product / repo map (easy to miss)

- Center of gravity is still `docs/` (requirements, discovery, architecture). The app is an early scaffold + POS prototype.
- **Shareable PRD** lives at `docs/prd.md` (POC → MVP → expand). The requirements library under `docs/requirements/` is the deeper breakdown — don’t fork a second full requirements tree when someone asks for a PRD.
- **First live shows are Pokémon** — selling models live in `docs/architecture/data-model/card-pokemon.md` + `sealed-product-pokemon.md`. Same Product → Inventory pattern as MTG; Pokémon-specific fields include `printedNumber`, SV-era rarities (IR/SIR/HR), `reverse_holo`, and sealed types like `elite_trainer_box`.
- Cloud Postgres how-to: `docs/architecture/database-hosting.md` (Neon + Drizzle). Agent cannot create the user’s Neon project — user pastes `DATABASE_URL`.
- Pitch decks under `pitch/` (THE MILLION sponsor deck, WotC approval briefing) are **separate** from the vendor SaaS. Don't mix those PRs into requirements/app work.
- Check `gh pr list` / open PRs before assuming a path exists on `master`.

---

## Agent & skill functionality

How agent machinery actually works in this repo — update this section when a tool, skill, or Cursor Cloud behavior surprises you.

| Thing | How it behaves here |
| --- | --- |
| Project skills | `.cursor/skills/<name>/SKILL.md` with YAML `name` + `description`. Description is what makes future agents load the skill — write it as trigger conditions, not a summary. |
| Skills index | `.cursor/skills/README.md` — add a row when you add a skill. |
| `AGENTS.md` | Always applied. Put "must not miss" workflow hooks here (this skill is one). Don't rewrite it for a one-line product tweak. |
| Lightweight-changes | Default incremental-work skill. Use it; don't escalate to demos. |
| Session-lessons (this file) | Read at start; update at end; ship on the same PR as the work. |
| Cloud branch suffix | Per-run. Historical docs say `-7d43`; follow the current run's `cursor/<name>-<suffix>` instruction. |
| PR tool vs `gh` | `gh` for read (`pr list`, `pr view`, logs). Writes go through `ManagePullRequest`. Draft by default. |
| `SetActiveBranch` | Call when creating/switching a feature branch so the UI tracks the right PR. |
| MCP servers | Notion, Figma, Datadog may be present. Call `GetMcpTools` for schema **before** `CallMcpTool`. If a server is `needsAuth`, don't loop — the user must auth in desktop Cursor. |
| Testing / artifacts | Lightweight work: no `RecordScreen` / computer-use. New end-to-end UI flows: demo + artifacts under `/opt/cursor/artifacts` as required by the run. |
| Parallel / Task subagents | Don't spawn them for small edits. If you must parallelize, isolated worktrees — never two agents on the same `/workspace` checkout. |
| At-rest vuln hunter | Daily cron scans `app/` for exploitable chains. **No Slack posting tool** here — findings go to automation memory only (`Mtg.github.io---flagged-vulnerabilities.json`), never GitHub/PRs. Do not open a PR for scan-only runs. If there are no new MEDIUM+ findings, do not rewrite memory. |
| Next.js lockfile | `app/package.json` says `next: ^15.1.0`; lockfile is **15.5.21** (React 19.2.8). App Router only (no `pages/`, no `route.ts`, no Server Actions, no `next/image`). Postgres is CLI-only unless `DATABASE_URL` is set. GitHub Pages is not enabled (`has_pages: false`); the Next.js app is not a public service. |

---

## Session log

Newest first. Template:

```markdown
### YYYY-MM-DD — <short session title>
- **Done:** …
- **Lesson:** …
- **Skill/agent:** … (omit if none)
```

### 2026-09-09 — At-rest vulnerability scan (automation)
- **Done:** Full-repo review of `d838374`. No validated MEDIUM/HIGH/CRITICAL findings with an end-to-end attack chain. Did not rewrite flagged-vulnerability memory (still empty). Slack reporter still unavailable.
- **Lesson:** Next 15.5.21 is below the 15.5.24 August 2026 patches, but CVE-2026-75604 needs a Windows host plus Pages+App coexistence (this scaffold is App Router only; Pages is absent). AVIF image-optimizer RCE needs `/_next/image` on attacker-controlled AVIF; this app uses raw `<img>` and has no `images.remotePatterns`. POS checkout remains localStorage-only. Skip GitHub comments/PRs for scan-only runs.
- **Skill/agent:** Vulnerability hunter automation; memory file family `Mtg.github.io---flagged-vulnerabilities.json`.

### 2026-08-16 — Resolve PR #16 merge with master

- **Done:** Merged `origin/master` (PRD + Neon/Drizzle) into `cursor/pokemon-data-model-4b7c`. Kept Pokémon, PRD, and Postgres standing notes plus all 2026-08-16 log entries.
- **Lesson:** After sibling PRs merge, session-lessons is the only usual conflict — keep every standing bullet; do not open a second PR just to resolve it.
- **Skill/agent:** Simple content conflict; architecture README auto-merged (hosting + Pokémon index).

### 2026-08-16 — Resolve PR #17 merge with master (PRD)

- **Done:** Merged `origin/master` (PR #15 shareable PRD) into `cursor/cloud-postgres-setup-4b7c`. Kept both standing-lesson bullets and both 2026-08-16 session-log entries.
- **Lesson:** Session-lessons is the usual conflict surface when two PRs land the same day — keep both log entries (newest first), do not drop the other PR’s standing note.
- **Skill/agent:** Simple content conflict only; no schema/app intent clash.

### 2026-08-16 — Cloud Postgres / Drizzle POC scaffold

- **Done:** Added Drizzle schema (`tenants`, `products`, `inventory_items`), Neon how-to (`docs/architecture/database-hosting.md`), `db:push`/`seed`/`ping` scripts; verified against local Postgres (seeded 3 Pokémon rows). App still runs without `DATABASE_URL`.
- **Lesson:** Agent cannot create the user’s Neon account — ship schema + docs; user pastes pooled `DATABASE_URL`. `drizzle-kit push` needs `--force` (or a TTY) in non-interactive agents. Prefer `postgres` (postgres.js) driver — works for both Neon and local Postgres.
- **Skill/agent:** Branch suffix `-4b7c`. Do not commit `.env.local`.

### 2026-08-16 — Pokémon selling data models

- **Done:** Added `card-pokemon.md` + `sealed-product-pokemon.md`; indexed in data-model + architecture READMEs. Same Product → Inventory pattern as MTG; Pokémon deltas = printed number, SV rarities, reverse holo, ETB/sealed taxonomy, EN/JA language split.
- **Lesson:** First shows are Pokémon — prefer those models for POC catalog/seed work. Don’t invent a parallel inventory shape; only the product-layer game fields change. Separate PR from the shareable PRD (`cursor/shareable-prd-poc-4b7c`).
- **Skill/agent:** Lightweight docs-only; Cloud branch suffix `-4b7c`.

### 2026-08-16 — Shareable POC-first PRD

- **Done:** Added `docs/prd.md` as the single shareable overview (problem, wedge, POC → MVP → expand, success criteria, partner brief); linked from root `README.md`, requirements index, MVP scope, and roadmap.
- **Lesson:** When the user asks for a “PRD they can easily share,” prefer one top-level `docs/prd.md` that summarizes and links the existing requirements library — don’t duplicate the whole feature/AC tree into a second source of truth. POC is a stricter cut than MVP (seeded catalog + offline demo; no real auth/DB/payments/pickup).
- **Skill/agent:** Lightweight-changes skill applied (docs-only; no demos). Cloud branch suffix for this run is `-4b7c`.

### 2026-08-15 — Add living session-lessons skill

- **Done:** Created this skill, indexed it in `.cursor/skills/README.md`, and hooked it from `AGENTS.md` so future sessions actually read/update it.
- **Lesson:** Shared memory only works if it's both a skill (description-triggered) *and* mentioned in `AGENTS.md` (always-applied). A skill file that nobody is told to update will go stale.
- **Skill/agent:** Cloud run branch suffix for this session is `-0083`, not the `-7d43` in `AGENTS.md` / lightweight-changes. Follow the run template when it conflicts with historical docs.

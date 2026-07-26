---
name: lightweight-changes
description: >-
  Default workflow for small, incremental Card Show SaaS work (docs tweaks,
  new requirement lines, seed data, small UI copy/fields, AC checkboxes).
  Use this instead of a full environment/demo/recording session whenever the
  user is adding or adjusting something simple. Skip screen recording, browser
  walkthroughs, parallel agents, and competitive re-research unless the user
  explicitly asks or the change is a new end-to-end flow.
---

# Lightweight changes (Card Show SaaS)

Use this skill for **simple, incremental** work on this repo. Prefer a short edit → validate → commit → push → update PR loop. Do **not** treat every request like a greenfield setup or a full product demo.

## When to use this skill

Apply when the user asks to:

- Add/edit a requirement, AC checkbox, open question, or MVP note
- Extend a data-model field table or JSON example
- Tweak seed catalog entries, labels, copy, or CSS
- Add a small section to an existing doc
- Mark something MVP / Later / Should-have
- Fix a typo, link, or naming inconsistency
- Fold a competitor feature into an existing requirement ID

## When NOT to use (escalate to a fuller workflow)

Do the heavier path only if one of these is true:

| Trigger | What to do instead |
| --- | --- |
| User explicitly asks for a **demo, recording, screenshots, or walkthrough** | Record / browser-test that flow |
| Change introduces a **new user-facing flow** (first checkout, first offline sync, new page) | Build + smoke-test; demo if user wants proof |
| **Environment/setup** or "prove it runs" | Follow `AGENTS.md` Cloud instructions |
| Broad **discovery / competitive research** from scratch | Use the discovery / competitive-review docs |
| User asks to **parallelize** large workstreams | Isolated worktrees / subagents |

If unsure, **ask once**: "Quick doc/code tweak, or do you want a recorded demo?" — default to lightweight.

## Default lightweight workflow

1. **Classify** — confirm it's a small add/edit (usually < ~1 hour of agent work, touches a few files).
2. **Branch** — `cursor/<short-name>-7d43` off latest `master` (or continue an existing open PR branch if the change clearly belongs there).
3. **Edit the smallest surface**
   - Requirements → existing feature doc under `docs/requirements/features/` (append IDs; never renumber).
   - New product area → copy `_feature-template.md`; add prefix to README ID table.
   - Data model → `docs/architecture/data-model/`.
   - App UI/seed → `app/src/…` only.
4. **Validate lightly**
   - Markdown: `kramdown --input GFM <file> > /dev/null` (no warnings) + relative-link check.
   - App: `cd app && npm run typecheck` (and `lint` if you touched TSX). Skip full browser demos.
5. **Commit + push + update the PR** with a short description. Draft by default; do not merge.
6. **Reply briefly** — what changed, where, PR link. No walkthrough video unless asked.

## Explicitly skip on lightweight work

- Screen recording (`RecordScreen`) and computer-use demos
- Full `npm run build` + multi-route curl matrix (typecheck is enough for small TS edits)
- Spawning parallel agents / best-of-n runners
- Re-fetching competitor sites or re-scoring the competitive matrix
- Rewriting AGENTS.md / architecture ADRs for a one-line requirement
- Creating a new PR when an open related PR already owns that area (prefer amending that branch)

## Project pointers (don't rediscover)

| Need | Where |
| --- | --- |
| Requirements index + ID prefixes | `docs/requirements/README.md` |
| Feature template | `docs/requirements/_feature-template.md` |
| Storepass parity map | `docs/requirements/competitor-parity-storepass.md` |
| MTG single / sealed models | `docs/architecture/data-model/` |
| Convention POS demo (revive later) | `app/README.md` → `/pos` |
| Cloud run notes | `AGENTS.md` |

## Reply style for lightweight work

- Lead with what you changed (1–3 bullets).
- Link the PR.
- Offer one optional next step — don't invent a demo unless useful.

# Card Show Vendor Operations Platform — starter scaffold

> **This is a MINIMAL starting point, not a finished application.** It exists to make the
> decisions in [`../docs/architecture/`](../docs/architecture/README.md) concrete and
> runnable. It uses in-memory / `localStorage` stubs so it runs with **zero external
> services** (no database, no auth provider). Those stubs are clearly marked in the code
> and are meant to be swapped for the real implementations described in the ADRs.

## What this demonstrates

- **Two front doors** (ADR 0001): an authenticated-style **Vendor POS** (`/pos`) and a
  server-rendered **buyer Storefront** (`/storefront`).
- **Convention-worker POS prototype** (tablet): search MTG cards (with Scryfall art) → add
  to cart → checkout with cash/card, tax, and a receipt. Seeded for "SummerCon 2026 · Booth 214".
- **Offline-first POS flow** (ADR 0002): search a cached inventory snapshot, build a cart,
  and **complete an order while offline**; orders are queued locally and synced on
  reconnect, with a visible **sync-status** indicator.
- **Clean layering** that mirrors the ADR so real infra drops in without changing callers:
  - `src/domain/` — framework-agnostic model + rules (tenancy, inventory, pricing, orders).
  - `src/data/` — `InventoryRepository` seam (in-memory now → Drizzle/Postgres later) + seed catalog.
  - `src/offline/` — local store + sync queue (localStorage now → IndexedDB/Workbox later).
  - `src/app/` — Next.js App Router routes and UI.
  - `public/` — PWA `manifest.webmanifest` + a minimal service worker.

## Tech stack (see ADR 0001)

Next.js (App Router) + React + TypeScript, shipped as an installable PWA. The production
stack adds PostgreSQL + Drizzle, Postgres FTS/`pg_trgm` search, managed auth with
org-based multi-tenancy (RLS), and Vercel + managed Postgres hosting.

## Requirements

- Node.js 18.18+ (developed and verified on Node 22).
- npm (or pnpm/yarn — a `package-lock.json` is committed for npm).

## Setup & run

```bash
cd app
npm install

# Development (hot reload)
npm run dev
# → http://localhost:3000

# Type-check / lint / production build
npm run typecheck
npm run lint
npm run build
npm run start   # serve the production build
```

## Revive the convention POS demo later

This is the durable "hello world" for show-day checkout. Works on a laptop or tablet browser.

```bash
# From a clone of this repo (branch that includes the POS prototype, or master after merge):
cd app
npm install
npm run dev
# → open http://localhost:3000/pos
```

**Walk through the booth flow:**

1. Confirm the context bar: `SummerCon 2026 · Booth 214` · Register 2 · Jordan (Staff).
2. Browse the grid — MTG singles show **Scryfall card art**; sealed products show face-card art + a **SEALED** badge.
3. Search `Oko` → tap the Lightly Played tile to add it.
4. Search `Sheoldred` → add it. Search `Sol Ring` → add it.
5. Cart shows qty steppers, subtotal, tax (8.25%), and total.
6. Tap **Checkout** → choose **Cash** → pick a quick-cash amount (or Exact) → **Complete sale**.
7. Receipt shows order id, lines, tax, tender, change; order is **queued offline-safe**. Tap **New sale**.

Card images load from Scryfall's public CDN (`cards.scryfall.io`) — needs network the first time (browser cache helps after).

## Try the offline flow

1. Open `http://localhost:3000/pos`.
2. Search for a card (e.g. `Oko` or `Sheoldred`), tap the tile to add, then **Checkout** → **Complete sale** — it queues locally.
3. Open DevTools → Network → set **Offline**. Searching and completing orders still work; the
   status pill shows **Offline · N queued**.
4. Go back **Online** and click **Sync now** to flush the queue (stubbed sync).

## What is real vs. stubbed

| Area | In this scaffold | Production target (ADR) |
| --- | --- | --- |
| Data store | In-memory repository + seed array | PostgreSQL via Drizzle, RLS-scoped by tenant |
| Search | `String.includes` over the snapshot | Postgres FTS + `pg_trgm`, then Typesense/Meilisearch |
| Auth / tenancy | Hard-coded demo tenant/user | Managed auth (Clerk/Auth.js) orgs + roles |
| Offline store | `localStorage` wrapper | IndexedDB (Dexie) |
| Service worker | Hand-rolled app-shell cache | Workbox precache + Background Sync |
| Sync | `flush()` clears the local queue | Idempotent server reconciliation + conflict handling |

## Layout

```
app/
├── package.json / tsconfig.json / next.config.mjs / .eslintrc.json
├── public/            # manifest, icon, service worker
└── src/
    ├── app/           # routes: / , /pos , /storefront
    ├── components/    # SyncStatus, service-worker registration
    ├── domain/        # tenancy, inventory, pricing, orders
    ├── data/          # repository seam + seed catalog
    └── offline/       # local store + sync queue
```

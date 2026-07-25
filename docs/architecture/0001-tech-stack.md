# 0001 · Platform technology stack

| | |
| --- | --- |
| **Status** | Accepted |
| **Date** | 2026-07-25 |
| **Deciders** | Engineering (initial proposal) |
| **Related** | [MVP scope](../requirements/10-mvp-scope.md) · [NFRs](../requirements/09-non-functional-requirements.md) · [ADR 0002 (offline sync)](./0002-offline-sync.md) |

## Context

We are building the **Card Show Vendor Operations Platform**, a multi-tenant SaaS for
medium-to-large trading-card vendors. The [MVP core workflow](../requirements/10-mvp-scope.md)
is:

> Vendor uploads inventory → assigns inventory to a show → employees search/add cards to
> an order → checkout/order is completed → inventory updates → vendor gets a show report.

Plus a buyer-facing storefront for **online pickup orders** and a secondary buylist
intake workflow.

The technology choices are dominated by a handful of hard product realities and the
[non-functional requirements](../requirements/09-non-functional-requirements.md):

- **Offline-capable POS / price lookup** (`POS-10`–`POS-15`, `PRC-2`). Card-show Wi‑Fi is
  unreliable, so checkout and price lookup must keep working offline, queue transactions,
  show sync status, and resolve conflicts on reconnect. This is the single most
  constraining requirement and is treated in depth in [ADR 0002](./0002-offline-sync.md).
- **Fast search over large catalogs** (`INV-6`, `PRC-1`, `CX-2`). Vendors may hold
  hundreds of thousands of cards; search must feel instant on a tablet.
- **Mobile/tablet-first checkout** (`POS-9`, Usability NFRs). The primary device at a
  booth is a tablet or phone, not a desktop.
- **Multi-tenant SaaS** (Scalability NFRs). Many vendors, each with employees and
  role-based permissions (`POS-8`, Security NFRs).
- **Two front doors**: an authenticated vendor back office / POS, and a public
  buyer-facing storefront (`CX-1`–`CX-6`, `ORD-13`–`ORD-19`).
- **Auditability** (Security NFRs): price overrides and refunds need an audit trail.

We optimize for a **small team shipping an MVP quickly** with a stack that scales, favors
managed infrastructure over undifferentiated ops work, and keeps a single language across
the stack to reduce context switching.

## Decision

Adopt a **TypeScript-everywhere, PostgreSQL-centered** stack, deployed on managed
platforms, with an **offline-first PWA** for the show-floor experience.

### Summary

| Concern | Decision |
| --- | --- |
| Language | **TypeScript** end to end |
| Web app / frontend | **Next.js (App Router) + React**, installable **PWA** |
| Styling / UI | **Tailwind CSS** + a headless component layer (e.g. Radix / shadcn-style) |
| Offline runtime | **Service worker (Workbox)** app shell + **IndexedDB** local store, sync queue |
| Backend / API | **Next.js server (Route Handlers + Server Actions)** with **tRPC** for typed client↔server calls |
| Database | **PostgreSQL** (managed: Neon or Supabase) |
| Data access | **Drizzle ORM** (typed SQL, first-class migrations) |
| Search | **PostgreSQL FTS + `pg_trgm`** for MVP; **Typesense/Meilisearch** when scale demands |
| Auth | **Managed auth provider** (Clerk or Auth.js) with organizations for tenants |
| Multi-tenancy | **Shared DB, shared schema**, `tenant_id` on every row + **Postgres Row-Level Security (RLS)** |
| Background jobs | **Queue + workers** (e.g. Postgres-backed `pg-boss`, or a managed queue) |
| Hosting / deploy | **Vercel** (web/API) + managed Postgres; object storage (S3-compatible) for images/imports |
| Observability | Structured logs + error tracking (Sentry) + uptime checks |

### Rationale by concern

#### Web frontend + offline/PWA (`POS-9`–`POS-15`, `PRC-2`, `CX-*`)

- **Next.js + React** gives us one framework for both the vendor app and the public
  storefront, with server rendering for fast first paint and SEO on the storefront, and
  a rich client app for the POS.
- The vendor POS is shipped as an **installable PWA**: a Workbox-generated **service
  worker** caches the app shell so the register loads instantly and works with no network,
  while **IndexedDB** holds cached inventory/pricing and the outbound transaction queue.
  This directly satisfies "cache inventory and pricing locally" (`POS-11`, `PRC-2`) and
  "continue building carts when Wi‑Fi is spotty" (`POS-10`). Detailed design in
  [ADR 0002](./0002-offline-sync.md).
- **Tablet/phone-first**: React + Tailwind lets us build a low-click, touch-friendly
  checkout (`POS-9`, Usability NFRs) with a visible **sync-status indicator** (`POS-13`).
- A PWA avoids app-store friction and keeps a single codebase across desktop, tablet, and
  phone. A native app can come later if hardware integrations (barcode scanners, receipt
  printers, card readers) demand it — see [Alternatives](#alternatives-considered).

#### Backend / API

- **tRPC over Next.js Route Handlers** gives fully typed, end-to-end calls with zero
  schema drift between client and server — a big velocity win for a small team, and it
  keeps the offline queue's payloads type-safe. Sync/import endpoints that need to be
  called by non-TypeScript clients (or webhooks) are exposed as plain REST Route Handlers.
- Server logic lives in a thin, framework-agnostic **service/domain layer** so it can be
  extracted into a standalone service later if the storefront and POS need independent
  scaling (Scalability NFRs).

#### Database + search (`INV-*`, `PRC-1`, `CX-2`, Scalability NFRs)

- **PostgreSQL** is the system of record: transactional integrity matters for inventory
  decrements, reservations, and payments (`INV-8`, `ORD-15`). It scales to hundreds of
  thousands of rows per tenant comfortably and supports RLS for tenancy.
- **Drizzle ORM** provides typed queries and versioned migrations without hiding SQL —
  important when we later tune indexes for large-catalog search.
- **Search**: start with **Postgres full-text search + `pg_trgm`** (trigram) indexes for
  fuzzy name/set/SKU matching. This is fast enough for MVP catalogs and avoids operating a
  second datastore. When a tenant's catalog or query complexity outgrows it, introduce a
  dedicated search engine (**Typesense** or **Meilisearch**) fed by change events — this is
  an additive step, not a rewrite. The offline price list is a **projection** of catalog +
  pricing synced to IndexedDB for instant client-side lookup (`PRC-2`).

#### Auth + multi-tenancy (Security + Scalability NFRs, `POS-8`)

- Use a **managed auth provider** (Clerk, or Auth.js if we want to self-host identity) so
  we get secure session handling, MFA, and social/email login without building it. Its
  **organization** primitive maps cleanly to a **vendor tenant**, with employees as members
  and roles (owner/admin/employee) driving **role-based permissions** (`POS-8`, Security).
- **Tenancy model: shared database, shared schema** with a mandatory `tenant_id` column on
  every tenant-scoped table, enforced by **Postgres Row-Level Security**. This is the
  cheapest to operate at MVP scale, keeps migrations single-pass, and — with RLS as a
  backstop plus a tenant-scoped data-access layer — gives strong isolation. Schema- or
  database-per-tenant remain future options for large/enterprise tenants without changing
  the app's data model.
- **Audit trail**: an append-only `audit_log` table records price overrides, refunds, and
  permission-sensitive actions (Security NFRs).

#### Offline sync strategy (`POS-10`–`POS-15`, `PRC-2`)

Summarized here, detailed in [ADR 0002](./0002-offline-sync.md):

- **Read path**: pre-show, the client syncs a snapshot of assigned-show inventory and
  pricing into IndexedDB. Lookups and cart building run entirely against local data.
- **Write path**: orders/transactions are written locally first, tagged with a client-
  generated ID and vector/logical clock, and queued. A background sync flushes the queue
  when connectivity returns.
- **Conflict handling**: inventory decrements are reconciled server-side with
  **oversell detection** (`POS-14`) and last-writer/quantity-aware rules (`POS-15`); the UI
  surfaces sync status and any conflicts for staff to resolve (`POS-13`).

#### Hosting / deploy

- **Vercel** for the Next.js web + API (preview deploys per PR, edge/CDN for the
  storefront, zero-config serverless for API routes) plus **managed Postgres** (Neon's
  branching pairs well with preview deploys; Supabase is the alternative if we want auth +
  storage bundled). Object storage (S3-compatible) holds card images and bulk-import files.
- Everything is managed to keep ops burden near zero for a small team, matching the
  Reliability NFRs ("must work during busy show periods") through provider SLAs plus the
  client-side offline fallback.

### Mapping to the MVP core workflow

| MVP step ([10-mvp-scope](../requirements/10-mvp-scope.md)) | How the stack delivers it |
| --- | --- |
| Vendor uploads inventory | Bulk import (CSV) → object storage → background worker → Postgres (`INV-5`); Drizzle migrations define the catalog schema |
| Assign inventory to a show | Show/event tables in Postgres; assignment scopes what the POS syncs offline (`EVT`, `POS-11`) |
| Employees search/add cards | Postgres FTS/`pg_trgm` online; IndexedDB projection offline; React POS cart (`INV-6`, `PRC-1`, `POS-1`) |
| Checkout/order completed | tRPC order mutation online; local queue + service worker when offline (`POS-3`, `POS-10`, `POS-12`) |
| Inventory updates | Transactional decrement + reservation in Postgres; oversell reconciliation on sync (`INV-8`, `POS-14`) |
| Vendor gets show report | SQL aggregate queries over orders scoped by event (`EVT`, basic reports) |
| Online pickup orders | Next.js storefront (SSR) + auth + reservation flow (`CX-*`, `ORD-13`–`ORD-19`) |

### How decisions tie back to the NFRs

| NFR ([09-non-functional](../requirements/09-non-functional-requirements.md)) | Supporting decisions |
| --- | --- |
| **Reliability / offline** | PWA service worker + IndexedDB offline store; queued transactions with visible sync status; managed provider SLAs (ADR 0002) |
| **Performance** | Local-first reads for instant lookup; Postgres FTS/`pg_trgm` (→ Typesense at scale); low-click React POS; CDN-served storefront |
| **Security** | Managed auth + MFA; RLS-enforced tenant isolation; role-based permissions; append-only audit log; secrets in provider vaults |
| **Scalability** | Postgres to hundreds of thousands of cards/tenant; stateless serverless API scales horizontally; search extractable to a dedicated engine; tenancy model has clear upgrade path |
| **Usability** | Tablet/phone-first PWA; installable; clear offline/sync indicators; minimal manual entry via search + scan |

## Consequences

**Positive**

- One language (TypeScript) and one primary datastore (Postgres) keep the surface area
  small and the team fast.
- Offline-first PWA is a genuine differentiator and directly addresses the sharpest pain
  point (show-floor connectivity).
- Managed hosting + managed auth + managed Postgres means minimal ops for the MVP.
- Typed client↔server (tRPC) and typed SQL (Drizzle) reduce whole classes of runtime bugs.

**Negative / risks**

- Offline sync with inventory reconciliation is genuinely hard; it is the top engineering
  risk and gets its own ADR and phased rollout.
- Serverless has cold-start and long-running-job caveats; background work is pushed to a
  queue/worker rather than request handlers.
- Postgres FTS will eventually hit limits for very large catalogs or advanced relevance;
  we accept a later migration to a dedicated search engine.
- Vendor lock-in to Vercel/Neon/Clerk; mitigated by keeping the domain layer
  framework-agnostic and using standard Postgres and web APIs.

## Alternatives considered

- **Native mobile app (React Native / Swift/Kotlin)** instead of a PWA. Better hardware
  access (scanners, printers, card readers) and offline story, but two codebases, app-store
  friction, and slower iteration. A PWA covers the MVP; revisit native for deep hardware
  integrations.
- **Separate SPA (Vite/React) + standalone API (NestJS/Fastify/Go)** instead of Next.js
  full-stack. More separation and independent scaling, but more infrastructure and two
  deploys to run. We keep the domain layer clean so we can split later if needed.
- **Firebase / Supabase-realtime as the offline engine.** Supabase gives Postgres + auth +
  storage in one box (a strong alternative we keep in reserve), but off-the-shelf realtime
  sync does not cleanly handle inventory-oversell reconciliation; we want explicit control
  over conflict rules (ADR 0002).
- **Dedicated sync frameworks (ElectricSQL, PowerSync, RxDB, Replicache).** Very promising
  for local-first apps and worth piloting for the POS. We start with a purpose-built,
  smaller queue so conflict logic is fully under our control and dependencies stay light;
  adopting one later is compatible with this architecture.
- **Database-per-tenant / schema-per-tenant from day one.** Strong isolation but heavier
  migrations and ops at MVP scale. We start shared-schema + RLS and keep the door open for
  large tenants.
- **MongoDB / NoSQL as system of record.** Flexible documents, but we need transactional
  inventory/reservation guarantees and relational reporting, which Postgres handles better.
- **Managed search first (Algolia/Elastic).** Excellent relevance, but adds cost and a
  second datastore before it is needed; Postgres FTS defers that until scale justifies it.

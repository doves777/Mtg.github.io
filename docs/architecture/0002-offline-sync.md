# 0002 · Offline-first sync strategy

| | |
| --- | --- |
| **Status** | Accepted |
| **Date** | 2026-07-25 |
| **Deciders** | Engineering (initial proposal) |
| **Related** | [ADR 0001 (tech stack)](./0001-tech-stack.md) · [POS & Checkout](../requirements/features/04-point-of-sale-checkout.md) · [Pricing](../requirements/features/02-pricing-and-price-lookup.md) · [NFRs](../requirements/09-non-functional-requirements.md) |

## Context

Offline resilience is a **core selling point**, not a nice-to-have. Card-show venues have
unreliable or saturated Wi‑Fi, yet checkout must never stop. The relevant requirements:

- `POS-10` — keep building carts when Wi‑Fi is spotty.
- `POS-11` / `PRC-2` — cache inventory and pricing locally.
- `POS-12` — queue completed transactions for sync once online.
- `POS-13` — clearly show sync status.
- `POS-14` — prevent or flag possible overselling when offline.
- `POS-15` — resolve conflicts when multiple employees sell the same item offline.

The hard part is the **write path**: multiple employees at the same booth (and across
booths) may sell the same physical card while offline, so the server can receive
conflicting inventory decrements after reconnect. We need explicit, auditable conflict
rules rather than opaque "last write wins".

## Decision

Build a **purpose-built, local-first sync layer** for the vendor POS, with an
**authoritative server** that reconciles inventory on reconnect.

### 1. Local store (read + write cache)

- **IndexedDB** is the on-device store (via a thin wrapper such as Dexie). It holds:
  - a **read snapshot**: inventory + pricing for the *assigned show* (scoped by
    `tenant_id` + `show_id`), so lookups are instant and fully offline (`POS-11`, `PRC-2`);
  - an **outbox**: pending orders/transactions and inventory deltas awaiting sync
    (`POS-12`).
- The **service worker** (Workbox) caches the app shell and static assets so the POS loads
  with no network at all. Data lives in IndexedDB, not the cache API.

### 2. Read path (pre-show sync)

- Before a show (or whenever online), the client pulls a snapshot of the show's assigned
  inventory and prices and stores it in IndexedDB, recording a **`syncedAt`** timestamp and
  a server **watermark** (change cursor).
- The UI shows **when offline data was last updated** (`PRC-2` acceptance criteria) and a
  live **sync-status indicator** (`POS-13`): `Online / synced`, `Offline — N queued`,
  `Syncing…`, `Conflicts need review`.

### 3. Write path (local-first, queued)

- Every order is written to IndexedDB **first** and assigned a **client-generated ID**
  (UUID) so it is idempotent on the server and de-duplicates if a sync retries.
- Each write carries: the client ID, `tenant_id`, `show_id`, `employee_id`, a
  **monotonic logical clock / timestamp**, and the **inventory deltas** it implies
  (e.g. `sku X: -1`).
- The client optimistically decrements its **local** available quantity so the same device
  won't oversell, and flags an item locally if its cached quantity would go negative
  (`POS-14`, device-local guard).
- A **background sync** (Workbox Background Sync, with a manual "sync now" fallback) flushes
  the outbox when connectivity returns.

### 4. Server reconciliation + conflict handling

The server is the **source of truth** for inventory. On receiving a queued batch:

1. **Idempotency**: ignore any order whose client ID was already applied.
2. **Apply deltas transactionally** per SKU in Postgres.
3. **Oversell detection** (`POS-14`): if applying a delta would drive available quantity
   below zero, the order still records the sale (money changed hands at the booth) but the
   affected line is **flagged** as an oversell/conflict and the inventory floors at zero.
4. **Conflict record** (`POS-15`): when concurrent offline sales from different devices
   collide on the same SKU, the server writes a **conflict entry** (which orders, which
   SKU, quantities) and returns it to the clients. Reconciliation rule: **all sales are
   preserved** (never silently drop a real transaction); inventory is corrected to reflect
   physical reality and the surplus is surfaced for staff to resolve (e.g. refund, source a
   replacement, or adjust count).
5. Every reconciliation and override is written to the **append-only audit log**
   (Security NFRs).

### 5. Sync-status contract (UI)

The client always reflects one of a small, trustworthy set of states so staff can rely on
it (`POS-13`, Reliability NFRs):

| State | Meaning |
| --- | --- |
| `Synced` | Local snapshot fresh, outbox empty, online |
| `Offline` | No network; reads from cache; writes queued (shows queued count + last-synced time) |
| `Syncing` | Flushing outbox / pulling snapshot |
| `Needs review` | Server reported oversell/conflict entries awaiting staff action |

## Consequences

**Positive**

- Checkout keeps working through total connectivity loss — the headline requirement.
- Client-generated IDs make sync **idempotent and retry-safe**.
- "Preserve all sales, reconcile inventory, surface conflicts" is honest about physical
  reality at a booth and keeps a full audit trail.
- Owning the conflict rules (rather than a generic sync engine) lets us encode
  card-vendor-specific policy (oversell handling, deposits, refunds).

**Negative / risks**

- Custom sync is real engineering effort and must be tested hard (multi-device offline
  simulations, clock skew, partial batches, duplicate flushes).
- IndexedDB snapshots for very large catalogs need scoping (per-show) and possibly paging
  to stay within device storage limits.
- Users must understand the sync indicator; UX writing and training matter.

**Rollout**

1. **Phase 1** — offline **reads** (cached inventory/pricing + app shell) and offline
   **draft** carts that require reconnect to finalize.
2. **Phase 2** — offline **completed** transactions with queue + idempotent sync +
   device-local oversell guard.
3. **Phase 3** — cross-device server reconciliation, conflict records, and the
   "Needs review" resolution UI.

## Alternatives considered

- **Generic local-first sync engines (ElectricSQL, PowerSync, RxDB, Replicache).** Strong
  general solutions and worth piloting; we start purpose-built to keep full control of
  inventory-oversell semantics and to keep dependencies light. This ADR's data model
  (client IDs, deltas, outbox) is compatible with adopting one later.
- **CRDTs for inventory counts.** Elegant for commutative merges, but a card sold twice
  offline is a *physical* conflict, not a mergeable counter — we still need human review, so
  CRDTs would not remove the hard part.
- **"Last write wins".** Simple but silently drops real sales; unacceptable when money
  changed hands.
- **Online-only with a "kiosk cache".** Far simpler, but fails the core `POS-10`
  requirement and the product's main differentiator.

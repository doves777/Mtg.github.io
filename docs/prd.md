# Card Show Vendor Operations Platform — Product Requirements Document (PRD)

| | |
| --- | --- |
| **Status** | Draft |
| **Audience** | Founders, design partners, engineers, advisors |
| **Last updated** | 2026-08-16 |
| **Related** | [Requirements library](./requirements/README.md) · [MVP scope](./requirements/10-mvp-scope.md) · [Roadmap](./requirements/13-roadmap-and-next-steps.md) · [Tech stack ADR](./architecture/0001-tech-stack.md) |

> **How to use this doc:** this is the single shareable overview. Deep requirement IDs, acceptance criteria, and research live under [`docs/requirements/`](./requirements/README.md). Start here; drill down only when you need detail.

---

## 1. Executive summary

**Card Show Vendor Ops** is a SaaS platform for medium-to-large trading-card vendors who sell at shows and conventions. Today those vendors still fight slow price lookup, handwritten or generic-tool order totals, inconsistent pricing across staff, unreliable venue Wi‑Fi, and clunky (or nonexistent) pre-show pickup.

**Wedge:** *offline-capable show-day POS* (fast search → cart → checkout that keeps working when Wi‑Fi dies) plus, next, *online booth pickup* (customers reserve from show inventory and pick up at the booth). Incumbents (BinderPOS/TCGplayer POS, Storepass, Crystal Commerce) are strong at store inventory and buylist but do not combine show-first offline checkout with booth pickup.

**Build strategy:** prove the wedge with a **POC**, harden it into an **MVP** around one end-to-end show workflow, then expand into pickup, buylist, and AI. A runnable tablet POS prototype already exists at `app/` (`/pos`).

---

## 2. Problem

At a busy booth, every second of friction costs a sale.

| Pain | What happens today |
| --- | --- |
| Slow price lookup | Staff dig through binders, spreadsheets, or slow web tools while the line grows |
| Manual order totals | Cards are added by hand or in generic calculators — errors and rework |
| Inconsistent pricing | Different employees quote different prices; overrides go untracked |
| Bad venue Wi‑Fi | Cloud-only POS stalls mid-sale when the network drops |
| Weak show planning | Hard to know what sold, what to bring next time, or what is reserved for pickup |
| Clunky pickup | Online preorders / booth pickup are rare or bolted onto store ecommerce |

**Outcome of the status quo:** slower checkout, pricing mistakes, weaker inventory control, and a worse buyer experience.

---

## 3. Who it's for

### Primary customers

Medium-to-large trading-card vendors who:

- Sell at card shows, conventions, and live events
- Run multi-person booths with large inventories
- Need fast, consistent lookup and checkout
- Want (or will want) online orders for event pickup

### Secondary (later)

Local shops that also vend at shows · online sellers who do events · multi-location collectible businesses

### Users

| Role | Job to be done |
| --- | --- |
| **Vendor owner / admin** | Load inventory, set show context, control permissions, see what sold |
| **Employee / associate** | Search fast, build carts, quote accurately, finish sales under pressure |
| **Customer / buyer** | Browse show inventory ahead of time, reserve for booth pickup *(post-POC)* |

---

## 4. Product vision

A modern, tablet-first operations platform for show vendors:

1. **Inventory** that knows *where* cards are (warehouse vs. this show’s booth)
2. **Pricing & lookup** that feels instant — including offline
3. **Orders & POS** that complete in seconds, with queued sync when reconnecting
4. **Show mode** that scopes inventory, sales, and reports to an event
5. **Booth pickup** so buyers shop the booth before they arrive
6. Later: buylist/trade-in, store credit, merchandising storefront, AI recommendations

**North-star promise (pick one for GTM; POC validates #2 + #1):**

- "Never manually total a customer order again."
- "Run your card show booth even with bad Wi‑Fi."
- "Let customers preorder from your booth inventory."
- "Know exactly what sold and what to bring next time."

**Recommended positioning for POC → MVP:** start with show-mode inventory + fast order building + offline pricing; add online booth pickup as the first major differentiator after the POC is proven.

---

## 5. Competitive context (short)

| Competitor | Strength | Gap we exploit |
| --- | --- | --- |
| **BinderPOS / TCGplayer POS** | Inventory, buylist, multichannel | Cloud-required; no offline; booth-pickup not first-class |
| **Storepass** | Fast TCG POS, buylist, events on Shopify | No offline advertised; Shopify stack cost/complexity |
| **Crystal Commerce** | Multichannel catalog + web POS | Dated UX; no offline; weak show-first flow |
| **Square / Shopify** | Excellent generic POS / commerce | Not card-native (sets, conditions, foil, sealed, buylist) |

**Whitespace (from desk research — confirm in discovery):** offline lookup + orders for card tools; booth-pickup-at-show as a first-class workflow; demand/velocity pricing recommendations; modern show-fast UX.

Full matrix: [`docs/requirements/competitive-review.md`](./requirements/competitive-review.md).

---

## 6. Build phases — POC first

We do **not** build the full MVP on day one. Phases are gated by learning.

```
POC  →  validate show-day speed + offline
MVP  →  one complete vendor show workflow
V1+  →  pickup, buylist, payments, AI, storefront
```

### Phase 0 — Customer discovery (parallel with POC)

Interview ~10–20 vendors (kit in [`discovery/`](./requirements/discovery/README.md)). Confirm:

- How they look up prices and total orders today
- How often Wi‑Fi fails them at shows
- Whether they would pay for offline + faster checkout
- Willingness to import inventory / switch tools

**Exit:** written findings that either reinforce or reshape the POC/MVP cut line.

---

### Phase 1 — Proof of Concept (POC)

**Goal:** Demo a believable show booth on a tablet: search → cart → cash/card checkout → receipt, including completing a sale while offline and syncing when back online.

| | In POC | Out of POC |
| --- | --- | --- |
| Catalog | Seeded inventory (e.g. MTG singles + sealed) with images | Bulk CSV import, multi-tenant auth, production DB |
| Search | Fast name/keyword search over a local snapshot | Barcode/SKU perfection, Postgres FTS, Typesense |
| Cart / checkout | Qty, tax, cash/card tender, receipt | Split tender, hardware (printer/drawer), real payments |
| Offline | Cached catalog, queued orders, visible sync status | Multi-device conflict resolution at production rigor |
| Show context | Hard-coded or simple “current show / booth” | Full event CRUD, inventory assignment UI |
| Buyer surface | Optional stub only | Real online booth pickup |
| Buylist / AI / store credit | — | Later |

**POC success criteria (must all pass):**

- [ ] An employee can find a card and complete a sale in under ~30 seconds on a tablet-sized viewport
- [ ] Checkout still works with the network offline; queued sales are visible
- [ ] Coming back online flushes the queue (even if sync is stubbed) without losing the order
- [ ] A non-technical vendor can understand the demo in one booth walkthrough
- [ ] We can list concrete “next three gaps” before calling it an MVP

**Starting point in-repo:** Next.js scaffold + convention POS at [`app/`](../app/README.md) → `http://localhost:3000/pos` (in-memory + local store; zero external services).

**POC non-goals:** production multi-tenancy, real payment capture, full inventory import, buyer accounts, buylist, AI pricing.

---

### Phase 2 — MVP

**Core workflow to ship:**

> Vendor uploads inventory → assigns inventory to a show → employees search/add cards to an order → checkout completes → inventory updates → vendor gets a show report.

| Must-have | Why |
| --- | --- |
| Inventory database (add/import; qty, condition, price, location) | Nothing else works without it |
| Fast card lookup | Show-day speed |
| Order builder + auto totals + discounts | Kill manual totaling |
| Offline price list + draft/complete orders + sync | The wedge vs. card incumbents |
| Event / show mode | Scope inventory and sales to the booth |
| Online booth pickup (queue + fulfill) | First major differentiator after POC |
| Basic show reports | “What sold / what to bring next” |

**Should-haves (stretch):** employee permissions · order status · customer profiles · bulk import/export · override audit trail · basic pricing *recommendations* (not auto-price) · light buylist intake.

**Explicitly later:** integrated card payments as a platform, full dynamic pricing engine, want-list matching, marketplace-by-show, customer mobile app, advanced analytics/forecasting, grading/accounting integrations, store credit (`SC`), full merchandising storefront (`STF`).

Detail: [`10-mvp-scope.md`](./requirements/10-mvp-scope.md).

**MVP success criteria:**

- [ ] A design-partner vendor can run one real (or shadow) show day primarily on the product
- [ ] Offline sales sync without silent inventory loss; conflicts are visible
- [ ] At least one buyer completes a pre-show pickup reservation and collects at the booth
- [ ] Post-show report answers: total sales, top sellers, sold vs. unsold for that event

---

### Phase 3 — Expand (post-MVP)

Prioritize from discovery + usage, not from a feature wishlist:

1. **Buylist / trade-in** — acquisition loop tied to inventory
2. **Payments & hardware** — terminals, printers, drawers, split tender
3. **AI assists** — pricing *recommendations*, demand hints (vendor always in control)
4. **Store credit & accounts** · richer **storefront / merchandising**
5. Multi-game catalog depth, marketplace experiments, advanced analytics

---

## 7. Functional requirements (shareable map)

Stable IDs live in the feature docs. This table is the map for sharing.

| Area | Prefix | POC | MVP | Later |
| --- | --- | --- | --- | --- |
| Inventory | `INV` | Seeded / simple edit | Import, locations, show assignment | Advanced variants, grading hooks |
| Pricing & lookup | `PRC` | Fast local search + cached prices | Offline cache freshness, overrides | Dynamic / AI recommendations |
| Orders | `ORD` | Complete sale + queue | Full order lifecycle + pickup | Deposits, complex fulfillment |
| POS / checkout | `POS` | Tablet cart, tender, offline queue | Permissions, sync status, oversell flags | Hardware, split tender, store credit tender |
| Shows / events | `EVT` | Demo show context | Assign inventory, event sales | Multi-booth / marketplace |
| Customer / pickup | `CX` | Stub optional | Browse + reserve + pickup instructions | Mobile app, want-lists |
| Buylist / trade-in | `BUY` | — | Light intake (should-have) | Full optimization, approvals |
| Store credit | `SC` | — | — | Ledger, gift cards |
| Storefront | `STF` | — | — | Merchandising, kiosk |

Non-functional targets (reliability, performance, security, tenancy): [`09-non-functional-requirements.md`](./requirements/09-non-functional-requirements.md).

---

## 8. Technical direction (summary)

Chosen for a small team shipping fast, with offline as a first-class constraint ([ADR 0001](./architecture/0001-tech-stack.md), [ADR 0002](./architecture/0002-offline-sync.md)):

| Concern | Choice |
| --- | --- |
| Language | TypeScript end-to-end |
| App | Next.js (App Router) + React, installable **PWA** |
| Offline | Service worker app shell + **IndexedDB** snapshot & outbox |
| API | tRPC / Next server; typed client↔server |
| Data | PostgreSQL (managed) + Drizzle; `tenant_id` + RLS |
| Search | Postgres FTS + `pg_trgm` first; dedicated search later |
| Auth | Managed auth with org-based multi-tenancy |
| Hosting | Vercel + managed Postgres |

**POC may keep stubs** (in-memory repo, `localStorage` queue). MVP replaces stubs along the seams already sketched in `app/src/{domain,data,offline}/`.

---

## 9. Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Incumbents already cover store POS / buylist | Lead with **show-day offline + booth pickup**; don’t out-buylist Storepass on day one |
| Messy card data (variants, conditions, finishes) | Pragmatic MTG-first data model; expand attributes from real inventory files |
| Offline multi-device conflicts | Tight POC scope (single register OK); explicit conflict UX in MVP ([ADR 0002](./architecture/0002-offline-sync.md)) |
| Vendors won’t migrate inventory | Invest early in import; demo value *before* asking for a full catalog |
| “Offline” means different things to buyers | Define clearly: *offline lookup + offline complete sale + sync on reconnect* |
| Dynamic pricing scares owners | Recommendations only; human approval |

---

## 10. Open decisions

Resolve these with discovery + POC feedback (also listed in the [roadmap](./requirements/13-roadmap-and-next-steps.md)):

1. **Which market first?** Sports cards · TCGs (MTG-first is the current prototype) · all trading cards
2. **MVP promise line** — which of the four north-star phrases is the homepage headline?
3. **Payments in MVP?** Track tender only vs. integrate Square/Stripe Terminal
4. **Pickup timing** — ship with MVP or immediately after first paid design partner?
5. **Pricing model** — flat SaaS vs. per-register vs. % of show GMV (hypothesis only until discovery)

---

## 11. One-page partner brief

> We are building a SaaS platform for medium-to-large card show vendors that modernizes inventory, pricing, order management, and show pickup workflows. The initial wedge is faster show operations: inventory lookup, order building, offline pricing, and (next) booth pickup orders. Longer term we expand into AI pricing recommendations, demand forecasting, customer want-list matching, and event-based commerce.
>
> **Right now we are proving a POC:** a tablet booth POS that completes sales with bad Wi‑Fi. If that resonates in vendor demos and discovery interviews, we harden it into an MVP around a single show workflow and onboard design partners.

---

## 12. Doc map (go deeper)

| Need | Doc |
| --- | --- |
| Vision & users | [`requirements/00-product-overview.md`](./requirements/00-product-overview.md) |
| Feature requirements + AC | [`requirements/features/`](./requirements/features/) |
| MVP cut line | [`requirements/10-mvp-scope.md`](./requirements/10-mvp-scope.md) |
| User stories | [`requirements/11-user-stories.md`](./requirements/11-user-stories.md) |
| Risks | [`requirements/12-risks.md`](./requirements/12-risks.md) |
| Sequencing | [`requirements/13-roadmap-and-next-steps.md`](./requirements/13-roadmap-and-next-steps.md) |
| Competitive scores | [`requirements/competitive-review.md`](./requirements/competitive-review.md) |
| Interview kit | [`requirements/discovery/`](./requirements/discovery/README.md) |
| Architecture | [`architecture/`](./architecture/README.md) |
| Runnable POS prototype | [`app/README.md`](../app/README.md) |

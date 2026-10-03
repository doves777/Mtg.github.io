# Feature & ideas inventory

Pull-back view of **every feature and idea we have touched so far** — not a second requirements library.

| | |
| --- | --- |
| **Board** | [Card Show Vendor Ops — Ideas](https://github.com/users/doves777/projects/1) (49 feature cards; filter by Horizon / Area) |
| **Canonical detail** | [Requirements library](./requirements/README.md) (IDs + AC) |
| **Shareable overview** | [PRD](./prd.md) (POC → MVP → expand) |
| **Cut line** | [MVP scope](./requirements/10-mvp-scope.md) |

**How to use:** skim this page or the GitHub board (group by Horizon). Click through to a feature doc when you need acceptance criteria. Do not copy requirements into a parallel tree.

**Wedge:** offline-capable show-day POS, then online booth pickup. First live shows are Pokémon.

---

## POC — prove the wedge

Demo a believable tablet booth: search → cart → checkout, including a sale while offline.

| Idea | IDs | Where |
| --- | --- | --- |
| Seeded catalog + simple inventory edit | `INV-1`, `INV-2`, `INV-3`, `INV-8` | [Inventory](./requirements/features/01-inventory-management.md) |
| Fast price lookup | `PRC-1` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| Offline price list | `PRC-2` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| In-person order builder (add lines, totals, receipts) | `ORD-1`, `ORD-2`, `ORD-3`, `ORD-4`, `ORD-11` | [Orders](./requirements/features/03-order-management.md) |
| Tablet POS cart, tender tracking, receipts | `POS-1`–`POS-4`, `POS-6`, `POS-9` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Offline carts, local cache, queued sync, visible status | `POS-10`–`POS-13` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Demo / hard-coded show context | `EVT-1` (stub) | [Events](./requirements/features/05-show-event-management.md) |
| Offline-first PWA (service worker + IndexedDB outbox) | — | [ADR 0002](./architecture/0002-offline-sync.md) |
| Runnable `/pos` prototype | — | [app/README](../app/README.md) |

---

## MVP — one complete vendor show workflow

> Upload inventory → assign to a show → search/add to order → checkout → inventory updates → show report. Then booth pickup as the first major differentiator.

| Idea | IDs | Where |
| --- | --- | --- |
| Inventory import, locations, show assignment | `INV-5`, `INV-7`, `INV-10` | [Inventory](./requirements/features/01-inventory-management.md) |
| Multi-game categories (Pokémon first, then MTG and others) | `INV-4` | [Inventory](./requirements/features/01-inventory-management.md) · [Pokémon model](./architecture/data-model/card-pokemon.md) |
| Pricing rules, condition pricing, overrides | `PRC-3`, `PRC-4`, `PRC-6` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| Order status + search | `ORD-5`, `ORD-8` | [Orders](./requirements/features/03-order-management.md) |
| Online booth pickup lifecycle | `ORD-13`–`ORD-19` | [Orders](./requirements/features/03-order-management.md) |
| Refunds and returns | `POS-7` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Oversell flags + multi-device conflict resolution | `POS-14`, `POS-15` | [POS](./requirements/features/04-point-of-sale-checkout.md) · [ADR 0002](./architecture/0002-offline-sync.md) |
| Event profiles, assign inventory, track sales by event | `EVT-1`, `EVT-2`, `EVT-4` | [Events](./requirements/features/05-show-event-management.md) |
| Event sales reports (what sold / what to bring next) | `EVT-6` | [Events](./requirements/features/05-show-event-management.md) |
| Pickup windows + publish booth inventory | `EVT-7`, `EVT-8` | [Events](./requirements/features/05-show-event-management.md) |
| Customer browse, search, reserve, status, instructions | `CX-1`–`CX-5` | [Customer](./requirements/features/06-customer-experience.md) |
| Auth + org multi-tenancy (`tenant_id` + RLS) | — | [ADR 0001](./architecture/0001-tech-stack.md) |
| Managed Postgres (Neon + Drizzle) beyond the in-memory stub | — | [Database hosting](./architecture/database-hosting.md) |
| Reliability, speed, tablet UX, security, scale | NFRs | [NFRs](./requirements/09-non-functional-requirements.md) |

---

## Should-have — stretch after the core loop

| Idea | IDs | Where |
| --- | --- | --- |
| Barcode / SKU / QR lookup | `INV-6` | [Inventory](./requirements/features/01-inventory-management.md) |
| Low-stock / sold-out flags | `INV-9` | [Inventory](./requirements/features/01-inventory-management.md) |
| Managed TCG catalog (don't hand-enter every card) | `INV-11` | [Inventory](./requirements/features/01-inventory-management.md) |
| Bulk import/export polish | `INV-5` | [Inventory](./requirements/features/01-inventory-management.md) |
| Bulk price updates; price history | `PRC-5`, `PRC-8` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| Employee assignment, notes, export, split/merge | `ORD-6`, `ORD-7`, `ORD-10`, `ORD-12` | [Orders](./requirements/features/03-order-management.md) |
| Employee permissions for discounts / overrides | `POS-8` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Show-specific pricing; employee activity by event; pre-show prep | `EVT-3`, `EVT-5`, `EVT-9` | [Events](./requirements/features/05-show-event-management.md) |
| Guest vs account checkout | `CX-6` | [Customer](./requirements/features/06-customer-experience.md) |
| Customer profiles | `ORD-9`, `SC-9` | [Orders](./requirements/features/03-order-management.md) · [Store credit](./requirements/features/08-store-credit-and-accounts.md) |
| Basic buylist intake (quote → approve → add to inventory) | `BUY-1`, `BUY-4`, `BUY-5`, `BUY-7`, `BUY-12`, `BUY-13` | [Buylist](./requirements/features/07-buying-tradein-buylist.md) |
| Buylist rules + scalable / offline buy prices | `BUY-8`–`BUY-11` | [Buylist](./requirements/features/07-buying-tradein-buylist.md) |
| Basic AI pricing recommendations (human approval) | `PRC-11`, `PRC-12` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) · [AI](./requirements/08-ai-capabilities.md) |
| Vendor interviews (~10–20) | — | [Discovery](./requirements/discovery/README.md) |

---

## Later — expand after MVP

Do not build these on day one. Prioritize from discovery + usage.

### Selling, payments, hardware

| Idea | IDs | Where |
| --- | --- | --- |
| Graded-card pricing; price locking; channel pricing | `PRC-7`, `PRC-9`, `PRC-10` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| Full dynamic pricing engine + multi-source rules | `PRC-11`–`PRC-17` | [Pricing](./requirements/features/02-pricing-and-price-lookup.md) |
| Preorders for upcoming releases | `ORD-20` | [Orders](./requirements/features/03-order-management.md) |
| Partial payments / deposits | `POS-5` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Integrated card payments (Square/Stripe Terminal) | `POS-4` (real capture) | [POS](./requirements/features/04-point-of-sale-checkout.md) · [MVP scope](./requirements/10-mvp-scope.md) |
| Split tender, tills/registers, POS hardware | `POS-16`–`POS-18` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Store credit as tender | `POS-19` | [POS](./requirements/features/04-point-of-sale-checkout.md) |
| Day-one new-set product creation | `INV-12` | [Inventory](./requirements/features/01-inventory-management.md) |

### Buying, credit, storefront

| Idea | IDs | Where |
| --- | --- | --- |
| Customer-submitted sell lists; cash vs credit; consignment | `BUY-2`, `BUY-3`, `BUY-6`, `BUY-14` | [Buylist](./requirements/features/07-buying-tradein-buylist.md) |
| Dynamic buylist recommendations | `BUY-15`–`BUY-20` | [Buylist](./requirements/features/07-buying-tradein-buylist.md) |
| Decklist/bulk buylist + storefront “Sell to Us” | `BUY-21`–`BUY-23` | [Buylist](./requirements/features/07-buying-tradein-buylist.md) |
| Store-credit ledger, gift cards, audit trail | `SC-1`–`SC-8` | [Store credit](./requirements/features/08-store-credit-and-accounts.md) |
| Customer storefront: search, merchandising, SEO | `STF-1`–`STF-3`, `STF-11` | [Storefront](./requirements/features/09-storefront-and-merchandising.md) |
| Deck-list builder, restock alerts, recs, recently viewed | `STF-4`, `STF-6`, `STF-7`, `STF-10` | [Storefront](./requirements/features/09-storefront-and-merchandising.md) |
| Booth availability + preorders on the storefront | `STF-8`, `STF-9` | [Storefront](./requirements/features/09-storefront-and-merchandising.md) |
| In-store self-service kiosk | `STF-12` | [Storefront](./requirements/features/09-storefront-and-merchandising.md) |
| Want lists / favorites | `CX-7` | [Customer](./requirements/features/06-customer-experience.md) |

### AI

| Idea | Where |
| --- | --- |
| Inventory cleanup (categorize, duplicates) | [AI](./requirements/08-ai-capabilities.md) |
| Sales / event summaries; “what changed since last show” | [AI](./requirements/08-ai-capabilities.md) |
| Want-list matching; NL pickup cart (“Charizard under $50”) | [AI](./requirements/08-ai-capabilities.md) |
| Buylist pricing recommendations | [AI](./requirements/08-ai-capabilities.md) |
| Demand forecasting; restock; employee insights | [AI](./requirements/08-ai-capabilities.md) |

### Other expand ideas (from MVP later-list)

| Idea | Where |
| --- | --- |
| Marketplace by card show | [MVP scope](./requirements/10-mvp-scope.md) · [Events open Qs](./requirements/features/05-show-event-management.md) |
| Customer mobile app | [MVP scope](./requirements/10-mvp-scope.md) |
| Advanced analytics | [MVP scope](./requirements/10-mvp-scope.md) |
| Grading company integrations | [MVP scope](./requirements/10-mvp-scope.md) |
| Accounting integrations | [MVP scope](./requirements/10-mvp-scope.md) |
| Multi-currency / localization | [NFRs](./requirements/09-non-functional-requirements.md) |

---

## Already captured (docs / scaffold)

These are not net-new ideas — they already exist in-repo and are on the board as Done so we do not rediscover them.

| Idea | Where |
| --- | --- |
| Shareable PRD | [docs/prd.md](./prd.md) |
| Competitive review + Storepass parity map | [competitive-review](./requirements/competitive-review.md) · [Storepass](./requirements/competitor-parity-storepass.md) |
| Discovery kit (screener, guide, notes, tracker) | [discovery](./requirements/discovery/README.md) |
| Pokémon singles + sealed selling models | [data-model](./architecture/data-model/) |
| MTG singles + sealed selling models | [data-model](./architecture/data-model/) |
| Tech stack + offline sync ADRs | [architecture](./architecture/README.md) |
| Neon / Drizzle how-to | [database-hosting](./architecture/database-hosting.md) |

---

## Open decisions (still unresolved)

From the [PRD](./prd.md) and [roadmap](./requirements/13-roadmap-and-next-steps.md):

1. Which market first? (Pokémon live shows are the current bet; MTG is the older prototype.)
2. Which north-star promise is the homepage headline?
3. Payments in MVP: tender tracking only vs Square/Stripe Terminal?
4. Pickup: ship with MVP, or right after the first design partner?
5. Pricing model: flat SaaS vs per-register vs % of show GMV?

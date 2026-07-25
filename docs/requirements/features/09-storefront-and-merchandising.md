# 09 · Storefront & Merchandising

> A customer-facing online store (and in-store kiosk) that turns a vendor's catalog into a fast, discoverable shopping and selling experience.

| | |
| --- | --- |
| **Area** | Storefront (`STF`) |
| **Priority** | Medium (buyer-facing depth; grows after core ops) |
| **MVP** | Later (buyer browse + pickup for MVP is covered in `CX`/`ORD`) |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Competitors (e.g. Storepass, BinderPOS) win repeat business with a strong buyer-facing storefront: specialized card search, merchandising, deck workflows, restock alerts, and "sell to us" journeys. This doc captures those buyer-facing surfaces. It builds on [Customer Experience](./06-customer-experience.md) (browsing/pickup), and connects to [Store Credit](./08-store-credit-and-accounts.md) and [Buying/Buylist](./07-buying-tradein-buylist.md).

## Requirements

- [ ] **STF-1** — Provide a customer-facing storefront to browse and buy the vendor's inventory online.
- [ ] **STF-2** — Advanced catalog search: filter by game, set, rarity, finish, condition, price, and location, with typo-tolerant/fuzzy matching.
- [ ] **STF-3** — Faceted navigation, curated/smart landing pages, and menus that scale to large catalogs.
- [ ] **STF-4** — Deck-list builder: paste a decklist to add many cards to a cart (or a buylist) at once.
- [ ] **STF-5** — "Sell to Us" entry points that start a buylist submission from a product page or search result (see [`BUY`](./07-buying-tradein-buylist.md)).
- [ ] **STF-6** — Back-in-stock / restock alerts and want-list notifications.
- [ ] **STF-7** — Product recommendations and upsells (related cards, deck-synergy suggestions).
- [ ] **STF-8** — Show local/booth availability and per-event pickup inventory on the storefront (see [`EVT`](./05-show-event-management.md)/[`ORD`](./03-order-management.md)).
- [ ] **STF-9** — List preorders for upcoming releases on the storefront (see `ORD-20`).
- [ ] **STF-10** — Recently viewed items plus saved favorites/want lists (see [`CX`](./06-customer-experience.md)).
- [ ] **STF-11** — Configurable storefront theme, branding, banners, and SEO metadata.
- [ ] **STF-12** — In-store self-service **kiosk**: customers search inventory, build a cart, view store-credit context, and start buylist submissions, then hand off to staff to complete.

## Acceptance Criteria

> Add acceptance criteria per requirement using its ID.

### STF-4 — Deck-list builder
- [ ] Customer can paste a decklist and the system matches lines to available products.
- [ ] Matched cards can be added to a cart (or buylist) in one action, with unmatched lines flagged.

_Add more acceptance criteria here (e.g. `STF-2` search, `STF-12` kiosk)._

## Open Questions

- Do we host the storefront ourselves, or integrate with Shopify/BigCommerce like incumbents?
- Is the kiosk a separate mode of the same app, or a distinct surface?
- How much merchandising (smart pages, upsells) belongs in MVP vs. later?

## Additional Details

_Add search/indexing approach, storefront IA, kiosk flows, and merchandising rules here._

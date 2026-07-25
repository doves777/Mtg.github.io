# Competitor Feature Parity — Storepass

Goal: ensure our requirements cover **every feature Storepass documents/markets**, so we don't discover gaps late. Each Storepass capability below is mapped to our requirement ID(s) with a coverage status.

| | |
| --- | --- |
| **Competitor** | [Storepass](https://storepass.co/) (TCG/hobby store software; Shopify/BigCommerce-based) |
| **Status** | First pass |
| **Last updated** | 2026-07-25 |
| **Owner** | _TBD_ |

> **Source note:** the specific docs page shared (`storepass.co/support/documentation/9WGieg3RRr`) is a client-rendered JavaScript app and could not be read directly. This mapping is compiled from Storepass's public **feature pages** (`/features/point-of-sale`, `/features/buylist`, `/features/product-catalog`), a support **doc article** (Variable Store Credit Amounts), **plan tiers**, and their **six-platform comparison** (dated 2026-07-17). If you can paste the exact contents of any docs article I couldn't render, I'll reconcile it against this table.

## Legend

- **Covered** — an existing requirement already addresses it.
- **Added** — a new requirement was added in this pass (ID noted).
- **Partial** — related requirement exists but may need refinement.

## Feature mapping

### Point of Sale
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Fast product search at POS on any device (desktop/laptop/tablet) | `POS-1`, `PRC-1`, `INV-6`, `POS-9` | Covered |
| Location-aware inventory / stock visible at checkout | `INV-7`, `INV-2` | Covered |
| Filter by product line, set, rarity, finish, condition, location | `PRC-17`, `STF-2` | Added |
| Choose exact printing & condition at POS | `INV-3` | Covered |
| Split tender (cash + card + store credit in one sale) | `POS-16` | Added |
| Multiple tills, per-till/cashier tracking, change due | `POS-17` | Added |
| Hardware: receipt printer, cash drawer, barcode scanner, terminal | `POS-18` | Added |
| Apply buylist trade-in value at checkout | `BUY-22`, `POS-16` | Added |
| Apply/redeem store credit at checkout; balance visible | `POS-19`, `SC-3`, `SC-4` | Added |
| Multi-location tills and reporting | `POS-17`, `EVT-6` | Added |
| Commander/deck synergy upsell suggestions | `STF-7` | Added |

### Kiosk
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Self-service catalog search kiosk | `STF-12` | Added |
| Customer builds cart → hands off to staff | `STF-12` | Added |
| Buylist entry points from kiosk | `STF-12`, `BUY-23` | Added |

### Buylist & Trade-In
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Customer-facing buylist storefront | `BUY-2`, `STF-5` | Covered/Added |
| Submit one card, paste decklist, or bulk build | `BUY-21`, `STF-4` | Added |
| Cash and store-credit offers | `BUY-3`, `BUY-17`, `SC-5` | Covered/Added |
| Trade-in bonuses / credit higher than cash | `BUY-22`, `SC-5` | Added |
| Custom buylist lines (bulk, minis, games, etc.) | `BUY-8` | Covered |
| Buylist pricing rules by line; percent or fixed; per-condition | `BUY-8`, `BUY-16`, `PRC-17` | Covered/Added |
| Staff review: inspect, adjust condition, approve/deny/counter | `BUY-6`, `BUY-12` | Covered |
| Issue Shopify store credit from review | `SC-2`, `BUY-14` | Added/Covered |
| Accepted cards flow into inventory | `BUY-7` | Covered |
| "Sell to Us" buttons on product pages | `BUY-23`, `STF-5` | Added |
| Variable store-credit amounts (global + rule/condition overrides) | `SC-5`, `BUY-22` | Added |
| Bulk buylist submission | `BUY-21` | Added |
| Multilanguage buylist | NFR (i18n) | Added |

### Catalog & Product Data
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Managed catalogs for major TCGs (MTG, Pokémon, One Piece, Lorcana, etc.) | `INV-11`, `INV-4` | Added/Covered |
| Day-one product creation for new sets / release workflows | `INV-12` | Added |
| Automatic vs. manual product creation | `INV-12` | Added |
| Custom/other product lines | `INV-12`, `BUY-8` | Added/Covered |
| CSV and scanner-format import | `INV-5`, `INV-6` | Covered |
| Structured data → titles, SKUs, tags, variants, metadata | `INV-11`, `STF-11` | Added |

### Pricing & Automation
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Automated pricing tracking volatile market prices | `PRC-11`, `PRC-3` | Covered |
| Price sources: market, median, low + shipping, custom | `PRC-16` | Added |
| Advanced rule conditions | `PRC-17` | Added |
| Bulk price refresh / offer-price refresh | `PRC-8` | Covered |
| Avoid overpaying (buylist) / underpricing (retail) | `BUY-15`, `PRC-14` | Covered |

### Search & Storefront
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Customer-facing storefront to browse/buy | `STF-1`, `CX-1` | Added/Covered |
| Search by game/set/rarity/finish/condition; typo tolerance | `STF-2`, `CX-2` | Added/Covered |
| Faceted navigation, smart landing pages, mega menus | `STF-3` | Added |
| Deck-list builder cart | `STF-4` | Added |
| Restock / back-in-stock alerts | `STF-6` | Added |
| Recommendations & upsells | `STF-7` | Added |
| Recently viewed; favorites/want lists | `STF-10`, `CX-7` | Added/Covered |
| Themes, branding, banners, SEO | `STF-11` | Added |
| Local/booth availability on storefront | `STF-8`, `EVT-8` | Added/Covered |
| Preorder listings (sell day-one) | `ORD-20`, `STF-9` | Added |

### Store Credit & Accounts
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Store-credit balance per customer | `SC-1` | Added |
| Issue credit from buylist/refunds/promos/manual | `SC-2` | Added |
| Redeem credit as tender (POS + online) | `SC-3`, `POS-19` | Added |
| Balance visible at checkout & buylist review | `SC-4` | Added |
| Store-credit continuity across online + in-store | `SC-7` | Added |
| Gift cards | `SC-6` | Added |
| Customer profiles / history | `SC-9`, `ORD-9` | Added/Covered |

### Multi-location, Channels & Platform
| Storepass feature | Requirement(s) | Status |
| --- | --- | --- |
| Back-office location stock + storefront location filters | `INV-7`, `STF-8` | Covered/Added |
| Multi-location operations | `EVT` area, `POS-17`, NFR scalability | Covered |
| Multi-currency / multi-language | NFR (i18n) | Added |
| Reporting (tills, sales, multi-location) | `EVT-6`, MVP reports | Covered |

## Gaps closed in this pass

New areas/requirements added so we match Storepass's documented surface:

- **New docs:** [Store Credit & Customer Accounts](./features/08-store-credit-and-accounts.md) (`SC-1`–`SC-9`) and [Storefront & Merchandising](./features/09-storefront-and-merchandising.md) (`STF-1`–`STF-12`).
- **Inventory:** managed card catalog + day-one new-set creation (`INV-11`, `INV-12`).
- **Pricing:** multiple price sources and advanced rule conditions (`PRC-16`, `PRC-17`).
- **Orders:** preorders for upcoming releases (`ORD-20`).
- **POS:** split tender, till/register management, hardware, store-credit tender (`POS-16`–`POS-19`).
- **Buying:** decklist/bulk submission, cash-vs-credit variability, storefront "Sell to Us" (`BUY-21`–`BUY-23`).
- **NFR:** multi-currency, multi-language, retail hardware support.

## Deliberately *not* adopted (yet)

These Storepass positions are intentional non-goals for now given our **offline-first, show-day** wedge — revisit later:

- Hard dependency on Shopify/BigCommerce as the commerce foundation (we're evaluating our own stack — see [ADR 0001](../architecture/0001-tech-stack.md)).
- Deep general-hobby breadth beyond cards (board games, comics, minis) — Crystal Commerce's angle, not ours yet.

## Open follow-ups

- Reconcile against the exact contents of the shared docs article once it can be read (paste it in).
- Decide MVP vs. later for `SC` and `STF` items (most storefront/merchandising depth is post-MVP).

# Data Model — MTG Single Card (selling)

A selling-focused data model for a **Magic: The Gathering** single card, populated from a TCGplayer listing for *Oko, the Ringleader* (Outlaws of Thunder Junction).

> **Scope:** we're just selling, so gameplay/**oracle** data (rules text, abilities, loyalty, power/toughness, keywords, legalities, rulings) is intentionally omitted. We keep only what's needed to catalog, search, and sell. A couple of optional attributes are noted purely for storefront filtering.

| | |
| --- | --- |
| **Status** | Draft / for discussion |
| **Product type** | `single_card` |
| **Related** | Product model + shared inventory layer ([data-model README](./README.md)); Inventory [`INV-3`/`INV-11`](../../requirements/features/01-inventory-management.md), Pricing [`PRC`](../../requirements/features/02-pricing-and-price-lookup.md) |
| **Last updated** | 2026-07-25 |

## Two layers

1. **Product (single card = a printing)** — the catalog identity of one printed version. One record per printing; *Oko* has many ("All versions").
2. **Inventory item** — a vendor's physical copy for sale (condition, price, qty, location). Shared shape across product types — see the [shared inventory layer](./README.md#shared-inventory-item). Graded singles are unique (qty 1).

## Example (from the shared listing)

> Source: TCGplayer product page for *Oko, the Ringleader* — OTJ.

### Product — single card (printing)
| Field | Example | Source | Notes / requirement |
| --- | --- | --- | --- |
| `productId` | _(uuid)_ | internal | |
| `productType` | `single_card` | — | |
| `game` | `MTG` | image (category) | |
| `name` | Oko, the Ringleader | image | |
| `setName` | Outlaws of Thunder Junction | image | |
| `setCode` | `OTJ` | image | |
| `collectorNumber` | `223` | image (`#`) | card shows `M 0223` |
| `rarity` | `mythic` | image (Rarity: M) | `INV-3` |
| `artist` | Magali Villeneuve | image | |
| `finishes` | `["nonfoil","foil"]` | domain | finishes this printing comes in |
| `variant` / `promoTypes` | `null` (base); e.g. `borderless`, `showcase` | image ("All versions") | `INV-3` |
| `language` | `en` | image (`EN`) | multi-language: NFR i18n |
| `releasedAt` | `2024` | image (© 2024 WotC) | `INV-11` |
| `imageUrl` | _(url)_ | image | |
| `externalIds` | `{ tcgplayerId, scryfallId }` | integration | catalog sync `INV-11` |

**Optional catalog metadata** (for storefront search/filtering only — not required to sell): `colors` `["G","U"]`, `typeLine` `Legendary Planeswalker — Oko`, `manaValue` `4`. Populate if we sync a catalog; safe to omit otherwise.

### Inventory item (this vendor's copy)
Uses the [shared inventory-item shape](./README.md#shared-inventory-item). For this listing:

| Field | Example | Source |
| --- | --- | --- |
| `condition` | `LP` (Lightly Played) | image |
| `finish` | `nonfoil` | listing |
| `language` | `en` | listing |
| `quantity` | `1` | image ("1 of 1") |
| `price` | `0.40` | image |
| `graded` | `false` | — |
| `location` | e.g. `showcase` | internal |

### Marketplace reference (context, not owned by us)
| Field | Example | Source |
| --- | --- | --- |
| `seller` | CCG Professionals | image |
| `program` | TCGplayer Direct | image |
| `marketLowListed` | `$0.25` ("as low as") | image |
| `listingsCount` | `512` | image |
| `shippingNote` | Free shipping over $50 | image |

## JSON shape (illustrative)

```json
{
  "product": {
    "productType": "single_card",
    "game": "MTG",
    "name": "Oko, the Ringleader",
    "setName": "Outlaws of Thunder Junction",
    "setCode": "OTJ",
    "collectorNumber": "223",
    "rarity": "mythic",
    "artist": "Magali Villeneuve",
    "finishes": ["nonfoil", "foil"],
    "variant": null,
    "language": "en",
    "releasedAt": "2024",
    "externalIds": { "tcgplayerId": null, "scryfallId": null },
    "catalogMeta": { "colors": ["G", "U"], "typeLine": "Legendary Planeswalker — Oko", "manaValue": 4 }
  },
  "inventoryItem": {
    "condition": "LP",
    "finish": "nonfoil",
    "language": "en",
    "quantity": 1,
    "price": 0.40,
    "cost": null,
    "channelPrices": { "show": null, "online": 0.40, "store": null },
    "location": "showcase",
    "reservedQty": 0,
    "graded": false,
    "status": "active"
  }
}
```

## Enumerations (starting points)

- **Condition (singles):** `NM` (Near Mint), `LP` (Lightly Played), `MP` (Moderately Played), `HP` (Heavily Played), `DMG` (Damaged).
- **Finish:** `nonfoil`, `foil`, `etched`.
- **Rarity (MTG):** `common`, `uncommon`, `rare`, `mythic`, plus special (`special`, `bonus`).

## Extending to other games

The two-layer model (product + shared inventory) holds for other TCGs; only the product's game-specific catalog fields change (e.g. Pokémon set/rarity conventions, Yu-Gi-Oh! set codes). `condition`, `finish`, `language`, `price`, `quantity`, `location` stay on the shared inventory item for every game.

## Open questions

- Do we license/sync a catalog (Scryfall for MTG, others per game) to auto-populate product data (`INV-11`), or hand-build?
- Is the SKU grain (printing + condition + finish + language)? (Proposed: yes, except graded singles which are unique.)
- How do we key printings across catalogs (Scryfall id vs TCGplayer id vs our own)?

## Additional Details

_Add the full field dictionary, indexing/search notes (ties to `STF-2`), and per-game catalog fields here._

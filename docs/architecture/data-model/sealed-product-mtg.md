# Data Model — MTG Sealed Product (selling)

A selling-focused data model for **MTG sealed products** (booster boxes/packs, bundles, commander decks/kits, cases), populated from a TCGplayer listing for the *Outlaws of Thunder Junction Deluxe Commander Kit – Desert Bloom*.

> Sealed products share the same [Product → Inventory item](./README.md) model as singles; only the product-layer attributes differ. There's **no card condition/finish** — a sealed product is graded by packaging state (Unopened/Opened), and it carries a **contents** list instead of a collector number/rarity.

| | |
| --- | --- |
| **Status** | Draft / for discussion |
| **Product type** | `sealed_product` |
| **Related** | Product model + shared inventory layer ([data-model README](./README.md)); Inventory [`INV`](../../requirements/features/01-inventory-management.md) |
| **Last updated** | 2026-07-25 |

## Two layers

1. **Product (sealed)** — the catalog identity of the sealed item (name, set, sealed type, contents).
2. **Inventory item** — a vendor's sealed copy for sale (condition = packaging state, price, qty, location). Shared shape — see the [shared inventory layer](./README.md#shared-inventory-item).

## Example (from the shared listing)

> Source: TCGplayer product page — *Outlaws of Thunder Junction Deluxe Commander Kit - Desert Bloom - Commander: Outlaws of Thunder Junction (OTC)*.

### Product — sealed
| Field | Example | Source | Notes / requirement |
| --- | --- | --- | --- |
| `productId` | _(uuid)_ | internal | |
| `productType` | `sealed_product` | — | |
| `game` | `MTG` | image | |
| `name` | Outlaws of Thunder Junction Deluxe Commander Kit - Desert Bloom | image | |
| `setName` | Commander: Outlaws of Thunder Junction | image (breadcrumb) | |
| `setCode` | `OTC` | image | Commander set code |
| `sealedType` | `deluxe_commander_kit` | image | see enum below |
| `language` | `en` | image (Language: English) | |
| `releasedAt` | `2024` | domain | |
| `description` | "Everything You Need to Take Command…" | image (Product Details) | |
| `contents` | _(list — see below)_ | image | composition |
| `upc` / `barcode` | _(not shown)_ | domain | for scanning at POS `INV-6` |
| `msrp` | _(optional)_ | domain | |
| `imageUrl` | _(url)_ | image | |
| `externalIds` | `{ tcgplayerId }` | integration | catalog sync `INV-11` |

**`contents`** (what's inside — from the listing):

| Qty | Item | Type |
| --- | --- | --- |
| 1 | Outlaws of Thunder Junction: Desert Bloom Commander Deck | commander_deck |
| 1 | Aetherdrift Play Booster | play_booster |
| 1 | Foundations Play Booster | play_booster |
| 1 | Murders at Karlov Manor Play Booster | play_booster |
| 1 | Outlaws of Thunder Junction Play Booster | play_booster |
| 1 | Nicol Bolas, Planeswalker foil promo card (exclusive) | promo_card |

### Inventory item (this vendor's copy)
Uses the [shared inventory-item shape](./README.md#shared-inventory-item). For this listing:

| Field | Example | Source |
| --- | --- | --- |
| `condition` | `Unopened` | image |
| `language` | `en` | image |
| `quantity` | `1` | image ("1 of 1") |
| `price` | `155.00` | image |
| `shippingPrice` | `5.00` | image ("+ $5.00 Shipping") |
| `location` | e.g. `warehouse` | internal |
| `graded` | n/a | — |

> Note: `finish`/`graded` don't apply to sealed. Shipping is a per-listing value.

### Marketplace reference (context)
| Field | Example | Source |
| --- | --- | --- |
| `seller` | FirehouseThreads | image |
| `listingsCount` | `1` | image ("View 1 Other Listing" / "1 Listing") |
| `marketLowListed` | `$155.00` ("as low as") | image |

## JSON shape (illustrative)

```json
{
  "product": {
    "productType": "sealed_product",
    "game": "MTG",
    "name": "Outlaws of Thunder Junction Deluxe Commander Kit - Desert Bloom",
    "setName": "Commander: Outlaws of Thunder Junction",
    "setCode": "OTC",
    "sealedType": "deluxe_commander_kit",
    "language": "en",
    "releasedAt": "2024",
    "description": "Everything You Need to Take Command...",
    "contents": [
      { "quantity": 1, "name": "Outlaws of Thunder Junction: Desert Bloom Commander Deck", "type": "commander_deck" },
      { "quantity": 1, "name": "Aetherdrift Play Booster", "type": "play_booster" },
      { "quantity": 1, "name": "Foundations Play Booster", "type": "play_booster" },
      { "quantity": 1, "name": "Murders at Karlov Manor Play Booster", "type": "play_booster" },
      { "quantity": 1, "name": "Outlaws of Thunder Junction Play Booster", "type": "play_booster" },
      { "quantity": 1, "name": "Nicol Bolas, Planeswalker foil promo card", "type": "promo_card", "exclusive": true }
    ],
    "upc": null,
    "externalIds": { "tcgplayerId": null }
  },
  "inventoryItem": {
    "condition": "Unopened",
    "language": "en",
    "quantity": 1,
    "price": 155.00,
    "shippingPrice": 5.00,
    "cost": null,
    "channelPrices": { "show": null, "online": 155.00, "store": null },
    "location": "warehouse",
    "reservedQty": 0,
    "status": "active"
  }
}
```

## Enumerations (starting points)

- **`sealedType`:** `booster_box`, `play_booster`, `collector_booster`, `set_booster`, `draft_booster`, `bundle`, `gift_bundle`, `commander_deck`, `commander_kit`, `deluxe_commander_kit`, `precon_deck`, `starter_kit`, `case`, `other`.
- **`contents[].type`:** `commander_deck`, `play_booster`, `collector_booster`, `promo_card`, `accessory`, `other`.
- **Condition (sealed):** `Unopened` (sealed), `Opened`, `Damaged packaging`.

## Modeling note — contents as composition

`contents` can start as a simple descriptive list (as above). Later, each entry can optionally reference another **product** record (e.g. a "Play Booster" is itself a product), turning `contents` into true product composition. That unlocks break/repack tracking and valuing a sealed product by its parts — useful, but not needed to just list and sell.

## Open questions

- Model `contents` as free-text now, or link to product records (composition) from the start?
- Track `upc`/barcode so sealed products scan at POS (`INV-6`)?
- Should `shippingPrice` live on the listing (per vendor) or be a vendor-level rule?

## Additional Details

_Add the sealed-type taxonomy per game, break/repack handling, and barcode catalog here._

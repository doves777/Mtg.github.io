# Data Model — Pokémon Sealed Product (selling)

A selling-focused data model for **Pokémon TCG sealed products** (Elite Trainer Boxes, booster boxes/packs, collection boxes, tins, UPCs), for the first Pokémon card shows.

> Sealed products share the same [Product → Inventory item](./README.md) model as singles; only product-layer attributes differ. There is **no card finish/condition** — condition is packaging state. `contents` describes what’s inside instead of a collector number/rarity.

| | |
| --- | --- |
| **Status** | Draft / for discussion |
| **Product type** | `sealed_product` |
| **Game** | `Pokemon` |
| **Related** | Product model + shared inventory ([data-model README](./README.md)); [Sealed — MTG](./sealed-product-mtg.md); Inventory [`INV`](../../requirements/features/01-inventory-management.md) |
| **Last updated** | 2026-08-16 |

## Two layers

1. **Product (sealed)** — catalog identity (name, set, sealed type, contents, barcode).
2. **Inventory item** — vendor’s sealed copy (packaging condition, price, qty, location). Shared shape — see the [shared inventory layer](./README.md#shared-inventory-item).

## Example (Elite Trainer Box)

> Illustrative listing: *Surging Sparks Elite Trainer Box* — English, Unopened.

### Product — sealed

| Field | Example | Notes / requirement |
| --- | --- | --- |
| `productId` | _(uuid)_ | |
| `productType` | `sealed_product` | |
| `game` | `Pokemon` | |
| `name` | Surging Sparks Elite Trainer Box | |
| `setName` | Surging Sparks | |
| `setCode` | `SSP` | |
| `series` | `Scarlet & Violet` | optional |
| `sealedType` | `elite_trainer_box` | see enum below |
| `language` | `en` | sealed language / region |
| `releasedAt` | `2024-11-08` | when known |
| `description` | ETB with booster packs, dice, sleeves, etc. | optional |
| `contents` | _(list — see below)_ | composition |
| `packCount` | `9` | optional shortcut when packs are the main unit |
| `upc` / `barcode` | _(UPC)_ | POS scan `INV-6` — important at shows |
| `msrp` | _(optional)_ | |
| `imageUrl` | _(url)_ | |
| `externalIds` | `{ tcgplayerId, pokemonTcgIoId }` | `INV-11` |

**`contents`** (typical ETB — illustrative):

| Qty | Item | Type |
| --- | --- | --- |
| 9 | Surging Sparks booster packs | booster_pack |
| 1 | Player’s guide / checklist | accessory |
| 45 | Sleeve case (card sleeves) | accessory |
| 1 | Competition-legal coin / dice set | accessory |
| 1 | Divider cards / box | accessory |

Exact pack counts and accessories vary by product — prefer catalog truth over this example when syncing.

### Inventory item (this vendor’s copy)

| Field | Example | Notes |
| --- | --- | --- |
| `condition` | `Unopened` | sealed scale below |
| `language` | `en` | |
| `quantity` | `2` | |
| `price` | `54.99` | |
| `channelPrices` | `{ "show": 54.99, "online": 49.99, "store": null }` | |
| `location` | `booth` | case / pallet / backstock |
| `graded` | n/a | |
| `status` | `active` | |

> `finish` does not apply to sealed. Shrink-wrap tears → `Damaged packaging` (or `Opened` if seals broken).

## JSON shape (illustrative)

```json
{
  "product": {
    "productType": "sealed_product",
    "game": "Pokemon",
    "name": "Surging Sparks Elite Trainer Box",
    "setName": "Surging Sparks",
    "setCode": "SSP",
    "series": "Scarlet & Violet",
    "sealedType": "elite_trainer_box",
    "language": "en",
    "releasedAt": "2024-11-08",
    "description": "Elite Trainer Box with booster packs and accessories",
    "packCount": 9,
    "contents": [
      { "quantity": 9, "name": "Surging Sparks Booster Pack", "type": "booster_pack" },
      { "quantity": 1, "name": "Card sleeves", "type": "accessory" },
      { "quantity": 1, "name": "Dice / coin set", "type": "accessory" }
    ],
    "upc": null,
    "externalIds": { "tcgplayerId": null, "pokemonTcgIoId": null }
  },
  "inventoryItem": {
    "condition": "Unopened",
    "language": "en",
    "quantity": 2,
    "price": 54.99,
    "cost": null,
    "channelPrices": { "show": 54.99, "online": 49.99, "store": null },
    "location": "booth",
    "reservedQty": 0,
    "status": "active"
  }
}
```

### Second example — single booster pack (high velocity at shows)

```json
{
  "product": {
    "productType": "sealed_product",
    "game": "Pokemon",
    "name": "Prismatic Evolutions Booster Pack",
    "setName": "Prismatic Evolutions",
    "setCode": "PRE",
    "sealedType": "booster_pack",
    "language": "en",
    "packCount": 1
  },
  "inventoryItem": {
    "condition": "Unopened",
    "quantity": 36,
    "price": 6.5,
    "location": "booth",
    "status": "active"
  }
}
```

## Enumerations (starting points)

### `sealedType` (Pokémon)

| Value | Notes |
| --- | --- |
| `booster_pack` | Single pack |
| `booster_box` | Usually 36 packs (confirm per product) |
| `booster_bundle` | e.g. 6-pack bundle |
| `elite_trainer_box` | ETB |
| `elite_trainer_box_plus` | ETB+ / special ETBs |
| `ultra_premium_collection` | UPC |
| `premium_collection` | |
| `collection_box` | |
| `tin` | |
| `blister` | 1–3 pack retail blister |
| `build_and_battle` | stadium kit |
| `poster_collection` | |
| `illustration_collection` | |
| `tech_sticker_collection` | |
| `binder_collection` | |
| `special_collection` | catch-all named collections |
| `case` | sealed case of boxes/ETBs |
| `other` | |

### `contents[].type`

`booster_pack`, `promo_card`, `accessory`, `deck`, `coin`, `dice`, `sleeves`, `other`.

### Condition (sealed)

`Unopened`, `Opened`, `Damaged packaging`.

## Modeling notes for show day

- **Barcode / UPC** matters more for sealed than for singles at Pokémon shows — scan when possible (`INV-6`).
- **Pack vs box vs ETB** should be distinct products even when they share a set code — don’t collapse them into one row.
- **JP sealed** (e.g. Japanese booster boxes) should be separate products (`language: ja`) — pricing and authenticity expectations differ.
- `contents` can start as a descriptive list; later optionally FK to product records (same note as MTG sealed).

## Open questions

- Default pack counts per `sealedType` as validation hints, or always trust catalog/`packCount`?
- Do we track “hit rates” or EV for sealed? (**No for POC/MVP** — selling only.)
- Case break / individual pack sales from an opened box: inventory adjustment workflow or separate products?

## Additional Details

_Add per-era sealed taxonomy and barcode catalog as real show inventory is imported._

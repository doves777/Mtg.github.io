# Data Model — MTG Card (first pass)

A working data model for representing a **Magic: The Gathering** card in the platform, populated with a real example gathered from a TCGplayer listing for *Oko, the Ringleader* (Outlaws of Thunder Junction). MTG first; other games extend the same shape (see [Extending to other games](#extending-to-other-games)).

| | |
| --- | --- |
| **Status** | Draft / for discussion |
| **Scope** | MTG single cards |
| **Related** | Inventory [`INV-3`/`INV-11`](../../requirements/features/01-inventory-management.md), Pricing [`PRC`](../../requirements/features/02-pricing-and-price-lookup.md), ADR [0001](../0001-tech-stack.md) |
| **Last updated** | 2026-07-25 |

## Key idea: three layers

A "card" means three different things to a vendor. Separating them keeps data clean and answers the open question in [Inventory](../../requirements/features/01-inventory-management.md#open-questions) (card-level vs SKU vs unique):

1. **Oracle card** — the gameplay identity (name, rules text, mana cost). One record shared by every printing. Changes only via official errata.
2. **Printing** — a specific printed version in a set (collector number, rarity, artist, frame, finishes, language). *Oko* has many printings ("All versions").
3. **Inventory item** — a specific vendor's physical copy for sale (condition, finish, price, quantity, location). This is what our [Inventory](../../requirements/features/01-inventory-management.md) requirements track. Graded singles are unique (quantity 1) inventory items.

```
OracleCard 1 ──< Printing 1 ──< InventoryItem (a vendor's copy)
(identity)        (a set's version)   (condition/price/qty/finish)
```

## Example (from the shared listing)

> Source: TCGplayer product page for *Oko, the Ringleader* — OTJ. Marketplace fields (seller, price, listing counts) belong to the inventory/listing layer, not the card.

### Oracle card
| Field | Example | Source | Notes / requirement |
| --- | --- | --- | --- |
| `oracleId` | _(uuid)_ | internal | stable across printings |
| `name` | Oko, the Ringleader | image | |
| `game` | `MTG` | image (category) | |
| `manaCost` | `{2}{G}{U}` | image (Casting Cost) | symbolic string |
| `manaValue` | `4` | derived | a.k.a. CMC |
| `colors` | `["G","U"]` | derived from cost | |
| `colorIdentity` | `["G","U"]` | domain | affects deck legality |
| `typeLine` | `Legendary Planeswalker — Oko` | image (Card Type) | |
| `supertypes` | `["Legendary"]` | parsed | |
| `types` | `["Planeswalker"]` | parsed | |
| `subtypes` | `["Oko"]` | parsed | |
| `oracleText` | _(full rules text below)_ | image (Product Details) | |
| `loyalty` | `3` | image (card art shield) | planeswalker only |
| `power` / `toughness` | `null` / `null` | domain | set for creatures |
| `keywords` | `["Hexproof"]` | parsed from text | granted to the copy |
| `legalities` | `{ standard: legal, … }` | image (Legality tab) | per-format map |
| `rulings` | `[ … ]` | image (Rulings tab) | list w/ dates |

Oracle text: *"At the beginning of combat on your turn, Oko, the Ringleader becomes a copy of up to one target creature you control until end of turn, except he has hexproof. \[+1\]: Draw two cards. If you've committed a crime this turn, discard this card. Otherwise, discard two cards. \[-1\]: Create a 3/3 green Elk creature token. \[-5\]: For each other nonland permanent you control, create a token that's a copy of that permanent."*

### Printing
| Field | Example | Source | Notes / requirement |
| --- | --- | --- | --- |
| `printingId` | _(uuid)_ | internal | |
| `oracleId` | _(fk)_ | internal | |
| `setName` | Outlaws of Thunder Junction | image | |
| `setCode` | `OTJ` | image | |
| `collectorNumber` | `223` | image (`#`) | card shows `M 0223` |
| `rarity` | `mythic` | image (Rarity: M) | `INV-3` |
| `artist` | Magali Villeneuve | image | |
| `language` | `en` | image (`EN`) | multi-language: NFR i18n |
| `finishes` | `["nonfoil","foil"]` | domain | available finishes for this printing |
| `variant` / `promoTypes` | `null` (base); e.g. `borderless`, `showcase` | image ("All versions") | `INV-3` |
| `frame` / `borderColor` | `2015` / `black` | domain | |
| `releasedAt` | `2024` | image (© 2024 WotC) | `INV-11` |
| `imageUrl` | _(url)_ | image | |
| `externalIds` | `{ tcgplayerId, scryfallId }` | integration | catalog sync `INV-11` |

### Inventory item (a vendor's copy — this listing)
| Field | Example | Source | Notes / requirement |
| --- | --- | --- | --- |
| `inventoryItemId` | _(uuid)_ | internal | |
| `printingId` | _(fk)_ | internal | |
| `vendorId` | _(tenant)_ | internal | multi-tenant |
| `condition` | `LP` (Lightly Played) | image | enum NM/LP/MP/HP/DMG |
| `finish` | `nonfoil` | listing | specific copy's finish |
| `language` | `en` | listing | |
| `quantity` | `1` | image ("1 of 1") | `INV-2` |
| `price` | `0.40` | image | `PRC` |
| `cost` | _(acquisition)_ | internal | `BUY-11` |
| `channelPrices` | `{ show, online, store }` | internal | `PRC-10` |
| `sku` / `internalId` | _(vendor SKU)_ | internal | `INV-6` |
| `location` | e.g. `booth`, `showcase`, `binder` | internal | `INV-7` |
| `reservedQty` | `0` | internal | `INV-10` |
| `graded` | `false` | — | if true → unique copy |
| `grading` | `{ company, grade, cert }` | — | e.g. PSA 10; graded = qty 1 |
| `status` | `active` | internal | active/sold/reserved |

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
  "oracleCard": {
    "name": "Oko, the Ringleader",
    "game": "MTG",
    "manaCost": "{2}{G}{U}",
    "manaValue": 4,
    "colors": ["G", "U"],
    "colorIdentity": ["G", "U"],
    "typeLine": "Legendary Planeswalker — Oko",
    "supertypes": ["Legendary"],
    "types": ["Planeswalker"],
    "subtypes": ["Oko"],
    "loyalty": "3",
    "power": null,
    "toughness": null,
    "keywords": ["Hexproof"],
    "oracleText": "At the beginning of combat on your turn, Oko, the Ringleader becomes a copy...",
    "legalities": { "standard": "legal", "modern": "legal", "commander": "legal" },
    "externalIds": { "scryfallId": null }
  },
  "printing": {
    "setName": "Outlaws of Thunder Junction",
    "setCode": "OTJ",
    "collectorNumber": "223",
    "rarity": "mythic",
    "artist": "Magali Villeneuve",
    "language": "en",
    "finishes": ["nonfoil", "foil"],
    "variant": null,
    "releasedAt": "2024",
    "externalIds": { "tcgplayerId": null }
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

- **Condition:** `NM` (Near Mint), `LP` (Lightly Played), `MP` (Moderately Played), `HP` (Heavily Played), `DMG` (Damaged).
- **Finish:** `nonfoil`, `foil`, `etched`.
- **Rarity (MTG):** `common`, `uncommon`, `rare`, `mythic`, plus special (`special`, `bonus`).
- **Colors:** `W`, `U`, `B`, `R`, `G` (+ colorless = empty array).

## Extending to other games

The three-layer model holds for other TCGs; only the game-specific fields on `OracleCard`/`Printing` change. Model shared fields on a base and put game-specific ones in a typed extension (e.g. JSON column or subtype table):

- **Pokémon:** HP, types (energy), stage/evolution, attacks, weakness/resistance, retreat cost, regulation mark; rarity set differs.
- **Yu-Gi-Oh!:** attribute, level/rank/link, ATK/DEF, card type (Monster/Spell/Trap), archetype.
- Keep `condition`, `finish`, `language`, `price`, `quantity`, `location` on the shared **inventory item** for every game.

## Open questions

- Do we license/sync a catalog (Scryfall for MTG, others per game) to populate oracle + printing data (`INV-11`), or hand-build?
- Is `quantity` per (printing + condition + finish + language) the SKU grain? (Proposed: yes, except graded singles which are unique.)
- How do we key printings across catalogs (Scryfall id vs TCGplayer id vs our own)?
- Sealed product (boxes/packs) — separate product type sharing the inventory item layer?

## Additional Details

_Add the full field dictionary, indexing/search notes (ties to `STF-2`), and per-game extension tables here._

# Data Model — Pokémon Single Card (selling)

A selling-focused data model for a **Pokémon TCG** single card, shaped for the first live shows (Pokémon card shows) and aligned with the shared Product → Inventory pattern.

> **Scope:** we're selling, not building a rules engine — so attacks, abilities, weakness/resistance, retreat cost, and full Pokédex text are intentionally omitted. We keep what booth staff need to **find, price, and sell** a printing. Optional storefront filters are noted separately.

| | |
| --- | --- |
| **Status** | Draft / for discussion |
| **Product type** | `single_card` |
| **Game** | `Pokemon` |
| **Related** | Product model + shared inventory ([data-model README](./README.md)); [Card — MTG](./card-mtg.md) (same two-layer pattern); Inventory [`INV-3`/`INV-11`](../../requirements/features/01-inventory-management.md), Pricing [`PRC`](../../requirements/features/02-pricing-and-price-lookup.md) |
| **Last updated** | 2026-08-16 |

## Two layers

1. **Product (single card = a printing)** — one catalog record per printed version (set + collector number + language + art treatment). *Charizard ex* has many printings across sets and rarities.
2. **Inventory item** — a vendor's physical copy (condition, finish, price, qty, location, graded). Shared shape — see the [shared inventory layer](./README.md#shared-inventory-item). Graded slabs are unique (qty 1).

## Why Pokémon differs from MTG at the booth

| Concern | Pokémon reality | Model implication |
| --- | --- | --- |
| Lookup key | Buyers ask by **name + set + number** ("Charizard 223/197") | `name`, `setCode`, `collectorNumber`, `printedNumber` must be searchable |
| Price bands | **Rarity + finish** move price more than playability (SIR / IR / reverse holo) | `rarity`, `finish`, `variant` are first-class |
| Language | EN vs JP (and others) are separate markets at shows | `language` on product *and* inventory |
| Reverse holo | Extremely common SKU grain | Inventory `finish` includes `reverse_holo` |
| Graded | PSA/CGC/BGS slabs are a large share of high-ticket sales | Shared `graded` / `grading` on inventory |

## Example (chase single)

> Illustrative booth listing: *Charizard ex* — Obsidian Flames Special Illustration Rare, English, Near Mint, raw (ungraded).

### Product — single card (printing)

| Field | Example | Notes / requirement |
| --- | --- | --- |
| `productId` | _(uuid)_ | internal |
| `productType` | `single_card` | |
| `game` | `Pokemon` | use `Pokemon` (not `MTG`) |
| `name` | Charizard ex | display / search name |
| `setName` | Obsidian Flames | full set name |
| `setCode` | `OBF` | short code used on price guides / TCGPlayer |
| `series` | `Scarlet & Violet` | optional; helps group SV vs SWSH vs XY at the booth |
| `collectorNumber` | `223` | numeric / sort key within set (`INV-3`) |
| `printedNumber` | `223/197` | what is printed on the card; include for search |
| `rarity` | `special_illustration_rare` | see enum below — drives price (`INV-3`) |
| `raritySymbol` | `SIR` | optional short label for UI badges |
| `artist` | 5ban Graphics | |
| `finishes` | `["nonfoil"]` | finishes this printing ships in (SIR art is typically nonfoil) |
| `variant` / `promoTypes` | `special_illustration_rare` | art treatment / promo stamp family (`INV-3`) |
| `supertype` | `Pokemon` | `Pokemon` · `Trainer` · `Energy` — filter only |
| `hp` | `330` | optional filter metadata |
| `types` | `["Fire"]` | optional energy type(s) for filter |
| `regulationMark` | `G` | optional (play legality / era hint) |
| `language` | `en` | product printing language |
| `releasedAt` | `2023-08-11` | set street date when known (`INV-11`) |
| `imageUrl` | _(url)_ | |
| `externalIds` | `{ tcgplayerId, pokemonTcgIoId }` | catalog sync `INV-11` |

**Optional catalog metadata** (storefront / search only — not required to sell): `stage` (`Basic` / `Stage 1` / `Stage 2` / `Level-Up` / n/a for Trainers), `evolvesFrom`, `trainerSubtype` (`Item` / `Supporter` / `Stadium` / `Tool`). Safe to omit for POC seed data.

### Inventory item (this vendor's copy)

Uses the [shared inventory-item shape](./README.md#shared-inventory-item). For this listing:

| Field | Example | Notes |
| --- | --- | --- |
| `condition` | `NM` | singles scale below |
| `finish` | `nonfoil` | see Pokémon finishes |
| `language` | `en` | may differ from product default if misfile; prefer match |
| `quantity` | `1` | |
| `price` | `285.00` | show price |
| `channelPrices` | `{ "show": 285.00, "online": 275.00, "store": null }` | `PRC-10` |
| `graded` | `false` | |
| `grading` | `null` | e.g. `{ "company": "PSA", "grade": "10", "certNumber": "…" }` when slabbed |
| `location` | `showcase` | binder / binder_page / case / showcase / backstock |
| `status` | `active` | |

### Marketplace reference (context, not owned by us)

| Field | Example | Notes |
| --- | --- | --- |
| `marketLowListed` | e.g. TCGPlayer market / eBay sold comps | pricing context only |
| `listingsCount` | _(optional)_ | |

## JSON shape (illustrative)

```json
{
  "product": {
    "productType": "single_card",
    "game": "Pokemon",
    "name": "Charizard ex",
    "setName": "Obsidian Flames",
    "setCode": "OBF",
    "series": "Scarlet & Violet",
    "collectorNumber": "223",
    "printedNumber": "223/197",
    "rarity": "special_illustration_rare",
    "raritySymbol": "SIR",
    "artist": "5ban Graphics",
    "finishes": ["nonfoil"],
    "variant": "special_illustration_rare",
    "supertype": "Pokemon",
    "hp": 330,
    "types": ["Fire"],
    "regulationMark": "G",
    "language": "en",
    "releasedAt": "2023-08-11",
    "externalIds": { "tcgplayerId": null, "pokemonTcgIoId": null },
    "catalogMeta": { "stage": "Stage 2", "evolvesFrom": "Charmeleon" }
  },
  "inventoryItem": {
    "condition": "NM",
    "finish": "nonfoil",
    "language": "en",
    "quantity": 1,
    "price": 285.0,
    "cost": null,
    "channelPrices": { "show": 285.0, "online": 275.0, "store": null },
    "location": "showcase",
    "reservedQty": 0,
    "graded": false,
    "grading": null,
    "status": "active"
  }
}
```

### Second example — common reverse holo (typical binder stock)

```json
{
  "product": {
    "productType": "single_card",
    "game": "Pokemon",
    "name": "Sprigatito",
    "setName": "Paldea Evolved",
    "setCode": "PAL",
    "series": "Scarlet & Violet",
    "collectorNumber": "13",
    "printedNumber": "013/193",
    "rarity": "common",
    "finishes": ["nonfoil", "reverse_holo"],
    "supertype": "Pokemon",
    "language": "en"
  },
  "inventoryItem": {
    "condition": "NM",
    "finish": "reverse_holo",
    "language": "en",
    "quantity": 8,
    "price": 0.35,
    "location": "binder",
    "graded": false,
    "status": "active"
  }
}
```

## Enumerations (starting points)

### Condition (singles)

Same as MTG / market standard: `NM`, `LP`, `MP`, `HP`, `DMG`.

### Finish (inventory)

| Value | Typical use |
| --- | --- |
| `nonfoil` | Standard non-holo / most modern rares that aren't reverse |
| `holofoil` | Classic holo rare |
| `reverse_holo` | Reverse holofoil (set logo pattern, etc.) |
| `cosmos_holo` | Cosmos / galaxy holo treatments |
| `amazing_rare_holo` | Amazing Rare (SWSH) |
| `other` | Catch-all for odd promo foils |

> SKU grain proposal: **printing + condition + finish + language** (same as MTG), except graded slabs = qty 1 unique.

### Rarity (product) — Scarlet & Violet–era first

Modern SV sets are what most current show inventory uses. Start here; map older eras as we import catalogs.

| Value | Badge / notes |
| --- | --- |
| `common` | C |
| `uncommon` | U |
| `rare` | R |
| `double_rare` | RR (ex / V-style in SV) |
| `ultra_rare` | UR (full art trainers, etc.) |
| `illustration_rare` | IR |
| `special_illustration_rare` | SIR |
| `hyper_rare` | HR (gold) |
| `ace_spec_rare` | ACE SPEC |
| `shiny_rare` | Shiny Vault-style (when present) |
| `shiny_ultra_rare` | |
| `promo` | Black Star / stamped promos |
| `amazing_rare` | SWSH Amazing Rare |
| `radiant_rare` | SWSH Radiant |
| `secret_rare` | older secret numbering |
| `legendary` / `holo_rare` | legacy labels when importing older sets |
| `other` | unmapped import |

### Variant / promoTypes (product)

`base`, `illustration_rare`, `special_illustration_rare`, `full_art`, `golden`, `poke_ball_reverse`, `master_ball_reverse`, `staff_stamp`, `dated_stamp`, `cosmos_holo_promo`, `jumbo`, `other`.

### Supertype

`Pokemon`, `Trainer`, `Energy`.

### Language

Prefer BCP-47-ish short codes used elsewhere: `en`, `ja`, `zh-tw`, `zh-cn`, `ko`, `fr`, `de`, `it`, `es`, `pt`. **EN and JA cover most first-show inventory.**

### Grading companies (inventory.grading.company)

`PSA`, `CGC`, `BGS`, `SGC`, `ACE`, `other`.

## Search notes (show floor)

Booth search should match any of:

- name (`Charizard`, `Charizard ex`)
- set code / set name (`OBF`, `Obsidian Flames`)
- collector / printed number (`223`, `223/197`)
- rarity badge (`SIR`, `IR`)
- optional: Pokemon TCG API / TCGPlayer id once synced

Ties to fast lookup (`INV-6`, `PRC-1`) and eventual storefront search (`STF-2`).

## Catalog sources (candidates)

| Source | Role |
| --- | --- |
| [Pokémon TCG API](https://pokemontcg.io/) (`pokemonTcgIoId`) | Open catalog similar to Scryfall for MTG — good POC image + set data |
| TCGPlayer product ids | Pricing / marketplace parity |
| Vendor CSV / binder export | First real show import |

POC can seed a small English SV set manually; MVP should sync a catalog rather than hand-typing printings.

## Open questions

- Do we normalize rarity across eras into one enum (above), or keep era-specific rarity strings from the catalog and only map badges in UI?
- Is `printedNumber` (`223/197`) stored separately from `collectorNumber` (`223`), or parsed on read?
- Japanese cards: separate product rows per language (proposed: **yes**), or one product + inventory language?
- How early do we need slab workflow (cert # scan) vs raw-only for the first two shows?
- Master Ball / Poké Ball reverse holos in Prismatic Evolutions — treat as `finish`, `variant`, or both?

## Additional Details

_Add full field dictionary, indexing notes, and era-by-era rarity maps (WotC → EX → XY → SM → SWSH → SV) here as imports land._

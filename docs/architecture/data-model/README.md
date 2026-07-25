# Data Models

Working data-model references for the platform's core domain objects. These are design docs (shapes, fields, enumerations, examples) that inform the schema behind the requirements — distinct from ADRs, which record decisions.

## Selling-focused Product model

We are a **seller**, not a rules engine — so we model everything we sell as a **Product**, and every physical copy a vendor holds as an **Inventory item**. Gameplay/oracle data (rules text, abilities, loyalty, legalities) is intentionally **out of scope**.

```
Product (productType: single_card | sealed_product)
   └──< InventoryItem   (a vendor's copy: condition, price, qty, location)
```

- A **Product** is the catalog identity of a sellable thing. Its attributes vary by `productType`:
  - `single_card` → a specific printing of a card. See [Card — MTG](./card-mtg.md).
  - `sealed_product` → boxes, bundles, decks/kits, packs. See [Sealed Product — MTG](./sealed-product-mtg.md).
- An **Inventory item** is one vendor's copy offered for sale. It shares the same shape for every product type (below), which is what the [Inventory](../../requirements/features/01-inventory-management.md) requirements track.

### Shared: Inventory item

| Field | Example (single / sealed) | Notes / requirement |
| --- | --- | --- |
| `inventoryItemId` | _(uuid)_ | |
| `productId` | _(fk)_ | points at a single_card or sealed_product |
| `vendorId` | _(tenant)_ | multi-tenant |
| `condition` | `LP` / `Unopened` | condition scale differs by product type (see each doc) |
| `finish` | `nonfoil` / n/a | singles only |
| `language` | `en` | |
| `quantity` | `1` | `INV-2` |
| `price` | `0.40` / `155.00` | `PRC` |
| `cost` | _(acquisition)_ | `BUY-11` |
| `channelPrices` | `{ show, online, store }` | `PRC-10` |
| `sku` / `internalId` | _(vendor SKU)_ | `INV-6` |
| `location` | `booth` / `showcase` / `binder` | `INV-7` |
| `reservedQty` | `0` | `INV-10` |
| `graded` / `grading` | `false` / `{company,grade,cert}` | singles only; graded = unique (qty 1) |
| `status` | `active` | active / sold / reserved |

> Listing-level extras seen on marketplaces (seller, per-listing shipping, "as low as", listing count) attach to the inventory item / listing, not the product.

## Index

| Model | Scope | Status |
| --- | --- | --- |
| [Card — MTG](./card-mtg.md) | MTG single cards (printing + inventory) | Draft |
| [Sealed Product — MTG](./sealed-product-mtg.md) | MTG sealed (boxes, bundles, decks/kits, packs) | Draft |

## Conventions

- Model everything sellable as a **Product** with a `productType`; share the **Inventory item** layer across all types.
- Keep gameplay/oracle data out — capture only what's needed to catalog, search, and sell.
- Link fields to requirement IDs (e.g. `INV-3`, `PRC-10`) so the model stays traceable to [requirements](../../requirements/README.md).

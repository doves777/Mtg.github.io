# 01 · Inventory Management

> Manage card inventory across events, online ordering, and internal records.

| | |
| --- | --- |
| **Area** | Inventory (`INV`) |
| **Priority** | High |
| **MVP** | Yes |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Vendors need one reliable catalog of cards that stays accurate as items are added, sold, reserved, or moved between locations. This is the foundation the rest of the platform builds on.

## Requirements

- [ ] **INV-1** — Add, edit, and remove cards from inventory.
- [ ] **INV-2** — Track quantity available.
- [ ] **INV-3** — Track condition, set, language, grading status, variant, and other card-specific attributes.
- [ ] **INV-4** — Support multiple categories (sports, Pokémon, Magic: The Gathering, Yu-Gi-Oh!, One Piece, Lorcana, and other TCGs/collectibles).
- [ ] **INV-5** — Support bulk inventory upload.
- [ ] **INV-6** — Support barcode, SKU, QR code, or internal ID lookup.
- [ ] **INV-7** — Track inventory by location (warehouse, store, show booth, showcase, binder, employee station).
- [ ] **INV-8** — Update inventory when orders are created, completed, canceled, or refunded.
- [ ] **INV-9** — Flag low-stock or sold-out items.
- [ ] **INV-10** — Support reserved inventory for online pickup orders.
- [ ] **INV-11** — Provide a managed card catalog for major TCGs (product data, images, set/rarity/variant metadata) so vendors don't hand-enter every card.
- [ ] **INV-12** — Automatically create products for new set releases (day-one/release workflows), with optional manual review, plus custom/other product lines.

## Acceptance Criteria

> Seeded from the original draft. Add or refine criteria per requirement using its ID.

### Fast Card Lookup
- [ ] Users can search inventory by card name, set, category, and keyword.
- [ ] Search results load quickly enough for live show use.
- [ ] Results display price, quantity, condition, and location.
- [ ] Users can add a card directly from search results to an order.

### INV-1 — Add, edit, and remove cards
- [ ] User can create a card with the required fields (name, category, condition, quantity, price).
- [ ] Editing a card updates it everywhere it appears (search results, open orders, reports).
- [ ] Removing a card is blocked or soft-deleted when it is referenced by an open or reserved order.

### INV-2 — Track quantity available
- [ ] Each card shows a current available quantity that reflects on-hand units minus reserved units.
- [ ] Available quantity cannot drop below zero through normal order or checkout actions.

### INV-3 — Track card attributes
- [ ] User can record condition, set, language, variant, and grading status on a card.
- [ ] Recorded attributes are shown in search results and on the card detail view.

### INV-4 — Support multiple categories
- [ ] User can assign a card to a category (e.g. sports, Pokémon, Magic, Yu-Gi-Oh!, One Piece, Lorcana).
- [ ] Inventory can be filtered by category.

### INV-6 — Barcode, SKU, or ID lookup
- [ ] User can look up a card by scanning a barcode/QR code or entering a SKU or internal ID.
- [ ] A lookup that matches no inventory returns a clear "not found" result.

### INV-7 — Track inventory by location
- [ ] A card's quantity can be attributed to a location (warehouse, store, show booth, showcase, binder, employee station).
- [ ] Inventory can be viewed and filtered by location.

### INV-8 — Update inventory on order changes
- [ ] Completing an order decrements available quantity for each item sold.
- [ ] Canceling or refunding an order returns the affected quantity to available stock.

### INV-10 — Reserved inventory for pickup
- [ ] Accepting an online pickup order reserves the ordered quantity so it cannot be sold twice.
- [ ] Reserved quantity is excluded from the available quantity shown to other sales channels.

_Add more acceptance criteria here (e.g. `INV-1`, `INV-5`, `INV-10`)._

## Open Questions

- Will inventory be card-level, SKU-level, or both?
- Do vendors need exact individual card tracking or quantity-based tracking?
- Should graded cards be treated as unique one-of-one inventory records?

## Additional Details

_Add the inventory data model, attribute list, bulk-upload format, and location model here._

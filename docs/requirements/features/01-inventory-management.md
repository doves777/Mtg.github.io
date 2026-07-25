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

## Acceptance Criteria

> Seeded from the original draft. Add or refine criteria per requirement using its ID.

### Fast Card Lookup
- [ ] Users can search inventory by card name, set, category, and keyword.
- [ ] Search results load quickly enough for live show use.
- [ ] Results display price, quantity, condition, and location.
- [ ] Users can add a card directly from search results to an order.

_Add more acceptance criteria here (e.g. `INV-1`, `INV-5`, `INV-10`)._

## Open Questions

- Will inventory be card-level, SKU-level, or both?
- Do vendors need exact individual card tracking or quantity-based tracking?
- Should graded cards be treated as unique one-of-one inventory records?

## Additional Details

_Add the inventory data model, attribute list, bulk-upload format, and location model here._

# 10 · MVP Scope

> Keep the first version focused on the most painful card-show workflows.

| | |
| --- | --- |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Core MVP Workflow

> **Vendor uploads inventory → assigns inventory to show → employees search/add cards to order → checkout/order is completed → inventory updates → vendor gets show report.**

Everything else should support that flow.

**Secondary acquisition workflow:**

> **Vendor publishes buylist rules → customer or employee submits cards → system recommends buy offer → employee/owner approves → accepted cards become inventory.**

## Must-Haves

1. **Inventory database** — add/import cards; track quantity, condition, price, category, location. → [01](./features/01-inventory-management.md)
2. **Fast card lookup** — search by name, set, player, SKU, barcode, or keyword. → [01](./features/01-inventory-management.md) / [02](./features/02-pricing-and-price-lookup.md)
3. **Order builder** — add cards, auto-calculate total, apply discounts, mark complete. → [03](./features/03-order-management.md)
4. **Offline price list** — cache pricing/inventory; allow basic order creation without Wi-Fi. → [02](./features/02-pricing-and-price-lookup.md) / [04](./features/04-point-of-sale-checkout.md)
5. **Event/show mode** — assign inventory to a show; track sales by event. → [05](./features/05-show-event-management.md)
6. **Online pickup orders** — customers reserve/purchase for pickup; vendor manages pickup queue. → [03](./features/03-order-management.md) / [06](./features/06-customer-experience.md)
7. **Basic reports** — total sales, top-selling items, inventory sold, unsold inventory, event summary. → [05](./features/05-show-event-management.md)

## Should-Haves

- Employee accounts and permissions
- Order status tracking
- Customer profiles
- Bulk inventory import/export
- Manual price override tracking
- Basic AI pricing suggestions
- Basic buylist pricing and buy order intake

## Later Features

- Full dynamic pricing engine
- Integrated payments
- Want-list matching
- Vendor storefront
- Marketplace by card show
- Customer mobile app
- Advanced analytics
- AI demand forecasting
- Buylist/trade-in workflows
- Advanced buylist optimization
- Grading company integrations
- Accounting integrations
- Store credit & customer accounts (`SC`)
- Customer storefront & merchandising (`STF`)

## Additional Details

_Add MVP success metrics, cut lines, and sequencing notes here._

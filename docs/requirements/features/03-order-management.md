# 03 · Order Management

> Create, manage, and track customer orders across in-person and online channels.

| | |
| --- | --- |
| **Area** | Orders (`ORD`) |
| **Priority** | High |
| **MVP** | Yes (order builder + pickup orders) |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Orders tie inventory, pricing, and checkout together. The platform must support fast in-person order building and online pickup orders, with clear status tracking and accurate inventory reservation.

## Requirements

- [ ] **ORD-1** — Create customer orders in person.
- [ ] **ORD-2** — Add cards to an order quickly.
- [ ] **ORD-3** — Support manual item entry.
- [ ] **ORD-4** — Support discounts, taxes, fees, and promotions.
- [ ] **ORD-5** — Track order status: Draft, Pending, Reserved, Ready for pickup, Completed, Canceled, Refunded.
- [ ] **ORD-6** — Assign orders to employees.
- [ ] **ORD-7** — Add internal notes to orders.
- [ ] **ORD-8** — Search past orders.
- [ ] **ORD-9** — View customer order history.
- [ ] **ORD-10** — Split or merge orders if needed.
- [ ] **ORD-11** — Generate receipts.
- [ ] **ORD-12** — Export order data.

### Pickup Orders

- [ ] **ORD-13** — Customers can place online orders for pickup at a specific show or booth.
- [ ] **ORD-14** — Vendors can accept, reject, or modify pickup orders.
- [ ] **ORD-15** — Inventory is reserved once an order is accepted.
- [ ] **ORD-16** — Customers receive order confirmation and pickup instructions.
- [ ] **ORD-17** — Vendors can mark orders as ready for pickup.
- [ ] **ORD-18** — Vendors can check in customers at pickup.
- [ ] **ORD-19** — Orders can expire if not picked up.

## Acceptance Criteria

> Seeded from the original draft. Add or refine criteria per requirement using its ID.

### Pickup Orders
- [ ] Customers can place an order for pickup at a specific event.
- [ ] Vendor can accept, reject, or mark order ready.
- [ ] Inventory is reserved after order acceptance.
- [ ] Customer receives pickup instructions.
- [ ] Vendor can mark order picked up.

### ORD-1 — Create orders in person
- [ ] Employee can start a new in-person order that is saved as a Draft.
- [ ] A new order captures the selling employee and, when applicable, the event/show context.

### ORD-2 — Add cards to an order quickly
- [ ] Employee can add a card to the active order from search or scan results in a single action.
- [ ] Adding the same card again increments its line quantity rather than creating a duplicate line.

### ORD-4 — Discounts, taxes, and fees
- [ ] Employee can apply a line-level or order-level discount (percentage or fixed amount).
- [ ] Applicable taxes and fees are calculated and reflected in the order total.

### ORD-5 — Order status and completion
- [ ] Order status can move through Draft, Pending, Reserved, Ready for pickup, Completed, Canceled, and Refunded.
- [ ] Marking an order Completed finalizes the total and triggers the inventory update.

### ORD-19 — Pickup order expiry
- [ ] A pickup order that is not collected within its window can be expired.
- [ ] Expiring an order releases its reserved inventory back to available stock.

_Add more acceptance criteria here (e.g. `ORD-4` discounts/taxes, `ORD-10` split/merge)._

## Open Questions

- Should customers pay online, in person, or both?
- Should vendors be able to require deposits?
- Should orders be tied to specific shows or events?

## Additional Details

_Add the order state machine, reservation/expiry rules, and receipt format here._

# 04 · Point of Sale & Checkout

> Fast, reliable checkout during busy card shows — including when Wi-Fi is spotty.

| | |
| --- | --- |
| **Area** | Point of Sale (`POS`) |
| **Priority** | High |
| **MVP** | Yes (order builder + offline drafts); integrated payments later |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Checkout must be fast, low-click, and dependable on tablets, laptops, and phones. Offline resilience is a core selling point: employees should keep selling when connectivity drops, with safe syncing afterward.

## Requirements

- [ ] **POS-1** — Build a cart quickly from inventory search, scanning, or manual entry.
- [ ] **POS-2** — Apply discounts.
- [ ] **POS-3** — Calculate totals automatically.
- [ ] **POS-4** — Support cash, card, digital wallet, and external payment methods.
- [ ] **POS-5** — Allow partial payments or deposits if needed.
- [ ] **POS-6** — Generate digital or printable receipts.
- [ ] **POS-7** — Support refunds and returns.
- [ ] **POS-8** — Support employee permissions for discounts and overrides.
- [ ] **POS-9** — Work efficiently on tablet, laptop, and mobile devices.

### Offline Checkout

- [ ] **POS-10** — Allow vendors to continue building carts when Wi-Fi is spotty.
- [ ] **POS-11** — Cache inventory and pricing locally.
- [ ] **POS-12** — Queue completed transactions for sync once online.
- [ ] **POS-13** — Clearly show sync status.
- [ ] **POS-14** — Prevent or flag possible overselling when offline.
- [ ] **POS-15** — Resolve conflicts when multiple employees sell the same item offline.

### Registers, Tender & Hardware

- [ ] **POS-16** — Support split tender (combine cash, card, and store credit on a single sale).
- [ ] **POS-17** — Support register/till management: multiple tills per location, per-till and per-cashier tracking, and change-due calculation.
- [ ] **POS-18** — Support common POS hardware: receipt printer, cash drawer, barcode scanner, and card terminal.
- [ ] **POS-19** — Accept store credit as a tender and show the customer's available balance at checkout (see [Store Credit `SC`](./08-store-credit-and-accounts.md)).

## Acceptance Criteria

> Add acceptance criteria per requirement using its ID.

_Example placeholder — replace with real criteria:_

### POS-3 — Automatic totals
- [ ] Cart total updates instantly as items, discounts, taxes, and fees change.
- [ ] Totals match the receipt exactly.

### POS-10 — Continue building carts offline
- [ ] Employee can keep adding items and building a cart while the device is offline.
- [ ] A cart started offline can be completed as an order without a connection.

### POS-11 — Cache inventory and pricing locally
- [ ] Inventory and pricing needed for the current event are available on-device before going offline.
- [ ] The app indicates when cached data was last refreshed.

### POS-12 — Queue transactions for sync
- [ ] Transactions completed offline are stored locally and queued for sync.
- [ ] Queued transactions sync automatically once connectivity is restored.

### POS-13 — Show sync status
- [ ] The app clearly shows whether it is online, offline, or syncing.
- [ ] The number of pending unsynced transactions is visible to the employee.

### POS-14 — Prevent or flag overselling offline
- [ ] The app warns when an offline sale would exceed the last known available quantity.
- [ ] Potential oversells are flagged for review during sync and conflict resolution.

_Add more acceptance criteria here (e.g. `POS-10` offline carts, `POS-14` oversell prevention)._

## Open Questions

- Does MVP need integrated payments, or can it start with order tracking only?
- Which payment processors matter most: Stripe, Square, PayPal, etc.?
- How important is receipt printing at shows?

## Additional Details

_Add device/hardware targets, offline sync design, and conflict-resolution rules here._

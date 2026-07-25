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

## Acceptance Criteria

> Add acceptance criteria per requirement using its ID.

_Example placeholder — replace with real criteria:_

### POS-3 — Automatic totals
- [ ] Cart total updates instantly as items, discounts, taxes, and fees change.
- [ ] Totals match the receipt exactly.

_Add more acceptance criteria here (e.g. `POS-10` offline carts, `POS-14` oversell prevention)._

## Open Questions

- Does MVP need integrated payments, or can it start with order tracking only?
- Which payment processors matter most: Stripe, Square, PayPal, etc.?
- How important is receipt printing at shows?

## Additional Details

_Add device/hardware targets, offline sync design, and conflict-resolution rules here._

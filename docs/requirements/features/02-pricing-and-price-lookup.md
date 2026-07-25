# 02 · Pricing & Price Lookup

> Price cards quickly and keep prices consistent across staff and channels.

| | |
| --- | --- |
| **Area** | Pricing (`PRC`) |
| **Priority** | High |
| **MVP** | Yes (offline price list); dynamic pricing later |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Employees need fast, consistent pricing during checkout — even when Wi-Fi is spotty — with guardrails around overrides. Dynamic pricing is a differentiator but should start as *recommendations*, not automatic changes.

## Requirements

- [ ] **PRC-1** — Search for card pricing quickly during checkout.
- [ ] **PRC-2** — Store offline price lists for use when Wi-Fi is unavailable.
- [ ] **PRC-3** — Allow vendor-defined pricing rules.
- [ ] **PRC-4** — Support manual override pricing with permission controls.
- [ ] **PRC-5** — Show recent price history.
- [ ] **PRC-6** — Support condition-based pricing.
- [ ] **PRC-7** — Support graded-card pricing.
- [ ] **PRC-8** — Support bulk price updates.
- [ ] **PRC-9** — Allow price locking for specific inventory.
- [ ] **PRC-10** — Allow different pricing by sales channel (show, online pickup, store, wholesale, employee discount).

### Dynamic Pricing

- [ ] **PRC-11** — Recommend updated prices based on demand, sales velocity, inventory levels, and external market signals.
- [ ] **PRC-12** — Allow vendors to approve price changes before publishing.
- [ ] **PRC-13** — Track why a price changed.
- [ ] **PRC-14** — Identify fast-moving or underpriced items.
- [ ] **PRC-15** — Identify stale inventory that may need markdowns.

## Acceptance Criteria

> Seeded from the original draft. Add or refine criteria per requirement using its ID.

### Offline Pricing
- [ ] Vendor can download or sync price data before a show.
- [ ] Employees can view cached prices without internet access.
- [ ] The system clearly indicates when offline data was last updated.
- [ ] Orders created offline are queued for later sync.
- [ ] The system warns about possible inventory conflicts after reconnecting.

_Add more acceptance criteria here (e.g. `PRC-4` overrides, `PRC-10` channel pricing)._

## Open Questions

- Which external pricing sources should be used?
- Should dynamic pricing be automatic, recommendation-based, or both?
- How frequently should prices refresh?
- Should vendors be able to set minimum and maximum price limits?

## Additional Details

_Add pricing-rule model, channel definitions, and external data-source options here._

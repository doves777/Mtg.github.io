# 08 · Store Credit & Customer Accounts

> Track customer store-credit balances and profiles, and use credit as a first-class tender across buying and selling.

| | |
| --- | --- |
| **Area** | Store Credit (`SC`) |
| **Priority** | Medium-High |
| **MVP** | Later |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Card vendors run heavily on **store credit** — customers sell/trade cards for credit, then spend it in-store or online. Credit needs to be a real balance tied to a customer account, issued from buylist/refunds, redeemable at checkout, and consistent across channels. This connects [Buying/Buylist](./07-buying-tradein-buylist.md) with [POS](./04-point-of-sale-checkout.md) and the [Storefront](./09-storefront-and-merchandising.md).

## Requirements

- [ ] **SC-1** — Maintain a store-credit balance per customer as a ledger of credits and debits.
- [ ] **SC-2** — Issue store credit from buylist payouts, refunds/returns, promotions, and manual adjustments.
- [ ] **SC-3** — Redeem store credit as a tender at POS and at online checkout.
- [ ] **SC-4** — Show a customer's available credit balance during checkout and buylist review.
- [ ] **SC-5** — Support a store-wide credit multiplier (credit offers higher than cash) with per-rule and per-condition overrides and trade-in bonuses.
- [ ] **SC-6** — Support gift cards (issue, redeem, check balance).
- [ ] **SC-7** — Keep store credit continuous across online and in-store, tied to one customer account.
- [ ] **SC-8** — Support manual adjustments, expirations, and a full audit trail of every credit change.
- [ ] **SC-9** — Maintain customer accounts/profiles (contact info, order history, buylist history, credit balance).

## Acceptance Criteria

> Add acceptance criteria per requirement using its ID.

### SC-3 — Redeem credit as tender
- [ ] A customer's store credit can be applied to reduce the amount due at POS and online checkout.
- [ ] Redeemed credit debits the ledger and the new balance is reflected immediately.

_Add more acceptance criteria here (e.g. `SC-1` ledger, `SC-5` variable credit)._

## Open Questions

- Should credit and cash offers be configurable per product line, or only store-wide?
- Do we issue our own store credit ledger, or integrate an external one (e.g. Shopify store credit)?
- Should gift cards and store credit be the same balance or separate?

## Additional Details

_Add the credit ledger model, adjustment/expiry rules, and customer-account schema here._

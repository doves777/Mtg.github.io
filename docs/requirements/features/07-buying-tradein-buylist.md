# 07 · Buying, Trade-In & Buylist Management

> Efficiently buy cards from customers, manage trade-ins, and publish scalable buylist prices.

| | |
| --- | --- |
| **Area** | Buying / Buylist (`BUY`) |
| **Priority** | Medium (MVP: basic intake + buylist pricing) |
| **MVP** | Should-have (basic buylist pricing + buy order intake) |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Acquisition is the mirror of selling. Vendors need fast intake, scalable buylist pricing, and guardrails so buying stays profitable. Accepted buys should flow into inventory with minimal duplicate entry.

## Requirements

- [ ] **BUY-1** — Create buy orders or trade-in intake orders during shows, in-store, or online.
- [ ] **BUY-2** — Support customer-submitted sell lists (card name, set, condition, quantity, grading details, photos, notes).
- [ ] **BUY-3** — Allow customers to submit cards for cash, store credit, trade credit, or consignment consideration.
- [ ] **BUY-4** — Provide a fast intake workflow (search cards, evaluate condition, quote buy prices, finalize offers).
- [ ] **BUY-5** — Track buy order status: Draft, Submitted, Under review, Offer sent, Accepted, Rejected, Paid, Received, Added to inventory.
- [ ] **BUY-6** — Allow partial acceptance, partial rejection, and counteroffers on submitted sell lists.
- [ ] **BUY-7** — Convert accepted purchases into inventory records with minimal duplicate data entry.
- [ ] **BUY-8** — Support vendor-defined buylist rules by category, card type, condition, demand level, quantity needed, and margin target.
- [ ] **BUY-9** — Support scalable buylist pricing across large catalogs (bulk updates and automated rules).
- [ ] **BUY-10** — Store offline buylist prices so employees can quote buys when Wi-Fi is unreliable.
- [ ] **BUY-11** — Track buy price history, offer history, employee overrides, and final acquisition cost.
- [ ] **BUY-12** — Support approval permissions for high-value purchases, manual overrides, and exceptions.
- [ ] **BUY-13** — Generate customer receipts or purchase agreements for completed buys.
- [ ] **BUY-14** — Track payment method: cash, store credit, digital payout, or check.

### Dynamic Buylist Pricing

- [ ] **BUY-15** — Recommend buy prices based on current market price, inventory targets, historical sell-through, demand, desired margin, and event-specific demand.
- [ ] **BUY-16** — Allow vendors to set buy price floors, ceilings, percentages of market value, and category-specific rules.
- [ ] **BUY-17** — Allow different buylist prices by channel (show buy, online buylist, store credit, cash).
- [ ] **BUY-18** — Highlight cards the vendor should actively buy (high demand or low inventory).
- [ ] **BUY-19** — Flag risky buy prices (low liquidity, falling prices, poor sell-through).
- [ ] **BUY-20** — Allow vendors to approve, schedule, or lock buylist price changes before publishing.

## Acceptance Criteria

> Seeded from the original draft. Add or refine criteria per requirement using its ID.

### Buylist Pricing
- [ ] Vendor can define buylist pricing rules by category, condition, demand level, and target margin.
- [ ] Employees can view approved buy prices during customer intake.
- [ ] Buylist prices can be updated in bulk across large card catalogs.
- [ ] The system shows whether a buy price is based on a fixed rule, market percentage, manual override, or AI recommendation.
- [ ] Vendor can approve or reject recommended buylist price changes before publishing.

### Buy Order Intake
- [ ] Employee can create a buy order for a customer during a show or store interaction.
- [ ] Employee can search cards, enter condition and quantity, and generate a proposed offer.
- [ ] Accepted cards can be converted into inventory records.
- [ ] The system records acquisition cost, payment method, employee, date, and source customer.
- [ ] High-value or exception-based offers can require owner approval.

_Add more acceptance criteria here._

## Open Questions

- Should the first version support online customer-submitted sell lists, or only employee-created buy orders?
- Should trade credit and store credit be priced higher than cash offers?
- Which market data sources should determine buylist pricing?
- Should the system support consignment, or keep the first version focused on direct buys only?
- How should the product handle condition disputes between customer submissions and employee review?

## Additional Details

_Add the buy-order state machine, buylist rule model, and payout/credit handling here._

# 09 · Non-Functional Requirements

> The qualities the platform must have, independent of any single feature. Card shows are chaotic — the product must be fast and reliable, not just feature-rich.

| | |
| --- | --- |
| **Priority** | High |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Reliability

- [ ] The system must work during busy show periods.
- [ ] Offline or degraded mode should be available.
- [ ] Sync status should be visible and trustworthy.

## Performance

- [ ] Card search should be fast.
- [ ] Checkout should require minimal clicks.
- [ ] Inventory lookup should work well on mobile and tablet.
- [ ] Bulk inventory actions should handle large catalogs.

## Security

- [ ] Role-based permissions.
- [ ] Secure customer data.
- [ ] Secure payment data if payments are integrated.
- [ ] Employee access controls.
- [ ] Audit trail for price overrides and refunds.

## Scalability

- [ ] Support vendors with thousands to hundreds of thousands of cards.
- [ ] Support multiple employees using the system at once.
- [ ] Support multiple events and inventory locations.

## Usability

- [ ] Designed for fast-paced show environments.
- [ ] Simple enough for temporary employees to learn quickly.
- [ ] Mobile/tablet-friendly.
- [ ] Clear offline indicators.
- [ ] Minimal manual entry during checkout.

## Internationalization & Hardware

- [ ] Multi-currency support.
- [ ] Multi-language / localization (including buylist and storefront).
- [ ] Support common retail peripherals (receipt printer, cash drawer, barcode scanner, card terminal) — see `POS-18`.

## Additional Details

_Add measurable targets (e.g. search latency, uptime), compliance needs, and testing strategy here._

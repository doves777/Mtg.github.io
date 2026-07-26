# Card Show SaaS — Requirements

A living requirements library for the **Card Show Vendor Operations Platform**: a modern SaaS for medium-to-large trading card vendors who sell at card shows, conventions, and events.

This folder is the single source of truth for *what* we are building and *why*. It is intentionally kept **high level** for now — each area has room to grow acceptance criteria (AC) and detail over time.

## How this is organized

| # | Document | What it covers |
| --- | --- | --- |
| 00 | [Product Overview](./00-product-overview.md) | Vision, problem, target customers, user types |
| 01 | [Inventory Management](./features/01-inventory-management.md) | Cataloging and tracking cards across locations |
| 02 | [Pricing & Price Lookup](./features/02-pricing-and-price-lookup.md) | Fast, consistent pricing incl. dynamic pricing |
| 03 | [Order Management](./features/03-order-management.md) | Orders across in-person and online, incl. pickup |
| 04 | [Point of Sale & Checkout](./features/04-point-of-sale-checkout.md) | Fast checkout incl. offline mode |
| 05 | [Show & Event Management](./features/05-show-event-management.md) | Event-specific workflows |
| 06 | [Customer Experience](./features/06-customer-experience.md) | Buyer-facing browsing and pickup |
| 07 | [Buying, Trade-In & Buylist](./features/07-buying-tradein-buylist.md) | Acquiring cards from customers |
| F08 | [Store Credit & Customer Accounts](./features/08-store-credit-and-accounts.md) | Store-credit ledger, gift cards, customer profiles |
| F09 | [Storefront & Merchandising](./features/09-storefront-and-merchandising.md) | Buyer-facing store, search, kiosk, merchandising |
| 08 | [AI Capabilities](./08-ai-capabilities.md) | AI for vendors, customers, and operations |
| 09 | [Non-Functional Requirements](./09-non-functional-requirements.md) | Reliability, performance, security, scale, UX |
| 10 | [MVP Scope](./10-mvp-scope.md) | Must-haves, should-haves, and later features |
| 11 | [User Stories](./11-user-stories.md) | Stories by user type |
| 12 | [Risks](./12-risks.md) | Key risks to watch |
| 13 | [Roadmap & Next Steps](./13-roadmap-and-next-steps.md) | How to kick off and sequence work |
| — | [Customer Discovery](./discovery/README.md) | Interview kit for validating the problem (roadmap step 1) |
| — | [Competitive Review](./competitive-review.md) | Market landscape and scoring vs. our requirement areas |
| — | [Competitor Parity — Storepass](./competitor-parity-storepass.md) | Storepass feature-by-feature mapping to our requirements |

Reusable template for new features: [`_feature-template.md`](./_feature-template.md)

## How to use these docs

Every **feature** doc (01–07 plus F08–F09) follows the same shape so it's easy to scan and easy to extend:

1. **Summary + metadata table** — priority, MVP flag, status, owner.
2. **Overview** — the goal in a few sentences.
3. **Requirements** — high-level capabilities as a checklist, each with a stable ID.
4. **Acceptance Criteria (AC)** — how we'll know it's done. *Add yours here.*
5. **Open Questions** — decisions still to be made.
6. **Additional Details** — space for data models, designs, edge cases, dependencies. *Add yours here.*

### Requirement IDs

Each requirement has a short, stable ID (e.g. `INV-1`, `PRC-3`, `POS-2`). Use these IDs when writing acceptance criteria, filing issues, or linking commits so everything stays traceable as the docs grow.

| Prefix | Area |
| --- | --- |
| `INV` | Inventory Management |
| `PRC` | Pricing & Price Lookup |
| `ORD` | Order Management |
| `POS` | Point of Sale & Checkout |
| `EVT` | Show & Event Management |
| `CX`  | Customer Experience |
| `BUY` | Buying, Trade-In & Buylist |
| `SC`  | Store Credit & Customer Accounts |
| `STF` | Storefront & Merchandising |

### Adding acceptance criteria

Write AC as verifiable checkboxes under a feature's **Acceptance Criteria** section. Reference the requirement ID when it applies. Example:

```markdown
### INV-1 — Add/edit/remove cards
- [ ] User can create a card with required fields (name, category, condition, quantity, price).
- [ ] Editing a card updates it everywhere it appears (search, orders, reports).
- [ ] Removing a card is blocked (or soft-deleted) if it is referenced by an open order.
```

### Adding details

Put anything deeper — schemas, wireframe links, flows, non-obvious edge cases — under **Additional Details** so the top of each doc stays skimmable.

### Status legend

Use these values in the metadata table's **Status** row: `Draft` · `In review` · `Approved` · `In build` · `Shipped`.

### Conventions

- Keep the top of each doc high-level; push depth into **Additional Details**.
- One capability per requirement line; keep IDs stable once assigned (append new ones, don't renumber).
- Prefer checkboxes for anything trackable so progress is visible at a glance.

# 05 · Show & Event Management

> Event-specific workflows: assign inventory, set show pricing, and track results per event.

| | |
| --- | --- |
| **Area** | Events (`EVT`) |
| **Priority** | Medium-High |
| **MVP** | Yes (show mode: assign inventory + track sales by event) |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Overview

Shows are the unit of work for these vendors. The platform should let vendors scope inventory, pricing, and reporting to a specific event, and prepare for it ahead of time.

## Requirements

- [ ] **EVT-1** — Create an event/show profile.
- [ ] **EVT-2** — Assign inventory to a show.
- [ ] **EVT-3** — Set show-specific pricing.
- [ ] **EVT-4** — Track orders by event.
- [ ] **EVT-5** — Track employee activity by event.
- [ ] **EVT-6** — View event sales reports.
- [ ] **EVT-7** — Manage pickup windows and booth details.
- [ ] **EVT-8** — Allow vendors to publish event-specific pickup inventory.
- [ ] **EVT-9** — Support pre-show order preparation.

## Acceptance Criteria

> Add acceptance criteria per requirement using its ID.

_Example placeholder — replace with real criteria:_

### EVT-2 — Assign inventory to a show
- [ ] Vendor can add/remove inventory to an event before and during the show.
- [ ] Only event-assigned inventory appears in that show's pickup listings and reports.

### EVT-1 — Create an event/show profile
- [ ] Vendor can create a show with name, dates, location, and booth/table details.
- [ ] The active event can be selected so new sales and orders are attributed to it.

### EVT-4 — Track orders by event
- [ ] Orders created during or assigned to a show are linked to that event.
- [ ] Vendor can view the list of orders for a specific event.

### EVT-6 — Event sales reports
- [ ] Vendor can view an event report showing total sales, top-selling items, and count of inventory sold.
- [ ] Report distinguishes sold vs. unsold inventory assigned to the event.
- [ ] An at-a-glance event summary is available after the show.

_Add more acceptance criteria here (e.g. `EVT-6` sales reports, `EVT-9` pre-show prep)._

## Open Questions

- Should customers browse inventory by event?
- Should the product eventually become a marketplace for show pickup?
- Do vendors need multi-booth or multi-table support?

## Additional Details

_Add the event data model, pickup-window rules, and multi-booth considerations here._

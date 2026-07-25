# Architecture Decision Records (ADRs)

This folder captures the significant architecture and technology decisions for the
**Card Show Vendor Operations Platform**. It complements the product requirements in
[`../requirements/`](../requirements/README.md): the requirements describe *what* and
*why*, while ADRs describe *how* and record the trade-offs behind each decision.

## What is an ADR?

An ADR is a short, immutable document describing one architecturally significant
decision. We follow a lightweight version of the classic
[Michael Nygard format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions):

- **Status** — `Proposed` · `Accepted` · `Superseded by NNNN` · `Deprecated`.
- **Context** — the forces at play: requirements, constraints, and NFRs that pushed us.
- **Decision** — the choice we made, stated plainly.
- **Consequences** — what becomes easier, harder, or riskier as a result.
- **Alternatives considered** — the other credible options and why we passed on them.

### Conventions

- Files are named `NNNN-short-title.md`, numbered sequentially and never renumbered.
- ADRs are immutable once `Accepted`. To change a decision, add a new ADR and mark the
  old one `Superseded by NNNN`.
- Keep each ADR focused on a single decision. Link to requirements by their stable IDs
  (e.g. `POS-10`, `PRC-2`) so decisions stay traceable.

## Index

| # | Title | Status |
| --- | --- | --- |
| [0001](./0001-tech-stack.md) | Platform technology stack | Accepted |
| [0002](./0002-offline-sync.md) | Offline-first sync strategy | Accepted |

## Related

- Product overview — [`../requirements/00-product-overview.md`](../requirements/00-product-overview.md)
- MVP scope — [`../requirements/10-mvp-scope.md`](../requirements/10-mvp-scope.md)
- Non-functional requirements — [`../requirements/09-non-functional-requirements.md`](../requirements/09-non-functional-requirements.md)
- Starter app scaffold — [`../../app/README.md`](../../app/README.md)

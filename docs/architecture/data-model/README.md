# Data Models

Working data-model references for the platform's core domain objects. These are design docs (shapes, fields, enumerations, examples) that inform the schema behind the requirements — distinct from ADRs, which record decisions.

## Index

| Model | Scope | Status |
| --- | --- | --- |
| [Card — MTG](./card-mtg.md) | Magic: The Gathering single cards (oracle / printing / inventory layers) | Draft |

## Conventions

- Separate **oracle card** (gameplay identity) from **printing** (a set's version) from **inventory item** (a vendor's physical copy). See the MTG model for the rationale.
- Keep shared fields (condition, finish, language, price, quantity, location) on the inventory layer for every game; put game-specific gameplay fields on the oracle/printing layer.
- Link fields to requirement IDs (e.g. `INV-3`, `PRC-10`) so the model stays traceable to [requirements](../../requirements/README.md).

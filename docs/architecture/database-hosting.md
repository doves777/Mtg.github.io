# Database hosting (cloud Postgres)

| | |
| --- | --- |
| **Status** | Draft |
| **Related** | [ADR 0001](./0001-tech-stack.md) · [ADR 0002 offline sync](./0002-offline-sync.md) · [data models](./data-model/README.md) · app scaffold [`../../app/README.md`](../../app/README.md) |
| **Last updated** | 2026-08-16 |

## Goal

Host the **authoritative** catalog + vendor inventory in managed Postgres so booth tablets can **pre-download a snapshot** and keep selling on bad Wi‑Fi (see ADR 0002). The cloud DB is not on the critical path mid-sale.

```
Neon Postgres (source of truth)
   │  pre-show sync / when online
   ▼
Tablet IndexedDB snapshot + order outbox
   │  at the show (offline OK)
   ▼
Sales queue → sync back to Postgres when connected
```

## Recommended host: Neon

ADR 0001 allows **Neon or Supabase**. For getting started we recommend **[Neon](https://neon.tech)** (serverless Postgres, free tier, pooled connections that work well with Next.js / Vercel).

### 1. Create a project (≈ 2 minutes)

1. Sign up at [console.neon.tech](https://console.neon.tech)
2. **New Project** → name e.g. `card-show-vendor` → region closest to you
3. Open **Connection details**
4. Copy the **pooled** connection string (`…-pooler.…` / “Pooled connection”)
5. It looks like:

```text
postgresql://USER:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require
```

### 2. Wire the app

```bash
cd app
cp .env.example .env.local
# paste DATABASE_URL=… into .env.local
npm install
npm run db:push      # apply schema (POC) — or npm run db:generate && npm run db:migrate
npm run db:seed      # demo tenant + a few Pokémon rows
npm run db:ping      # connectivity + row counts
```

`.env.local` is gitignored — never commit the password.

### 3. What gets created

| Table | Purpose |
| --- | --- |
| `tenants` | Vendor orgs |
| `products` | Catalog printings / sealed SKUs (`game`, Pokémon fields, `owner_tenant_id` for niche imports) |
| `inventory_items` | That vendor’s copies (condition, finish, qty, price cents) |

Shared high-ROI catalog rows use `products.owner_tenant_id IS NULL`. Niche CSV imports set `owner_tenant_id` to the vendor.

Schema source: [`app/src/data/db/schema.ts`](../../app/src/data/db/schema.ts).

## Local Postgres (optional, no Neon account yet)

Useful for agents / offline coding. Example (matches `.env.example`):

```bash
# DATABASE_URL=postgresql://cardshow:cardshow@127.0.0.1:5432/cardshow_dev
cd app && npm run db:push && npm run db:seed && npm run db:ping
```

## npm scripts

| Script | What it does |
| --- | --- |
| `db:push` | Push schema to the DB (fast POC iteration) |
| `db:generate` | Generate SQL migration files under `app/drizzle/` |
| `db:migrate` | Apply generated migrations |
| `db:seed` | Insert demo tenant + Pokémon sample stock |
| `db:ping` | Verify connection + print table counts |
| `db:studio` | Open Drizzle Studio against `DATABASE_URL` |

## Security notes (POC → MVP)

- POC: single `DATABASE_URL` with a privileged role is fine for a private Neon project
- MVP: enable **RLS** on `inventory_items` (and tenant-owned products) keyed by `tenant_id` — ADR 0001
- Never expose `DATABASE_URL` to the browser; only server routes / sync jobs talk to Postgres
- Tablets receive a **scoped show snapshot**, not the full catalog dump, when possible

## Next steps after this scaffold

1. You create the Neon project and set `DATABASE_URL` (this agent cannot create your Neon account)
2. Catalog sync job: pull high-ROI English SV printings from [Pokémon TCG API](https://pokemontcg.io/) into `products`
3. CSV import path for niche cards → `products` with `owner_tenant_id`
4. Show-assignment + snapshot endpoint for ADR 0002 offline download
5. Swap `InMemoryInventoryRepository` for a Drizzle-backed repository when ready

## Supabase alternative

Same schema and Drizzle setup work with Supabase’s Postgres connection string. Prefer Neon unless you already want Supabase Auth/storage in the same project.

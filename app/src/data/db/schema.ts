/**
 * Postgres schema (Drizzle) — POC cloud catalog + vendor inventory.
 *
 * Aligns with docs/architecture/data-model/ (Product → InventoryItem) and ADR 0001.
 * First shows are Pokémon; `game` keeps MTG/other catalogs in the same tables.
 *
 * - `products.ownerTenantId = null` → shared platform catalog (high-ROI sync)
 * - `products.ownerTenantId = <tenant>` → vendor niche / CSV import
 * - `inventory_items` → that vendor's copies (condition, finish, qty, price)
 */

import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** `single_card` | `sealed_product` */
    productType: text("product_type").notNull(),
    /** `Pokemon` | `MTG` | … */
    game: text("game").notNull(),
    name: text("name").notNull(),
    setName: text("set_name"),
    setCode: text("set_code"),
    series: text("series"),
    collectorNumber: text("collector_number"),
    /** Card face number, e.g. `223/197` (Pokémon). */
    printedNumber: text("printed_number"),
    rarity: text("rarity"),
    raritySymbol: text("rarity_symbol"),
    finishes: jsonb("finishes").$type<string[]>(),
    variant: text("variant"),
    /** Sealed only — e.g. `elite_trainer_box`, `booster_pack`. */
    sealedType: text("sealed_type"),
    language: text("language").notNull().default("en"),
    imageUrl: text("image_url"),
    externalIds: jsonb("external_ids").$type<Record<string, string | null>>(),
    catalogMeta: jsonb("catalog_meta").$type<Record<string, unknown>>(),
    /**
     * null = shared platform catalog.
     * set = niche product owned by one vendor (CSV / manual import).
     */
    ownerTenantId: uuid("owner_tenant_id").references(() => tenants.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("products_game_name_idx").on(t.game, t.name),
    index("products_set_collector_idx").on(t.setCode, t.collectorNumber),
    index("products_owner_tenant_idx").on(t.ownerTenantId),
  ],
);

export const inventoryItems = pgTable(
  "inventory_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    condition: text("condition").notNull(),
    /** Singles: `nonfoil` | `holofoil` | `reverse_holo` | … ; sealed: null */
    finish: text("finish"),
    language: text("language").notNull().default("en"),
    quantity: integer("quantity").notNull().default(0),
    /** Unit price in cents. */
    priceCents: integer("price_cents").notNull(),
    costCents: integer("cost_cents"),
    location: text("location"),
    reservedQty: integer("reserved_qty").notNull().default(0),
    graded: boolean("graded").notNull().default(false),
    grading: jsonb("grading").$type<{
      company?: string;
      grade?: string;
      certNumber?: string;
    } | null>(),
    channelPrices: jsonb("channel_prices").$type<{
      show?: number | null;
      online?: number | null;
      store?: number | null;
    } | null>(),
    status: text("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("inventory_tenant_idx").on(t.tenantId),
    index("inventory_tenant_product_idx").on(t.tenantId, t.productId),
    index("inventory_tenant_status_idx").on(t.tenantId, t.status),
  ],
);

export type Tenant = typeof tenants.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InventoryItemRow = typeof inventoryItems.$inferSelect;

/**
 * Inventory domain model (see requirements/features/01-inventory-management.md).
 *
 * A `Card` is a catalog entry; a `InventoryItem` is a tenant's stock of that card at a
 * given condition/location. In production this is backed by Postgres (ADR 0001); here the
 * types drive the in-memory scaffold and the offline snapshot shape.
 */

import type { TenantScoped } from "./tenancy";

export type CardCategory =
  | "Sports"
  | "Pokemon"
  | "Magic"
  | "YuGiOh"
  | "OnePiece"
  | "Lorcana"
  | "Other";

export type Condition = "NM" | "LP" | "MP" | "HP" | "DMG" | "Graded" | "Sealed";

export type Finish = "nonfoil" | "foil" | "etched";
export type ProductType = "single_card" | "sealed_product";
export type Rarity = "common" | "uncommon" | "rare" | "mythic" | "special";

export interface Card {
  id: string;
  name: string;
  setName: string;
  category: CardCategory;
  /** Human/scannable identifier (barcode, SKU, QR). See INV-6. */
  sku: string;
  // Optional selling-focused catalog metadata (see data-model/card-mtg.md).
  setCode?: string;
  collectorNumber?: string;
  rarity?: Rarity;
  finish?: Finish;
  productType?: ProductType;
  /** Accent color for the visual tile (stand-in for card art in the prototype). */
  accent?: string;
}

export interface InventoryItem extends TenantScoped {
  id: string;
  card: Card;
  condition: Condition;
  /** Unit price in cents to avoid float rounding at checkout. */
  priceCents: number;
  quantity: number;
  location: string;
}

export function isLowStock(item: InventoryItem, threshold = 2): boolean {
  return item.quantity <= threshold;
}

/**
 * Naive client-side search over the cached snapshot. Production search uses Postgres FTS +
 * pg_trgm (ADR 0001); offline this runs against the IndexedDB projection.
 */
export function searchInventory(items: InventoryItem[], query: string): InventoryItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => {
    const c = it.card;
    const haystack = `${c.name} ${c.setName} ${c.category} ${c.sku} ${c.setCode ?? ""} ${c.collectorNumber ?? ""} ${c.rarity ?? ""}`;
    return haystack.toLowerCase().includes(q);
  });
}

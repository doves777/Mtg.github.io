/**
 * Sample MTG catalog used by the prototype. In production this data lives in Postgres and is
 * projected into IndexedDB per assigned show for offline lookup (ADR 0001 / 0002).
 * STUB: replace with a real repository + catalog sync / bulk import (INV-5, INV-11).
 *
 * Prices are illustrative. Fields mirror the selling-focused model in
 * docs/architecture/data-model/card-mtg.md (single_card) and sealed-product-mtg.md.
 */

import type { InventoryItem } from "@/domain/inventory";

export const DEMO_TENANT_ID = "tenant-demo";
export const DEMO_SHOW_ID = "show-summercon-2026";
export const DEMO_SHOW_NAME = "SummerCon 2026 · Booth 214";
export const DEMO_REGISTER = "Register 2";
export const DEMO_EMPLOYEE = "Jordan (Staff)";
/** Demo sales-tax rate in basis points (8.25%). */
export const DEMO_TAX_BPS = 825;

export const seedInventory: InventoryItem[] = [
  {
    id: "inv-otj-223",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-oko", name: "Oko, the Ringleader", setName: "Outlaws of Thunder Junction",
      category: "Magic", sku: "MTG-OTJ-223", setCode: "OTJ", collectorNumber: "223",
      rarity: "mythic", finish: "nonfoil", productType: "single_card", accent: "#0e7490",
    },
    condition: "LP", priceCents: 40, quantity: 6, location: "Binder 2",
  },
  {
    id: "inv-otj-223f",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-oko-foil", name: "Oko, the Ringleader", setName: "Outlaws of Thunder Junction",
      category: "Magic", sku: "MTG-OTJ-223F", setCode: "OTJ", collectorNumber: "223",
      rarity: "mythic", finish: "foil", productType: "single_card", accent: "#14b8a6",
    },
    condition: "NM", priceCents: 250, quantity: 3, location: "Binder 2",
  },
  {
    id: "inv-dmu-107",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-sheoldred", name: "Sheoldred, the Apocalypse", setName: "Dominaria United",
      category: "Magic", sku: "MTG-DMU-107", setCode: "DMU", collectorNumber: "107",
      rarity: "mythic", finish: "nonfoil", productType: "single_card", accent: "#3f3f46",
    },
    condition: "NM", priceCents: 6499, quantity: 3, location: "Showcase A",
  },
  {
    id: "inv-mh2-138",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-ragavan", name: "Ragavan, Nimble Pilferer", setName: "Modern Horizons 2",
      category: "Magic", sku: "MTG-MH2-138", setCode: "MH2", collectorNumber: "138",
      rarity: "mythic", finish: "nonfoil", productType: "single_card", accent: "#b91c1c",
    },
    condition: "NM", priceCents: 4500, quantity: 2, location: "Showcase A",
  },
  {
    id: "inv-grn-257",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-steamvents", name: "Steam Vents", setName: "Guilds of Ravnica",
      category: "Magic", sku: "MTG-GRN-257", setCode: "GRN", collectorNumber: "257",
      rarity: "rare", finish: "nonfoil", productType: "single_card", accent: "#7c3aed",
    },
    condition: "LP", priceCents: 799, quantity: 5, location: "Binder 1",
  },
  {
    id: "inv-2x2-117",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-bolt", name: "Lightning Bolt", setName: "Double Masters 2022",
      category: "Magic", sku: "MTG-2X2-117", setCode: "2X2", collectorNumber: "117",
      rarity: "uncommon", finish: "nonfoil", productType: "single_card", accent: "#ea580c",
    },
    condition: "NM", priceCents: 150, quantity: 40, location: "Binder 1",
  },
  {
    id: "inv-c21-263",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-solring", name: "Sol Ring", setName: "Commander 2021",
      category: "Magic", sku: "MTG-C21-263", setCode: "C21", collectorNumber: "263",
      rarity: "uncommon", finish: "nonfoil", productType: "single_card", accent: "#64748b",
    },
    condition: "NM", priceCents: 125, quantity: 25, location: "Bulk box" },
  {
    id: "inv-one-201",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-atraxa", name: "Atraxa, Grand Unifier", setName: "Phyrexia: All Will Be One",
      category: "Magic", sku: "MTG-ONE-201F", setCode: "ONE", collectorNumber: "201",
      rarity: "mythic", finish: "foil", productType: "single_card", accent: "#ca8a04",
    },
    condition: "NM", priceCents: 2799, quantity: 1, location: "Showcase A",
  },
  // Sealed products (see data-model/sealed-product-mtg.md)
  {
    id: "inv-otc-desertbloom",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-otc-desertbloom",
      name: "Outlaws of Thunder Junction Deluxe Commander Kit - Desert Bloom",
      setName: "Commander: Outlaws of Thunder Junction",
      category: "Magic", sku: "MTG-OTC-DELUXE-DESERTBLOOM", setCode: "OTC",
      rarity: "special", productType: "sealed_product", accent: "#c2410c",
    },
    condition: "Sealed", priceCents: 15500, quantity: 4, location: "Sealed shelf",
  },
  {
    id: "inv-mkm-boosterbox",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-mkm-box", name: "Murders at Karlov Manor Play Booster Box",
      setName: "Murders at Karlov Manor", category: "Magic", sku: "MTG-MKM-PBBOX",
      setCode: "MKM", rarity: "special", productType: "sealed_product", accent: "#334155",
    },
    condition: "Sealed", priceCents: 10999, quantity: 2, location: "Sealed shelf",
  },
];

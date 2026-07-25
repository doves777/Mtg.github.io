/**
 * Sample catalog used by the scaffold. In production this data lives in Postgres and is
 * projected into IndexedDB per assigned show for offline lookup (ADR 0001 / 0002).
 * STUB: replace with a real repository + bulk import (INV-5) when the DB is wired up.
 */

import type { InventoryItem } from "@/domain/inventory";

export const DEMO_TENANT_ID = "tenant-demo";
export const DEMO_SHOW_ID = "show-demo-2026";

export const seedInventory: InventoryItem[] = [
  {
    id: "inv-1",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-1", name: "Charizard", setName: "Base Set", category: "Pokemon", sku: "PKM-BS-004" },
    condition: "LP",
    priceCents: 32000,
    quantity: 2,
    location: "Showcase A",
  },
  {
    id: "inv-2",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-2", name: "Black Lotus", setName: "Alpha", category: "Magic", sku: "MTG-ALP-232" },
    condition: "MP",
    priceCents: 1500000,
    quantity: 1,
    location: "Vault",
  },
  {
    id: "inv-3",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-3", name: "Blue-Eyes White Dragon", setName: "LOB", category: "YuGiOh", sku: "YGO-LOB-001" },
    condition: "NM",
    priceCents: 8500,
    quantity: 5,
    location: "Binder 3",
  },
  {
    id: "inv-4",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-4", name: "Monkey D. Luffy", setName: "OP-01", category: "OnePiece", sku: "OP-01-120" },
    condition: "NM",
    priceCents: 4200,
    quantity: 8,
    location: "Binder 1",
  },
  {
    id: "inv-5",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-5", name: "Elsa - Spirit of Winter", setName: "The First Chapter", category: "Lorcana", sku: "LOR-TFC-041" },
    condition: "NM",
    priceCents: 6000,
    quantity: 3,
    location: "Showcase B",
  },
  {
    id: "inv-6",
    tenantId: DEMO_TENANT_ID,
    card: { id: "c-6", name: "Michael Jordan Rookie", setName: "1986 Fleer", category: "Sports", sku: "SPT-FLR-057" },
    condition: "Graded",
    priceCents: 950000,
    quantity: 1,
    location: "Vault",
  },
];

/**
 * Sample MTG catalog used by the prototype. In production this data lives in Postgres and is
 * projected into IndexedDB per assigned show for offline lookup (ADR 0001 / 0002).
 * STUB: replace with a real repository + catalog sync / bulk import (INV-5, INV-11).
 *
 * Card art for singles comes from Scryfall's public CDN (https://scryfall.com/docs/api).
 * Sealed products use a representative face-card image + a SEALED badge in the UI.
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
      id: "c-oko",
      name: "Oko, the Ringleader",
      setName: "Outlaws of Thunder Junction",
      category: "Magic",
      sku: "MTG-OTJ-223",
      setCode: "OTJ",
      collectorNumber: "223",
      rarity: "mythic",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#0e7490",
      imageUrl:
        "https://cards.scryfall.io/normal/front/3/9/396df8d6-e85d-4486-8116-68841b7e1e2e.jpg",
    },
    condition: "LP",
    priceCents: 40,
    quantity: 6,
    location: "Binder 2",
  },
  {
    id: "inv-otj-223f",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-oko-foil",
      name: "Oko, the Ringleader",
      setName: "Outlaws of Thunder Junction",
      category: "Magic",
      sku: "MTG-OTJ-223F",
      setCode: "OTJ",
      collectorNumber: "223",
      rarity: "mythic",
      finish: "foil",
      productType: "single_card",
      accent: "#14b8a6",
      imageUrl:
        "https://cards.scryfall.io/normal/front/3/9/396df8d6-e85d-4486-8116-68841b7e1e2e.jpg",
    },
    condition: "NM",
    priceCents: 250,
    quantity: 3,
    location: "Binder 2",
  },
  {
    id: "inv-dmu-107",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-sheoldred",
      name: "Sheoldred, the Apocalypse",
      setName: "Dominaria United",
      category: "Magic",
      sku: "MTG-DMU-107",
      setCode: "DMU",
      collectorNumber: "107",
      rarity: "mythic",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#3f3f46",
      imageUrl:
        "https://cards.scryfall.io/normal/front/d/6/d67be074-cdd4-41d9-ac89-0a0456c4e4b2.jpg",
    },
    condition: "NM",
    priceCents: 6499,
    quantity: 3,
    location: "Showcase A",
  },
  {
    id: "inv-mh2-138",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-ragavan",
      name: "Ragavan, Nimble Pilferer",
      setName: "Modern Horizons 2",
      category: "Magic",
      sku: "MTG-MH2-138",
      setCode: "MH2",
      collectorNumber: "138",
      rarity: "mythic",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#b91c1c",
      imageUrl:
        "https://cards.scryfall.io/normal/front/a/9/a9738cda-adb1-47fb-9f4c-ecd930228c4d.jpg",
    },
    condition: "NM",
    priceCents: 4500,
    quantity: 2,
    location: "Showcase A",
  },
  {
    id: "inv-grn-257",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-steamvents",
      name: "Steam Vents",
      setName: "Guilds of Ravnica",
      category: "Magic",
      sku: "MTG-GRN-257",
      setCode: "GRN",
      collectorNumber: "257",
      rarity: "rare",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#7c3aed",
      imageUrl:
        "https://cards.scryfall.io/normal/front/b/8/b8ebe3cf-7143-453a-b0ef-2f5bdaac3185.jpg",
    },
    condition: "LP",
    priceCents: 799,
    quantity: 5,
    location: "Binder 1",
  },
  {
    id: "inv-2x2-117",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-bolt",
      name: "Lightning Bolt",
      setName: "Double Masters 2022",
      category: "Magic",
      sku: "MTG-2X2-117",
      setCode: "2X2",
      collectorNumber: "117",
      rarity: "uncommon",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#ea580c",
      imageUrl:
        "https://cards.scryfall.io/normal/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.jpg",
    },
    condition: "NM",
    priceCents: 150,
    quantity: 40,
    location: "Binder 1",
  },
  {
    id: "inv-c21-263",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-solring",
      name: "Sol Ring",
      setName: "Commander 2021",
      category: "Magic",
      sku: "MTG-C21-263",
      setCode: "C21",
      collectorNumber: "263",
      rarity: "uncommon",
      finish: "nonfoil",
      productType: "single_card",
      accent: "#64748b",
      imageUrl:
        "https://cards.scryfall.io/normal/front/4/c/4cbc6901-6a4a-4d0a-83ea-7eefa3b35021.jpg",
    },
    condition: "NM",
    priceCents: 125,
    quantity: 25,
    location: "Bulk box",
  },
  {
    id: "inv-one-196",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-atraxa",
      name: "Atraxa, Grand Unifier",
      setName: "Phyrexia: All Will Be One",
      category: "Magic",
      sku: "MTG-ONE-196F",
      setCode: "ONE",
      collectorNumber: "196",
      rarity: "mythic",
      finish: "foil",
      productType: "single_card",
      accent: "#ca8a04",
      imageUrl:
        "https://cards.scryfall.io/normal/front/4/a/4a1f905f-1d55-4d02-9d24-e58070793d3f.jpg",
    },
    condition: "NM",
    priceCents: 2799,
    quantity: 1,
    location: "Showcase A",
  },
  // Sealed products — face-card art + SEALED badge in the UI
  {
    id: "inv-otc-desertbloom",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-otc-desertbloom",
      name: "Outlaws of Thunder Junction Deluxe Commander Kit - Desert Bloom",
      setName: "Commander: Outlaws of Thunder Junction",
      category: "Magic",
      sku: "MTG-OTC-DELUXE-DESERTBLOOM",
      setCode: "OTC",
      rarity: "special",
      productType: "sealed_product",
      accent: "#c2410c",
      // Face card of the Desert Bloom commander (Yuma) as stand-in art
      imageUrl:
        "https://cards.scryfall.io/normal/front/1/8/18df72be-07d2-4412-b36d-a45119763db3.jpg",
    },
    condition: "Sealed",
    priceCents: 15500,
    quantity: 4,
    location: "Sealed shelf",
  },
  {
    id: "inv-mkm-boosterbox",
    tenantId: DEMO_TENANT_ID,
    card: {
      id: "c-mkm-box",
      name: "Murders at Karlov Manor Play Booster Box",
      setName: "Murders at Karlov Manor",
      category: "Magic",
      sku: "MTG-MKM-PBBOX",
      setCode: "MKM",
      rarity: "special",
      productType: "sealed_product",
      accent: "#334155",
      imageUrl:
        "https://cards.scryfall.io/normal/front/7/0/70e9d8b8-4b32-4414-b32f-1f47523239c5.jpg",
    },
    condition: "Sealed",
    priceCents: 10999,
    quantity: 2,
    location: "Sealed shelf",
  },
];

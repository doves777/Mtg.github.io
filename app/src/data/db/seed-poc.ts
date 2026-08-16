/**
 * Minimal POC seed: one demo tenant + a few Pokémon products + inventory rows.
 *
 *   cd app && npm run db:seed
 *
 * Requires DATABASE_URL and applied migrations (`npm run db:push` or `db:migrate`).
 */

import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { createDb } from "./client";
import { inventoryItems, products, tenants } from "./schema";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  const db = createDb();

  const existing = await db.select().from(tenants).where(eq(tenants.name, "Demo Booth Vendor")).limit(1);
  let tenantId = existing[0]?.id;

  if (!tenantId) {
    const [tenant] = await db
      .insert(tenants)
      .values({ name: "Demo Booth Vendor" })
      .returning();
    tenantId = tenant.id;
    console.log("Created tenant", tenantId);
  } else {
    console.log("Reusing tenant", tenantId);
  }

  const catalog: Array<{
    productType: string;
    game: string;
    name: string;
    setName: string;
    setCode: string;
    series: string;
    collectorNumber?: string;
    printedNumber?: string;
    rarity?: string;
    raritySymbol?: string;
    finishes?: string[];
    variant?: string;
    sealedType?: string;
    language: string;
    externalIds: Record<string, string | null>;
  }> = [
    {
      productType: "single_card",
      game: "Pokemon",
      name: "Charizard ex",
      setName: "Obsidian Flames",
      setCode: "OBF",
      series: "Scarlet & Violet",
      collectorNumber: "223",
      printedNumber: "223/197",
      rarity: "special_illustration_rare",
      raritySymbol: "SIR",
      finishes: ["nonfoil"],
      variant: "special_illustration_rare",
      language: "en",
      externalIds: { tcgplayerId: null, pokemonTcgIoId: null },
    },
    {
      productType: "single_card",
      game: "Pokemon",
      name: "Sprigatito",
      setName: "Paldea Evolved",
      setCode: "PAL",
      series: "Scarlet & Violet",
      collectorNumber: "13",
      printedNumber: "013/193",
      rarity: "common",
      finishes: ["nonfoil", "reverse_holo"],
      language: "en",
      externalIds: { tcgplayerId: null, pokemonTcgIoId: null },
    },
    {
      productType: "sealed_product",
      game: "Pokemon",
      name: "Surging Sparks Elite Trainer Box",
      setName: "Surging Sparks",
      setCode: "SSP",
      series: "Scarlet & Violet",
      sealedType: "elite_trainer_box",
      language: "en",
      externalIds: { tcgplayerId: null, pokemonTcgIoId: null },
    },
  ];

  const productIds: string[] = [];
  for (const row of catalog) {
    const found = await db
      .select()
      .from(products)
      .where(eq(products.name, row.name))
      .limit(1);
    if (found[0]) {
      productIds.push(found[0].id);
      continue;
    }
    const [inserted] = await db.insert(products).values(row).returning();
    productIds.push(inserted.id);
    console.log("Inserted product", inserted.name, inserted.id);
  }

  const stock = [
    {
      productId: productIds[0],
      condition: "NM",
      finish: "nonfoil",
      quantity: 1,
      priceCents: 28500,
      location: "showcase",
    },
    {
      productId: productIds[1],
      condition: "NM",
      finish: "reverse_holo",
      quantity: 8,
      priceCents: 35,
      location: "binder",
    },
    {
      productId: productIds[2],
      condition: "Unopened",
      finish: null,
      quantity: 2,
      priceCents: 5499,
      location: "booth",
    },
  ];

  for (const row of stock) {
    await db.insert(inventoryItems).values({
      tenantId,
      productId: row.productId,
      condition: row.condition,
      finish: row.finish,
      quantity: row.quantity,
      priceCents: row.priceCents,
      location: row.location,
      language: "en",
      status: "active",
    });
  }

  console.log("Seeded inventory for tenant", tenantId);
  console.log("Done. Query with: npm run db:ping");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

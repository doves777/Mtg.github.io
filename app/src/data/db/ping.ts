/**
 * Sanity-check DATABASE_URL connectivity and row counts.
 *
 *   cd app && npm run db:ping
 */

import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { createDb } from "./client";
import { inventoryItems, products, tenants } from "./schema";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  const db = createDb();
  const versionRows = await db.execute(sql`select version() as v`);
  const version = String((versionRows as unknown as { v: string }[])[0]?.v ?? "unknown");
  const [t] = await db.select({ count: sql<number>`count(*)::int` }).from(tenants);
  const [p] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  const [i] = await db.select({ count: sql<number>`count(*)::int` }).from(inventoryItems);

  console.log("Connected OK");
  console.log("Postgres:", version.split(" ").slice(0, 2).join(" "));
  console.log("tenants:", t.count, "| products:", p.count, "| inventory_items:", i.count);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

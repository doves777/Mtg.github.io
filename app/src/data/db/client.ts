/**
 * Postgres client via Drizzle.
 *
 * Set `DATABASE_URL` (Neon pooled connection string, or local Postgres).
 * The in-memory repository remains the default for `npm run dev` when unset —
 * see `repository.ts`.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = ReturnType<typeof createDb>;

export function createDb(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy app/.env.example → app/.env.local and add your Neon (or local) connection string. See docs/architecture/database-hosting.md",
    );
  }
  const sql = postgres(connectionString, { prepare: false, max: 10 });
  return drizzle(sql, { schema });
}

let cached: Db | null = null;

/** Lazy singleton for server routes / scripts. */
export function getDb(): Db {
  if (!cached) cached = createDb();
  return cached;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

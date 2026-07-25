/**
 * Repository interface — the seam between the domain and persistence.
 *
 * Per ADR 0001 the production implementation is Postgres via Drizzle, scoped by tenantId
 * and enforced by Row-Level Security. This scaffold ships an in-memory implementation so
 * the app runs with zero external dependencies. Swap `InMemoryInventoryRepository` for a
 * `DrizzleInventoryRepository` without changing callers.
 */

import type { InventoryItem } from "@/domain/inventory";
import type { TenantId } from "@/domain/tenancy";
import { seedInventory } from "./seed-cards";

export interface InventoryRepository {
  listForTenant(tenantId: TenantId): Promise<InventoryItem[]>;
}

export class InMemoryInventoryRepository implements InventoryRepository {
  private readonly items: InventoryItem[];

  constructor(items: InventoryItem[] = seedInventory) {
    this.items = items;
  }

  async listForTenant(tenantId: TenantId): Promise<InventoryItem[]> {
    // In prod this WHERE clause is also enforced by RLS as a backstop.
    return this.items.filter((it) => it.tenantId === tenantId);
  }
}

export const inventoryRepository: InventoryRepository = new InMemoryInventoryRepository();

/**
 * Order model + offline-order shape (see features/03-order-management.md and ADR 0002).
 *
 * Orders are created locally first with a client-generated id so that syncing is
 * idempotent and retry-safe (ADR 0002, POS-12). Each order carries the inventory deltas
 * it implies so the server can reconcile stock and detect oversell on reconnect (POS-14/15).
 */

import type { TenantScoped } from "./tenancy";
import type { CartLine, CartTotals } from "./pricing";

export type OrderStatus =
  | "draft"
  | "queued" // completed offline, awaiting sync
  | "synced"
  | "needs_review"; // server flagged an oversell/conflict

export interface InventoryDelta {
  inventoryItemId: string;
  /** Negative for a sale. */
  delta: number;
}

export interface Order extends TenantScoped {
  /** Client-generated UUID — the idempotency key for sync (ADR 0002). */
  id: string;
  showId: string;
  employeeId: string;
  lines: CartLine[];
  totals: CartTotals;
  deltas: InventoryDelta[];
  status: OrderStatus;
  /** Monotonic logical clock / creation time used for conflict ordering. */
  createdAt: number;
}

export function deltasForLines(lines: CartLine[]): InventoryDelta[] {
  return lines.map((line) => ({
    inventoryItemId: line.inventoryItemId,
    delta: -line.quantity,
  }));
}

/**
 * Outbox / sync queue for offline orders (ADR 0002, POS-12..POS-15).
 *
 * Orders are appended locally with a client-generated id (idempotency key). When online,
 * `flush()` would POST the batch to the sync endpoint; the server reconciles inventory and
 * returns any oversell/conflict entries. In this scaffold `flush()` simulates a successful
 * sync so the demo works with no backend — clearly a STUB.
 */

import type { Order } from "@/domain/orders";
import { readJson, writeJson } from "./localStore";

const OUTBOX_KEY = "cardshow.outbox";

export type SyncState = "synced" | "offline" | "syncing" | "needs_review";

export function newClientId(): string {
  // crypto.randomUUID is available in modern browsers and Node 19+.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ord-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function getOutbox(): Promise<Order[]> {
  return readJson<Order[]>(OUTBOX_KEY, []);
}

export async function enqueue(order: Order): Promise<Order[]> {
  const outbox = await getOutbox();
  const next = [...outbox, order];
  await writeJson(OUTBOX_KEY, next);
  return next;
}

/**
 * STUB sync. A real implementation posts the outbox to the tRPC/REST sync endpoint and
 * applies the server's reconciliation result. Here we mark orders synced and clear them.
 */
export async function flush(): Promise<{ synced: number }> {
  const outbox = await getOutbox();
  const count = outbox.length;
  await writeJson<Order[]>(OUTBOX_KEY, []);
  return { synced: count };
}

export function isOnline(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

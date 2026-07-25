/**
 * Local persistence abstraction for the offline-first POS (ADR 0002).
 *
 * PRODUCTION: IndexedDB (via a wrapper such as Dexie) holds the read snapshot
 * (inventory/pricing for the assigned show) and the outbox of queued orders.
 *
 * SCAFFOLD STUB: to keep the demo dependency-free and easy to inspect, this uses
 * localStorage with the same async interface. The call sites do not change when we swap in
 * a real IndexedDB implementation.
 */

const isBrowser = typeof window !== "undefined";

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { searchInventory, type InventoryItem } from "@/domain/inventory";
import { computeTotals, formatCents, type CartLine } from "@/domain/pricing";
import { deltasForLines, type Order } from "@/domain/orders";
import { seedInventory, DEMO_SHOW_ID, DEMO_TENANT_ID } from "@/data/seed-cards";
import { SyncStatus } from "@/components/SyncStatus";
import { enqueue, flush, getOutbox, newClientId } from "@/offline/syncQueue";

export default function PosPage() {
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [online, setOnline] = useState(true);
  const [queued, setQueued] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    getOutbox().then((o) => setQueued(o.length));
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const results: InventoryItem[] = useMemo(
    () => searchInventory(seedInventory, query),
    [query],
  );

  const totals = useMemo(() => computeTotals(lines), [lines]);

  function addToCart(item: InventoryItem) {
    setLines((prev) => {
      const existing = prev.find((l) => l.inventoryItemId === item.id);
      if (existing) {
        return prev.map((l) =>
          l.inventoryItemId === item.id ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          inventoryItemId: item.id,
          name: `${item.card.name} (${item.condition})`,
          unitPriceCents: item.priceCents,
          quantity: 1,
        },
      ];
    });
  }

  async function completeOrder() {
    if (lines.length === 0) return;
    const order: Order = {
      id: newClientId(),
      tenantId: DEMO_TENANT_ID,
      showId: DEMO_SHOW_ID,
      employeeId: "emp-demo",
      lines,
      totals,
      deltas: deltasForLines(lines),
      status: "queued",
      createdAt: Date.now(),
    };
    const outbox = await enqueue(order);
    setQueued(outbox.length);
    setLines([]);
    setMessage(
      `Order ${order.id.slice(0, 8)} completed and queued locally (offline-safe).`,
    );
  }

  async function syncNow() {
    const { synced } = await flush();
    setQueued(0);
    setLastSyncedAt(Date.now());
    setMessage(synced > 0 ? `Synced ${synced} queued order(s).` : "Nothing to sync.");
  }

  return (
    <>
      <div className="card">
        <div className="row spread">
          <h1>Vendor POS</h1>
          <SyncStatus online={online} queued={queued} lastSyncedAt={lastSyncedAt} />
        </div>
        <p className="muted">
          Search runs against the cached inventory snapshot; completing an order works
          offline and queues it for sync (see ADR 0002).
        </p>
        <button className="secondary" onClick={syncNow}>
          Sync now
        </button>
      </div>

      {message && (
        <div className="card">
          <span className="pill online">{message}</span>
        </div>
      )}

      <div className="grid2">
        <div className="card">
          <h2>Search inventory</h2>
          <input
            placeholder="Name, set, category, or SKU…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div style={{ marginTop: "0.75rem" }}>
            {results.map((item) => (
              <div key={item.id} className="list-item">
                <div>
                  <div>{item.card.name}</div>
                  <div className="muted">
                    {item.card.setName} · {item.condition} · {item.card.sku} · qty{" "}
                    {item.quantity}
                  </div>
                </div>
                <div className="row">
                  <span>{formatCents(item.priceCents)}</span>
                  <button onClick={() => addToCart(item)}>Add</button>
                </div>
              </div>
            ))}
            {results.length === 0 && <p className="muted">No matches.</p>}
          </div>
        </div>

        <div className="card">
          <h2>Cart</h2>
          {lines.length === 0 && <p className="muted">Cart is empty.</p>}
          {lines.map((line) => (
            <div key={line.inventoryItemId} className="list-item">
              <div>
                {line.name} × {line.quantity}
              </div>
              <span>{formatCents(line.unitPriceCents * line.quantity)}</span>
            </div>
          ))}
          <div className="row spread" style={{ marginTop: "1rem" }}>
            <span className="muted">Subtotal</span>
            <span>{formatCents(totals.subtotalCents)}</span>
          </div>
          <div className="row spread">
            <span className="total">Total</span>
            <span className="total">{formatCents(totals.totalCents)}</span>
          </div>
          <button
            style={{ marginTop: "1rem", width: "100%" }}
            disabled={lines.length === 0}
            onClick={completeOrder}
          >
            Complete order (offline-safe)
          </button>
        </div>
      </div>
    </>
  );
}

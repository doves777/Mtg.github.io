"use client";

import { useEffect, useMemo, useState } from "react";
import { searchInventory, type InventoryItem } from "@/domain/inventory";
import { computeTotals, formatCents, type CartLine } from "@/domain/pricing";
import { deltasForLines, type Order } from "@/domain/orders";
import {
  seedInventory,
  DEMO_SHOW_ID,
  DEMO_TENANT_ID,
  DEMO_SHOW_NAME,
  DEMO_REGISTER,
  DEMO_EMPLOYEE,
  DEMO_TAX_BPS,
} from "@/data/seed-cards";
import { SyncStatus } from "@/components/SyncStatus";
import { enqueue, flush, getOutbox, newClientId } from "@/offline/syncQueue";

type Filter = "all" | "single_card" | "sealed_product";
type Stage = "shopping" | "checkout" | "receipt";
type Tender = "cash" | "card";

interface Receipt {
  orderId: string;
  lines: CartLine[];
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  tender: Tender;
  tenderedCents: number;
  changeCents: number;
  customer: string;
  at: number;
}

function cardMeta(item: InventoryItem): string {
  const c = item.card;
  const bits = [c.setCode ?? c.setName];
  if (c.collectorNumber) bits.push(`#${c.collectorNumber}`);
  if (c.rarity) bits.push(c.rarity[0].toUpperCase());
  if (c.finish === "foil") bits.push("Foil");
  bits.push(item.condition);
  return bits.join(" · ");
}

function lineName(item: InventoryItem): string {
  const foil = item.card.finish === "foil" ? " · Foil" : "";
  return `${item.card.name} · ${item.condition}${foil}`;
}

export default function PosPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [discountCents, setDiscountCents] = useState(0);
  const [customer, setCustomer] = useState("Walk-up customer");

  const [stage, setStage] = useState<Stage>("shopping");
  const [tender, setTender] = useState<Tender>("cash");
  const [cashTendered, setCashTendered] = useState<string>("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const [online, setOnline] = useState(true);
  const [queued, setQueued] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);

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

  const itemById = useMemo(
    () => new Map(seedInventory.map((i) => [i.id, i])),
    [],
  );

  const results = useMemo(() => {
    const base = searchInventory(seedInventory, query);
    if (filter === "all") return base;
    return base.filter((i) => (i.card.productType ?? "single_card") === filter);
  }, [query, filter]);

  const totals = useMemo(
    () => computeTotals(lines, { discountCents, taxRateBps: DEMO_TAX_BPS }),
    [lines, discountCents],
  );

  const cartCount = lines.reduce((n, l) => n + l.quantity, 0);
  const qtyInCart = (id: string) =>
    lines.find((l) => l.inventoryItemId === id)?.quantity ?? 0;

  function addToCart(item: InventoryItem) {
    const inCart = qtyInCart(item.id);
    if (inCart >= item.quantity) return; // don't oversell the cached stock (POS-14)
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
          name: lineName(item),
          unitPriceCents: item.priceCents,
          quantity: 1,
        },
      ];
    });
  }

  function changeQty(id: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => {
          if (l.inventoryItemId !== id) return l;
          const max = itemById.get(id)?.quantity ?? l.quantity;
          const next = Math.min(Math.max(l.quantity + delta, 0), max);
          return { ...l, quantity: next };
        })
        .filter((l) => l.quantity > 0),
    );
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.inventoryItemId !== id));
  }

  function resetSale() {
    setLines([]);
    setDiscountCents(0);
    setCustomer("Walk-up customer");
    setCashTendered("");
    setTender("cash");
  }

  const tenderedCents =
    tender === "card"
      ? totals.totalCents
      : Math.round((parseFloat(cashTendered) || 0) * 100);
  const changeCents = Math.max(tenderedCents - totals.totalCents, 0);
  const canComplete =
    lines.length > 0 &&
    (tender === "card" || tenderedCents >= totals.totalCents);

  async function completeSale() {
    if (!canComplete) return;
    const order: Order = {
      id: newClientId(),
      tenantId: DEMO_TENANT_ID,
      showId: DEMO_SHOW_ID,
      employeeId: DEMO_EMPLOYEE,
      lines,
      totals,
      deltas: deltasForLines(lines),
      status: "queued",
      createdAt: Date.now(),
    };
    const outbox = await enqueue(order);
    setQueued(outbox.length);
    setReceipt({
      orderId: order.id,
      lines,
      subtotalCents: totals.subtotalCents,
      discountCents: totals.discountCents,
      taxCents: totals.taxCents,
      totalCents: totals.totalCents,
      tender,
      tenderedCents,
      changeCents,
      customer,
      at: order.createdAt,
    });
    setStage("receipt");
  }

  function newSale() {
    resetSale();
    setReceipt(null);
    setStage("shopping");
  }

  async function syncNow() {
    const { synced } = await flush();
    setQueued(0);
    setLastSyncedAt(Date.now());
  }

  const quickCash = [2000, 5000, 10000];

  return (
    <div className="pos">
      {/* Context bar */}
      <div className="pos-context">
        <div className="ctx-left">
          <span className="ctx-show">{DEMO_SHOW_NAME}</span>
          <span className="muted">
            {DEMO_REGISTER} · {DEMO_EMPLOYEE}
          </span>
        </div>
        <div className="ctx-right">
          <SyncStatus online={online} queued={queued} lastSyncedAt={lastSyncedAt} />
          <button className="secondary" onClick={syncNow}>
            Sync now
          </button>
        </div>
      </div>

      <div className="pos-grid">
        {/* Search + results */}
        <section className="pos-search">
          <input
            className="search-input"
            placeholder="Search cards — name, set, or SKU…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="chips">
            {(
              [
                ["all", "All"],
                ["single_card", "Singles"],
                ["sealed_product", "Sealed"],
              ] as [Filter, string][]
            ).map(([val, label]) => (
              <button
                key={val}
                className={`chip ${filter === val ? "chip-on" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="result-grid">
            {results.map((item) => {
              const inCart = qtyInCart(item.id);
              const soldOut = inCart >= item.quantity;
              return (
                <button
                  key={item.id}
                  className="tile"
                  onClick={() => addToCart(item)}
                  disabled={soldOut}
                >
                  <span
                    className="tile-art"
                    style={{ background: item.card.accent ?? "#334155" }}
                  >
                    {item.card.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.card.imageUrl}
                        alt={item.card.name}
                        className="tile-img"
                        loading="lazy"
                      />
                    ) : (
                      <span className="tile-art-fallback">
                        {item.card.setCode ?? "MTG"}
                      </span>
                    )}
                    {item.card.productType === "sealed_product" && (
                      <span className="tile-sealed">SEALED</span>
                    )}
                    {item.card.finish === "foil" && (
                      <span className="tile-foil">FOIL</span>
                    )}
                  </span>
                  <span className="tile-body">
                    <span className="tile-name">{item.card.name}</span>
                    <span className="muted tile-meta">{cardMeta(item)}</span>
                    <span className="tile-foot">
                      <span className="tile-price">{formatCents(item.priceCents)}</span>
                      <span className="muted">
                        {soldOut ? "max" : `${item.quantity} in stock`}
                      </span>
                    </span>
                  </span>
                  {inCart > 0 && <span className="tile-badge">{inCart}</span>}
                </button>
              );
            })}
            {results.length === 0 && <p className="muted">No matches.</p>}
          </div>
        </section>

        {/* Cart */}
        <aside className="pos-cart">
          <div className="cart-head">
            <h2>Order</h2>
            <span className="muted">{cartCount} item{cartCount === 1 ? "" : "s"}</span>
          </div>

          <label className="customer">
            <span className="muted">Customer</span>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </label>

          <div className="cart-lines">
            {lines.length === 0 && (
              <p className="muted empty">Tap a card to add it to the order.</p>
            )}
            {lines.map((line) => (
              <div key={line.inventoryItemId} className="cart-line">
                <div className="cl-info">
                  <div className="cl-name">{line.name}</div>
                  <div className="muted">{formatCents(line.unitPriceCents)} ea</div>
                </div>
                <div className="stepper">
                  <button onClick={() => changeQty(line.inventoryItemId, -1)}>−</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => changeQty(line.inventoryItemId, 1)}>+</button>
                </div>
                <div className="cl-total">
                  {formatCents(line.unitPriceCents * line.quantity)}
                </div>
                <button
                  className="cl-remove"
                  aria-label="Remove"
                  onClick={() => removeLine(line.inventoryItemId)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-totals">
            <div className="row spread">
              <span className="muted">Subtotal</span>
              <span>{formatCents(totals.subtotalCents)}</span>
            </div>
            <div className="row spread discount-row">
              <span className="muted">Discount</span>
              <span className="row">
                $
                <input
                  className="discount-input"
                  inputMode="decimal"
                  value={discountCents ? (discountCents / 100).toString() : ""}
                  placeholder="0"
                  onChange={(e) =>
                    setDiscountCents(Math.round((parseFloat(e.target.value) || 0) * 100))
                  }
                />
              </span>
            </div>
            <div className="row spread">
              <span className="muted">Tax (8.25%)</span>
              <span>{formatCents(totals.taxCents)}</span>
            </div>
            <div className="row spread total-row">
              <span className="total">Total</span>
              <span className="total">{formatCents(totals.totalCents)}</span>
            </div>
          </div>

          <button
            className="checkout-btn"
            disabled={lines.length === 0}
            onClick={() => setStage("checkout")}
          >
            Checkout · {formatCents(totals.totalCents)}
          </button>
        </aside>
      </div>

      {/* Checkout modal */}
      {stage === "checkout" && (
        <div className="overlay" onClick={() => setStage("shopping")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row spread">
              <h2>Take payment</h2>
              <button className="secondary" onClick={() => setStage("shopping")}>
                Back
              </button>
            </div>
            <div className="amount-due">
              <span className="muted">Amount due</span>
              <span className="total">{formatCents(totals.totalCents)}</span>
            </div>

            <div className="tender-toggle">
              <button
                className={tender === "cash" ? "chip-on" : ""}
                onClick={() => setTender("cash")}
              >
                Cash
              </button>
              <button
                className={tender === "card" ? "chip-on" : ""}
                onClick={() => setTender("card")}
              >
                Card
              </button>
            </div>

            {tender === "cash" ? (
              <div className="cash-pane">
                <div className="quick-cash">
                  <button
                    onClick={() => setCashTendered((totals.totalCents / 100).toFixed(2))}
                  >
                    Exact {formatCents(totals.totalCents)}
                  </button>
                  {quickCash.map((c) => (
                    <button key={c} onClick={() => setCashTendered((c / 100).toFixed(2))}>
                      {formatCents(c)}
                    </button>
                  ))}
                </div>
                <label className="cash-input">
                  <span className="muted">Cash received</span>
                  <div className="row">
                    $
                    <input
                      inputMode="decimal"
                      value={cashTendered}
                      placeholder="0.00"
                      onChange={(e) => setCashTendered(e.target.value)}
                    />
                  </div>
                </label>
                <div className="row spread change-row">
                  <span className="muted">Change due</span>
                  <span className="total">{formatCents(changeCents)}</span>
                </div>
              </div>
            ) : (
              <p className="muted card-note">
                Charge {formatCents(totals.totalCents)} on the card terminal, then confirm.
              </p>
            )}

            <button className="checkout-btn" disabled={!canComplete} onClick={completeSale}>
              Complete sale
            </button>
          </div>
        </div>
      )}

      {/* Receipt / confirmation */}
      {stage === "receipt" && receipt && (
        <div className="overlay">
          <div className="modal receipt" onClick={(e) => e.stopPropagation()}>
            <div className="receipt-check">✓</div>
            <h2>Sale complete</h2>
            <p className="muted">
              Order {receipt.orderId.slice(0, 8)} · {receipt.customer} · queued offline-safe
            </p>
            <div className="receipt-lines">
              {receipt.lines.map((l) => (
                <div key={l.inventoryItemId} className="row spread">
                  <span>
                    {l.name} × {l.quantity}
                  </span>
                  <span>{formatCents(l.unitPriceCents * l.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="row spread">
              <span className="muted">Tax</span>
              <span>{formatCents(receipt.taxCents)}</span>
            </div>
            <div className="row spread total-row">
              <span className="total">Total</span>
              <span className="total">{formatCents(receipt.totalCents)}</span>
            </div>
            <div className="row spread">
              <span className="muted">
                {receipt.tender === "cash" ? "Cash" : "Card"}
              </span>
              <span>{formatCents(receipt.tenderedCents)}</span>
            </div>
            {receipt.tender === "cash" && (
              <div className="row spread">
                <span className="muted">Change</span>
                <span>{formatCents(receipt.changeCents)}</span>
              </div>
            )}
            <button className="checkout-btn" onClick={newSale}>
              New sale
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

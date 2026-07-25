import { formatCents } from "@/domain/pricing";
import { inventoryRepository } from "@/data/repository";
import { DEMO_TENANT_ID } from "@/data/seed-cards";

/**
 * Buyer-facing storefront (CX-1, CX-2). Server-rendered for fast first paint and SEO
 * (ADR 0001). Reads through the same repository seam the vendor app uses.
 */
export default async function StorefrontPage() {
  const items = await inventoryRepository.listForTenant(DEMO_TENANT_ID);
  const available = items.filter((it) => it.quantity > 0);

  return (
    <>
      <div className="card">
        <h1>Vendor Storefront</h1>
        <p className="muted">
          Browse available inventory and reserve items for pickup at a show (CX-3,
          ORD-13..ORD-19). This page is server-rendered.
        </p>
      </div>

      <div className="card">
        <h2>Available now</h2>
        {available.map((item) => (
          <div key={item.id} className="list-item">
            <div>
              <div>{item.card.name}</div>
              <div className="muted">
                {item.card.setName} · {item.card.category} · {item.condition}
              </div>
            </div>
            <div className="row">
              <span>{formatCents(item.priceCents)}</span>
              <button className="secondary">Reserve for pickup</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

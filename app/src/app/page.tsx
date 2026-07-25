import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="card">
        <h1>Card Show Vendor Operations Platform</h1>
        <p className="muted">
          Minimal starter scaffold. It demonstrates the two front doors described in the
          architecture ADRs and exercises the offline-first POS flow with in-memory /
          local-storage stubs (no database required to run).
        </p>
        <p className="muted">
          See <code>docs/architecture/0001-tech-stack.md</code> and{" "}
          <code>docs/architecture/0002-offline-sync.md</code> for the decisions this
          structure reflects, and <code>app/README.md</code> for what is real vs. stubbed.
        </p>
      </div>

      <div className="grid2">
        <div className="card">
          <h2>Vendor POS</h2>
          <p className="muted">
            Search cached inventory, build a cart, and complete an order — even offline.
            Completed orders are queued locally and synced on reconnect.
          </p>
          <Link href="/pos">
            <button>Open POS →</button>
          </Link>
        </div>
        <div className="card">
          <h2>Buyer Storefront</h2>
          <p className="muted">
            Browse a vendor&apos;s available inventory and place a pickup order for a show.
          </p>
          <Link href="/storefront">
            <button>Open Storefront →</button>
          </Link>
        </div>
      </div>
    </>
  );
}

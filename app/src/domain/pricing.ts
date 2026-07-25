/**
 * Pricing helpers (see requirements/features/02-pricing-and-price-lookup.md).
 * Money is handled in integer cents throughout to avoid floating-point drift (POS-3).
 */

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export interface CartLine {
  inventoryItemId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
}

export interface CartTotals {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
}

export interface TotalsOptions {
  discountCents?: number;
  /** Tax rate in basis points (e.g. 825 = 8.25%). */
  taxRateBps?: number;
}

/** Automatic totals with an optional whole-order discount and tax (POS-2, POS-3). */
export function computeTotals(lines: CartLine[], opts: TotalsOptions = {}): CartTotals {
  const { discountCents = 0, taxRateBps = 0 } = opts;
  const subtotalCents = lines.reduce(
    (sum, line) => sum + line.unitPriceCents * line.quantity,
    0,
  );
  const clampedDiscount = Math.min(Math.max(discountCents, 0), subtotalCents);
  const taxableCents = subtotalCents - clampedDiscount;
  const taxCents = Math.round((taxableCents * taxRateBps) / 10000);
  return {
    subtotalCents,
    discountCents: clampedDiscount,
    taxCents,
    totalCents: taxableCents + taxCents,
  };
}

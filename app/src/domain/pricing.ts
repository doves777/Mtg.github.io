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
  totalCents: number;
}

/** Automatic totals with an optional whole-order discount (POS-2, POS-3). */
export function computeTotals(lines: CartLine[], discountCents = 0): CartTotals {
  const subtotalCents = lines.reduce(
    (sum, line) => sum + line.unitPriceCents * line.quantity,
    0,
  );
  const clampedDiscount = Math.min(Math.max(discountCents, 0), subtotalCents);
  return {
    subtotalCents,
    discountCents: clampedDiscount,
    totalCents: subtotalCents - clampedDiscount,
  };
}

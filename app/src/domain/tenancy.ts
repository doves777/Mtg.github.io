/**
 * Multi-tenancy primitives.
 *
 * Per ADR 0001 the platform uses a shared-database / shared-schema model where every
 * tenant-scoped record carries a `tenantId`, backstopped by Postgres Row-Level Security.
 * In this scaffold there is no database yet, so these types simply document the contract
 * that the data-access layer must enforce.
 */

export type TenantId = string;

/** Roles map to auth-provider organization membership (owner/admin/employee). */
export type Role = "owner" | "admin" | "employee";

export interface Tenant {
  id: TenantId;
  name: string;
}

export interface User {
  id: string;
  tenantId: TenantId;
  role: Role;
  displayName: string;
}

/** Anything stored for a tenant must be scoped by this id (enforced by RLS in prod). */
export interface TenantScoped {
  tenantId: TenantId;
}

/** Permission gate for discounts/overrides/refunds (see POS-8, Security NFRs). */
export function canOverridePrice(role: Role): boolean {
  return role === "owner" || role === "admin";
}

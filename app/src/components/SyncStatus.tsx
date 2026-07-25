"use client";

interface SyncStatusProps {
  online: boolean;
  queued: number;
  lastSyncedAt: number | null;
}

/** Trustworthy, small set of sync states (ADR 0002, POS-13). */
export function SyncStatus({ online, queued, lastSyncedAt }: SyncStatusProps) {
  const label = online
    ? queued > 0
      ? `Online · ${queued} queued`
      : "Online · synced"
    : `Offline · ${queued} queued`;

  return (
    <div className="row">
      <span className={`pill ${online ? "online" : "offline"}`}>{label}</span>
      <span className="muted">
        {lastSyncedAt
          ? `Last synced ${new Date(lastSyncedAt).toLocaleTimeString()}`
          : "Not synced yet"}
      </span>
    </div>
  );
}

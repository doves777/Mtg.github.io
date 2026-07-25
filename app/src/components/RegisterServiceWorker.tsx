"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker (ADR 0001/0002 offline app shell).
 * The service worker only takes effect in the browser and is a no-op during SSR.
 */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures are non-fatal for the scaffold demo.
      });
    };
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}

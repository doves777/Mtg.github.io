/*
 * Minimal app-shell service worker (ADR 0002).
 *
 * SCAFFOLD NOTE: this is a hand-rolled starter. In production, generate the service worker
 * with Workbox so precache manifests, versioning, and Background Sync are handled robustly.
 * Here it just caches visited pages so the shell keeps loading when offline.
 */

const CACHE = "cardshow-shell-v1";
const APP_SHELL = ["/", "/pos", "/storefront", "/manifest.webmanifest", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).catch(() => undefined),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Network-first for navigations, falling back to cached shell when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/"))),
    );
    return;
  }

  // Cache-first for other same-origin GETs.
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request)),
  );
});

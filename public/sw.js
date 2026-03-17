const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const CACHE_PREFIX = "ao-tg-app";
const SHELL_CACHE_NAME = `${CACHE_PREFIX}-shell-${VERSION}`;
const RUNTIME_CACHE_NAME = `${CACHE_PREFIX}-runtime-${VERSION}`;
const APP_SCOPE = new URL(self.registration.scope);
const APP_SCOPE_PATH = APP_SCOPE.pathname;
const APP_SHELL_FILES = [
  "",
  "index.html",
  "manifest.webmanifest",
  "icon.svg",
  "apple-touch-icon.png",
  "pwa-192x192.png",
  "pwa-512x512.png",
  "maskable-icon-512x512.png",
];

const ASSET_DESTINATIONS = new Set([
  "font",
  "image",
  "manifest",
  "script",
  "style",
  "worker",
]);

const toAppUrl = (path = "") =>
  new URL(path.replace(/^\//, ""), APP_SCOPE).toString();

const isAppUrl = (candidate) => {
  try {
    const url = new URL(candidate, APP_SCOPE);

    return (
      url.origin === APP_SCOPE.origin && url.pathname.startsWith(APP_SCOPE_PATH)
    );
  } catch {
    return false;
  }
};

const putInCache = async (cacheName, request, response) => {
  if (!response.ok) {
    return response;
  }

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());

  return response;
};

const cacheAppShellFile = async (cache, url) => {
  try {
    const response = await fetch(url, { cache: "reload" });

    if (response.ok) {
      await cache.put(url, response);
    }
  } catch {
    // Ignore failed warmup requests; the app can still work online.
  }
};

const installAppShell = async () => {
  const cache = await caches.open(SHELL_CACHE_NAME);

  await Promise.all(
    APP_SHELL_FILES.map((path) => cacheAppShellFile(cache, toAppUrl(path))),
  );
};

const cleanupOutdatedCaches = async () => {
  const cacheNames = await caches.keys();
  const actualCacheNames = new Set([SHELL_CACHE_NAME, RUNTIME_CACHE_NAME]);

  await Promise.all(
    cacheNames
      .filter(
        (cacheName) =>
          cacheName.startsWith(CACHE_PREFIX) && !actualCacheNames.has(cacheName),
      )
      .map((cacheName) => caches.delete(cacheName)),
  );

  await self.clients.claim();
};

const handleNavigationRequest = async (request) => {
  try {
    const response = await fetch(request);

    if (response.ok) {
      return response;
    }
  } catch {
    // Fall back to the cached app shell below.
  }

  const cachedShell = await caches.match(toAppUrl("index.html"));

  return cachedShell || Response.error();
};

const handleStaticAssetRequest = async (event) => {
  const { request } = event;
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    event.waitUntil(
      fetch(request)
        .then((response) => putInCache(RUNTIME_CACHE_NAME, request, response))
        .catch(() => undefined),
    );

    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    return putInCache(RUNTIME_CACHE_NAME, request, response);
  } catch {
    return cachedResponse || Response.error();
  }
};

const cacheAdditionalUrls = async (urls) => {
  const cache = await caches.open(SHELL_CACHE_NAME);
  const uniqueUrls = Array.from(new Set(urls.filter(isAppUrl)));

  await Promise.all(
    uniqueUrls.map(async (url) => {
      if (await cache.match(url)) {
        return;
      }

      await cacheAppShellFile(cache, url);
    }),
  );
};

self.addEventListener("install", (event) => {
  event.waitUntil(installAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(cleanupOutdatedCaches());
});

self.addEventListener("message", (event) => {
  const { data } = event;

  if (data?.type === "CACHE_URLS" && Array.isArray(data.payload)) {
    event.waitUntil(cacheAdditionalUrls(data.payload));
  }

  if (data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (!isAppUrl(url)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request));

    return;
  }

  const isStaticAssetRequest =
    ASSET_DESTINATIONS.has(request.destination) ||
    url.pathname.startsWith(`${APP_SCOPE_PATH}assets/`);

  if (!isStaticAssetRequest) {
    return;
  }

  event.respondWith(handleStaticAssetRequest(event));
});

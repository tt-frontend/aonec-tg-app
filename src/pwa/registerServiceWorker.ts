const CACHE_URLS_MESSAGE = "CACHE_URLS";

const APP_STATIC_FILES = [
  "",
  "index.html",
  "manifest.webmanifest",
  "icon.svg",
  "apple-touch-icon.png",
  "pwa-192x192.png",
  "pwa-512x512.png",
  "maskable-icon-512x512.png",
];

const toAppUrl = (appBaseUrl: URL, path: string) =>
  new URL(path, appBaseUrl).toString();

const collectAppUrls = (appBaseUrl: URL) => {
  const currentAppPath = new URL(window.location.href).pathname;
  const appBasePath = appBaseUrl.pathname;

  const loadedAssetUrls = performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((resourceUrl) => {
      try {
        const url = new URL(resourceUrl);

        return (
          url.origin === window.location.origin &&
          url.pathname.startsWith(appBasePath)
        );
      } catch {
        return false;
      }
    });

  return Array.from(
    new Set([
      ...APP_STATIC_FILES.map((path) => toAppUrl(appBaseUrl, path)),
      window.location.href,
      currentAppPath === appBasePath
        ? toAppUrl(appBaseUrl, "")
        : window.location.href,
      ...loadedAssetUrls,
    ]),
  );
};

const warmUpServiceWorkerCache = async (appBaseUrl: URL) => {
  const registration = await navigator.serviceWorker.ready;
  const serviceWorker =
    registration.active ?? registration.waiting ?? registration.installing;

  serviceWorker?.postMessage({
    type: CACHE_URLS_MESSAGE,
    payload: collectAppUrls(appBaseUrl),
  });
};

export const registerServiceWorker = () => {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) {
    return;
  }

  const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
  const serviceWorkerUrl = new URL("sw.js", appBaseUrl);
  serviceWorkerUrl.searchParams.set("v", __APP_VERSION__);

  window.addEventListener(
    "load",
    () => {
      void navigator.serviceWorker
        .register(serviceWorkerUrl, {
          scope: import.meta.env.BASE_URL,
        })
        .then(() => warmUpServiceWorkerCache(appBaseUrl))
        .catch((error) => {
          console.error("Service worker registration failed", error);
        });
    },
    { once: true },
  );
};

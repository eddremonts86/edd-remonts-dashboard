/**
 * Service worker for the portfolio.
 *
 * Hand-written rather than generated. The alternative was vite-plugin-pwa,
 * which wants to inject a precache manifest into a build — and this app builds
 * twice (dist/client and dist/server, TanStack Start's SSR pair), which is
 * exactly the arrangement that plugin gets wrong. Runtime caching needs no
 * build integration at all, so there is nothing to get wrong here.
 *
 * The rules, in the order the fetch handler applies them:
 *
 *   navigations   network first, cache the result, fall back to the last good
 *                 copy of that page, then to /offline.html. The document is
 *                 server-rendered and locale-dependent, so a cache-first
 *                 document would serve a stale page to an online visitor.
 *   /assets/*     cache first. Vite hashes these filenames, so a hit is
 *                 always the right bytes and a miss is a new build.
 *   images/fonts  cache first, same reasoning as assets for the hashed ones
 *                 and "an old cover is better than no cover" for the rest.
 *   everything    network only. API routes, server functions and anything
 *                 that is not a GET must never come from a cache.
 *
 * ponytail: no precache manifest, so the first visit warms the cache rather
 * than arriving with it. Offline works from the second visit on, which is the
 * visit that can be offline. Add a generated precache list if a cold install
 * ever has to work offline.
 */

const VERSION = 'v1'
const PAGES = `pages-${VERSION}`
const ASSETS = `assets-${VERSION}`
const OFFLINE_URL = '/offline.html'

/** Kept small on purpose: the shell, not the site. */
const PRECACHE = [OFFLINE_URL, '/icons/icon-192.png', '/favicon.svg']

const IMAGE_EXTENSIONS = /\.(?:png|jpe?g|webp|avif|svg|gif|ico)$/i
const FONT_EXTENSIONS = /\.(?:woff2?|ttf|otf|eot)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(ASSETS)
      // Individually, so one 404 cannot fail the whole install.
      await Promise.allSettled(
        PRECACHE.map((url) => cache.add(new Request(url, { cache: 'reload' }))),
      )
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PAGES, ASSETS])
      await Promise.all(
        (await caches.keys()).filter((key) => !keep.has(key)).map((key) => caches.delete(key)),
      )
      // Navigation preload keeps the network request in flight while this
      // worker boots, so the worker costs nothing on a warm start.
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable()
      }
      await self.clients.claim()
    })(),
  )
})

/** Let the page trigger an immediate update instead of waiting for a reload. */
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting()
})

async function handleNavigation(event) {
  const cache = await caches.open(PAGES)
  try {
    const preloaded = await event.preloadResponse
    const response = preloaded || (await fetch(event.request))
    // Only a real page is worth keeping; a 500 or a redirect is not.
    if (response.ok && response.type !== 'opaque') {
      cache.put(event.request, response.clone())
    }
    return response
  } catch {
    return (
      (await cache.match(event.request)) ??
      (await caches.match(OFFLINE_URL)) ??
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    )
  }
}

async function handleAsset(request) {
  const cache = await caches.open(ASSETS)
  const hit = await cache.match(request)
  if (hit) return hit
  const response = await fetch(request)
  if (response.ok) cache.put(request, response.clone())
  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  // Another origin's caching is not this worker's business, and opaque
  // responses fill the quota with bytes it cannot inspect.
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(event))
    return
  }

  const cacheable =
    url.pathname.startsWith('/assets/') ||
    IMAGE_EXTENSIONS.test(url.pathname) ||
    FONT_EXTENSIONS.test(url.pathname)

  if (cacheable) {
    event.respondWith(handleAsset(request))
  }
})

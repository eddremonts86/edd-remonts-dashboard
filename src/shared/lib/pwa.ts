/**
 * Service worker registration.
 *
 * Deliberately quiet: no install prompt, no update toast. A portfolio that
 * interrupts a first-time reader to ask for a home-screen shortcut is asking
 * for something before it has given anything. The browser's own install
 * affordance is enough, and it only appears once the criteria are met.
 *
 * Registered after `load` so it never competes with the first paint for
 * bandwidth on the visit that matters most.
 */

const SW_URL = '/sw.js'

export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return
  if (!('serviceWorker' in navigator)) return

  // A worker on localhost:3000 caching Vite's dev module graph makes HMR lie
  // about what is on disk. Production only.
  if (import.meta.env.DEV) return

  const register = () => {
    navigator.serviceWorker.register(SW_URL, { scope: '/' }).catch((error) => {
      // A failed registration must never take the page down with it: the site
      // works without a worker, that is the whole point of progressive.
      console.warn('[pwa] service worker registration failed:', error)
    })
  }

  if (document.readyState === 'complete') {
    register()
  } else {
    window.addEventListener('load', register, { once: true })
  }
}

/**
 * Drops the worker and every cache it owns.
 *
 * Not called by the app. It exists because a bad worker is the one bug a user
 * cannot clear by reloading, and the recovery has to be somewhere better than
 * a support thread: paste `unregisterServiceWorker()` into the console.
 */
export async function unregisterServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((registration) => registration.unregister()))
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((key) => caches.delete(key)))
  }
}

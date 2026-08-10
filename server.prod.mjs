/**
 * Production HTTP server wrapper for TanStack Start.
 *
 * TanStack Start (Vite plugin) builds:
 *   dist/server/server.js  — Web Fetch API handler (SSR)
 *   dist/client/           — static assets (CSS, JS chunks, public files)
 *
 * Usage: node server.prod.mjs
 */
import { readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, constants as zlibConstants, gzipSync } from 'node:zlib'

const PORT = parseInt(process.env.PORT ?? '3000', 10)
const HOST = process.env.HOST ?? '0.0.0.0'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const CLIENT_DIR = resolve(__dirname, 'dist/client')

// MIME types for static files
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
}

/** Extensions worth compressing. Images, fonts and wasm are already compressed. */
const COMPRESSIBLE = new Set([
  '.js',
  '.mjs',
  '.css',
  '.html',
  '.json',
  '.svg',
  '.txt',
  '.xml',
  '.webmanifest',
])

/** Below this, framing overhead outweighs the saving. */
const MIN_COMPRESS_BYTES = 1024

/**
 * Compressed static assets, cached in memory.
 *
 * Hashed assets are immutable by definition, so compressing each one once and
 * holding the bytes is both correct and cheap (the whole client build is a
 * couple of MB compressed). Without this the server re-ran brotli on every
 * request — or, as it did before this change, shipped 1,510,799 bytes of JS
 * that gzips to 444 KB with no Content-Encoding at all.
 */
const compressedCache = new Map()

function negotiateEncoding(req) {
  const accept = String(req.headers['accept-encoding'] ?? '')
  if (/\bbr\b/.test(accept)) return 'br'
  if (/\bgzip\b/.test(accept)) return 'gzip'
  return null
}

function compress(buffer, encoding) {
  return encoding === 'br'
    ? brotliCompressSync(buffer, {
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
          [zlibConstants.BROTLI_PARAM_SIZE_HINT]: buffer.length,
        },
      })
    : gzipSync(buffer, { level: 9 })
}

/**
 * Headers every response carries.
 *
 * netlify.toml declares an overlapping set, but the Dockerfile runs this file,
 * so those never applied to the deployed site.
 *
 * No Content-Security-Policy yet: TanStack Start emits inline bootstrap scripts
 * without a nonce, so any policy strict enough to be worth having would break
 * hydration. That needs a nonce plumbed through the SSR handler — tracked
 * separately rather than shipped half-done here.
 */
function securityHeaders(req) {
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
  }
  // Only when the proxy terminated TLS — sending HSTS over plain HTTP is
  // ignored by browsers and misleading to read in a local curl.
  if (req.headers['x-forwarded-proto'] === 'https') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
  }
  return headers
}

// Try to serve a static file; return true if served
function tryServeStatic(pathname, req, res) {
  // Prevent path traversal
  const safePath = pathname.replace(/\.\./g, '')
  const filePath = join(CLIENT_DIR, safePath)

  // Must stay within CLIENT_DIR
  if (!filePath.startsWith(CLIENT_DIR)) return false

  let stat
  try {
    stat = statSync(filePath)
  } catch {
    return false
  }

  if (!stat.isFile()) return false

  const ext = extname(filePath).toLowerCase()
  const mime = MIME[ext] ?? 'application/octet-stream'

  // Immutable cache for hashed assets (Vite uses hash in filename)
  const isHashedAsset = /\/assets\//.test(safePath)
  const cacheControl = isHashedAsset
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=3600'

  const headers = {
    ...securityHeaders(req),
    'Content-Type': mime,
    'Cache-Control': cacheControl,
  }

  const encoding =
    COMPRESSIBLE.has(ext) && stat.size >= MIN_COMPRESS_BYTES ? negotiateEncoding(req) : null

  if (encoding) {
    const key = `${filePath}:${encoding}`
    let body = compressedCache.get(key)
    if (!body) {
      body = compress(readFileSync(filePath), encoding)
      compressedCache.set(key, body)
    }
    res.writeHead(200, {
      ...headers,
      'Content-Encoding': encoding,
      'Content-Length': body.length,
      Vary: 'Accept-Encoding',
    })
    res.end(req.method === 'HEAD' ? undefined : body)
    return true
  }

  const body = readFileSync(filePath)
  res.writeHead(200, { ...headers, 'Content-Length': body.length })
  res.end(req.method === 'HEAD' ? undefined : body)
  return true
}

// Dynamic import so we get the built handler
const { default: app } = await import('./dist/server/server.js')

if (!app || typeof app.fetch !== 'function') {
  console.error('ERROR: dist/server/server.js did not export a valid fetch handler')
  process.exit(1)
}

const server = createServer(async (req, res) => {
  const protocol = 'http'
  const host = req.headers.host ?? `localhost:${PORT}`
  const url = new URL(req.url ?? '/', `${protocol}://${host}`)

  // Redirect root domain to canonical subdomain (301 permanent)
  if (url.hostname === 'eduardoinerarte.dk') {
    const target = `https://profile.eduardoinerarte.dk${url.pathname}${url.search}`
    res.writeHead(301, { Location: target })
    res.end()
    return
  }

  // Serve static files from dist/client/ before hitting the SSR handler
  if (req.method === 'GET' || req.method === 'HEAD') {
    if (tryServeStatic(url.pathname, req, res)) return
  }

  const headers = new Headers()
  for (const [key, val] of Object.entries(req.headers)) {
    if (val == null) continue
    if (Array.isArray(val)) {
      for (const v of val) headers.append(key, v)
    } else {
      headers.set(key, val)
    }
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  const webRequest = new Request(url.href, {
    method: req.method,
    headers,
    ...(hasBody ? { body: req, duplex: 'half' } : {}),
  })

  let webResponse
  try {
    webResponse = await app.fetch(webRequest)
  } catch (err) {
    console.error('[server] Handler error:', err)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
    return
  }

  // Forward status + headers
  const resHeaders = { ...securityHeaders(req) }
  for (const [k, v] of webResponse.headers.entries()) {
    resHeaders[k] = v
  }

  const contentType = webResponse.headers.get('content-type') ?? ''
  const isHtml = contentType.includes('text/html')
  if (isHtml && !resHeaders['cache-control']) {
    // Always revalidate the document; the assets it points at are immutable.
    resHeaders['Cache-Control'] = 'no-cache'
  }

  // SSR HTML compresses ~8:1 and is the very first byte a visitor waits on, so
  // it is worth buffering the (already fully-rendered) document to compress it.
  // Non-HTML responses keep streaming untouched.
  const encoding = isHtml ? negotiateEncoding(req) : null
  if (encoding && webResponse.body) {
    const raw = Buffer.from(await webResponse.arrayBuffer())
    const body = compress(raw, encoding)
    delete resHeaders['content-length']
    res.writeHead(webResponse.status, {
      ...resHeaders,
      'Content-Encoding': encoding,
      'Content-Length': body.length,
      Vary: 'Accept-Encoding',
    })
    res.end(body)
    return
  }

  res.writeHead(webResponse.status, resHeaders)

  // Stream body
  if (webResponse.body) {
    const reader = webResponse.body.getReader()
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(Buffer.from(value))
      }
    } finally {
      reader.releaseLock()
    }
  }
  res.end()
})

server.listen(PORT, HOST, () => {
  console.log(`[server] Listening on http://${HOST}:${PORT}`)
})

server.on('error', (err) => {
  console.error('[server] Fatal:', err)
  process.exit(1)
})

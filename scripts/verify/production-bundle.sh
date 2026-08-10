#!/bin/sh
# Guards against shipping a development bundle to production.
#
# Vite is expected to build in production mode, but with this plugin chain
# (@tanstack/react-start + @vitejs/plugin-react on Vite 8) an unset NODE_ENV
# leaks the dev JSX transform into dist/. The server then imports
# `react/jsx-dev-runtime`, which has no `jsxDEV` export under NODE_ENV=production,
# and every route answers 500 with "TypeError: jsxDEV is not a function".
#
# Cheap to check, catastrophic to miss, so it runs on every build.
#
# Lives in scripts/verify/ rather than scripts/build/ on purpose: a `build/`
# line in a global gitignore silently swallowed the previous location, so the
# guard was never committed and CI ran without it.
set -e

fail() {
  echo "" >&2
  echo "  ✗ production bundle check failed: $1" >&2
  echo "    Build with NODE_ENV=production (see scripts/verify/production-bundle.sh)." >&2
  echo "" >&2
  exit 1
}

[ -d dist/server ] || fail "dist/server is missing — did the build run?"

if grep -rq "react/jsx-dev-runtime" dist/server 2>/dev/null; then
  fail "dist/server imports react/jsx-dev-runtime"
fi

if grep -rq "is deprecated in plain JavaScript React classes" dist/client 2>/dev/null; then
  fail "dist/client bundles React's development build"
fi

echo "  ✓ production bundle verified (no dev JSX runtime, no React dev build)"

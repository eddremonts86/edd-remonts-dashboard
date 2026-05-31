#!/bin/bash
cd /Volumes/Works/github/iaWorkSpace/apps/edd-remonts-dashboard
echo "=== LINT ==="
pnpm lint 2>&1
echo "=== FORMAT CHECK ==="
pnpm format:check 2>&1
echo "=== TYPE CHECK ==="
pnpm type-check 2>&1
echo "=== DOCTOR ==="
pnpm doctor 2>&1
echo "=== DONE ==="

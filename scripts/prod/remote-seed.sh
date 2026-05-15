#!/usr/bin/env bash
# remote-seed.sh — Run DB seeds against the production container via SSH.
#
# Usage:
#   SSH_HOST=root@YOUR_SERVER_IP ./scripts/prod/remote-seed.sh
#   SSH_HOST=root@YOUR_SERVER_IP CONTAINER=edd-remonts-app ./scripts/prod/remote-seed.sh
#
# Or with a specific SSH key:
#   SSH_HOST=root@YOUR_SERVER_IP SSH_KEY=~/.ssh/id_ed25519 ./scripts/prod/remote-seed.sh
#
# What it does:
#   1. SSH into the server
#   2. docker exec into the running app container
#   3. Runs the three idempotent seeds: db:seed (skills), seed:admin, seed:portfolio
#
# All seeds are safe to re-run — they use onConflictDoNothing / upsert.

set -euo pipefail

CONTAINER="${CONTAINER:-edd-remonts-app}"
SSH_HOST="${SSH_HOST:-}"
SSH_KEY="${SSH_KEY:-}"

# ── Validate ──────────────────────────────────────────────────────────────────
if [[ -z "$SSH_HOST" ]]; then
  echo ""
  echo "ERROR: SSH_HOST is required."
  echo ""
  echo "  Export it before running:"
  echo "    export SSH_HOST=root@YOUR_SERVER_IP"
  echo "    ./scripts/prod/remote-seed.sh"
  echo ""
  echo "  Or inline:"
  echo "    SSH_HOST=root@YOUR_SERVER_IP ./scripts/prod/remote-seed.sh"
  echo ""
  echo "  Your server IP is the one Coolify is deployed on."
  echo "  (Check Coolify → Settings → Servers, or your VPS panel)"
  echo ""
  exit 1
fi

SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
if [[ -n "$SSH_KEY" ]]; then
  SSH_OPTS+=(-i "$SSH_KEY")
fi

echo ""
echo "============================"
echo " edd-remonts remote seed"
echo "============================"
echo "  Server    : $SSH_HOST"
echo "  Container : $CONTAINER"
echo ""

# ── Check container is running ────────────────────────────────────────────────
echo "[1/4] Checking container status on server…"
RUNNING=$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" "docker inspect --format='{{.State.Running}}' '$CONTAINER' 2>/dev/null || echo false")
if [[ "$RUNNING" != "true" ]]; then
  echo "ERROR: Container '$CONTAINER' is not running on $SSH_HOST"
  echo "       Run: ssh $SSH_HOST docker ps"
  exit 1
fi
echo "  ✓ Container is running"

# ── Run seeds ─────────────────────────────────────────────────────────────────
echo ""
echo "[2/4] Seeding skills (pnpm db:seed)…"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "docker exec '$CONTAINER' sh -c 'pnpm db:seed'"

echo ""
echo "[3/4] Seeding admin (pnpm db:seed:admin)…"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "docker exec '$CONTAINER' sh -c 'pnpm db:seed:admin || echo \"seed:admin failed (non-fatal)\"'"

echo ""
echo "[4/4] Seeding portfolio — experiences + projects + content (pnpm db:seed:portfolio)…"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "docker exec '$CONTAINER' sh -c 'pnpm db:seed:portfolio'"

echo ""
echo "============================"
echo "  All seeds completed."
echo "============================"
echo ""
echo "  Profile page: https://profile.eduardoinerarte.dk/"
echo ""

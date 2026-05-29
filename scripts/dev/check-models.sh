#!/usr/bin/env sh
set -e

# Models are stored centrally at workspace level in docker/models/llama/
WORKSPACE_ROOT="${WORKSPACE_ROOT:-$(cd "$(dirname "$0")/../../../.." && pwd)}"
MODEL_DIR="${LLAMA_CPP_MODEL_DIR:-$WORKSPACE_ROOT/docker/models/llama}"

models="$(ls -1 "$MODEL_DIR"/*.gguf 2>/dev/null || true)"
if [ -z "$models" ]; then
  echo "⚠️  WARNING: No llama.cpp GGUF models found in $MODEL_DIR"
  echo "   Local llama.cpp provider will be unavailable."
  echo "   The default provider is MiniMax (cloud). Set MINIMAX_API_KEY in .env to use it."
  echo "   To enable llama.cpp locally, run:"
  echo "   pnpm docker:up:full   OR   sh scripts/ai/bootstrap-llama-cpp.sh"
  echo ""
  exit 0
fi

echo "✅ AI models detected:"
echo "$models" | sed 's/^/ - /'
exit 0

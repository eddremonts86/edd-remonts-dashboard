#!/usr/bin/env sh
# Download GGUF models for workspace-llama-cpp.
# Models are stored in the CENTRALIZED docker/models/llama/ directory
# (workspace root), not in app-local .docker_data/.
#
# The workspace-llama-cpp container auto-picks the first .gguf in /models
# (mounted from docker/models/llama/).
#
# Usage — run from the APP directory:
#   sh scripts/ai/bootstrap-llama-cpp.sh
#
# Or from the workspace root:
#   sh docker/models/llama/download.sh

set -eu

# Path from the app root to the shared model dir (works when run with `sh
# scripts/ai/bootstrap-llama-cpp.sh` from apps/<name>/).
WORKSPACE_ROOT="${WORKSPACE_ROOT:-$(cd "$(dirname "$0")/../../../.." && pwd)}"
MODEL_DIR="${LLAMA_CPP_MODEL_DIR:-$WORKSPACE_ROOT/docker/models/llama}"
# Defaults: Qwen3 family (released 2025-05). Speculative decoding pair:
#   main  = Qwen3-8B Q4_K_M   (~4.9 GB)
#   draft = Qwen3-0.6B Q8_0   (~640 MB, shares tokenizer with the 8B)
MAIN_MODEL_FILE="${LLAMA_CPP_MAIN_FILE:-Qwen3-8B-Q4_K_M.gguf}"
DRAFT_MODEL_FILE="${LLAMA_CPP_DRAFT_FILE:-Qwen3-0.6B-Q8_0.gguf}"
MAIN_MODEL_PATH="$MODEL_DIR/$MAIN_MODEL_FILE"
DRAFT_MODEL_PATH="$MODEL_DIR/$DRAFT_MODEL_FILE"

# Primary URLs: official Qwen org GGUFs on HuggingFace (public, no auth).
# Fallback URLs: unsloth re-uploads (also public).
MAIN_MODEL_URL="${LLAMA_CPP_MAIN_URL:-https://huggingface.co/Qwen/Qwen3-8B-GGUF/resolve/main/Qwen3-8B-Q4_K_M.gguf}"
DRAFT_MODEL_URL="${LLAMA_CPP_DRAFT_URL:-https://huggingface.co/Qwen/Qwen3-0.6B-GGUF/resolve/main/Qwen3-0.6B-Q8_0.gguf}"
MAIN_MODEL_URL_FALLBACK="${LLAMA_CPP_MAIN_URL_FALLBACK:-https://huggingface.co/unsloth/Qwen3-8B-GGUF/resolve/main/Qwen3-8B-Q4_K_M.gguf}"
DRAFT_MODEL_URL_FALLBACK="${LLAMA_CPP_DRAFT_URL_FALLBACK:-https://huggingface.co/unsloth/Qwen3-0.6B-GGUF/resolve/main/Qwen3-0.6B-Q8_0.gguf}"
HF_TOKEN="${HUGGINGFACE_TOKEN:-${HF_TOKEN:-}}"

LEGACY_MODEL_FILE="$WORKSPACE_ROOT/apps/edd-remonts-dashboard/.docker_data/models/llama-3.2-1b-instruct-q4_k_m.gguf"

download_file() {
	output="$1"
	url="$2"

	if command -v curl >/dev/null 2>&1; then
		auth_args=""
		if [ -n "$HF_TOKEN" ]; then
			auth_args="-H Authorization: Bearer $HF_TOKEN"
		fi
		# shellcheck disable=SC2086
		curl -L --fail --retry 3 $auth_args -o "$output" "$url"
	elif command -v wget >/dev/null 2>&1; then
		if [ -n "$HF_TOKEN" ]; then
			wget --header="Authorization: Bearer $HF_TOKEN" -O "$output" "$url"
		else
			wget -O "$output" "$url"
		fi
	else
		echo "[llama-cpp] Error: neither curl nor wget found."
		exit 1
	fi
}

try_download_with_fallbacks() {
	output="$1"
	label="$2"
	primary="$3"
	fallback="$4"

	if download_file "$output" "$primary"; then
		return 0
	fi

	echo "[llama-cpp] primary URL failed for $label, trying fallback..."
	if download_file "$output" "$fallback"; then
		return 0
	fi

	echo "[llama-cpp] failed to download $label from known URLs"
	return 1
}

verify_file_size() {
	filepath="$1"
	min_size="$2"
	label="$3"

	SIZE=$(wc -c < "$filepath" | tr -d ' ')
	if [ "$SIZE" -lt "$min_size" ]; then
		echo "[llama-cpp] Error: $label seems too small ($SIZE bytes)."
		rm -f "$filepath"
		exit 1
	fi
}

echo "[llama-cpp] Checking Qwen3 models..."

if [ ! -d "$MODEL_DIR" ]; then
	mkdir -p "$MODEL_DIR"
fi

if [ ! -f "$MAIN_MODEL_PATH" ] && [ -f "$LEGACY_MODEL_FILE" ]; then
	echo "[llama-cpp] Migrating legacy model to new path..."
	mv "$LEGACY_MODEL_FILE" "$MAIN_MODEL_PATH"
fi

if [ ! -f "$MAIN_MODEL_PATH" ]; then
	echo "[llama-cpp] Main model not found. Downloading: $MAIN_MODEL_FILE"
	echo "[llama-cpp] URL: $MAIN_MODEL_URL"
	try_download_with_fallbacks "$MAIN_MODEL_PATH" "main model" "$MAIN_MODEL_URL" "$MAIN_MODEL_URL_FALLBACK"
else
	echo "[llama-cpp] Main model already exists: $MAIN_MODEL_FILE"
fi

if [ ! -f "$DRAFT_MODEL_PATH" ]; then
	echo "[llama-cpp] Draft model not found. Downloading: $DRAFT_MODEL_FILE"
	echo "[llama-cpp] URL: $DRAFT_MODEL_URL"
	try_download_with_fallbacks "$DRAFT_MODEL_PATH" "draft model" "$DRAFT_MODEL_URL" "$DRAFT_MODEL_URL_FALLBACK"
else
	echo "[llama-cpp] Draft model already exists: $DRAFT_MODEL_FILE"
fi

echo "[llama-cpp] Verifying model integrity..."
# 8B Q4_K_M ≈ 4.9 GB, 0.6B Q8_0 ≈ 640 MB — use conservative floors.
verify_file_size "$MAIN_MODEL_PATH" 1000000000 "main model"
verify_file_size "$DRAFT_MODEL_PATH" 300000000 "draft model"

echo "[llama-cpp] Qwen3 models are ready."
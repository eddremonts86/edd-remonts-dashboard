#!/bin/sh
# Generates AVIF + WebP variants for the portfolio's raster assets.
#
# The originals shipped as-is: edd_light.jpg at 1.9 MB, project covers as PNG up
# to 808 KB, ~10 MB of images with no modern format and no srcset. One cover was
# measured downloading 500 KB to paint into an 18 px-wide slot.
#
# Idempotent: a variant is only rebuilt when it is missing or older than its
# source. Safe to run on every checkout.
#
# Requires: sips (macOS), cwebp and avifenc (brew install webp libavif).
set -e

command -v cwebp >/dev/null 2>&1 || { echo "cwebp missing — brew install webp" >&2; exit 1; }
command -v avifenc >/dev/null 2>&1 || { echo "avifenc missing — brew install libavif" >&2; exit 1; }
command -v sips >/dev/null 2>&1 || { echo "sips missing — macOS only" >&2; exit 1; }

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# Widths per asset class. Portraits are rendered large; covers never exceed a
# card, so a 1600px cover variant would only ever be wasted bytes.
PORTRAIT_WIDTHS="480 960 1600"
COVER_WIDTHS="400 800"

newer_than() { [ ! -f "$2" ] || [ "$1" -nt "$2" ]; }

emit() {
  src=$1; base=$2; width=$3
  scaled="$TMP/$(basename "$base")-$width.png"

  webp="${base}-${width}.webp"
  avif="${base}-${width}.avif"

  if ! newer_than "$src" "$webp" && ! newer_than "$src" "$avif"; then
    return
  fi

  sips -Z "$width" "$src" --out "$scaled" >/dev/null 2>&1

  if newer_than "$src" "$webp"; then
    cwebp -quiet -q 80 -m 6 "$scaled" -o "$webp"
    printf '  %-52s %s\n' "$(basename "$webp")" "$(du -h "$webp" | cut -f1)"
  fi
  if newer_than "$src" "$avif"; then
    avifenc --min 20 --max 34 --speed 4 "$scaled" "$avif" >/dev/null 2>&1
    printf '  %-52s %s\n' "$(basename "$avif")" "$(du -h "$avif" | cut -f1)"
  fi
}

echo "portraits:"
for src in public/edd/*.jpg; do
  [ -f "$src" ] || continue
  case "$src" in *-[0-9]*.jpg) continue;; esac
  base="${src%.jpg}"
  for w in $PORTRAIT_WIDTHS; do emit "$src" "$base" "$w"; done
done

echo "project covers:"
for src in public/projects/*.png public/projects/*.jpg; do
  [ -f "$src" ] || continue
  base="${src%.*}"
  for w in $COVER_WIDTHS; do emit "$src" "$base" "$w"; done
done

echo
echo "done. Originals are kept as the <img src> fallback."

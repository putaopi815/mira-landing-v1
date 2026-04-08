#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
# Filter out --dir and its argument (injected by preview tool)
ARGS=()
SKIP_NEXT=false
for arg in "$@"; do
  if [ "$SKIP_NEXT" = true ]; then
    SKIP_NEXT=false
    continue
  fi
  if [ "$arg" = "--dir" ]; then
    SKIP_NEXT=true
    continue
  fi
  ARGS+=("$arg")
done
cd "$(dirname "$0")"
exec npx next dev --turbopack --port "${PORT:-3000}"

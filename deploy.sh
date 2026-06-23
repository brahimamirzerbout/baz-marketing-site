#!/usr/bin/env bash
# BAZ Marketing Agency — deployment script
# Modes: setup, dev, build, start, audit, canva-export
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-3000}"
API_PORT="${API_PORT:-4000}"

mode="${1:-help}"

cmd_setup() {
  echo "→ Installing dependencies…"
  npm ci || npm install
  echo "→ Installing baz/api (optional backend)…"
  if [ -d "../baz/api" ]; then
    (cd ../baz/api && npm ci --omit=dev || true)
  fi
  echo "✓ Setup complete"
}

cmd_dev() {
  echo "→ Starting Next.js dev server on :$PORT"
  exec npx next dev -p "$PORT"
}

cmd_build() {
  echo "→ Typecheck…"
  npx tsc --noEmit
  echo "→ Lint…"
  npx next lint --max-warnings 999
  echo "→ Production build…"
  rm -rf .next
  npx next build
  echo "✓ Build complete"
}

cmd_start() {
  echo "→ Starting Next.js on :$PORT"
  exec npx next start -p "$PORT"
}

cmd_audit() {
  echo "→ Audit: placeholder content"
  if [ -f scripts/audit-placeholders.mjs ]; then
    node scripts/audit-placeholders.mjs
  else
    echo "  No audit script found."
  fi
  echo "→ Sitemap check"
  curl -fsS "http://localhost:$PORT/sitemap.xml" >/dev/null 2>&1 && echo "  ✓ sitemap serves" || echo "  ! start the server first"
}

cmd_api() {
  if [ ! -d "../baz/api" ]; then
    echo "✗ ../baz/api not found"; exit 1
  fi
  cd ../baz/api
  if [ ! -f .env ]; then
    echo "→ Creating .env from template"
    cp .env.example .env 2>/dev/null || true
  fi
  echo "→ Starting BAZ API on :$API_PORT"
  exec node server.js
}

cmd_full() {
  cmd_build
  (cd ../baz/api && node server.js &) 2>/dev/null
  sleep 3
  cmd_start
}

case "$mode" in
  setup)  cmd_setup ;;
  dev)    cmd_dev ;;
  build)  cmd_build ;;
  start)  cmd_start ;;
  audit)  cmd_audit ;;
  api)    cmd_api ;;
  full)   cmd_full ;;
  *)
    cat <<EOF
BAZ deploy — modes:
  setup   install deps
  dev     next dev
  build   typecheck + lint + next build
  start   next start
  audit   placeholder audit + sitemap check
  api     start the BAZ backend (../baz/api)
  full    build + start api + start site
EOF
    ;;
esac

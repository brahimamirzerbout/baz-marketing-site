#!/usr/bin/env bash
# Generate TypeScript types from Supabase schema
# Requires: supabase CLI linked to project

set -euo pipefail

SUPABASE_PROJECT_ID="uyqgmdrzyapbbvmaumvk"

echo "→ Generating TypeScript types from Supabase project..."
npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > lib/database.types.ts
echo "✓ Types written to lib/database.types.ts"

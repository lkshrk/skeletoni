#!/usr/bin/env bash
# Post-clone setup — replaces template placeholders with your project values.
# Run once after "Use this template" or `gh repo create --template`.
#
# Usage: bash scripts/setup.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# ── Prompts ──────────────────────────────────────────────────────────────────

read -rp "Project name (lowercase, no spaces, e.g. my-app): " name
read -rp "Site display name (e.g. My App): " display_name
read -rp "Emoji logo (e.g. 🚀, or press Enter to remove): " emoji
read -rp "One-line description: " description

if [[ -z "$name" || -z "$display_name" ]]; then
  echo "Error: project name and display name are required." >&2
  exit 1
fi

logo="${emoji:+$emoji }${display_name}"

# ── Replace in files ─────────────────────────────────────────────────────────

# package.json — name field
sed -i '' "s/\"name\": \"skeletoni\"/\"name\": \"$name\"/" "$ROOT/package.json"

# .env.example — site name
sed -i '' "s/PUBLIC_SITE_NAME=skeletoni/PUBLIC_SITE_NAME=$display_name/" "$ROOT/.env.example"

# meta.ts — default title
sed -i '' "s/title: 'skeletoni'/title: '$display_name'/" "$ROOT/src/lib/meta.ts"

# meta.ts — default description
sed -i '' "s/description: 'The cleanest SvelteKit project setup.'/description: '$description'/" "$ROOT/src/lib/meta.ts"

# Footer — copyright
sed -i '' "s/© {year} skeletoni/© {year} $display_name/" "$ROOT/src/lib/components/Footer.svelte"

# Navbar — logo (desktop + mobile)
sed -i '' "s/🦦 skeletoni/$logo/g" "$ROOT/src/lib/components/Navbar.svelte"

# Home page — heading and tagline
sed -i '' "s/🦦 skeletoni/$logo/" "$ROOT/src/routes/+page.svelte"
sed -i '' "s/The cleanest SvelteKit skeleton\./$description/" "$ROOT/src/routes/+page.svelte"

# README — title and clone URL
sed -i '' "1s/# skeletoni/# $display_name/" "$ROOT/README.md"
sed -i '' "s|skeletoni\.git|$name.git|g" "$ROOT/README.md"
sed -i '' "s/docker build -t skeletoni/docker build -t $name/" "$ROOT/README.md"
sed -i '' "s/docker run.*skeletoni$/docker run -p 3000:3000 --env-file .env $name/" "$ROOT/README.md"

# ── Copy .env ────────────────────────────────────────────────────────────────

if [[ ! -f "$ROOT/.env" ]]; then
  cp "$ROOT/.env.example" "$ROOT/.env"
  echo "Created .env from .env.example"
fi

# ── Clean up ─────────────────────────────────────────────────────────────────

rm -f "$ROOT/scripts/setup.sh"

echo ""
echo "✓ Project '$display_name' is ready."
echo ""
echo "Next steps:"
echo "  1. pnpm install"
echo "  2. pnpm dev"
echo "  3. Edit src/routes/+page.svelte to build your app"
echo ""

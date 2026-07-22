#!/usr/bin/env bash
# One-time local database setup for Driver Education Platform
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOOLS="$ROOT/.tools"
NODE_DIR="$TOOLS/node-v22.22.0-darwin-arm64"
PG_DIR="$TOOLS/postgresql"
PGDATA="$TOOLS/pgdata"
export PATH="$NODE_DIR/bin:$PG_DIR/bin:$PATH"

mkdir -p "$TOOLS"

if [ ! -x "$NODE_DIR/bin/node" ]; then
  echo "→ Downloading Node.js..."
  curl -fsSL "https://nodejs.org/dist/v22.22.0/node-v22.22.0-darwin-arm64.tar.gz" \
    -o "$TOOLS/node.tar.gz"
  tar -xzf "$TOOLS/node.tar.gz" -C "$TOOLS"
fi

if [ ! -x "$PG_DIR/bin/postgres" ]; then
  echo "→ Downloading PostgreSQL..."
  curl -fsSL "https://get.enterprisedb.com/postgresql/postgresql-16.6-1-osx-binaries.zip" \
    -o "$TOOLS/pg.zip"
  unzip -q -o "$TOOLS/pg.zip" -d "$TOOLS"
  mv "$TOOLS/pgsql" "$PG_DIR"
fi

if [ ! -f "$PGDATA/PG_VERSION" ]; then
  echo "→ Initializing database..."
  mkdir -p "$PGDATA"
  initdb -D "$PGDATA" -U postgres --no-locale -E UTF8
  echo "host all all 127.0.0.1/32 trust" >> "$PGDATA/pg_hba.conf"
  echo "host all all ::1/128 trust" >> "$PGDATA/pg_hba.conf"
fi

if ! pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
  echo "→ Starting PostgreSQL..."
  pg_ctl -D "$PGDATA" -l "$TOOLS/pg.log" -w start
fi

createdb -U postgres driver_education 2>/dev/null || true

cd "$ROOT"
[ -f .env ] || cp .env.example .env

echo "→ Installing npm packages..."
npm install

echo "→ Running migrations..."
npx prisma migrate deploy

echo "→ Seeding California DMV content..."
npm run db:seed

echo ""
echo "✓ Database ready!"
echo "  Run:  npm run dev"
echo "  Open: http://localhost:3000"

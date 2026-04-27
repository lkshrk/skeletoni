# syntax=docker/dockerfile:1

# ─── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# ─── Runtime stage ────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# ORIGIN must be set at runtime for CSRF protection:
# docker run -e ORIGIN=https://yourdomain.com ...

RUN corepack enable

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

COPY --from=builder /app/build ./build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD wget -qO- http://localhost:3000/ 2>/dev/null || exit 1

CMD ["node", "build/index.js"]

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install              # install dependencies
npm start                # run the server (node app.js) on http://localhost:3000
docker-compose up --build  # run containerized (mounts repo as a volume, hot-reloads source)
```

There is **no test suite** (`npm test` is a stub that exits 1) and **no linter configured** — the CI "lint" job only runs `npm outdated`. The main CI gate that can fail is `npm audit --audit-level=moderate`, so keep dependencies free of moderate+ vulnerabilities.

## Environment

A single env var drives the app: `API_BASE_URL` (the external product API origin, default `https://api.mamdanicomputers.com`). It is read in `app.js`, defaulted in two places (the `app.locals` line and the proxy route), and surfaced to the browser as `window.API_BASE_URL` via `layout.ejs`. `.env` is git-ignored; `docker-compose.yml` passes it through.

## Architecture

This is a small server-rendered marketing/catalog site for a computer shop. The entire backend is one file, `app.js`.

**Hybrid rendering model — this is the key thing to understand:**
- **Page shells** are rendered server-side with EJS. Each route in `app.js` just calls `res.render(view, { title })`. `express-ejs-layouts` wraps every view in `views/layout.ejs` (the `<head>`, all CDN scripts, global styles, header/footer partials). Individual views in `views/` contain only their `<main>` body.
- **Product data is fetched client-side**, not injected server-side. Views use Alpine.js (`x-data` / `x-init`) and call the global `ProductsFetcher` object from `public/js/productsFetch.js`. So `/products` and `/product/:id` render an empty shell, then JS populates it in the browser. `product-detail.ejs` finds its product by filtering the full list client-side (no per-product API call), keyed off the `productId` passed through from the route param.

**The CORS proxy is the bridge between the two layers.** The browser never calls the external API directly. `ProductsFetcher.API_URL` points at `/api/proxy/products`, a route in `app.js` that server-side fetches `${API_BASE_URL}/api/v1/products/public` via axios and forwards the JSON. This avoids browser CORS restrictions. When adding new external API calls, add a matching proxy route rather than calling the API from client JS.

**Resilience:** `ProductsFetcher.getProducts()` returns a hardcoded `fallbackProducts` array if the proxy/API fails, so the UI degrades gracefully when the backend is down. It also normalizes `_id` → `id` for consistency.

**Front-end stack is entirely CDN-based** (loaded in `layout.ejs`): Tailwind CSS (config inlined via `tailwind.config`), Alpine.js, Font Awesome. There is no build step and no bundler — editing a `.ejs` view or `public/js/` file and restarting (or relying on the Docker volume mount) is the full dev loop. Theme is an Alpine store with an "auto" mode that switches dark/light by time of day.

## Deployment

Multi-stage `Dockerfile` (build deps → slim runtime, non-root user, dumb-init, healthcheck). `.github/workflows/docker-build.yml` builds and pushes images to GHCR on pushes to `main`/`develop` and `v*.*.*` tags. See `DOCKER_SETUP.md` for details.

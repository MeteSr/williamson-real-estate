# CLAUDE.md

## ⚠️ Two frontends — only one is deployed

This repo contains **two separate frontends**. Always edit `src/`, never `frontend/`.

| Directory | Status | Notes |
|---|---|---|
| `src/` | **Deployed** | Next.js app — this is what the live site serves |
| `frontend/` | Legacy / unused | Old static HTML/CSS/JS site — not built, not deployed |

## Deployment

- **Testnet** auto-deploys on every push to `main` via GitHub Actions
- **Mainnet** deploys via manual `workflow_dispatch`
- Pipeline: `npm run build` (Next.js → `out/`) → `icp deploy assets`
- Assets canister serves from `out/`, which comes from `src/`

## Key source files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Page composition / section order |
| `src/components/Nav.tsx` | Navigation (desktop + mobile hamburger) |
| `src/components/MarketSnapshot.tsx` | Pelican Bay market stats |
| `src/components/Hero.tsx` | Hero section |
| `src/components/WhyWilliamson.tsx` | Value props |
| `src/components/Testimonials.tsx` | Client reviews |
| `src/components/HomeGentic.tsx` | HomeGentic cross-sell section |
| `src/components/Contact.tsx` | Contact form |
| `src/components/Footer.tsx` | Footer |

## Market data

All stats live in `src/lib/marketData.ts` — the single source of truth. Changing values there automatically updates both the MarketSnapshot section and the Hero calculator default. Source: Redfin neighborhood page for Pelican Bay, Daytona Beach FL 32119.
